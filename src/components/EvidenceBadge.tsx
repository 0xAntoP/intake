"use client";

import { EvidenceLevel } from "@/types";

interface EvidenceBadgeProps {
  level: EvidenceLevel;
  size?: "sm" | "md";
}

const levelConfig: Record<
  EvidenceLevel,
  { label: string; bgColor: string; textColor: string }
> = {
  high: {
    label: "High Evidence",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  moderate: {
    label: "Moderate Evidence",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  low: {
    label: "Low Evidence",
    bgColor: "bg-orange-100",
    textColor: "text-orange-800",
  },
};

export function EvidenceBadge({ level, size = "md" }: EvidenceBadgeProps) {
  const config = levelConfig[level];
  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${config.bgColor} ${config.textColor} ${sizeClasses}`}
    >
      {config.label}
    </span>
  );
}
