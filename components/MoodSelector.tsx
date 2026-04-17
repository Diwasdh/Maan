"use client";

import { useState } from "react";

const moods = [
  { score: 5, emoji: "😄", label: "Great" },
  { score: 4, emoji: "🙂", label: "Good" },
  { score: 3, emoji: "😐", label: "Okay" },
  { score: 2, emoji: "😔", label: "Low" },
  { score: 1, emoji: "😢", label: "Very low" }
];

type MoodSelectorProps = {
  onSubmit: (payload: { mood_score: number; tags: string[]; note?: string }) => Promise<void>;
};

export default function MoodSelector({ onSubmit }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [tagsInput, setTagsInput] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit() {
    if (!selectedMood) return;
    setSaving(true);
    await onSubmit({
      mood_score: selectedMood,
      tags: tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      note: note.trim() || undefined
    });
    setSaving(false);
    setTagsInput("");
    setNote("");
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">How are you feeling today?</h2>
      <div className="mt-3 grid grid-cols-5 gap-2">
        {moods.map((mood) => (
          <button
            key={mood.score}
            type="button"
            onClick={() => setSelectedMood(mood.score)}
            className={`rounded-lg border p-2 text-center ${selectedMood === mood.score ? "border-indigo-500 bg-indigo-50" : "border-slate-200"}`}
          >
            <span className="block text-xl">{mood.emoji}</span>
            <span className="text-xs text-slate-500">{mood.label}</span>
          </button>
        ))}
      </div>
      <input
        value={tagsInput}
        onChange={(event) => setTagsInput(event.target.value)}
        placeholder="Tags (comma separated)"
        className="mt-4 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
      />
      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Optional note"
        rows={3}
        className="mt-3 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
      />
      <button
        type="button"
        disabled={!selectedMood || saving}
        onClick={handleSubmit}
        className="mt-3 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save check-in"}
      </button>
    </section>
  );
}
