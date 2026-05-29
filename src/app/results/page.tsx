"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ScheduleView } from "@/components";
import { generateRecommendations, groupBySchedule } from "@/lib/recommendation-engine";
import { UserProfile, ScheduleGroup, SupplementRecommendation } from "@/types";

const AMAZON_PRODUCTS: Record<string, { brand: string; shortDesc: string; url: string }> = {
  "omega-3":    { brand: "Nordic Naturals",    shortDesc: "Ultimate Omega · 1280mg EPA/DHA",             url: "https://www.amazon.com/dp/B002CQU564" },
  "vitamin-d3": { brand: "NatureWise",          shortDesc: "Vitamin D3 5000 IU · in olive oil",           url: "https://www.amazon.com/dp/B00GB85JR4" },
  "vitamin-b12":{ brand: "Jarrow Formulas",     shortDesc: "Methylcobalamin 1000mcg · chewable",          url: "https://www.amazon.com/dp/B002FJW3ZY" },
  "vitamin-c":  { brand: "NOW Foods",           shortDesc: "Vitamin C-1000 + Bioflavonoids · 250 caps",   url: "https://www.amazon.com/dp/B0013OUNK4" },
  "creatine":   { brand: "Optimum Nutrition",   shortDesc: "Micronized Creatine Monohydrate · 600g",      url: "https://www.amazon.com/dp/B002DYIZEO" },
  "melatonin":  { brand: "Nature Made",         shortDesc: "Melatonin 5mg · drug-free sleep aid",         url: "https://www.amazon.com/dp/B005DEK9CC" },
  "iron":       { brand: "Garden of Life",      shortDesc: "Vitamin Code Healthy Blood · 60 caps",        url: "https://www.amazon.com/dp/B0098U0QWA" },
  "vitamin-k2": { brand: "Thorne",              shortDesc: "Vitamin K Complex K1 + K2 MK-4 & MK-7",      url: "https://www.amazon.com/dp/B0797N3F9T" },
  "l-theanine": { brand: "NOW Foods",           shortDesc: "L-Theanine 200mg + Inositol · 120 caps",      url: "https://www.amazon.com/dp/B00GQV9YX6" },
  "coq10":      { brand: "Doctor's Best",       shortDesc: "CoQ10 100mg + BioPerine · 120 softgels",      url: "https://www.amazon.com/dp/B0019GW3G8" },
  "vitamin-a":  { brand: "NOW Foods",           shortDesc: "Vitamin A 10,000 IU · 100 softgels",          url: "https://www.amazon.com/dp/B0001SQXH0" },
  "vitamin-e":  { brand: "NOW Foods",           shortDesc: "Vitamin E-400 IU Mixed Tocopherols · 100ct",  url: "https://www.amazon.com/dp/B001F0R7MS" },
  "biotin":     { brand: "NOW Foods",           shortDesc: "Biotin 5000mcg · 120 veg capsules",           url: "https://www.amazon.com/dp/B000BY2N7S" },
  "probiotics": { brand: "Garden of Life",      shortDesc: "Dr. Formulated Once Daily · 50B CFU",         url: "https://www.amazon.com/dp/B00Y8MP4G6" },
  "collagen":   { brand: "Sports Research",     shortDesc: "Collagen Peptides · Hydrolyzed Type 1 & 3",   url: "https://www.amazon.com/dp/B00XQ2XGAA" },
  "turmeric":   { brand: "Doctor's Best",       shortDesc: "Curcumin C3 Complex + BioPerine · 1000mg",    url: "https://www.amazon.com/dp/B000BD0RQS" },
  "nac":        { brand: "NOW Foods",           shortDesc: "NAC N-Acetyl Cysteine 1000mg · 120 tablets",  url: "https://www.amazon.com/dp/B00KT3H13C" },
  "spirulina":  { brand: "Nutrex Hawaii",       shortDesc: "Pure Hawaiian Spirulina · 500mg · 400 tablets", url: "https://www.amazon.com/dp/B0039ITKSI" },
};

