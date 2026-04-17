"use client";

import { useRouter } from "next/navigation";
import MoodSelector from "@/components/MoodSelector";

export default function CheckinPage() {
  const router = useRouter();

  async function saveMood(payload: { mood_score: number; tags: string[]; note?: string }) {
    await fetch("/api/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, user_id: "demo-user" })
    });
    router.push("/dashboard");
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Daily check-in</h1>
      <MoodSelector onSubmit={saveMood} />
    </div>
  );
}
