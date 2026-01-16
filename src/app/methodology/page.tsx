import Link from "next/link";
import { EvidenceBadge } from "@/components";

export const metadata = {
  title: "Methodology | Intake",
  description:
    "Learn how Intake creates evidence-based supplement recommendations using peer-reviewed research.",
};

export default function MethodologyPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
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
            Back to home
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Our Methodology
            </h1>
            <p className="text-gray-600 text-lg">
              Intake uses a transparent, evidence-based approach to generate
              personalized supplement recommendations. Here&apos;s how it works.
            </p>
          </div>

          {/* Evidence Levels */}
          <section className="p-6 md:p-8 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Evidence Levels
            </h2>
            <p className="text-gray-700 mb-6">
              Each supplement in our database is assigned an evidence level based on
              the quality and quantity of research supporting its use:
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <EvidenceBadge level="high" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">High Evidence</h3>
                  <p className="text-gray-700 text-sm">
                    Multiple randomized controlled trials (RCTs) or meta-analyses
                    support the supplement&apos;s efficacy for the stated purpose.
                    Consistent results across diverse populations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
                <EvidenceBadge level="moderate" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Moderate Evidence
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Some RCTs or well-designed observational studies support use.
                    Results may be mixed or limited to specific populations. More
                    research needed for definitive conclusions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
                <EvidenceBadge level="low" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Low Evidence</h3>
                  <p className="text-gray-700 text-sm">
                    Limited human studies, primarily animal/cell research, or
                    conflicting results. Traditional use or mechanistic plausibility
                    but insufficient clinical evidence.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Sources */}
          <section className="p-6 md:p-8 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Data Sources
            </h2>
            <p className="text-gray-700 mb-4">
              Our supplement database is built from peer-reviewed research,
              primarily sourced from:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 flex-shrink-0">•</span>
                <span>
                  <strong>PubMed/MEDLINE</strong> — Primary source for clinical
                  studies and systematic reviews
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 flex-shrink-0">•</span>
                <span>
                  <strong>Cochrane Reviews</strong> — Gold-standard systematic
                  reviews and meta-analyses
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 flex-shrink-0">•</span>
                <span>
                  <strong>NIH Office of Dietary Supplements</strong> — Comprehensive
                  fact sheets on supplement safety and efficacy
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 flex-shrink-0">•</span>
                <span>
                  <strong>Examine.com</strong> — Independent supplement research
                  aggregator (for reference)
                </span>
              </li>
            </ul>
          </section>

          {/* Recommendation Engine */}
          <section className="p-6 md:p-8 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recommendation Engine
            </h2>
            <p className="text-gray-700 mb-4">
              Our recommendation engine uses a deterministic, rules-based approach:
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">
                  1. Goal Matching
                </h3>
                <p className="text-gray-700 text-sm">
                  Each supplement is tagged with health goals it may support (energy,
                  sleep, focus, etc.). When you select your goals, we match you with
                  supplements that have evidence for those specific outcomes.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">
                  2. Diet Adjustments
                </h3>
                <p className="text-gray-700 text-sm">
                  Vegetarians and vegans have different nutritional needs. We
                  automatically prioritize B12 and consider iron status for
                  plant-based diets, as these nutrients are harder to obtain without
                  animal products.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">
                  3. Interaction Analysis
                </h3>
                <p className="text-gray-700 text-sm">
                  We flag supplements that should be taken together for synergy
                  (e.g., Vitamin D + K2) or separated for optimal absorption (e.g.,
                  iron and zinc). This helps you create an effective daily schedule.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">
                  4. Timing Optimization
                </h3>
                <p className="text-gray-700 text-sm">
                  Each supplement has an optimal time of day based on its
                  pharmacokinetics, whether it needs food for absorption, and
                  potential effects on sleep or energy.
                </p>
              </div>
            </div>
          </section>

          {/* Limitations */}
          <section className="p-6 md:p-8 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Limitations
            </h2>
            <p className="text-gray-700 mb-4">
              Intake has important limitations you should understand:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 flex-shrink-0">⚠️</span>
                <span>
                  <strong>Not medical advice.</strong> This tool is educational only.
                  It cannot diagnose conditions or replace professional medical
                  guidance.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 flex-shrink-0">⚠️</span>
                <span>
                  <strong>No drug interactions.</strong> We do not account for
                  supplement-drug interactions. If you take medications, consult your
                  doctor or pharmacist.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 flex-shrink-0">⚠️</span>
                <span>
                  <strong>Individual variation.</strong> Research results are
                  population averages. Your personal response may differ based on
                  genetics, health status, and other factors.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 flex-shrink-0">⚠️</span>
                <span>
                  <strong>Curated dataset.</strong> Our database includes commonly
                  studied supplements but is not exhaustive. Absence from our list
                  doesn&apos;t mean a supplement lacks merit.
                </span>
              </li>
            </ul>
          </section>

          {/* Safety */}
          <section className="p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Safety First
            </h2>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">🛑</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">
                    Important Safety Information
                  </h3>
                  <ul className="text-red-800 text-sm space-y-2">
                    <li>
                      • Always consult a healthcare provider before starting any
                      supplement regimen, especially if you are pregnant, nursing,
                      have a medical condition, or take medications.
                    </li>
                    <li>
                      • Do not exceed recommended dosages. More is not always better
                      and can be harmful.
                    </li>
                    <li>
                      • If you experience adverse effects, discontinue use and seek
                      medical attention.
                    </li>
                    <li>
                      • Supplements are not evaluated by the FDA for safety and
                      efficacy before marketing.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/intake"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get your personalized plan
          </Link>
        </div>
      </div>
    </div>
  );
}
