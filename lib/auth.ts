import { getSupabaseClient } from "@/lib/supabaseClient";

export async function signIn(email: string, password: string) {
  const supabase = getSupabaseClient();
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUp(email: string, password: string) {
  const supabase = getSupabaseClient();
  return supabase.auth.signUp({ email, password });
}

export async function signOut() {
  const supabase = getSupabaseClient();
  return supabase.auth.signOut();
}

export async function getUser() {
  const supabase = getSupabaseClient();
  return supabase.auth.getUser();
}
