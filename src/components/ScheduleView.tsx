"use client";

import { ScheduleGroup, TimeOfDay } from "@/types";
import { SupplementCard } from "./SupplementCard";

interface ScheduleViewProps {
  schedule: ScheduleGroup[];
}

const timeConfig: Record<
  TimeOfDay,
  { label: string; icon: string; bgColor: string; borderColor: string }
> = {
  morning: {
    label: "Morning",
    icon: "🌅",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  afternoon: {
    label: "Afternoon",
    icon: "☀️",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  evening: {
    label: "Evening",
    icon: "🌙",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
};

export function ScheduleView({ schedule }: ScheduleViewProps) {
  if (schedule.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No supplements recommended. Try selecting different health goals.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {schedule.map((group) => {
        const config = timeConfig[group.timeOfDay];
        return (
          <section key={group.timeOfDay}>
            <div
              className={`flex items-center gap-3 mb-4 p-3 rounded-lg ${config.bgColor} border ${config.borderColor}`}
            >
              <span className="text-2xl">{config.icon}</span>
              <h2 className="text-xl font-semibold text-gray-900">
                {config.label}
              </h2>
              <span className="text-sm text-gray-600">
                ({group.supplements.length} supplement
                {group.supplements.length !== 1 ? "s" : ""})
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {group.supplements.map((supplement) => (
                <SupplementCard key={supplement.slug} supplement={supplement} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
