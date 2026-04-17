"use client";

import { useEffect, useState } from "react";
import MoodChart from "@/components/MoodChart";
import InsightCard from "@/components/InsightCard";

type WeeklyInsights = {
  avgMood: number;
  moodTrend: number[];
  topTags: string[];
};

export default function InsightsPage() {
  const [insights, setInsights] = useState<WeeklyInsights>({
    avgMood: 0,
    moodTrend: [],
    topTags: []
  });

  useEffect(() => {
    async function loadInsights() {
      const response = await fetch("/api/insights/weekly?user_id=demo-user");
      const payload = await response.json();
      setInsights(payload);
    }

    void loadInsights();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Weekly insights</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <InsightCard title="Average mood" value={`${insights.avgMood}/5`} />
        <InsightCard title="Top tags" value={insights.topTags.slice(0, 2).join(", ") || "None"} />
        <InsightCard title="Entries" value={String(insights.moodTrend.length)} />
      </div>

      <MoodChart
        data={insights.moodTrend.map((score, index) => ({
          day: `Day ${index + 1}`,
          score
        }))}
      />
    </div>
  );
}
