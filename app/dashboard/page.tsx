"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import MoodChart from "@/components/MoodChart";
import InsightCard from "@/components/InsightCard";
import type { Mood } from "@/types/mood";
import type { Journal } from "@/types/journal";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [journals, setJournals] = useState<Journal[]>([]);

  useEffect(() => {
    async function load() {
      const [moodRes, journalRes] = await Promise.all([
        fetch("/api/mood?user_id=demo-user"),
        fetch("/api/journal?user_id=demo-user")
      ]);
      const moodData = await moodRes.json();
      const journalData = await journalRes.json();
      setMoods(moodData.data ?? []);
      setJournals(journalData.data ?? []);
    }

    void load();
  }, []);

  const todayMood = moods[0];
  const chartData = useMemo(
    () =>
      moods
        .slice(0, 7)
        .reverse()
        .map((mood) => ({ day: formatDate(mood.created_at), score: mood.mood_score })),
    [moods]
  );

  return (
    <div className="space-y-6">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-slate-500">Track your progress one day at a time.</p>
        </div>
        <Link href="/checkin" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
          Quick Check-in
        </Link>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <InsightCard title="Today's mood" value={todayMood ? `${todayMood.mood_score}/5` : "No check-in"} />
        <InsightCard title="Entries this week" value={String(moods.slice(0, 7).length)} />
        <InsightCard title="Journal entries" value={String(journals.length)} />
      </div>

      <MoodChart data={chartData} />

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold">Recent journal snippet</h2>
        <p className="mt-2 text-sm text-slate-600">
          {journals[0]?.content ? `${journals[0].content.slice(0, 150)}...` : "No journal entries yet."}
        </p>
      </section>
    </div>
  );
}
