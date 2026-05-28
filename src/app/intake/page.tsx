"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProgressIndicator } from "@/components";
import {
  IntakeFormData,
  Sex,
  Diet,
  Goal,
  ExerciseFrequency,
  ExerciseIntensity,
  SleepQuality,
  StressLevel,
  DigestiveIssue,
  CaffeineIntake,
  SunExposure,
  JobType,
  JobStress,
  MedicalCondition,
} from "@/types";
import { getAllSupplements } from "@/lib/recommendation-engine";

const STEP_LABELS = [
  "Basics",
  "Diet",
  "Goals",
  "Current Supplements",
  "Exercise",
  "Sleep & Stress",
  "Digestion & Caffeine",
  "Lifestyle",
  "Health & Safety",
];
const TOTAL_STEPS = 9;

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

const EXERCISE_FREQUENCIES: { value: ExerciseFrequency; label: string }[] = [
  { value: "sedentary", label: "Sedentary (little to no exercise)" },
  { value: "light", label: "Light (1-3 times/week)" },
  { value: "moderate", label: "Moderate (3-5 times/week)" },
  { value: "intense", label: "Intense (6-7 times/week or sports)" },
];

const EXERCISE_INTENSITIES: { value: ExerciseIntensity; label: string }[] = [
  { value: "low", label: "Low (walking, yoga, stretching)" },
  { value: "moderate", label: "Moderate (jogging, cycling, general fitness)" },
  { value: "high", label: "High (running, weightlifting, competitive sports)" },
];

const SLEEP_QUALITIES: { value: SleepQuality; label: string }[] = [
  { value: "poor", label: "Poor (frequent wakeups, not rested)" },
  { value: "fair", label: "Fair (occasional issues)" },
  { value: "good", label: "Good (mostly restful)" },
  { value: "excellent", label: "Excellent (consistently restful)" },
];

const STRESS_LEVELS: { value: StressLevel; label: string }[] = [
  { value: "low", label: "Low (generally calm)" },
  { value: "moderate", label: "Moderate (occasional stress)" },
  { value: "high", label: "High (frequent or persistent stress)" },
];

const DIGESTIVE_ISSUES: { value: DigestiveIssue; label: string }[] = [
  { value: "none", label: "None" },
  { value: "bloating", label: "Bloating" },
  { value: "constipation", label: "Constipation" },
  { value: "diarrhea", label: "Diarrhea" },
  { value: "ibs", label: "IBS (Irritable Bowel Syndrome)" },
  { value: "gerd", label: "GERD (Acid reflux)" },
];

const CAFFEINE_INTAKES: { value: CaffeineIntake; label: string }[] = [
  { value: "low", label: "Low (0-100mg/day, little to no coffee/tea)" },
  { value: "moderate", label: "Moderate (100-300mg/day, 1-2 cups)" },
  { value: "high", label: "High (300mg+/day, 3+ cups)" },
];

const SUN_EXPOSURES: { value: SunExposure; label: string }[] = [
  { value: "low", label: "Low (mostly indoors or cloudy climate)" },
  { value: "moderate", label: "Moderate (some outdoor time)" },
  { value: "high", label: "High (regular outdoor time with sun exposure)" },
];

const JOB_TYPES: { value: JobType; label: string }[] = [
  { value: "desk", label: "Desk job (mostly sitting)" },
  { value: "physical", label: "Physical job (active/on feet)" },
  { value: "hybrid", label: "Hybrid (mix of sitting and activity)" },
];

const JOB_STRESSES: { value: JobStress; label: string }[] = [
  { value: "low", label: "Low (relaxed environment)" },
  { value: "moderate", label: "Moderate (typical workplace stress)" },
  { value: "high", label: "High (demanding/high-pressure)" },
];

const MEDICAL_CONDITIONS: { value: MedicalCondition; label: string }[] = [
  { value: "none", label: "None" },
  { value: "hypertension", label: "Hypertension (High Blood Pressure)" },
  { value: "diabetes", label: "Diabetes" },
  { value: "pregnancy", label: "Pregnant or Planning Pregnancy" },
  { value: "thyroid", label: "Thyroid Disorder" },
  { value: "heart-disease", label: "Heart Disease or Cardiovascular Condition" },
  { value: "autoimmune", label: "Autoimmune Disorder" },
];

