"use client";

import { Pairing } from "@/types";

interface PairingListProps {
  pairWith: Pairing[];
  avoidWith: Pairing[];
  separateFrom: Pairing[];
  compact?: boolean;
}

export function PairingList({ pairWith, avoidWith, separateFrom }: PairingListProps) {
  const hasAnyPairings = pairWith.length > 0 || avoidWith.length > 0 || separateFrom.length > 0;
  if (!hasAnyPairings) return null;

  return (
    <div className="space-y-2 pt-3 border-t border-[#2E1B12]/10">
      {pairWith.length > 0 && (
        <div className="flex items-start gap-2">
          <span className="text-xs tracking-widest uppercase text-[#4A7C59] flex-shrink-0 mt-0.5 w-16">Pair</span>
          <span className="text-xs text-[#9C8B78]">{pairWith.map((p) => p.item).join(", ")}</span>
        </div>
      )}
      {separateFrom.length > 0 && (
        <div className="flex items-start gap-2">
          <span className="text-xs tracking-widest uppercase text-[#FFB326] flex-shrink-0 mt-0.5 w-16">Space</span>
          <span className="text-xs text-[#9C8B78]">
            {separateFrom.map((p) => `${p.item}${p.separationHours ? ` (${p.separationHours}h apart)` : ""}`).join(", ")}
          </span>
        </div>
      )}
      {avoidWith.length > 0 && (
        <div className="flex items-start gap-2">
          <span className="text-xs tracking-widest uppercase text-red-400 flex-shrink-0 mt-0.5 w-16">Avoid</span>
          <span className="text-xs text-[#9C8B78]">{avoidWith.map((p) => p.item).join(", ")}</span>
        </div>
      )}
    </div>
  );
}
