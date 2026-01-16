import { notFound } from "next/navigation";
import Link from "next/link";
import { getSupplementBySlug, getAllSupplements } from "@/lib/recommendation-engine";
import { EvidenceBadge, PairingList, Disclaimer } from "@/components";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const supplements = getAllSupplements();
  return supplements.map((supplement) => ({
    slug: supplement.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supplement = getSupplementBySlug(slug);

  if (!supplement) {
    return {
      title: "Supplement Not Found | Intake",
    };
  }

  return {
    title: `${supplement.name} | Intake`,
    description: supplement.description,
  };
}

export default async function SupplementPage({ params }: PageProps) {
  const { slug } = await params;
  const supplement = getSupplementBySlug(slug);

  if (!supplement) {
    notFound();
  }

  const foodNote = supplement.defaultTiming.withFood
    ? supplement.defaultTiming.withFat
      ? "Take with a meal containing fat for optimal absorption"
      : "Take with food"
    : "Can be taken on an empty stomach";

  const timeOfDayLabel = {
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
  }[supplement.defaultTiming.timeOfDay];

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/results"
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
            Back to results
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {supplement.name}
              </h1>
              <EvidenceBadge level={supplement.evidenceLevel} />
            </div>
            <p className="text-gray-600 text-lg">{supplement.description}</p>
          </div>

          {/* Quick Facts */}
          <div className="grid md:grid-cols-3 gap-4 p-6 md:p-8 bg-gray-50 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Dosage</h3>
              <p className="text-gray-900 font-medium">{supplement.dosageRange}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Best Time
              </h3>
              <p className="text-gray-900 font-medium">{timeOfDayLabel}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                With Food
              </h3>
              <p className="text-gray-900 font-medium">{foodNote}</p>
            </div>
          </div>

          {/* Evidence Summary */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Evidence Summary
            </h2>
            <p className="text-gray-700">{supplement.evidenceSummary}</p>
          </div>

          {/* Interactions */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Interactions & Pairings
            </h2>
            <PairingList
              pairWith={supplement.pairWith}
              avoidWith={supplement.avoidWith}
              separateFrom={supplement.separateFrom}
            />
            {supplement.pairWith.length === 0 &&
              supplement.avoidWith.length === 0 &&
              supplement.separateFrom.length === 0 && (
                <p className="text-gray-500">
                  No significant interactions documented for this supplement.
                </p>
              )}
          </div>

          {/* Caution Note */}
          {supplement.cautionNote && (
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex gap-3">
                  <span className="text-amber-600 text-xl flex-shrink-0">⚠️</span>
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-1">
                      Important Note
                    </h3>
                    <p className="text-amber-800">{supplement.cautionNote}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Diet Relevance */}
          {supplement.dietRelevance && (
            <div className="p-6 md:p-8 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Diet Considerations
              </h2>
              <div className="space-y-3">
                {supplement.dietRelevance.vegetarian && (
                  <div className="flex items-start gap-3">
                    <span className="text-green-600">🥬</span>
                    <div>
                      <span className="font-medium">Vegetarian: </span>
                      <span className="text-gray-700">
                        {supplement.dietRelevance.vegetarian}
                      </span>
                    </div>
                  </div>
                )}
                {supplement.dietRelevance.vegan && (
                  <div className="flex items-start gap-3">
                    <span className="text-green-600">🌱</span>
                    <div>
                      <span className="font-medium">Vegan: </span>
                      <span className="text-gray-700">
                        {supplement.dietRelevance.vegan}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Citations */}
          <div className="p-6 md:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Research Citations
            </h2>
            <ul className="space-y-3">
              {supplement.citations.map((citation) => (
                <li key={citation.id} className="flex items-start gap-2">
                  <span className="text-blue-600 flex-shrink-0">📄</span>
                  <div>
                    <a
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {citation.title}
                    </a>
                    {citation.year && (
                      <span className="text-gray-500 ml-2">({citation.year})</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6">
          <Disclaimer variant="inline" />
        </div>
      </div>
    </div>
  );
}
