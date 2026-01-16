"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProgressIndicator } from "@/components";
import { IntakeFormData, Sex, Diet, Goal } from "@/types";
import { getAllSupplements } from "@/lib/recommendation-engine";

const STEP_LABELS = ["Basics", "Diet", "Goals", "Current Supplements"];
const TOTAL_STEPS = 4;

const GOALS: { value: Goal; label: string; description: string }[] = [
  { value: "energy", label: "Energy", description: "Combat fatigue and boost vitality" },
  { value: "sleep", label: "Sleep", description: "Improve sleep quality and duration" },
  { value: "focus", label: "Focus", description: "Enhance mental clarity and concentration" },
  { value: "immunity", label: "Immunity", description: "Support immune system function" },
  { value: "stress", label: "Stress", description: "Manage stress and promote calm" },
  { value: "longevity", label: "Longevity", description: "Support healthy aging" },
  { value: "muscle", label: "Muscle & Recovery", description: "Support muscle growth and recovery" },
];

const DIETS: { value: Diet; label: string }[] = [
  { value: "omnivore", label: "Omnivore" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
];

const SEXES: { value: Sex; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other / Prefer not to say" },
];

export default function IntakePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<IntakeFormData>({
    age: "",
    sex: "",
    diet: "",
    goals: [],
    currentSupplements: [],
  });
  const [errors, setErrors] = useState<string[]>([]);

  const supplements = getAllSupplements();

  const validateCurrentStep = (): boolean => {
    const newErrors: string[] = [];

    if (currentStep === 1) {
      const age = parseInt(formData.age);
      if (!formData.age || isNaN(age) || age < 18 || age > 120) {
        newErrors.push("Please enter a valid age between 18 and 120");
      }
      if (!formData.sex) {
        newErrors.push("Please select your sex");
      }
    } else if (currentStep === 2) {
      if (!formData.diet) {
        newErrors.push("Please select your diet type");
      }
    } else if (currentStep === 3) {
      if (formData.goals.length === 0) {
        newErrors.push("Please select at least one health goal");
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors([]);
    }
  };

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      // Store form data in sessionStorage for results page
      const profileData = {
        age: parseInt(formData.age),
        sex: formData.sex,
        diet: formData.diet,
        goals: formData.goals,
        currentSupplements: formData.currentSupplements,
      };
      sessionStorage.setItem("intakeProfile", JSON.stringify(profileData));
      router.push("/results");
    }
  };

  const toggleGoal = (goal: Goal) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const toggleSupplement = (slug: string) => {
    setFormData((prev) => ({
      ...prev,
      currentSupplements: prev.currentSupplements.includes(slug)
        ? prev.currentSupplements.filter((s) => s !== slug)
        : [...prev.currentSupplements, slug],
    }));
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="text-blue-600 hover:underline text-sm flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Build Your Supplement Plan
          </h1>
          <p className="text-gray-600 mb-6">
            Answer a few questions to get personalized recommendations.
          </p>

          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            stepLabels={STEP_LABELS}
          />

          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <ul className="text-sm text-red-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Step 1: Basics */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                  What is your age?
                </label>
                <input
                  type="number"
                  id="age"
                  min="18"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  placeholder="Enter your age"
                />
                <p className="mt-1 text-sm text-gray-500">Must be 18 or older</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What is your sex?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SEXES.map((sex) => (
                    <button
                      key={sex.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, sex: sex.value })}
                      className={`px-4 py-3 rounded-lg border text-center transition-colors ${
                        formData.sex === sex.value
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {sex.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Diet */}
          {currentStep === 2 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                What is your diet type?
              </label>
              <div className="space-y-3">
                {DIETS.map((diet) => (
                  <button
                    key={diet.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, diet: diet.value })}
                    className={`w-full px-4 py-4 rounded-lg border text-left transition-colors ${
                      formData.diet === diet.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span className="font-medium">{diet.label}</span>
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-500">
                This helps us tailor recommendations based on dietary needs (e.g., B12 for
                vegetarians/vegans).
              </p>
            </div>
          )}

          {/* Step 3: Goals */}
          {currentStep === 3 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                What are your health goals? (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GOALS.map((goal) => (
                  <button
                    key={goal.value}
                    type="button"
                    onClick={() => toggleGoal(goal.value)}
                    className={`px-4 py-3 rounded-lg border text-left transition-colors ${
                      formData.goals.includes(goal.value)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        formData.goals.includes(goal.value) ? "text-blue-700" : "text-gray-900"
                      }`}
                    >
                      {goal.label}
                    </span>
                    <p className="text-sm text-gray-500 mt-0.5">{goal.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Current Supplements */}
          {currentStep === 4 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Are you currently taking any supplements? (Optional)
              </label>
              <p className="text-sm text-gray-500 mb-4">
                Select any supplements you&apos;re already taking. We&apos;ll note these in your plan.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-2">
                {supplements.map((supplement) => (
                  <button
                    key={supplement.slug}
                    type="button"
                    onClick={() => toggleSupplement(supplement.slug)}
                    className={`px-3 py-2 rounded-lg border text-left text-sm transition-colors ${
                      formData.currentSupplements.includes(supplement.slug)
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {supplement.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Back
            </button>

            {currentStep < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Get My Plan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
