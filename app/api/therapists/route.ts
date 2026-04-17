import { NextResponse } from "next/server";

const therapists = [
  {
    id: "th-1",
    name: "Dr. Aisha Verma",
    location: "New York",
    type: "online",
    contact: "mailto:aisha.verma@example.com",
    price_range: "$60-$90"
  },
  {
    id: "th-2",
    name: "Dr. James Carter",
    location: "San Francisco",
    type: "offline",
    contact: "mailto:james.carter@example.com",
    price_range: "$80-$120"
  },
  {
    id: "th-3",
    name: "Dr. Neha Khanna",
    location: "Chicago",
    type: "online",
    contact: "mailto:neha.khanna@example.com",
    price_range: "$50-$75"
  }
];

export async function GET() {
  return NextResponse.json({ data: therapists });
}
