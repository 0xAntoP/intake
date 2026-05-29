import Link from "next/link";

export const metadata = {
  title: "Methodology | Sprout",
  description:
    "Learn how Sprout creates evidence-based supplement recommendations using peer-reviewed research.",
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[#FCFCF7] py-12 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <Link href="/" className="text-xs tracking-widest uppercase text-[#9C8B78] hover:text-[#2E1B12] transition-colors">
            ← Back
          </Link>
        </div>

        <div className="bg-white border border-[#2E1B12]/10">

          {/* Header */}
          <div className="p-8 md:p-12 border-b border-[#2E1B12]/10">
            <p className="text-xs tracking-widest uppercase text-[#9C8B78] mb-3">Sprout — Methodology</p>
            <h1 className="text-3xl md:text-4xl font-normal text-[#2E1B12] mb-4">
              Our Methodology
            </h1>
            <p className="text-[#9C8B78] leading-relaxed">
              Sprout uses a transparent, evidence-based approach to generate
              personalised supplement recommendations. Here&apos;s how it works.
            </p>
          </div>

          {/* Evidence Levels */}
          <section className="p-8 md:p-12 border-b border-[#2E1B12]/10">
            <h2 className="text-xs tracking-widest uppercase text-[#9C8B78] mb-6">Evidence Levels</h2>
            <p className="text-sm text-[#2E1B12] mb-8 leading-relaxed">
              Each supplement in our database is assigned an evidence level based on
              the quality and quantity of research supporting its use:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border-t-2 border-[#4A7C59] pt-4">
                <p className="text-xs tracking-widest uppercase text-[#4A7C59] mb-2">High</p>
                <p className="text-sm font-medium text-[#2E1B12] mb-2">Strong Research Support</p>
                <p className="text-sm text-[#9C8B78] leading-relaxed">
                  Multiple RCTs or meta-analyses confirm efficacy. Consistent results across diverse populations.
                </p>
              </div>
              <div className="border-t-2 border-[#FFB326] pt-4">
                <p className="text-xs tracking-widest uppercase text-[#FFB326] mb-2">Moderate</p>
                <p className="text-sm font-medium text-[#2E1B12] mb-2">Promising Evidence</p>
                <p className="text-sm text-[#9C8B78] leading-relaxed">
                  Some RCTs or observational studies support use. Results may vary across populations.
                </p>
              </div>
              <div className="border-t-2 border-[#2E1B12]/20 pt-4">
                <p className="text-xs tracking-widest uppercase text-[#9C8B78] mb-2">Low</p>
                <p className="text-sm font-medium text-[#2E1B12] mb-2">Early Stage Research</p>
                <p className="text-sm text-[#9C8B78] leading-relaxed">
                  Limited human studies or conflicting results. Insufficient clinical evidence at this time.
                </p>
              </div>
            </div>
          </section>

          {/* Data Sources */}
          <section className="p-8 md:p-12 border-b border-[#2E1B12]/10">
            <h2 className="text-xs tracking-widest uppercase text-[#9C8B78] mb-6">Data Sources</h2>
            <p className="text-sm text-[#2E1B12] mb-6 leading-relaxed">
              Our supplement database is built from peer-reviewed research, primarily sourced from:
            </p>
            <div className="space-y-0 divide-y divide-[#2E1B12]/10">
              {[
                { name: "PubMed / MEDLINE", desc: "Primary source for clinical studies and systematic reviews" },
                { name: "Cochrane Reviews", desc: "Gold-standard systematic reviews and meta-analyses" },
                { name: "NIH Office of Dietary Supplements", desc: "Comprehensive fact sheets on supplement safety and efficacy" },
                { name: "Examine.com", desc: "Independent supplement research aggregator (for reference)" },
              ].map((source) => (
                <div key={source.name} className="flex items-start gap-4 py-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB326] flex-shrink-0 mt-2" />
                  <div>
                    <span className="text-sm font-medium text-[#2E1B12]">{source.name}</span>
                    <span className="text-sm text-[#9C8B78]"> — {source.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommendation Engine */}
          <section className="p-8 md:p-12 border-b border-[#2E1B12]/10">
            <h2 className="text-xs tracking-widest uppercase text-[#9C8B78] mb-6">Recommendation Engine</h2>
            <p className="text-sm text-[#2E1B12] mb-6 leading-relaxed">
              Our recommendation engine uses a deterministic, rules-based approach:
            </p>
            <div className="space-y-0 divide-y divide-[#2E1B12]/10">
              {[
                { n: "1", title: "Goal Matching", desc: "Each supplement is tagged with the health goals it supports. When you select your goals, we match you with supplements that have evidence for those specific outcomes." },
                { n: "2", title: "Diet Adjustments", desc: "Plant-based diets have different nutritional needs. We automatically prioritise B12 and iron for vegetarians and vegans, as these are harder to obtain without animal products." },
                { n: "3", title: "Interaction Analysis", desc: "We flag supplements that should be taken together for synergy (e.g. Vitamin D + K2) or separated for optimal absorption (e.g. iron and zinc)." },
                { n: "4", title: "Timing Optimisation", desc: "Each supplement has an optimal time of day based on pharmacokinetics, whether it needs food, and potential effects on sleep or energy." },
              ].map((step) => (
                <div key={step.n} className="flex items-start gap-6 py-5">
                  <span className="text-xs text-[#9C8B78] w-4 flex-shrink-0 mt-0.5">{step.n}</span>
                  <div>
                    <h3 className="text-sm font-medium text-[#2E1B12] mb-1">{step.title}</h3>
                    <p className="text-sm text-[#9C8B78] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Limitations */}
          <section className="p-8 md:p-12 border-b border-[#2E1B12]/10">
            <h2 className="text-xs tracking-widest uppercase text-[#9C8B78] mb-6">Limitations</h2>
            <div className="space-y-0 divide-y divide-[#2E1B12]/10">
              {[
                { title: "Not medical advice", desc: "This tool is educational only. It cannot diagnose conditions or replace professional medical guidance." },
                { title: "No drug interactions", desc: "We do not account for supplement–drug interactions. If you take medications, consult your doctor or pharmacist." },
                { title: "Individual variation", desc: "Research results are population averages. Your personal response may differ based on genetics, health status, and other factors." },
                { title: "Curated dataset", desc: "Our database includes commonly studied supplements but is not exhaustive. Absence from our list doesn't mean a supplement lacks merit." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 py-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E1B12]/30 flex-shrink-0 mt-2" />
                  <p className="text-sm text-[#9C8B78] leading-relaxed">
                    <strong className="text-[#2E1B12] font-medium">{item.title}. </strong>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Safety */}
          <section className="p-8 md:p-12">
            <h2 className="text-xs tracking-widest uppercase text-[#9C8B78] mb-6">Safety First</h2>
            <div className="border border-[#2E1B12]/10 bg-[#FCFCF7] p-6">
              <p className="text-sm font-medium text-[#2E1B12] mb-4">Important Safety Information</p>
              <div className="space-y-3">
                {[
                  "Always consult a healthcare provider before starting any supplement regimen, especially if you are pregnant, nursing, have a medical condition, or take medications.",
                  "Do not exceed recommended dosages. More is not always better and can be harmful.",
                  "If you experience adverse effects, discontinue use and seek medical attention.",
                  "Supplements are not evaluated by the FDA for safety and efficacy before marketing.",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFB326] flex-shrink-0 mt-1.5" />
                    <p className="text-sm text-[#9C8B78] leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/intake"
            className="inline-flex items-center justify-between gap-8 px-8 py-4 bg-[#FFB326] text-[#2E1B12] rounded-full font-medium hover:bg-[#e6a020] transition-colors"
          >
            <span>Get your personalised plan</span>
            <span>→</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
