import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About DevTools Hub | Publisher Information",
  description: "Learn about DevTools Hub, its publisher WebCodeveloper, editorial standards, and the privacy-first developer tools and tutorials we publish.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
            Welcome to WebCoDeveloper
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold">
            About WebCoDeveloper
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-blue-100">
            Building modern, scalable, and high-performance digital solutions
            that help businesses grow online.
          </p>
        </div>
      </section>
      {/* Home Redirect */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link href="/" className="inline-flex items-center px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg font-semibold transition">
            ← Back to Home
          </Link>
        </div>
      </section>
      {/* About Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Our Mission: Privacy-First Utility
              </h2>
              <p className="text-lg leading-relaxed mb-5">
                DevTools Hub was born out of a simple frustration: many online developer tools either upload sensitive data to their servers or are buried under layers of intrusive advertising and sign-up gates.
              </p>
              <p className="text-lg leading-relaxed mb-5">
                We believe that essential utilities—like JSON formatters, JWT decoders, and regex testers—should be **fast, free, and 100% private**. That's why every tool on this site is built to run entirely in your browser. Your data never leaves your machine.
              </p>
              <p className="text-lg leading-relaxed">
                Published by <span className="font-semibold text-blue-600">WebCodeveloper</span>, we combine high-performance engineering with practical educational guides to help modern developers ship faster and with more confidence.
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Technical Standards
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    🔒
                  </div>
                  <div>
                    <h4 className="font-semibold">Client-Side Privacy</h4>
                    <p className="text-slate-600">
                      100% browser-native processing. No data uploads, ever.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    ⚡
                  </div>
                  <div>
                    <h4 className="font-semibold">Zero-Friction Access</h4>
                    <p className="text-slate-600">
                      No accounts, no paywalls, no waiting. Instant utility.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    📖
                  </div>
                  <div>
                    <h4 className="font-semibold">Practical Education</h4>
                    <p className="text-slate-600">
                      Guides grounded in real-world engineering workflows.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    🛠️
                  </div>
                  <div>
                    <h4 className="font-semibold">Active Curation</h4>
                    <p className="text-slate-600">
                      Tools and tutorials are regularly updated for modern standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 md:p-10">
            <h2 className="text-3xl font-bold text-slate-900">Publisher Information and Standards</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              DevTools Hub is published by WebCodeveloper as a practical resource for developers who need fast, browser-based tools and clear educational guidance.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900">What we publish</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  We publish free developer tools, tutorials, and reference content that help people solve everyday technical tasks with useful examples and clear explanations.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900">Editorial and ad transparency</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  We may display Google AdSense advertising to support free access to our site. Ads do not influence the accuracy of our tool output or the factual quality of our educational content.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/author" className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">Author profile</Link>
                  <Link href="/editorial-policy" className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">Editorial policy</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Our Commitment to Quality
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">
            At DevTools Hub, we focus on delivering reliable, secure,
            and performance-driven utilities tailored to the unique 
            requirements of modern software engineering. Our goal is to 
            create a trusted digital experience that helps developers grow, 
            solve problems efficiently, and achieve long-term success.
          </p>
        </div>
      </section>
      {/* Contact CTA */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Need a Specific Tool?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            We are constantly expanding our toolkit. If you have a suggestion 
            for a new utility or a content correction, we'd love to hear from you.
          </p>
          <a href="/contact" className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition">
            Contact the Team
          </a>
        </div>
      </section>
    </div>

  );
}
