import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Personal
            <span className="text-blue-600"> Supplement Plan</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get an evidence-based supplement schedule tailored to your goals.
            Know what to take, when to take it, and what to avoid—backed by
            peer-reviewed research.
          </p>
          <Link
            href="/intake"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Get my supplement plan
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            Free • No account required • Takes 2 minutes
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            What you&apos;ll get
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="📅"
              title="Daily Schedule"
              description="Know exactly when to take each supplement—morning, afternoon, or evening—for optimal absorption."
            />
            <FeatureCard
              icon="✅"
              title="Pairing Guidance"
              description="Learn which supplements work better together and which ones to separate for best results."
            />
            <FeatureCard
              icon="📚"
              title="Evidence-Based"
              description="Every recommendation includes evidence ratings and citations to peer-reviewed research."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            How it works
          </h2>
          <div className="space-y-6">
            <StepCard
              number={1}
              title="Tell us about yourself"
              description="Share your age, diet, and health goals. Optionally list supplements you already take."
            />
            <StepCard
              number={2}
              title="Get your personalized plan"
              description="Our algorithm matches your profile to evidence-based supplement recommendations."
            />
            <StepCard
              number={3}
              title="Follow your schedule"
              description="See your daily supplement schedule with timing, dosage, and interaction guidance."
            />
          </div>
          <div className="text-center mt-12">
            <Link
              href="/intake"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start now
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-4">
            Built on peer-reviewed research from PubMed and trusted sources.
          </p>
          <Link
            href="/methodology"
            className="text-blue-600 hover:underline text-sm"
          >
            Learn about our methodology →
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-6">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
