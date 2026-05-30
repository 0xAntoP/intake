"use client";

import Link from "next/link";
import { SupplementRecommendation } from "@/types";
import { PairingList } from "./PairingList";

interface SupplementCardProps {
  supplement: SupplementRecommendation;
  showDetails?: boolean;
}

const evidenceStyles = {
  high: { dot: "bg-[#4A7C59]", label: "High evidence" },
  moderate: { dot: "bg-[#FFB326]", label: "Moderate evidence" },
  low: { dot: "bg-[#2E1B12]/20", label: "Low evidence" },
};

export function SupplementCard({ supplement, showDetails = true }: SupplementCardProps) {
  const foodNote = supplement.timing.withFood
    ? supplement.timing.withFat ? "With food + fat" : "With food"
    : "Empty stomach ok";

  const ev = evidenceStyles[supplement.evidenceLevel];

  return (
    <div className="border border-[#2E1B12]/10 bg-white p-5">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <Link
          href={`/supplement/${supplement.slug}`}
          className="text-base font-medium text-[#2E1B12] hover:text-[#FFB326] transition-colors leading-snug"
        >
          {supplement.name}
        </Link>
        <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${ev.dot}`} />
          <span className="text-xs text-[#9C8B78]">{ev.label}</span>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs text-[#2E1B12] font-medium">{supplement.dosage}</span>
        {showDetails && (
          <>
            <span className="text-[#2E1B12]/20">·</span>
            <span className="text-xs text-[#9C8B78]">{foodNote}</span>
          </>
        )}
        {supplement.alreadyTaking && (
          <>
            <span className="text-[#2E1B12]/20">·</span>
            <span className="text-xs text-[#FFB326]">Already taking</span>
          </>
        )}
      </div>

      {/* Rationale */}
      {showDetails && (
        <p className="text-sm text-[#9C8B78] leading-relaxed mb-3">{supplement.rationale}</p>
      )}

      {/* Caution */}
      {showDetails && supplement.cautionNote && (
        <div className="mb-3 px-3 py-2 border-l-2 border-[#FFB326] bg-[#FCFCF7]">
          <p className="text-xs text-[#9C8B78]">
            <span className="font-medium text-[#2E1B12]">Note: </span>
            {supplement.cautionNote}
          </p>
        </div>
      )}

      {/* Pairings */}
      {showDetails && (
        <PairingList
          pairWith={supplement.pairWith}
          avoidWith={supplement.avoidWith}
          separateFrom={supplement.separateFrom}
        />
      )}

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-[#2E1B12]/10 flex items-center justify-between">
        {showDetails && supplement.citations.length > 0 ? (
          <span className="text-xs text-[#9C8B78]">
            {supplement.citations.length} citation{supplement.citations.length !== 1 ? "s" : ""}
          </span>
        ) : <span />}
        <Link href={`/supplement/${supplement.slug}`} className="text-xs text-[#FFB326] hover:underline">
          View details →
        </Link>
      </div>
    </div>
  );
}
