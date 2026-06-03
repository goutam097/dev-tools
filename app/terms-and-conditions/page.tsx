import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions for using DevTools Hub.",
  alternates: { canonical: `${SITE_URL}/terms-and-conditions` },
};

export default function TermsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
            Legal Agreement
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold">
            Terms &amp; Conditions
          </h1>
          <p className="mt-6 text-lg text-blue-100 max-w-3xl mx-auto">
            Please read these terms carefully before using
            WebCodeDeveloper and its services.
          </p>
        </div>
      </section>
      {/* Home Redirect */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link href="/" className="inline-flex items-center px-6 py-3 bg-orange-100 hover:bg-slate-200 text-slate-900 rounded-lg font-semibold transition">
            ← Back to Home
          </Link>
        </div>
      </section>
      {/* Terms Content */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            {/* Introduction */}
            <div className="p-10 border-b border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Agreement to Terms
              </h2>
              <p className="text-lg leading-relaxed">
                By accessing and using WebCodeDeveloper, you agree to
                comply with and be bound by these Terms and Conditions.
                If you do not agree with any part of these terms,
                please discontinue use of this website.
              </p>
            </div>
            {/* Terms List */}
            <div className="p-10 space-y-8">
              {/* Term 1 */}
              <div className="flex gap-6">
                <div className="min-w-[60px] h-[60px] rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                    Website Usage
                  </h3>
                  <p className="leading-relaxed">
                    You agree to use this website only for lawful
                    purposes and in a manner that does not violate
                    any applicable laws, regulations, or rights of
                    other users.
                  </p>
                </div>
              </div>
              {/* Term 2 */}
              <div className="flex gap-6">
                <div className="min-w-[60px] h-[60px] rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                    Intellectual Property
                  </h3>
                  <p className="leading-relaxed">
                    All content, graphics, logos, text, designs,
                    source code, and materials available on this
                    website are the property of WebCodeDeveloper
                    unless otherwise stated. Unauthorized copying,
                    reproduction, or distribution is prohibited.
                  </p>
                </div>
              </div>
              {/* Term 3 */}
              <div className="flex gap-6">
                <div className="min-w-[60px] h-[60px] rounded-2xl bg-green-100 text-green-700 flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                    Services
                  </h3>
                  <p className="leading-relaxed">
                    Any service quotations, project timelines,
                    pricing, deliverables, and agreements provided
                    by WebCodeDeveloper are subject to separate
                    contracts, discussions, and written approvals.
                  </p>
                </div>
              </div>
              {/* Term 4 */}
              <div className="flex gap-6">
                <div className="min-w-[60px] h-[60px] rounded-2xl bg-red-100 text-red-700 flex items-center justify-center text-xl font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                    Limitation of Liability
                  </h3>
                  <p className="leading-relaxed">
                    WebCodeDeveloper shall not be held responsible
                    for any losses, damages, business interruptions,
                    or consequences resulting from the use of this
                    website or reliance on information provided
                    herein.
                  </p>
                </div>
              </div>
              {/* Term 5 */}
              <div className="flex gap-6">
                <div className="min-w-[60px] h-[60px] rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl font-bold">
                  5
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                    External Links
                  </h3>
                  <p className="leading-relaxed">
                    Our website may contain links to third-party
                    websites for informational purposes. We do not
                    control and are not responsible for the content,
                    privacy practices, or policies of any external
                    websites.
                  </p>
                </div>
              </div>
              {/* Term 6 */}
              <div className="flex gap-6">
                <div className="min-w-[60px] h-[60px] rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center text-xl font-bold">
                  6
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                    Changes to These Terms
                  </h3>
                  <p className="leading-relaxed">
                    We reserve the right to modify, update, or
                    replace these Terms and Conditions at any time
                    without prior notice. Updated versions will be
                    posted on this page.
                  </p>
                </div>
              </div>
            </div>
            {/* Acceptance Box */}
            <div className="bg-blue-50 border-t border-blue-100 p-10">
              <div className="flex items-start gap-4">
                <div className="text-3xl">✅</div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Acceptance of Terms
                  </h3>
                  <p className="leading-relaxed text-slate-700">
                    Continued use of this website constitutes your
                    acceptance of any updated Terms and Conditions.
                    If you do not agree with these terms, please
                    discontinue use of the website immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Questions About These Terms?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            If you have any questions regarding these Terms &amp;
            Conditions, please contact us through our Contact page.
          </p>
          <a href="/contact" className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-all duration-300">
            Contact Us
          </a>
        </div>
      </section>
    </div>

  );
}
