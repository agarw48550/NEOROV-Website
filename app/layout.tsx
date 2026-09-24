import type { Metadata } from "next";
import { Carme } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";
import "./globals.css";

const carme = Carme({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-carme",
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
    <html lang="en" className={carme.variable}>
      <body className="min-h-screen antialiased font-sans">
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
