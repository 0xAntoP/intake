"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ScheduleView, Disclaimer } from "@/components";
import {
  generateRecommendations,
  groupBySchedule,
} from "@/lib/recommendation-engine";
import { UserProfile, ScheduleGroup, SupplementRecommendation } from "@/types";

export default function ResultsPage() {
  const router = useRouter();
  const [schedule, setSchedule] = useState<ScheduleGroup[]>([]);
  const [recommendations, setRecommendations] = useState<SupplementRecommendation[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get profile from sessionStorage
    const storedProfile = sessionStorage.getItem("intakeProfile");

    if (!storedProfile) {
      // Redirect to intake if no profile found
      router.push("/intake");
      return;
    }

    try {
      const parsedProfile: UserProfile = JSON.parse(storedProfile);
      setProfile(parsedProfile);

      // Generate recommendations
      const recs = generateRecommendations(parsedProfile);
      setRecommendations(recs);

      // Group by schedule
      const grouped = groupBySchedule(recs);
      setSchedule(grouped);
    } catch {
      router.push("/intake");
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Generating your personalized plan...</p>
        </div>
      </div>
    );
  }

  const goalLabels: Record<string, string> = {
    energy: "Energy",
    sleep: "Sleep",
    focus: "Focus",
    immunity: "Immunity",
    stress: "Stress",
    longevity: "Longevity",
    muscle: "Muscle & Recovery",
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/intake"
            className="text-blue-600 hover:underline text-sm flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Retake questionnaire
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Your Personalized Supplement Plan
          </h1>
          {profile && (
            <p className="text-gray-600 mb-4">
              Based on your profile: {profile.age} years old,{" "}
              {profile.diet.charAt(0).toUpperCase() + profile.diet.slice(1)} diet
            </p>
          )}

          {/* Goals summary */}
          {profile && profile.goals.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-sm text-gray-500">Your goals:</span>
              {profile.goals.map((goal) => (
                <span
                  key={goal}
                  className="text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
                >
                  {goalLabels[goal]}
                </span>
              ))}
            </div>
          )}

          {/* Medical Disclaimer */}
          {profile && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex gap-3">
                <div className="text-2xl">⚠️</div>
                <div>
                  <p className="text-sm font-medium text-amber-900 mb-2">
                    Important Health Information
                  </p>
                  <p className="text-sm text-amber-800 mb-3">
                    Before starting any new supplements, please consult with your healthcare provider, especially if you:
                  </p>
                  <ul className="text-sm text-amber-800 space-y-1 mb-3">
                    {profile.medications && profile.medications.toLowerCase() !== "none" && (
                      <li>• Are taking medications (potential interactions)</li>
                    )}
                    {profile.medicalConditions && profile.medicalConditions.length > 0 && !profile.medicalConditions.includes("none") && (
                      <li>• Have medical conditions ({profile.medicalConditions.join(", ")})</li>
                    )}
                    {profile.allergies && profile.allergies.length > 0 && (
                      <li>• Have allergies or intolerances ({profile.allergies.join(", ")})</li>
                    )}
                    {(!profile.medications || profile.medications.toLowerCase() === "none") &&
                      (!profile.medicalConditions || profile.medicalConditions.length === 0 || profile.medicalConditions.includes("none")) &&
                      (!profile.allergies || profile.allergies.length === 0) && (
                      <li>• Have any health conditions or are taking medications</li>
                    )}
                  </ul>
                  <p className="text-xs text-amber-700">
                    This tool provides evidence-based information but is not a substitute for professional medical advice.
                  </p>
                </div>
              </div>
            </div>
          )}

          <Disclaimer variant="results" />

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {recommendations.length}
              </div>
              <div className="text-sm text-gray-600">Supplements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {schedule.length}
              </div>
              <div className="text-sm text-gray-600">Time slots</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {recommendations.filter((r) => r.evidenceLevel === "high").length}
              </div>
              <div className="text-sm text-gray-600">High evidence</div>
            </div>
          </div>
        </div>

        {/* Schedule View */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Your Daily Schedule
          </h2>
          <ScheduleView schedule={schedule} />
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">
            Want to learn more about how we create recommendations?
          </p>
          <Link
            href="/methodology"
            className="text-blue-600 hover:underline text-sm"
          >
            Read our methodology →
          </Link>
        </div>
      </div>
    </div>
  );
}
