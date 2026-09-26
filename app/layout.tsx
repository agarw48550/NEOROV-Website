import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Reef Monitoring ROV",
    template: "%s · Reef Monitoring ROV",
  },
  description:
    "A custom pilot-operated ROV for shallow-water coastal monitoring — built by UWCSEA East students to document and protect coral reefs.",
  openGraph: {
    title: "Reef Monitoring ROV",
    description:
      "Low-cost underwater robotics for coral reef survey work in Singapore and the region.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable}`}>
      <body className="min-h-screen antialiased font-sans">
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
