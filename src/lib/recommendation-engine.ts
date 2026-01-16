import {
  SupplementData,
  SupplementRecommendation,
  UserProfile,
  Goal,
  Diet,
  ScheduleGroup,
  TimeOfDay,
} from "@/types";
import supplementsData from "@/data/supplements.json";

// Goal to supplement mapping - deterministic rules
const goalSupplementMap: Record<Goal, string[]> = {
  energy: ["vitamin-d3", "vitamin-b12", "iron", "creatine", "coq10", "rhodiola", "magnesium-citrate"],
  sleep: ["magnesium-glycinate", "melatonin", "ashwagandha", "l-theanine"],
  focus: ["omega-3", "vitamin-b12", "creatine", "l-theanine", "rhodiola"],
  immunity: ["vitamin-d3", "vitamin-c", "zinc", "omega-3"],
  stress: ["magnesium-glycinate", "ashwagandha", "l-theanine", "rhodiola", "magnesium-citrate"],
  longevity: ["omega-3", "vitamin-d3", "vitamin-k2", "coq10", "vitamin-c"],
  muscle: ["creatine", "magnesium-glycinate", "zinc", "ashwagandha", "magnesium-citrate"],
};

// Diet-specific supplement adjustments
const dietSupplementPriority: Record<Diet, string[]> = {
  omnivore: [],
  vegetarian: ["vitamin-b12", "iron"],
  vegan: ["vitamin-b12", "iron", "omega-3"],
};

// Supplements that should be limited to one variant
const supplementVariants: Record<string, string[]> = {
  magnesium: ["magnesium-glycinate", "magnesium-citrate"],
};

function getSupplements(): SupplementData[] {
  return supplementsData.supplements as SupplementData[];
}

export function getSupplementBySlug(slug: string): SupplementData | undefined {
  return getSupplements().find((s) => s.slug === slug);
}

export function getAllSupplements(): SupplementData[] {
  return getSupplements();
}

function selectMagnesiumVariant(goals: Goal[]): string {
  // Prefer glycinate for sleep/stress, citrate for energy/muscle
  const sleepStressGoals = goals.filter((g) => g === "sleep" || g === "stress");
  const energyMuscleGoals = goals.filter((g) => g === "energy" || g === "muscle");

  if (sleepStressGoals.length > energyMuscleGoals.length) {
    return "magnesium-glycinate";
  }
  return "magnesium-citrate";
}

function generateRationale(
  supplement: SupplementData,
  matchedGoals: Goal[],
  diet: Diet
): string {
  const goalDescriptions: Record<Goal, string> = {
    energy: "energy levels",
    sleep: "sleep quality",
    focus: "mental focus",
    immunity: "immune function",
    stress: "stress management",
    longevity: "healthy aging",
    muscle: "muscle recovery",
  };

  const goalPhrases = matchedGoals.map((g) => goalDescriptions[g]);
  let rationale = "";

  if (goalPhrases.length === 1) {
    rationale = `Recommended to support ${goalPhrases[0]}.`;
  } else if (goalPhrases.length === 2) {
    rationale = `Recommended to support ${goalPhrases[0]} and ${goalPhrases[1]}.`;
  } else {
    const lastGoal = goalPhrases.pop();
    rationale = `Recommended to support ${goalPhrases.join(", ")}, and ${lastGoal}.`;
  }

  // Add diet-specific context if relevant
  if (supplement.dietRelevance) {
    if (diet === "vegan" && supplement.dietRelevance.vegan) {
      rationale += ` ${supplement.dietRelevance.vegan}`;
    } else if (diet === "vegetarian" && supplement.dietRelevance.vegetarian) {
      rationale += ` ${supplement.dietRelevance.vegetarian}`;
    }
  }

  return rationale;
}

