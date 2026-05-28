"use client";

import { ScheduleGroup, TimeOfDay } from "@/types";
import { SupplementCard } from "./SupplementCard";

interface ScheduleViewProps {
  schedule: ScheduleGroup[];
}

const timeLabels: Record<TimeOfDay, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

export function ScheduleView({ schedule }: ScheduleViewProps) {
  if (schedule.length === 0) {
    return (
      <div className="text-center py-12 text-[#9C8B78]">
        No supplements recommended. Try selecting different health goals.
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {schedule.map((group) => (
        <section key={group.timeOfDay}>
          <div className="flex items-center gap-4 mb-4 pb-3 border-b border-[#2E1B12]/10">
            <h2 className="text-sm tracking-widest uppercase text-[#9C8B78]">
              {timeLabels[group.timeOfDay]}
            </h2>
            <span className="text-xs text-[#9C8B78]">
              {group.supplements.length} supplement{group.supplements.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {group.supplements.map((supplement) => (
              <SupplementCard key={supplement.slug} supplement={supplement} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
