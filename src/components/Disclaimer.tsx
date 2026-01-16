"use client";

import Link from "next/link";

interface DisclaimerProps {
  variant?: "inline" | "footer" | "results";
}

export function Disclaimer({ variant = "inline" }: DisclaimerProps) {
  if (variant === "footer") {
    return (
      <footer className="mt-auto border-t border-gray-200 bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Disclaimer:</strong> This tool is for educational purposes
            only. It does not provide medical advice, diagnosis, or treatment.
          </p>
          <p className="text-sm text-gray-500">
            Always consult a qualified healthcare provider before starting any
            supplement regimen.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
            <Link
              href="/methodology"
              className="text-blue-600 hover:underline"
            >
              Methodology
            </Link>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              Built with evidence-based data
            </span>
          </div>
        </div>
      </footer>
    );
  }

  if (variant === "results") {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          <span className="text-amber-600 text-xl flex-shrink-0">⚠️</span>
          <div>
            <h3 className="font-semibold text-amber-900 mb-1">
              Important Disclaimer
            </h3>
            <p className="text-sm text-amber-800">
              This personalized plan is for{" "}
              <strong>educational purposes only</strong> and does not constitute
              medical advice. Supplements can interact with medications and may
              not be appropriate for everyone. Please consult a physician or
              registered dietitian before making changes to your supplement
              regimen, especially if you have any health conditions or take
              medications.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default inline variant
  return (
    <p className="text-xs text-gray-500 italic">
      Educational purposes only. Not medical advice. Consult a physician.
    </p>
  );
}
