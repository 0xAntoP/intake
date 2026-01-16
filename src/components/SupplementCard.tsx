"use client";

import Link from "next/link";
import { SupplementRecommendation } from "@/types";
import { EvidenceBadge } from "./EvidenceBadge";
import { PairingList } from "./PairingList";

interface SupplementCardProps {
  supplement: SupplementRecommendation;
  showDetails?: boolean;
}

export function SupplementCard({
  supplement,
  showDetails = true,
}: SupplementCardProps) {
  const foodNote = supplement.timing.withFood
    ? supplement.timing.withFat
      ? "Take with food containing fat"
      : "Take with food"
    : "Can take on empty stomach";

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <Link
            href={`/supplement/${supplement.slug}`}
            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            {supplement.name}
          </Link>
          {supplement.alreadyTaking && (
            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              Already taking
            </span>
          )}
        </div>
        <EvidenceBadge level={supplement.evidenceLevel} size="sm" />
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Dosage:</span>
          <span className="font-medium text-gray-900">{supplement.dosage}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Timing:</span>
          <span className="text-gray-700">{foodNote}</span>
        </div>
      </div>

      {showDetails && (
        <>
          <p className="text-sm text-gray-600 mb-3">{supplement.rationale}</p>

          <PairingList
            pairWith={supplement.pairWith}
            avoidWith={supplement.avoidWith}
            separateFrom={supplement.separateFrom}
            compact
          />

          {supplement.cautionNote && (
            <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800">
              <span className="font-medium">Note:</span> {supplement.cautionNote}
            </div>
          )}

          {supplement.citations.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                {supplement.citations.length} citation
                {supplement.citations.length !== 1 ? "s" : ""} •{" "}
                <Link
                  href={`/supplement/${supplement.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  View details
                </Link>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
