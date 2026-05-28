"use client";

import Link from "next/link";

interface DisclaimerProps {
  variant?: "inline" | "footer" | "results";
}

export function Disclaimer({ variant = "inline" }: DisclaimerProps) {
  if (variant === "footer") {
    return (
      <footer className="mt-auto border-t border-[#2E1B12]/10 bg-[#FCFCF7] py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-[#9C8B78] mb-1">
            For educational purposes only. Not medical advice.
          </p>
          <p className="text-sm text-[#9C8B78]">
            Always consult a qualified healthcare provider before starting any supplement regimen.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
            <Link href="/methodology" className="text-[#FFB326] hover:underline">
              Methodology
            </Link>
            <span className="text-[#2E1B12]/20">|</span>
            <span className="text-[#9C8B78]">Evidence-based recommendations</span>
          </div>
        </div>
      </footer>
    );
  }

  if (variant === "results") {
    return (
      <div className="border border-[#2E1B12]/10 bg-[#FCFCF7] p-4 mb-6">
        <p className="text-sm text-[#9C8B78]">
          <strong className="text-[#2E1B12]">Important:</strong> This plan is for educational purposes only and does not constitute medical advice. Consult a physician before making changes to your supplement regimen.
        </p>
      </div>
    );
  }

  return (
    <p className="text-xs text-[#9C8B78] italic">
      Educational purposes only. Not medical advice. Consult a physician.
    </p>
  );
}
