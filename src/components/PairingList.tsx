"use client";

import { Pairing } from "@/types";

interface PairingListProps {
  pairWith: Pairing[];
  avoidWith: Pairing[];
  separateFrom: Pairing[];
  compact?: boolean;
}

export function PairingList({
  pairWith,
  avoidWith,
  separateFrom,
  compact = false,
}: PairingListProps) {
  const hasAnyPairings =
    pairWith.length > 0 || avoidWith.length > 0 || separateFrom.length > 0;

  if (!hasAnyPairings) {
    return null;
  }

  const itemClass = compact ? "text-sm" : "text-base";

  return (
    <div className="space-y-3">
      {pairWith.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Pair with</h4>
          <ul className="space-y-1">
            {pairWith.map((pairing, index) => (
              <li key={index} className={`flex items-start gap-2 ${itemClass}`}>
                <span className="text-green-600 flex-shrink-0">✅</span>
                <span>
                  <span className="font-medium">{pairing.item}</span>
                  {!compact && (
                    <span className="text-gray-600"> — {pairing.reason}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {avoidWith.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Avoid with</h4>
          <ul className="space-y-1">
            {avoidWith.map((pairing, index) => (
              <li key={index} className={`flex items-start gap-2 ${itemClass}`}>
                <span className="text-red-600 flex-shrink-0">🚫</span>
                <span>
                  <span className="font-medium">{pairing.item}</span>
                  {!compact && (
                    <span className="text-gray-600"> — {pairing.reason}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {separateFrom.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">
            Separate from
          </h4>
          <ul className="space-y-1">
            {separateFrom.map((pairing, index) => (
              <li key={index} className={`flex items-start gap-2 ${itemClass}`}>
                <span className="text-amber-600 flex-shrink-0">⏰</span>
                <span>
                  <span className="font-medium">{pairing.item}</span>
                  {pairing.separationHours && (
                    <span className="text-amber-700">
                      {" "}
                      ({pairing.separationHours}h apart)
                    </span>
                  )}
                  {!compact && (
                    <span className="text-gray-600"> — {pairing.reason}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
