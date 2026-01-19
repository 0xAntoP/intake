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

// Lifestyle types
export type ExerciseFrequency = "sedentary" | "light" | "moderate" | "intense";
export type ExerciseIntensity = "low" | "moderate" | "high";
export type SleepQuality = "poor" | "fair" | "good" | "excellent";
export type StressLevel = "low" | "moderate" | "high";
export type DigestiveIssue = "none" | "bloating" | "constipation" | "diarrhea" | "ibs" | "gerd";
export type CaffeineIntake = "low" | "moderate" | "high";
export type SunExposure = "low" | "moderate" | "high";
export type JobType = "desk" | "physical" | "hybrid";
export type JobStress = "low" | "moderate" | "high";
export type MedicalCondition = "hypertension" | "diabetes" | "pregnancy" | "thyroid" | "heart-disease" | "autoimmune" | "none";

export type UserProfile = {
  age: number;
  sex: Sex;
  diet: Diet;
  goals: Goal[];
  currentSupplements: string[];
  exerciseFrequency?: ExerciseFrequency;
  exerciseIntensity?: ExerciseIntensity;
  sleepHours?: number;
  sleepQuality?: SleepQuality;
  stressLevel?: StressLevel;
  digestiveIssues?: DigestiveIssue[];
  caffeineIntake?: CaffeineIntake;
  sunExposure?: SunExposure;
  jobType?: JobType;
  jobStress?: JobStress;
  medications?: string;
  allergies?: string[];
  medicalConditions?: MedicalCondition[];
};

// Form state for intake questionnaire
export type IntakeFormData = {
  age: string;
  sex: Sex | "";
  diet: Diet | "";
  goals: Goal[];
  currentSupplements: string[];
  exerciseFrequency: ExerciseFrequency | "";
  exerciseIntensity: ExerciseIntensity | "";
  sleepHours: string;
  sleepQuality: SleepQuality | "";
  stressLevel: StressLevel | "";
  digestiveIssues: DigestiveIssue[];
  caffeineIntake: CaffeineIntake | "";
  sunExposure: SunExposure | "";
  jobType: JobType | "";
  jobStress: JobStress | "";
  medications: string;
  allergies: string[];
  medicalConditions: MedicalCondition[];
};

// Schedule grouping for results display
export type ScheduleGroup = {
  timeOfDay: TimeOfDay;
  supplements: SupplementRecommendation[];
};
