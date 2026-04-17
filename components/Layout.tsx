"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getUser } from "@/lib/auth";

type LayoutProps = {
  children: ReactNode;
};

const protectedRoutes = ["/dashboard", "/checkin", "/journal", "/insights", "/therapists"];

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function verifySession() {
      if (!pathname || !protectedRoutes.some((route) => pathname.startsWith(route))) {
        return;
      }
      const { data } = await getUser();
      if (!data.user) {
        router.replace("/auth");
      }
    }

    void verifySession();
  }, [pathname, router]);

  return (
    <div className="min-h-screen">
      {pathname && protectedRoutes.some((route) => pathname.startsWith(route)) ? <Navbar /> : null}
      <main className="mx-auto w-full max-w-5xl px-4 py-6">{children}</main>
    </div>
  );
}
