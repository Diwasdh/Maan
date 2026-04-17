"use client";

import { useEffect, useMemo, useState } from "react";
import TherapistCard from "@/components/TherapistCard";
import type { Therapist } from "@/types/therapist";

export default function TherapistsPage() {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [location, setLocation] = useState("all");
  const [type, setType] = useState("all");

  useEffect(() => {
    async function loadTherapists() {
      const response = await fetch("/api/therapists");
      const payload = await response.json();
      setTherapists(payload.data ?? []);
    }

    void loadTherapists();
  }, []);

  const filtered = useMemo(
    () =>
      therapists.filter((therapist) => {
        const matchesLocation = location === "all" || therapist.location === location;
        const matchesType = type === "all" || therapist.type === type;
        return matchesLocation && matchesType;
      }),
    [location, therapists, type]
  );

  const locations = Array.from(new Set(therapists.map((therapist) => therapist.location)));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Therapist directory</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        <select
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          className="rounded-md border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="all">All locations</option>
          {locations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
          className="rounded-md border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="all">All formats</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      <section className="grid gap-3 sm:grid-cols-2">
        {filtered.map((therapist) => (
          <TherapistCard key={therapist.id} therapist={therapist} />
        ))}
      </section>
      {filtered.length === 0 ? <p className="text-sm text-slate-500">No therapists match these filters.</p> : null}
    </div>
  );
}