const COMMON_ALLERGIES: { value: string; label: string }[] = [
  { value: "shellfish", label: "Shellfish/Omega-3 from seafood" },
  { value: "soy", label: "Soy" },
  { value: "gluten", label: "Gluten" },
  { value: "dairy", label: "Dairy" },
  { value: "nuts", label: "Tree nuts/peanuts" },
  { value: "fish", label: "Fish" },
  { value: "gelatin", label: "Gelatin" },
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
    exerciseFrequency: "",
    exerciseIntensity: "",
    sleepHours: "",
    sleepQuality: "",
    stressLevel: "",
    digestiveIssues: [],
    caffeineIntake: "",
    sunExposure: "",
    jobType: "",
    jobStress: "",
    medications: "",
    allergies: [],
    medicalConditions: [],
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
    } else if (currentStep === 5) {
      if (!formData.exerciseFrequency) {
        newErrors.push("Please select your exercise frequency");
      }
      if (!formData.exerciseIntensity) {
        newErrors.push("Please select your exercise intensity");
      }
    } else if (currentStep === 6) {
      if (!formData.sleepHours) {
        newErrors.push("Please enter your sleep hours");
      }
      if (!formData.sleepQuality) {
        newErrors.push("Please select your sleep quality");
      }
      if (!formData.stressLevel) {
        newErrors.push("Please select your stress level");
      }
    } else if (currentStep === 7) {
      if (formData.digestiveIssues.length === 0) {
        newErrors.push("Please select at least one option");
      }
      if (!formData.caffeineIntake) {
        newErrors.push("Please select your caffeine intake level");
      }
    } else if (currentStep === 8) {
      if (!formData.sunExposure) {
        newErrors.push("Please select your sun exposure level");
      }
      if (!formData.jobType) {
        newErrors.push("Please select your job type");
      }
      if (!formData.jobStress) {
        newErrors.push("Please select your job stress level");
      }
    } else if (currentStep === 9) {
      if (!formData.medications.trim()) {
        newErrors.push("Please list any medications (or type 'None' if not taking any)");
      }
      if (formData.medicalConditions.length === 0) {
        newErrors.push("Please select at least one option");
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
        exerciseFrequency: formData.exerciseFrequency,
        exerciseIntensity: formData.exerciseIntensity,
        sleepHours: parseInt(formData.sleepHours),
        sleepQuality: formData.sleepQuality,
        stressLevel: formData.stressLevel,
        digestiveIssues: formData.digestiveIssues,
        caffeineIntake: formData.caffeineIntake,
        sunExposure: formData.sunExposure,
        jobType: formData.jobType,
        jobStress: formData.jobStress,
        medications: formData.medications,
        allergies: formData.allergies,
        medicalConditions: formData.medicalConditions,
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

  const toggleDigestiveIssue = (issue: DigestiveIssue) => {
    setFormData((prev) => ({
      ...prev,
      digestiveIssues: prev.digestiveIssues.includes(issue)
        ? prev.digestiveIssues.filter((i) => i !== issue)
        : [...prev.digestiveIssues, issue],
    }));
  };

  const toggleAllergy = (allergy: string) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy],
    }));
  };

  const toggleMedicalCondition = (condition: MedicalCondition) => {
    setFormData((prev) => ({
      ...prev,
      medicalConditions: prev.medicalConditions.includes(condition)
        ? prev.medicalConditions.filter((c) => c !== condition)
        : [...prev.medicalConditions, condition],
    }));
  };

  return (
    <div className="min-h-screen bg-[#FCFCF7] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-xs tracking-widest uppercase text-[#9C8B78] hover:text-[#2E1B12] transition-colors">
            ← Back
          </Link>
        </div>

        <div className="bg-white border border-[#2E1B12]/10 p-8 md:p-12">
          <p className="text-xs tracking-widest uppercase text-[#9C8B78] mb-3">Sprout — Intake</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2E1B12] mb-2">
            Calibrate your plan
          </h1>
          <p className="text-[#9C8B78] mb-8">Based on your data</p>

          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            stepLabels={STEP_LABELS}
          />

          {errors.length > 0 && (
            <div className="mb-6 p-4 border border-[#2E1B12]/20 bg-[#FCFCF7]">
              <ul className="text-sm text-[#2E1B12] space-y-1">
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
                <label htmlFor="age" className="block text-sm font-medium text-[#2E1B12] mb-2">
                  What is your age?
                </label>
                <input
                  type="number"
                  id="age"
                  min="18"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3 border border-[#2E1B12]/20 bg-white text-[#2E1B12] focus:outline-none focus:border-[#2E1B12] text-lg transition-colors"
                  placeholder="Enter your age"
                />
                <p className="mt-1 text-sm text-[#9C8B78]">Must be 18 or older</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2E1B12] mb-2">
                  What is your sex?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {SEXES.map((sex) => (
                    <button
                      key={sex.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, sex: sex.value })}
                      className={`px-4 py-3 border text-center text-sm transition-colors ${
                        formData.sex === sex.value
                          ? "border-[#2E1B12] bg-[#2E1B12] text-white"
                          : "border-[#2E1B12]/20 bg-white text-[#2E1B12] hover:border-[#2E1B12]"
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
              <label className="block text-sm font-medium text-[#2E1B12] mb-4">
                What is your diet type?
              </label>
              <div className="space-y-2">
                {DIETS.map((diet) => (
                  <button
                    key={diet.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, diet: diet.value })}
                    className={`w-full px-4 py-4 border text-left transition-colors ${
                      formData.diet === diet.value
                        ? "border-[#2E1B12] bg-[#2E1B12] text-white"
                        : "border-[#2E1B12]/20 bg-white text-[#2E1B12] hover:border-[#2E1B12]"
                    }`}
                  >
                    <span className="font-medium text-sm">{diet.label}</span>
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm text-[#9C8B78]">
                This helps us tailor recommendations based on dietary needs.
              </p>
            </div>
          )}

          {/* Step 3: Goals */}
          {currentStep === 3 && (
            <div>
              <label className="block text-sm font-medium text-[#2E1B12] mb-4">
                What are your health goals? (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {GOALS.map((goal) => (
                  <button
                    key={goal.value}
                    type="button"
                    onClick={() => toggleGoal(goal.value)}
                    className={`px-4 py-3 border text-left transition-colors ${
                      formData.goals.includes(goal.value)
                        ? "border-[#2E1B12] bg-[#2E1B12] text-white"
                        : "border-[#2E1B12]/20 bg-white text-[#2E1B12] hover:border-[#2E1B12]"
                    }`}
                  >
                    <span className="font-medium text-sm block">{goal.label}</span>
                    <p className={`text-xs mt-0.5 ${formData.goals.includes(goal.value) ? "text-white/70" : "text-[#9C8B78]"}`}>
                      {goal.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Current Supplements */}
          {currentStep === 4 && (
            <div>
              <label className="block text-sm font-medium text-[#2E1B12] mb-2">
                Are you currently taking any supplements? (Optional)
              </label>
              <p className="text-sm text-[#9C8B78] mb-4">
                Select any you&apos;re already taking. We&apos;ll note these in your plan.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-2">
                {supplements.map((supplement) => (
                  <button
                    key={supplement.slug}
                    type="button"
                    onClick={() => toggleSupplement(supplement.slug)}
                    className={`px-3 py-2 border text-left text-sm transition-colors ${
                      formData.currentSupplements.includes(supplement.slug)
                        ? "border-[#2E1B12] bg-[#2E1B12] text-white"
                        : "border-[#2E1B12]/20 bg-white text-[#2E1B12] hover:border-[#2E1B12]"
                    }`}
                  >
                    {supplement.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Exercise */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#2E1B12] mb-3">
                  How often do you exercise?
                </label>
                <div className="space-y-2">
                  {EXERCISE_FREQUENCIES.map((freq) => (
                    <button
                      key={freq.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, exerciseFrequency: freq.value })}
                      className={`w-full px-4 py-3 border text-left transition-colors ${
                        formData.exerciseFrequency === freq.value
                          ? "border-[#2E1B12] bg-[#2E1B12] text-white"
                          : "border-[#2E1B12]/20 bg-white text-[#2E1B12] hover:border-[#2E1B12]"
                      }`}
                    >
                      <span className="font-medium text-sm">{freq.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2E1B12] mb-3">
                  What is your typical exercise intensity?
                </label>
                <div className="space-y-2">
                  {EXERCISE_INTENSITIES.map((intensity) => (
                    <button
                      key={intensity.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, exerciseIntensity: intensity.value })}
                      className={`w-full px-4 py-3 border text-left transition-colors ${
                        formData.exerciseIntensity === intensity.value
                          ? "border-[#2E1B12] bg-[#2E1B12] text-white"
                          : "border-[#2E1B12]/20 bg-white text-[#2E1B12] hover:border-[#2E1B12]"
                      }`}
                    >
                      <span className="font-medium text-sm">{intensity.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Sleep & Stress */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="sleep" className="text-sm font-medium text-[#2E1B12]">
                    Hours of sleep per night
                  </label>
                  <span className="text-lg font-bold text-[#FFB326]">
                    {formData.sleepHours || "—"}h
                  </span>
                </div>
                <input
                  type="range"
                  id="sleep"
                  min="3"
                  max="12"
                  value={formData.sleepHours}
                  onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
                  className="w-full accent-[#FFB326]"
                />
                <div className="flex justify-between text-xs text-[#9C8B78] mt-1">
                  <span>3h</span><span>12h</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2E1B12] mb-3">
                  How would you rate your sleep quality?
                </label>
                <div className="space-y-2">
                  {SLEEP_QUALITIES.map((quality) => (
                    <button
                      key={quality.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, sleepQuality: quality.value })}
                      className={`w-full px-4 py-3 border text-left transition-colors ${
                        formData.sleepQuality === quality.value
                          ? "border-[#2E1B12] bg-[#2E1B12] text-white"
                          : "border-[#2E1B12]/20 bg-white text-[#2E1B12] hover:border-[#2E1B12]"
                      }`}
                    >
                      <span className="font-medium text-sm">{quality.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2E1B12] mb-3">
                  What is your overall stress level?
                </label>
                <div className="space-y-2">
                  {STRESS_LEVELS.map((stress) => (
                    <button
                      key={stress.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, stressLevel: stress.value })}
                      className={`w-full px-4 py-3 border text-left transition-colors ${
                        formData.stressLevel === stress.value
                          ? "border-[#2E1B12] bg-[#2E1B12] text-white"
                          : "border-[#2E1B12]/20 bg-white text-[#2E1B12] hover:border-[#2E1B12]"
                      }`}
                    >
                      <span className="font-medium text-sm">{stress.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Digestion & Caffeine */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#2E1B12] mb-3">
                  Do you experience any digestive issues? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DIGESTIVE_ISSUES.map((issue) => (
                    <button
                      key={issue.value}
                      type="button"
                      onClick={() => toggleDigestiveIssue(issue.value)}
                      className={`px-4 py-3 border text-left transition-colors ${
                        formData.digestiveIssues.includes(issue.value)
                          ? "border-[#2E1B12] bg-[#2E1B12] text-white"
                          : "border-[#2E1B12]/20 bg-white text-[#2E1B12] hover:border-[#2E1B12]"
                      }`}
                    >
                      <span className="font-medium text-sm">{issue.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2E1B12] mb-3">
                  What is your daily caffeine intake?
                </label>
                <div className="space-y-2">
                  {CAFFEINE_INTAKES.map((caffeine) => (
                    <button
                      key={caffeine.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, caffeineIntake: caffeine.value })}
                      className={`w-full px-4 py-3 border text-left transition-colors ${
                        formData.caffeineIntake === caffeine.value
                          ? "border-[#2E1B12] bg-[#2E1B12] text-white"
                          : "border-[#2E1B12]/20 bg-white text-[#2E1B12] hover:border-[#2E1B12]"
                      }`}
                    >
                      <span className="font-medium text-sm">{caffeine.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 8: Lifestyle */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#2E1B12] mb-3">
                  How much sun exposure do you get?
                </label>
                <div className="space-y-2">
                  {SUN_EXPOSURES.map((sun) => (
                    <button
                      key={sun.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, sunExposure: sun.value })}
                      className={`w-full px-4 py-3 border text-left transition-colors ${
                        formData.sunExposure === sun.value
                          ? "border-[#2E1B12] bg-[#2E1B12] text-white"
                          : "border-[#2E1B12]/20 bg-white text-[#2E1B12] hover:border-[#2E1B12]"
                      }`}
                    >
                      <span className="font-medium text-sm">{sun.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2E1B12] mb-3">
                  What type of work environment do you have?
                </label>
                <div className="space-y-2">
                  {JOB_TYPES.map((job) => (
                    <button
                      key={job.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, jobType: job.value })}
                      className={`w-full px-4 py-3 border text-left transition-colors ${
                        formData.jobType === job.value
                          ? "border-[#2E1B12] bg-[#2E1B12] text-white"
                          : "border-[#2E1B12]/20 bg-white text-[#2E1B12] hover:border-[#2E1B12]"
                      }`}
                    >
                      <span className="font-medium text-sm">{job.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2E1B12] mb-3">
                  How much work-related stress do you experience?
                </label>
                <div className="space-y-2">
                  {JOB_STRESSES.map((jobStress) => (
                    <button
                      key={jobStress.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, jobStress: jobStress.value })}
                      className={`w-full px-4 py-3 border text-left transition-colors ${
                        formData.jobStress === jobStress.value
                          ? "border-[#2E1B12] bg-[#2E1B12] text-white"
                          : "border-[#2E1B12]/20 bg-white text-[#2E1B12] hover:border-[#2E1B12]"
                      }`}
                    >
                      <span className="font-medium text-sm">{jobStress.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 9: Health & Safety */}
          {currentStep === 9 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="medications" className="block text-sm font-medium text-[#2E1B12] mb-2">
                  What medications are you currently taking? (if any)
                </label>
                <textarea
                  id="medications"
                  value={formData.medications}
                  onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                  className="w-full px-4 py-3 border border-[#2E1B12]/20 bg-white text-[#2E1B12] focus:outline-none focus:border-[#2E1B12] transition-colors"
                  placeholder="e.g., Metformin, Lisinopril, or 'None'"
                  rows={3}
                />
                <p className="mt-1 text-sm text-[#9C8B78]">
                  This helps us identify potential interactions.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2E1B12] mb-3">
                  Do you have any allergies or intolerances? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {COMMON_ALLERGIES.map((allergy) => (
                    <button
                      key={allergy.value}
                      type="button"
                      onClick={() => toggleAllergy(allergy.value)}
                      className={`px-4 py-3 border text-left transition-colors ${
                        formData.allergies.includes(allergy.value)
                          ? "border-[#2E1B12] bg-[#2E1B12] text-white"
                          : "border-[#2E1B12]/20 bg-white text-[#2E1B12] hover:border-[#2E1B12]"
                      }`}
                    >
                      <span className="font-medium text-sm">{allergy.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2E1B12] mb-3">
                  Do you have any medical conditions? (Select all that apply)
                </label>
                <div className="space-y-2">
                  {MEDICAL_CONDITIONS.map((condition) => (
                    <button
                      key={condition.value}
                      type="button"
                      onClick={() => toggleMedicalCondition(condition.value)}
                      className={`w-full px-4 py-3 border text-left transition-colors ${
                        formData.medicalConditions.includes(condition.value)
                          ? "border-[#2E1B12] bg-[#2E1B12] text-white"
                          : "border-[#2E1B12]/20 bg-white text-[#2E1B12] hover:border-[#2E1B12]"
                      }`}
                    >
                      <span className="font-medium text-sm">{condition.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 pt-6 border-t border-[#2E1B12]/10">
            {currentStep < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={handleNext}
                className="w-full flex items-center justify-between px-8 py-4 bg-[#FFB326] text-[#2E1B12] rounded-full font-medium hover:bg-[#e6a020] transition-colors"
              >
                <span>Continue</span>
                <span>→</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full flex items-center justify-between px-8 py-4 bg-[#FFB326] text-[#2E1B12] rounded-full font-medium hover:bg-[#e6a020] transition-colors"
              >
                <span>Get My Plan</span>
                <span>→</span>
              </button>
            )}
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="w-full mt-3 py-2 text-sm text-[#9C8B78] hover:text-[#2E1B12] transition-colors text-center"
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

