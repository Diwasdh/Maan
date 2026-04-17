import { NextRequest, NextResponse } from "next/server";
import { getMoodEntries } from "@/lib/db";
import { calculateAverage } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
  }

  const { data, error } = await getMoodEntries(userId);

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Failed to fetch moods" }, { status: 400 });
  }

  const weekData = data.slice(0, 7);
  const moodTrend = weekData.map((entry) => entry.mood_score).reverse();

  const tagCount = weekData.reduce<Record<string, number>>((acc, entry) => {
    for (const tag of entry.tags ?? []) {
      acc[tag] = (acc[tag] ?? 0) + 1;
    }
    return acc;
  }, {});

  const topTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)
    .slice(0, 3);

  return NextResponse.json({
    avgMood: calculateAverage(moodTrend),
    moodTrend,
    topTags
  });
}
