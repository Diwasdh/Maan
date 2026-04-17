import { getSupabaseClient } from "@/lib/supabaseClient";

export async function createMoodEntry(payload: {
  user_id: string;
  mood_score: number;
  tags: string[];
  note?: string;
}) {
  const supabase = getSupabaseClient();
  return supabase.from("moods").insert(payload).select().single();
}

export async function getMoodEntries(userId: string) {
  const supabase = getSupabaseClient();
  return supabase
    .from("moods")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}

export async function createJournalEntry(payload: {
  user_id: string;
  content: string;
}) {
  const supabase = getSupabaseClient();
  return supabase.from("journals").insert(payload).select().single();
}

export async function getJournalEntries(userId: string) {
  const supabase = getSupabaseClient();
  return supabase
    .from("journals")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}
