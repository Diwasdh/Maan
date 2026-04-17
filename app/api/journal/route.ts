import { NextRequest, NextResponse } from "next/server";
import { createJournalEntry, getJournalEntries } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { data, error } = await createJournalEntry({
    user_id: body.user_id,
    content: body.content
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
  }

  const { data, error } = await getJournalEntries(userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}