const SPROUTLAB_PRODUCTS = [
  {
    id: "mycofuel",
    name: "Mycofuel",
    tagline: "Energy, endurance & adaptogens",
    url: "https://sproutlab.it/shop/mycofuel/",
    matchSlugs: ["cordyceps", "ashwagandha", "reishi", "maca", "lions-mane", "rhodiola", "magnesium", "vitamin-b6", "zinc", "turmeric"],
    ingredientLabels: {
      cordyceps: "Cordyceps",
      ashwagandha: "Ashwagandha",
      reishi: "Reishi",
      maca: "Maca Root",
      "lions-mane": "Lion's Mane",
      rhodiola: "Rhodiola Rosea",
      magnesium: "Magnesium",
      "vitamin-b6": "Vitamin B6",
      zinc: "Zinc",
      turmeric: "Piperine (via Turmeric)",
    } as Record<string, string>,
  },
  {
    id: "mycoderm",
    name: "Mycoderm",
    tagline: "Skin health, cellular protection & glow",
    url: "https://sproutlab.it/shop/mycoderm/",
    matchSlugs: ["tremella", "cordyceps", "reishi", "lions-mane", "astaxanthin", "magnesium", "zinc", "vitamin-b6", "turmeric"],
    ingredientLabels: {
      tremella: "Tremella",
      cordyceps: "Cordyceps",
      reishi: "Reishi",
      "lions-mane": "Lion's Mane",
      astaxanthin: "Astaxanthin",
      magnesium: "Magnesium",
      zinc: "Zinc",
      "vitamin-b6": "Vitamin B6",
      turmeric: "Piperine (via Turmeric)",
    } as Record<string, string>,
  },
];

