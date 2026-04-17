import Link from "next/link";

const features = [
  "Mood tracking with quick emoji check-ins",
  "Private journaling built for reflection",
  "Weekly insights to spot emotional patterns",
  "Therapist directory to find human support"
];

export default function HomePage() {
  return (
    <div className="space-y-12 py-10">
      <section className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Your private mental wellness companion</h1>
        <p className="mx-auto max-w-2xl text-slate-600">
          MannMitra Lite helps you track mood, journal daily, and review simple weekly insights.
        </p>
        <Link href="/auth" className="inline-block rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white">
          Get started
        </Link>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {features.map((feature) => (
          <article key={feature} className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
            {feature}
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-indigo-100 bg-indigo-50 p-6 text-center">
        <h2 className="text-lg font-semibold text-indigo-900">Privacy-first by design</h2>
        <p className="mt-2 text-sm text-indigo-800">
          We only store what you save and keep the MVP focused on your personal journey.
        </p>
      </section>
    </div>
  );
}
