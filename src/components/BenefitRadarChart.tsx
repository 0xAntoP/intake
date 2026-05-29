"use client";

import { EvidenceLevel } from "@/types";

interface BenefitRadarChartProps {
  goals: string[];
  evidenceLevel: EvidenceLevel;
}

const ALL_GOALS = [
  { key: "energy",    label: "Energy" },
  { key: "focus",     label: "Focus" },
  { key: "immunity",  label: "Immunity" },
  { key: "longevity", label: "Longevity" },
  { key: "muscle",    label: "Muscle" },
  { key: "skin",      label: "Skin" },
  { key: "sleep",     label: "Sleep" },
  { key: "stress",    label: "Stress" },
];

const EVIDENCE_SCORE: Record<EvidenceLevel, number> = {
  high: 0.92,
  moderate: 0.65,
  low: 0.38,
};

const GRID_LEVELS = [0.25, 0.5, 0.75, 1.0];

export function BenefitRadarChart({ goals, evidenceLevel }: BenefitRadarChartProps) {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const r = 100;
  const n = ALL_GOALS.length;
  const score = EVIDENCE_SCORE[evidenceLevel];

  const angle = (i: number) => (i * 2 * Math.PI) / n - Math.PI / 2;

  const axisPoint = (i: number, scale: number) => ({
    x: cx + r * scale * Math.cos(angle(i)),
    y: cy + r * scale * Math.sin(angle(i)),
  });

  const dataPoints = ALL_GOALS.map((goal, i) => {
    const active = goals.includes(goal.key);
    const val = active ? score : 0;
    return { ...axisPoint(i, val || 0.01), active };
  });

  const polygonPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") + " Z";

  const gridPolygon = (level: number) =>
    ALL_GOALS.map((_, i) => {
      const p = axisPoint(i, level);
      return `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    }).join(" ") + " Z";

  const labelPoint = (i: number) => {
    const pad = 22;
    return {
      x: cx + (r + pad) * Math.cos(angle(i)),
      y: cy + (r + pad) * Math.sin(angle(i)),
    };
  };

  const textAnchor = (i: number): "start" | "end" | "middle" => {
    const a = angle(i);
    const cos = Math.cos(a);
    if (cos > 0.3) return "start";
    if (cos < -0.3) return "end";
    return "middle";
  };

  const dominantBaseline = (i: number): "hanging" | "auto" | "middle" => {
    const a = angle(i);
    const sin = Math.sin(a);
    if (sin > 0.3) return "hanging";
    if (sin < -0.3) return "auto";
    return "middle";
  };

  return (
    <div className="w-full flex flex-col items-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="overflow-visible"
      >
        {/* Grid rings */}
        {GRID_LEVELS.map((level, i) => (
          <path
            key={i}
            d={gridPolygon(level)}
            fill="none"
            stroke="#2E1B12"
            strokeOpacity={level === 1 ? 0.12 : 0.06}
            strokeWidth={1}
          />
        ))}

        {/* Axis lines */}
        {ALL_GOALS.map((_, i) => {
          const outer = axisPoint(i, 1);
          return (
            <line
              key={i}
              x1={cx} y1={cy}
              x2={outer.x} y2={outer.y}
              stroke="#2E1B12"
              strokeOpacity={0.08}
              strokeWidth={1}
            />
          );
        })}

        {/* Benefit area */}
        <path
          d={polygonPath}
          fill="#FFB326"
          fillOpacity={0.15}
          stroke="#FFB326"
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* Active dots */}
        {dataPoints.map((p, i) =>
          p.active ? (
            <circle key={i} cx={p.x} cy={p.y} r={4} fill="#FFB326" />
          ) : null
        )}

        {/* Labels */}
        {ALL_GOALS.map((goal, i) => {
          const lp = labelPoint(i);
          const active = goals.includes(goal.key);
          return (
            <text
              key={i}
              x={lp.x}
              y={lp.y}
              textAnchor={textAnchor(i)}
              dominantBaseline={dominantBaseline(i)}
              fontSize={10}
              fontFamily="ABCMonumentGrotesk, Arial, sans-serif"
              letterSpacing="0.05em"
              fill={active ? "#2E1B12" : "#C4B9AA"}
              fontWeight={active ? "500" : "400"}
            >
              {goal.label.toUpperCase()}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-2">
        <span className="w-3 h-3 rounded-full bg-[#FFB326] opacity-80 inline-block" />
        <span className="text-xs text-[#9C8B78] tracking-wide">
          {evidenceLevel.charAt(0).toUpperCase() + evidenceLevel.slice(1)} evidence support
        </span>
      </div>
    </div>
  );
}
