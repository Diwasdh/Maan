import type { Metadata } from "next";
import "../styles/globals.css";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "MannMitra Lite",
  description: "Private, simple daily mental wellness tracking."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
