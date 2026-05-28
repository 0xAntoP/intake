import type { Metadata } from "next";
import { Disclaimer, IframeResizer } from "@/components";
import "./globals.css";

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
        className="antialiased min-h-screen flex flex-col"
      >
        <IframeResizer />
        <main className="flex-1">{children}</main>
        <Disclaimer variant="footer" />
      </body>
    </html>
  );
}
