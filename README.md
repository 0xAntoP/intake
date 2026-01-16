# Intake - Evidence-Based Supplement Planner

A production-quality MVP web application that generates personalized, evidence-based supplement plans. Know what to take, when to take it, what to pair with, what to avoid, and what to separate—backed by peer-reviewed research.

## Features

- **Personalized Plans**: Get supplement recommendations based on your age, diet, and health goals
- **Daily Schedule**: Morning, afternoon, and evening timing for optimal absorption
- **Interaction Guidance**: Know what to pair together, what to avoid, and what to separate (with timing)
- **Evidence-Based**: Every recommendation includes evidence ratings and PubMed citations
- **Safety First**: Conservative dosages, caution notes, and clear disclaimers

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data**: Local JSON (no database required)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd intake

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
intake/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Landing page (/)
│   │   ├── intake/            # Questionnaire (/intake)
│   │   ├── results/           # Results page (/results)
│   │   ├── supplement/[slug]/ # Supplement detail pages
│   │   └── methodology/       # Methodology page
│   ├── components/            # React components
│   │   ├── EvidenceBadge.tsx
│   │   ├── PairingList.tsx
│   │   ├── SupplementCard.tsx
│   │   ├── ScheduleView.tsx
│   │   ├── ProgressIndicator.tsx
│   │   └── Disclaimer.tsx
│   ├── data/
│   │   └── supplements.json   # Supplement database
│   ├── lib/
│   │   └── recommendation-engine.ts  # Core logic
│   └── types/
│       └── index.ts           # TypeScript types
├── public/                    # Static assets
└── package.json
```

## Dataset Structure

The supplement database is stored in `src/data/supplements.json`. Each supplement follows this structure:

```typescript
type SupplementData = {
  name: string;              // Display name
  slug: string;              // URL-friendly identifier
  description: string;       // Plain-English description
  dosageRange: string;       // Safe dosage range
  defaultTiming: {
    timeOfDay: "morning" | "afternoon" | "evening";
    withFood: boolean;
    withFat?: boolean;       // For fat-soluble supplements
  };
  pairWith: Pairing[];       // Synergistic combinations
  avoidWith: Pairing[];      // Contraindications
  separateFrom: Pairing[];   // Timing separations
  evidenceSummary: string;   // Research summary
  evidenceLevel: "high" | "moderate" | "low";
  citations: Citation[];     // PubMed references
  cautionNote?: string;      // Safety warnings
  goals: Goal[];             // Health goals this supports
  dietRelevance?: {          // Diet-specific notes
    vegetarian?: string;
    vegan?: string;
  };
};
```

## Adding a New Supplement

1. Open `src/data/supplements.json`
2. Add a new object to the `supplements` array following the structure above
3. Ensure all required fields are filled:
   - Unique `slug` (lowercase, hyphenated)
   - Safe `dosageRange` (conservative)
   - Appropriate `goals` array
   - At least one `citation` with PubMed URL

Example:

```json
{
  "name": "Example Supplement",
  "slug": "example-supplement",
  "description": "Brief description of what this supplement does.",
  "dosageRange": "100-200mg daily",
  "defaultTiming": {
    "timeOfDay": "morning",
    "withFood": true,
    "withFat": false
  },
  "pairWith": [],
  "avoidWith": [],
  "separateFrom": [],
  "evidenceSummary": "Summary of the research supporting this supplement.",
  "evidenceLevel": "moderate",
  "citations": [
    {
      "id": "example-1",
      "title": "Study Title Here",
      "url": "https://pubmed.ncbi.nlm.nih.gov/12345678/",
      "year": 2023
    }
  ],
  "goals": ["energy", "focus"]
}
```

4. If the supplement should be prioritized for certain diets, add it to `dietSupplementPriority` in `src/lib/recommendation-engine.ts`

5. Update `goalSupplementMap` in the recommendation engine if the supplement supports specific goals

## Recommendation Engine

The recommendation engine (`src/lib/recommendation-engine.ts`) uses a deterministic, rules-based approach:

1. **Goal Matching**: Maps user goals to relevant supplements
2. **Diet Adjustments**: Prioritizes B12/iron for vegetarians/vegans
3. **Variant Selection**: Chooses between similar supplements (e.g., magnesium forms)
4. **Schedule Grouping**: Organizes by time of day

The engine does NOT:
- Make disease treatment claims
- Recommend prescription drugs
- Suggest unsafe dosages
- Account for drug interactions (out of scope)

## Evidence Levels

- **High**: Multiple RCTs or meta-analyses with consistent results
- **Moderate**: Some RCTs or observational studies; may be mixed
- **Low**: Limited human studies; primarily mechanistic evidence

## Disclaimers

This application is for **educational purposes only**. It does not provide medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider before starting any supplement regimen.

Key safety notes:
- No disease treatment claims
- Conservative dosages only
- Caution notes where appropriate
- Drug interactions are out of scope
- Not a substitute for professional medical advice

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Ensure all supplements have proper citations
4. Test the recommendation engine with various profiles
5. Submit a pull request

When adding supplements, prioritize:
- Accurate, peer-reviewed citations
- Conservative dosage recommendations
- Clear caution notes where needed
- Proper evidence level assignment
