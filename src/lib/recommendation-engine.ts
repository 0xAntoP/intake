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

const goalSupplementMap: Record<Goal, string[]> = {
  energy: ["vitamin-d3", "vitamin-b12", "iron", "creatine", "coq10", "rhodiola", "magnesium", "cordyceps", "vitamin-b6"],
  sleep: ["magnesium", "melatonin", "ashwagandha", "l-theanine", "reishi"],
  focus: ["omega-3", "vitamin-b12", "creatine", "l-theanine", "rhodiola", "lions-mane", "vitamin-b6"],
  immunity: ["vitamin-d3", "vitamin-c", "zinc", "omega-3", "probiotics", "reishi", "astaxanthin"],
  stress: ["magnesium", "ashwagandha", "l-theanine", "rhodiola", "vitamin-b6"],
  longevity: ["omega-3", "vitamin-d3", "vitamin-k2", "coq10", "vitamin-c", "selenium", "astaxanthin", "reishi"],
  muscle: ["creatine", "magnesium", "zinc", "ashwagandha", "cordyceps"],
  skin: ["collagen", "vitamin-e", "vitamin-a", "biotin", "vitamin-c", "omega-3", "tremella", "astaxanthin"],
};

const dietSupplementPriority: Record<Diet, string[]> = {
  omnivore: [],
  vegetarian: ["vitamin-b12", "iron"],
  vegan: ["vitamin-b12", "iron", "omega-3", "spirulina"],
  carnivore: [],
  pescatarian: [],
  keto: ["magnesium", "vitamin-d3"],
  paleo: [],
  mediterranean: ["omega-3"],
  "gluten-free": [],
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

function generateRationale(
  supplement: SupplementData,
  matchedGoals: Goal[],
  diet: Diet,
  lifestyleNotes?: string[]
): string {
  const goalDescriptions: Record<Goal, string> = {
    energy: "energy levels",
    sleep: "sleep quality",
    focus: "mental focus",
    immunity: "immune function",
    stress: "stress management",
    longevity: "healthy aging",
    muscle: "muscle recovery",
    skin: "skin health",
  };

  const goalPhrases = matchedGoals.map((g) => goalDescriptions[g]);
  let rationale = "";

  if (goalPhrases.length === 1) {
    rationale = `Recommended to support ${goalPhrases[0]}.`;
  } else if (goalPhrases.length === 2) {
    rationale = `Recommended to support ${goalPhrases[0]} and ${goalPhrases[1]}.`;
  } else {
    const last = goalPhrases.pop();
    rationale = `Recommended to support ${goalPhrases.join(", ")}, and ${last}.`;
  }

  if (supplement.dietRelevance) {
    if (diet === "vegan" && supplement.dietRelevance.vegan) {
      rationale += ` ${supplement.dietRelevance.vegan}`;
    } else if (diet === "vegetarian" && supplement.dietRelevance.vegetarian) {
      rationale += ` ${supplement.dietRelevance.vegetarian}`;
    }
  }

  if (lifestyleNotes && lifestyleNotes.length > 0) {
    rationale += ` ${lifestyleNotes.join(" ")}`;
  }

  return rationale;
}

function getLifestyleAdjustments(profile: UserProfile): {
  additionalSupplements: string[];
  priorityBoosts: Map<string, number>;
  lifestyleNotes: Map<string, string[]>;
} {
  const additionalSupplements: string[] = [];
  const priorityBoosts = new Map<string, number>();
  const lifestyleNotes = new Map<string, string[]>();

  if (profile.sleepHours !== undefined && profile.sleepHours < 6) {
    priorityBoosts.set("magnesium", (priorityBoosts.get("magnesium") || 0) + 2);
    priorityBoosts.set("melatonin", (priorityBoosts.get("melatonin") || 0) + 2);
    priorityBoosts.set("ashwagandha", (priorityBoosts.get("ashwagandha") || 0) + 1);
    const notes = lifestyleNotes.get("melatonin") || [];
    notes.push("Your low sleep hours make this especially important.");
    lifestyleNotes.set("melatonin", notes);
  }

  if (profile.sleepQuality === "poor" || profile.sleepQuality === "fair") {
    priorityBoosts.set("magnesium", (priorityBoosts.get("magnesium") || 0) + 1);
    priorityBoosts.set("ashwagandha", (priorityBoosts.get("ashwagandha") || 0) + 1);
    priorityBoosts.set("l-theanine", (priorityBoosts.get("l-theanine") || 0) + 1);
  }

  if (profile.stressLevel === "high") {
    priorityBoosts.set("ashwagandha", (priorityBoosts.get("ashwagandha") || 0) + 2);
    priorityBoosts.set("magnesium", (priorityBoosts.get("magnesium") || 0) + 1);
    priorityBoosts.set("l-theanine", (priorityBoosts.get("l-theanine") || 0) + 1);
    priorityBoosts.set("rhodiola", (priorityBoosts.get("rhodiola") || 0) + 1);
    const notes = lifestyleNotes.get("ashwagandha") || [];
    notes.push("High stress makes this supplement particularly beneficial.");
    lifestyleNotes.set("ashwagandha", notes);
  }

  if (profile.jobStress === "high") {
    priorityBoosts.set("ashwagandha", (priorityBoosts.get("ashwagandha") || 0) + 1);
    priorityBoosts.set("l-theanine", (priorityBoosts.get("l-theanine") || 0) + 1);
  }

  if (profile.exerciseIntensity?.includes("strength") || profile.exerciseFrequency === "intense") {
    priorityBoosts.set("creatine", (priorityBoosts.get("creatine") || 0) + 2);
    priorityBoosts.set("magnesium", (priorityBoosts.get("magnesium") || 0) + 1);
    priorityBoosts.set("zinc", (priorityBoosts.get("zinc") || 0) + 1);
    const notes = lifestyleNotes.get("creatine") || [];
    notes.push("Strength training makes creatine especially effective for recovery and performance.");
    lifestyleNotes.set("creatine", notes);
  }

  if (profile.exerciseIntensity?.includes("cardio")) {
    priorityBoosts.set("omega-3", (priorityBoosts.get("omega-3") || 0) + 1);
    priorityBoosts.set("coq10", (priorityBoosts.get("coq10") || 0) + 1);
    priorityBoosts.set("magnesium", (priorityBoosts.get("magnesium") || 0) + 1);
  }

  if (profile.caffeineIntake === "high") {
    priorityBoosts.set("magnesium", (priorityBoosts.get("magnesium") || 0) + 2);
    priorityBoosts.set("l-theanine", (priorityBoosts.get("l-theanine") || 0) + 2);
    const notes = lifestyleNotes.get("l-theanine") || [];
    notes.push("Your high caffeine intake makes L-theanine helpful for balance.");
    lifestyleNotes.set("l-theanine", notes);
  }

  if (profile.sunExposure === "low") {
    priorityBoosts.set("vitamin-d3", (priorityBoosts.get("vitamin-d3") || 0) + 2);
    additionalSupplements.push("vitamin-d3");
    const notes = lifestyleNotes.get("vitamin-d3") || [];
    notes.push("Low sun exposure makes Vitamin D3 supplementation especially important.");
    lifestyleNotes.set("vitamin-d3", notes);
  }

  if (profile.exerciseFrequency === "sedentary") {
    priorityBoosts.set("vitamin-d3", (priorityBoosts.get("vitamin-d3") || 0) + 1);
    priorityBoosts.set("omega-3", (priorityBoosts.get("omega-3") || 0) + 1);
  }

  if (profile.digestiveIssues && profile.digestiveIssues.length > 0 && !profile.digestiveIssues.includes("none")) {
    priorityBoosts.set("probiotics", (priorityBoosts.get("probiotics") || 0) + 2);
    additionalSupplements.push("probiotics");
  }

  return { additionalSupplements, priorityBoosts, lifestyleNotes };
}

export function generateRecommendations(profile: UserProfile): SupplementRecommendation[] {
  const supplements = getSupplements();
  const recommendedSlugs = new Set<string>();
  const slugToGoals = new Map<string, Goal[]>();

  const { additionalSupplements, priorityBoosts, lifestyleNotes } = getLifestyleAdjustments(profile);

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

  const dietPriority = dietSupplementPriority[profile.diet] || [];
  for (const slug of dietPriority) {
    recommendedSlugs.add(slug);
  }

  for (const slug of additionalSupplements) {
    recommendedSlugs.add(slug);
  }

  if (profile.allergies && profile.allergies.length > 0) {
    if (profile.allergies.includes("shellfish") || profile.allergies.includes("fish")) {
      recommendedSlugs.delete("omega-3");
    }
  }

  const recommendations: SupplementRecommendation[] = [];

  for (const slug of recommendedSlugs) {
    const supplement = supplements.find((s) => s.slug === slug);
    if (!supplement) continue;

    const matchedGoals = slugToGoals.get(slug) || [];
    const alreadyTaking = profile.currentSupplements.includes(slug);
    const notes = lifestyleNotes.get(slug) || [];

    recommendations.push({
      name: supplement.name,
      slug: supplement.slug,
      dosage: supplement.dosageRange,
      timing: { ...supplement.defaultTiming },
      pairWith: supplement.pairWith,
      avoidWith: supplement.avoidWith,
      separateFrom: supplement.separateFrom,
      rationale: generateRationale(supplement, matchedGoals, profile.diet, notes),
      evidenceLevel: supplement.evidenceLevel,
      citations: supplement.citations,
      cautionNote: supplement.cautionNote,
      alreadyTaking,
    });
  }

  const timeOrder: Record<TimeOfDay, number> = { morning: 0, afternoon: 1, evening: 2 };
  recommendations.sort((a, b) => {
    const timeA = timeOrder[a.timing.timeOfDay];
    const timeB = timeOrder[b.timing.timeOfDay];
    if (timeA !== timeB) return timeA - timeB;
    return a.name.localeCompare(b.name);
  });

  return recommendations;
}

export function groupBySchedule(recommendations: SupplementRecommendation[]): ScheduleGroup[] {
  const groups: Record<TimeOfDay, SupplementRecommendation[]> = {
    morning: [],
    afternoon: [],
    evening: [],
  };

  for (const rec of recommendations) {
    groups[rec.timing.timeOfDay].push(rec);
  }

  const schedule: ScheduleGroup[] = [];
  if (groups.morning.length > 0) schedule.push({ timeOfDay: "morning", supplements: groups.morning });
  if (groups.afternoon.length > 0) schedule.push({ timeOfDay: "afternoon", supplements: groups.afternoon });
  if (groups.evening.length > 0) schedule.push({ timeOfDay: "evening", supplements: groups.evening });

  return schedule;
}

export function validateProfile(profile: Partial<UserProfile>): string[] {
  const errors: string[] = [];
  if (!profile.age || profile.age < 18 || profile.age > 120) errors.push("Age must be between 18 and 120");
  if (!profile.sex || !["male", "female", "other"].includes(profile.sex)) errors.push("Please select a valid sex");
  if (!profile.goals || profile.goals.length === 0) errors.push("Please select at least one health goal");
  return errors;
}
