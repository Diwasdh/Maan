"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/journal", label: "Journal" },
  { href: "/insights", label: "Insights" },
  { href: "/therapists", label: "Therapists" }
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  async function onLogout() {
    await signOut();
    router.push("/auth");
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="text-sm font-semibold text-indigo-600">
          MannMitra Lite
        </Link>
        <div className="flex items-center gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm ${pathname === link.href ? "font-semibold text-slate-900" : "text-slate-500"}`}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={onLogout}
            className="rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}
