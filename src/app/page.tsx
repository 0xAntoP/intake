import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col">
      <section
        className="flex-1 flex items-center justify-center px-6 py-32 relative min-h-[560px]"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <p className="text-xs tracking-widest uppercase text-white/70 mb-6">
            Sprout — Supplement Planner
          </p>
          <h1 className="text-4xl md:text-6xl font-normal text-white mb-6 leading-tight uppercase" style={{ letterSpacing: "-0.04em" }}>
            Your Personal<br />Supplement Plan
          </h1>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Get an evidence-based supplement schedule tailored to your goals.
            Know what to take, when to take it, and what to avoid.
          </p>
          <Link
            href="/intake"
            className="inline-flex items-center justify-between gap-8 px-8 py-4 bg-[#FFB326] text-[#2E1B12] rounded-full font-medium hover:bg-[#e6a020] transition-colors"
          >
            <span>Get my supplement plan</span>
            <span>→</span>
          </Link>
          <p className="mt-5 text-sm text-white/60">
            Free · No account required · Takes 3 minutes
          </p>
          <p className="mt-3 text-xs text-white/40 max-w-sm mx-auto leading-relaxed">
            Your responses help us tailor your supplement plan in real time. Your data is not stored and is used only for this session.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-[#2E1B12]/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#2E1B12]/10">
            <FeatureItem
              label="Daily Schedule"
              description="Know exactly when to take each supplement — morning, afternoon, or evening — for optimal absorption."
            />
            <FeatureItem
              label="Pairing Guidance"
              description="Learn which supplements work better together and which ones to separate for best results."
            />
            <FeatureItem
              label="Evidence-Based"
              description="Every recommendation includes evidence ratings and citations to peer-reviewed research."
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-[#2E1B12]/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-normal text-[#2E1B12] mb-10 uppercase" style={{ letterSpacing: "-0.03em" }}>How it works</h2>
          <div className="space-y-0 divide-y divide-[#2E1B12]/10 text-left">
            <StepItem number={1} title="Tell us about yourself" description="Share your age, diet, and health goals." />
            <StepItem number={2} title="Get your personalized plan" description="Our algorithm matches your profile to evidence-based recommendations." />
            <StepItem number={3} title="Follow your schedule" description="See your daily supplement schedule with timing, dosage, and interaction guidance." />
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/intake"
              className="inline-flex items-center justify-between gap-8 px-8 py-4 bg-[#FFB326] text-[#2E1B12] rounded-full font-medium hover:bg-[#e6a020] transition-colors"
            >
              <span>Start now</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 px-6 border-t border-[#2E1B12]/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-[#9C8B78] mb-2">
            Built on peer-reviewed research from PubMed and trusted sources.
          </p>
          <Link href="/methodology" className="text-sm text-[#FFB326] hover:underline">
            Learn about our methodology →
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ label, description }: { label: string; description: string }) {
  return (
    <div className="py-8 md:py-0 md:px-8 first:pl-0 last:pr-0">
      <h3 className="text-lg font-medium text-[#2E1B12] mb-3">{label}</h3>
      <p className="text-base text-[#9C8B78] leading-relaxed">{description}</p>
    </div>
  );
}

function StepItem({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex items-start gap-6 py-8">
      <span className="text-sm text-[#9C8B78] w-5 flex-shrink-0 mt-1">{number}</span>
      <div>
        <h3 className="text-xl font-medium text-[#2E1B12] mb-2">{title}</h3>
        <p className="text-base text-[#9C8B78] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
