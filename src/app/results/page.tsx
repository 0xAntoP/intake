"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ScheduleView, Disclaimer } from "@/components";
import { generateRecommendations, groupBySchedule } from "@/lib/recommendation-engine";
import { UserProfile, ScheduleGroup, SupplementRecommendation } from "@/types";

export default function ResultsPage() {
  const router = useRouter();
  const [schedule, setSchedule] = useState<ScheduleGroup[]>([]);
  const [recommendations, setRecommendations] = useState<SupplementRecommendation[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProfile = sessionStorage.getItem("intakeProfile");
    if (!storedProfile) { router.push("/intake"); return; }
    try {
      const parsedProfile: UserProfile = JSON.parse(storedProfile);
      setProfile(parsedProfile);
      const recs = generateRecommendations(parsedProfile);
      setRecommendations(recs);
      setSchedule(groupBySchedule(recs));
    } catch {
      router.push("/intake"); return;
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFCF7] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-6 h-6 border-2 border-[#FFB326] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-[#9C8B78] tracking-wide">Generating your plan…</p>
        </div>
      </div>
    );
  }

  const goalLabels: Record<string, string> = {
    energy: "Energy", sleep: "Sleep", focus: "Focus",
    immunity: "Immunity", stress: "Stress", longevity: "Longevity", muscle: "Muscle & Recovery",
  };

  return (
    <div className="min-h-screen bg-[#FCFCF7] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/intake" className="text-xs tracking-widest uppercase text-[#9C8B78] hover:text-[#2E1B12] transition-colors">
            ← Retake questionnaire
          </Link>
        </div>

        {/* Header card */}
        <div className="bg-white border border-[#2E1B12]/10 p-8 md:p-12 mb-4">
          <p className="text-xs tracking-widest uppercase text-[#9C8B78] mb-3">Sprout — Results</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2E1B12] mb-2">
            Your Supplement Plan
          </h1>
          {profile && (
            <p className="text-[#9C8B78]">
              {profile.age} years old · {profile.diet.charAt(0).toUpperCase() + profile.diet.slice(1)} diet
            </p>
          )}

          {profile && profile.goals.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {profile.goals.map((goal) => (
                <span key={goal} className="text-xs border border-[#2E1B12]/20 px-3 py-1 text-[#2E1B12]">
                  {goalLabels[goal]}
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 gap-0 divide-x divide-[#2E1B12]/10 mt-8 pt-8 border-t border-[#2E1B12]/10">
            <div className="text-center pr-4">
              <div className="text-3xl font-bold text-[#FFB326]">{recommendations.length}</div>
              <div className="text-xs tracking-widest uppercase text-[#9C8B78] mt-1">Supplements</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl font-bold text-[#FFB326]">{schedule.length}</div>
              <div className="text-xs tracking-widest uppercase text-[#9C8B78] mt-1">Time slots</div>
            </div>
            <div className="text-center pl-4">
              <div className="text-3xl font-bold text-[#FFB326]">
                {recommendations.filter((r) => r.evidenceLevel === "high").length}
              </div>
              <div className="text-xs tracking-widest uppercase text-[#9C8B78] mt-1">High evidence</div>
            </div>
          </div>
        </div>

        <Disclaimer variant="results" />

        {/* Schedule */}
        <div className="bg-white border border-[#2E1B12]/10 p-8 md:p-12">
          <p className="text-xs tracking-widest uppercase text-[#9C8B78] mb-8">Daily Schedule</p>
          <ScheduleView schedule={schedule} />
        </div>

        <div className="mt-8 text-center">
          <Link href="/methodology" className="text-sm text-[#FFB326] hover:underline">
            Read our methodology →
          </Link>
        </div>
      </div>
    </div>
  );
}
