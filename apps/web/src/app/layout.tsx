import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cosmic Gateway",
    template: "%s | Cosmic Gateway",
  },
  description:
    "A daily gateway from astronomy discoveries to genuine understanding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-cosmos-radial" suppressHydrationWarning>
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
          {children}
        </main>
      </body>
    </html>
  );
}

