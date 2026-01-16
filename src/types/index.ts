// Core data types for the Intake supplement planner

export type EvidenceLevel = "high" | "moderate" | "low";

export type Citation = {
  id: string;
  title: string;
  url: string;
  year?: number;
};

export type Pairing = {
  item: string;
  reason: string;
  evidenceLevel: EvidenceLevel;
  citationIds: string[];
  separationHours?: number; // only for "separateFrom"
};

export type TimeOfDay = "morning" | "afternoon" | "evening";

export type Timing = {
  timeOfDay: TimeOfDay;
  withFood: boolean;
  withFat?: boolean;
};

export type SupplementRecommendation = {
  name: string;
  slug: string;
  dosage: string;
  timing: Timing;
  pairWith: Pairing[];
  avoidWith: Pairing[];
  separateFrom: Pairing[];
  rationale: string;
  evidenceLevel: EvidenceLevel;
  citations: Citation[];
  cautionNote?: string;
  alreadyTaking?: boolean;
};

// Base supplement data stored in JSON
export type SupplementData = {
  name: string;
  slug: string;
  description: string;
  dosageRange: string;
  defaultTiming: Timing;
  pairWith: Pairing[];
  avoidWith: Pairing[];
  separateFrom: Pairing[];
  evidenceSummary: string;
  evidenceLevel: EvidenceLevel;
  citations: Citation[];
  cautionNote?: string;
  goals: Goal[];
  dietRelevance?: {
    vegetarian?: string;
    vegan?: string;
  };
};

// User profile types
export type Sex = "male" | "female" | "other";
export type Diet = "omnivore" | "vegetarian" | "vegan";
export type Goal =
  | "energy"
  | "sleep"
  | "focus"
  | "immunity"
  | "stress"
  | "longevity"
  | "muscle";

export type UserProfile = {
  age: number;
  sex: Sex;
  diet: Diet;
  goals: Goal[];
  currentSupplements: string[];
};

// Form state for intake questionnaire
export type IntakeFormData = {
  age: string;
  sex: Sex | "";
  diet: Diet | "";
  goals: Goal[];
  currentSupplements: string[];
};

// Schedule grouping for results display
export type ScheduleGroup = {
  timeOfDay: TimeOfDay;
  supplements: SupplementRecommendation[];
};