export function generateRecommendations(
  profile: UserProfile
): SupplementRecommendation[] {
  const supplements = getSupplements();
  const recommendedSlugs = new Set<string>();
  const slugToGoals = new Map<string, Goal[]>();

  // Step 1: Collect all supplements matching user's goals
  for (const goal of profile.goals) {
    const slugsForGoal = goalSupplementMap[goal] || [];
    for (const slug of slugsForGoal) {
      recommendedSlugs.add(slug);
      const existingGoals = slugToGoals.get(slug) || [];
      if (!existingGoals.includes(goal)) {
        slugToGoals.set(slug, [...existingGoals, goal]);
      }
    }
  }

  // Step 2: Add diet-specific supplements
  const dietPriority = dietSupplementPriority[profile.diet];
  for (const slug of dietPriority) {
    recommendedSlugs.add(slug);
  }

  // Step 3: Handle supplement variants (e.g., pick one magnesium type)
  for (const [, variants] of Object.entries(supplementVariants)) {
    const matchedVariants = variants.filter((v) => recommendedSlugs.has(v));
    if (matchedVariants.length > 1) {
      const preferred = selectMagnesiumVariant(profile.goals);
      for (const variant of matchedVariants) {
        if (variant !== preferred) {
          recommendedSlugs.delete(variant);
        }
      }
    }
  }

  // Step 4: Build recommendation objects
  const recommendations: SupplementRecommendation[] = [];

  for (const slug of recommendedSlugs) {
    const supplement = supplements.find((s) => s.slug === slug);
    if (!supplement) continue;

    const matchedGoals = slugToGoals.get(slug) || [];
    const alreadyTaking = profile.currentSupplements.includes(slug);

    const recommendation: SupplementRecommendation = {
      name: supplement.name,
      slug: supplement.slug,
      dosage: supplement.dosageRange,
      timing: { ...supplement.defaultTiming },
      pairWith: supplement.pairWith,
      avoidWith: supplement.avoidWith,
      separateFrom: supplement.separateFrom,
      rationale: generateRationale(supplement, matchedGoals, profile.diet),
      evidenceLevel: supplement.evidenceLevel,
      citations: supplement.citations,
      cautionNote: supplement.cautionNote,
      alreadyTaking,
    };

    recommendations.push(recommendation);
  }

  // Step 5: Sort by timing (morning first, then afternoon, then evening)
  const timeOrder: Record<TimeOfDay, number> = {
    morning: 0,
    afternoon: 1,
    evening: 2,
  };

  recommendations.sort((a, b) => {
    const timeA = timeOrder[a.timing.timeOfDay];
    const timeB = timeOrder[b.timing.timeOfDay];
    if (timeA !== timeB) return timeA - timeB;
    return a.name.localeCompare(b.name);
  });

  return recommendations;
}

export function groupBySchedule(
  recommendations: SupplementRecommendation[]
): ScheduleGroup[] {
  const groups: Record<TimeOfDay, SupplementRecommendation[]> = {
    morning: [],
    afternoon: [],
    evening: [],
  };

  for (const rec of recommendations) {
    groups[rec.timing.timeOfDay].push(rec);
  }

  const schedule: ScheduleGroup[] = [];

  if (groups.morning.length > 0) {
    schedule.push({ timeOfDay: "morning", supplements: groups.morning });
  }
  if (groups.afternoon.length > 0) {
    schedule.push({ timeOfDay: "afternoon", supplements: groups.afternoon });
  }
  if (groups.evening.length > 0) {
    schedule.push({ timeOfDay: "evening", supplements: groups.evening });
  }

  return schedule;
}

// Validation helpers
export function validateProfile(profile: Partial<UserProfile>): string[] {
  const errors: string[] = [];

  if (!profile.age || profile.age < 18 || profile.age > 120) {
    errors.push("Age must be between 18 and 120");
  }

  if (!profile.sex || !["male", "female", "other"].includes(profile.sex)) {
    errors.push("Please select a valid sex");
  }

  if (!profile.diet || !["omnivore", "vegetarian", "vegan"].includes(profile.diet)) {
    errors.push("Please select a valid diet");
  }

  if (!profile.goals || profile.goals.length === 0) {
    errors.push("Please select at least one health goal");
  }

  return errors;
}