export default function ResultsPage() {
  const router = useRouter();
  const [schedule, setSchedule] = useState<ScheduleGroup[]>([]);
  const [recommendations, setRecommendations] = useState<SupplementRecommendation[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProfile = sessionStorage.getItem("intakeProfile");
    if (!storedProfile) { router.push("/intake"); return; }
    try {
      const parsedProfile: UserProfile = JSON.parse(storedProfile);
      setProfile(parsedProfile);
      const recs = generateRecommendations(parsedProfile);
      setRecommendations(recs);
      setSchedule(groupBySchedule(recs));
    } catch {
      router.push("/intake"); return;
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFCF7] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-6 h-6 border-2 border-[#FFB326] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-[#9C8B78] tracking-wide">Generating your plan…</p>
        </div>
      </div>
    );
  }

  const goalLabels: Record<string, string> = {
    energy: "Energy", sleep: "Sleep", focus: "Focus", immunity: "Immunity",
    stress: "Stress", longevity: "Longevity", muscle: "Muscle & Recovery", skin: "Skin & Glow",
  };

  const highEvidence = recommendations.filter((r) => r.evidenceLevel === "high").length;

  const recommendedSlugs = recommendations.map((r) => r.slug);
  const matchedProducts = SPROUTLAB_PRODUCTS.map((product) => {
    const matched = product.matchSlugs.filter((s) => recommendedSlugs.includes(s));
    return { ...product, matched };
  }).filter((p) => p.matched.length >= 2);

  const allSproutSlugs = new Set(SPROUTLAB_PRODUCTS.flatMap((p) => p.matchSlugs));
  const amazonSuggestions = recommendations.filter(
    (r) => !allSproutSlugs.has(r.slug) && AMAZON_PRODUCTS[r.slug]
  );

  return (
    <div className="min-h-screen bg-[#FCFCF7] py-12 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <Link href="/intake" className="text-xs tracking-widest uppercase text-[#9C8B78] hover:text-[#2E1B12] transition-colors">
            ← Retake questionnaire
          </Link>
        </div>

        {/* Hero header */}
        <div className="bg-white border border-[#2E1B12]/10 p-8 md:p-12 mb-px">
          <p className="text-xs tracking-widest uppercase text-[#9C8B78] mb-3">Sprout — Your Plan</p>
          <h1 className="text-3xl md:text-5xl font-normal text-[#2E1B12] mb-4 leading-tight">
            Your Supplement<br />Plan is Ready
          </h1>

          {profile && (
            <p className="text-sm text-[#9C8B78] mb-5">
              {profile.age} years old · {profile.diet.charAt(0).toUpperCase() + profile.diet.slice(1)} diet
              {profile.sex && ` · ${profile.sex.charAt(0).toUpperCase() + profile.sex.slice(1)}`}
            </p>
          )}

          {profile && profile.goals.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {profile.goals.map((goal) => (
                <span key={goal} className="text-xs border border-[#2E1B12]/20 px-3 py-1 text-[#2E1B12]">
                  {goalLabels[goal]}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats bar */}
        <div className="bg-white border border-[#2E1B12]/10 border-t-0 grid grid-cols-3 divide-x divide-[#2E1B12]/10 mb-4">
          <div className="p-6 text-center">
            <div className="text-3xl font-normal text-[#FFB326] mb-1">{recommendations.length}</div>
            <div className="text-xs tracking-widest uppercase text-[#9C8B78]">Supplements</div>
          </div>
          <div className="p-6 text-center">
            <div className="text-3xl font-normal text-[#FFB326] mb-1">{schedule.length}</div>
            <div className="text-xs tracking-widest uppercase text-[#9C8B78]">Time slots</div>
          </div>
          <div className="p-6 text-center">
            <div className="text-3xl font-normal text-[#FFB326] mb-1">{highEvidence}</div>
            <div className="text-xs tracking-widest uppercase text-[#9C8B78]">High evidence</div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-white border border-[#2E1B12]/10 px-6 py-4 mb-4 flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFB326] flex-shrink-0 mt-1.5" />
          <p className="text-xs text-[#9C8B78] leading-relaxed">
            <strong className="text-[#2E1B12] font-medium">For educational purposes only.</strong>{" "}
            This plan does not constitute medical advice. Consult a physician before changing your supplement regimen, especially if you take medications or have health conditions.
          </p>
        </div>

        {/* Daily Schedule */}
        <div className="bg-white border border-[#2E1B12]/10 p-8 md:p-12">
          <p className="text-xs tracking-widest uppercase text-[#9C8B78] mb-8">Daily Schedule</p>
          <ScheduleView schedule={schedule} />
        </div>

        {/* Sprout Lab product recommendations */}
        {matchedProducts.length > 0 && (
          <div className="bg-[#2E1B12] mt-4 p-8 md:p-12">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <p className="text-xs tracking-widest uppercase text-[#FFB326] mb-2">Sprout Lab</p>
                <p className="text-2xl md:text-3xl font-normal text-[#FCFCF7] leading-tight">
                  Already in your plan.<br />Already in a formula.
                </p>
              </div>
              <span className="hidden md:block text-xs tracking-widest uppercase text-[#FCFCF7]/30 mt-1">
                {matchedProducts.length} match{matchedProducts.length > 1 ? "es" : ""}
              </span>
            </div>

            <div className={`grid gap-px ${matchedProducts.length > 1 ? "md:grid-cols-2" : ""}`}>
              {matchedProducts.map((product) => (
                <div key={product.id} className="bg-[#FCFCF7]/5 p-6 flex flex-col gap-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-medium text-[#FCFCF7] leading-snug">{product.name}</p>
                      <p className="text-xs text-[#FCFCF7]/50 mt-0.5">{product.tagline}</p>
                    </div>
                    <span className="text-xs text-[#FFB326] flex-shrink-0 mt-1">
                      {product.matched.length} / {product.matchSlugs.length} ingredients
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.matched.map((slug) => (
                      <span
                        key={slug}
                        className="text-xs border border-[#FFB326]/30 text-[#FFB326] px-2.5 py-1"
                      >
                        {product.ingredientLabels[slug]}
                      </span>
                    ))}
                  </div>

                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-between border border-[#FCFCF7]/20 px-5 py-3 text-sm text-[#FCFCF7] hover:border-[#FFB326] hover:text-[#FFB326] transition-colors"
                  >
                    <span>Shop {product.name}</span>
                    <span>→</span>
                  </a>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#FCFCF7]/25 mt-6">
              Products sold by Sprout Lab. Contains matched ingredients among others.
            </p>
          </div>
        )}

        {/* Amazon product suggestions */}
        {amazonSuggestions.length > 0 && (
          <div className="bg-white border border-[#2E1B12]/10 p-8 md:p-12 mt-4">
            <div className="flex items-baseline justify-between gap-4 mb-6">
              <div>
                <p className="text-xs tracking-widest uppercase text-[#9C8B78] mb-1">Where to buy</p>
                <p className="text-xl font-normal text-[#2E1B12]">Other recommended supplements</p>
              </div>
              <span className="text-xs text-[#9C8B78] flex-shrink-0">via Amazon</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-[#2E1B12]/10">
              {amazonSuggestions.map((rec) => {
                const product = AMAZON_PRODUCTS[rec.slug];
                return (
                  <a
                    key={rec.slug}
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-5 flex flex-col gap-2 group hover:bg-[#FCFCF7] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-[#2E1B12] leading-snug group-hover:text-[#FFB326] transition-colors">
                        {rec.name}
                      </p>
                      <span className="text-[#9C8B78] text-xs flex-shrink-0 mt-0.5 group-hover:text-[#FFB326] transition-colors">↗</span>
                    </div>
                    <p className="text-xs text-[#9C8B78]">{product.brand}</p>
                    <p className="text-xs text-[#9C8B78]/70 leading-relaxed">{product.shortDesc}</p>
                  </a>
                );
              })}
            </div>

            <p className="text-xs text-[#9C8B78]/50 mt-4">
              Affiliate-free links. We earn nothing from these recommendations.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 flex items-center justify-between">
          <Link href="/methodology" className="text-xs tracking-widest uppercase text-[#9C8B78] hover:text-[#2E1B12] transition-colors">
            Read our methodology →
          </Link>
          <Link
            href="/intake"
            className="inline-flex items-center gap-4 px-6 py-3 border border-[#2E1B12]/20 text-sm text-[#2E1B12] hover:border-[#2E1B12] transition-colors"
          >
            Retake questionnaire
          </Link>
        </div>

      </div>
    </div>
  );
}
