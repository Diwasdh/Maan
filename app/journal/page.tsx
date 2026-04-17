"use client";

import { useEffect, useState } from "react";
import JournalEditor from "@/components/JournalEditor";
import type { Journal } from "@/types/journal";
import { formatDate } from "@/lib/utils";

export default function JournalPage() {
  const [entries, setEntries] = useState<Journal[]>([]);

  async function loadEntries() {
    const response = await fetch("/api/journal?user_id=demo-user");
    const payload = await response.json();
    setEntries(payload.data ?? []);
  }

  useEffect(() => {
    void loadEntries();
  }, []);

  async function saveEntry(content: string) {
    await fetch("/api/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: "demo-user", content })
    });
    await loadEntries();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Journal</h1>
      <JournalEditor onSave={saveEntry} />
      <section className="space-y-3">
        {entries.map((entry) => (
          <article key={entry.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">{formatDate(entry.created_at)}</p>
            <p className="mt-2 text-sm text-slate-700">{entry.content}</p>
          </article>
        ))}
        {entries.length === 0 ? <p className="text-sm text-slate-500">No entries yet.</p> : null}
      </section>
    </div>
  );
}
