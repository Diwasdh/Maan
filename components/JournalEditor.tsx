"use client";

import { useState } from "react";

type JournalEditorProps = {
  onSave: (content: string) => Promise<void>;
};

export default function JournalEditor({ onSave }: JournalEditorProps) {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!content.trim()) return;
    setSaving(true);
    await onSave(content.trim());
    setContent("");
    setSaving(false);
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">Prompt: “What made you feel good today?”</p>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={6}
        placeholder="Write your thoughts..."
        className="mt-3 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
      />
      <button
        type="button"
        disabled={saving || !content.trim()}
        onClick={handleSave}
        className="mt-3 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save entry"}
      </button>
    </section>
  );
}
