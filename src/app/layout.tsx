import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Disclaimer } from "@/components";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Intake - Evidence-Based Supplement Planner",
  description:
    "Get a personalized, evidence-based supplement plan with timing, dosage, and interaction guidance. Built on peer-reviewed research.",
  keywords: [
    "supplements",
    "vitamins",
    "health",
    "evidence-based",
    "nutrition",
    "wellness",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <main className="flex-1">{children}</main>
        <Disclaimer variant="footer" />
      </body>
    </html>
  );
}
