import type { Therapist } from "@/types/therapist";

type TherapistCardProps = {
  therapist: Therapist;
};

export default function TherapistCard({ therapist }: TherapistCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{therapist.name}</h3>
      <p className="mt-1 text-sm text-slate-600">{therapist.location}</p>
      <p className="mt-1 text-sm text-slate-600 capitalize">{therapist.type}</p>
      {therapist.price_range ? <p className="mt-1 text-sm text-slate-500">{therapist.price_range}</p> : null}
      <a
        href={therapist.contact}
        className="mt-3 inline-block rounded-md bg-slate-900 px-3 py-2 text-sm text-white"
      >
        Contact
      </a>
    </article>
  );
}
