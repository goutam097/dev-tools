import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for DevTools Hub content, tools, and external links.",
  alternates: { canonical: `${SITE_URL}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
            Legal Notice
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold">
            Disclaimer
          </h1>
          <p className="mt-6 text-lg text-orange-100 max-w-3xl mx-auto">
            Please read this disclaimer carefully before using
            WebCodeDeveloper and the information provided on this website.
          </p>
        </div>
      </section>
      {/* Home Redirect */}
      <section className="py-8 bg-orange-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link href="/" className="inline-flex items-center px-6 py-3 bg-orange-100 hover:bg-orange-200 text-orange-900 rounded-lg font-semibold transition">
            ← Back to Home
          </Link>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="p-10 border-b border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Website Disclaimer
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                The information provided on this website is intended
                for general informational purposes only. By using this
                website, you acknowledge and agree to the terms outlined
                in this disclaimer.
              </p>
            </div>
            {/* Disclaimer Points */}
            <div className="p-10 space-y-8">
              {/* Point 1 */}
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl">
                  ℹ️
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Informational Purpose Only
                  </h3>
                  <p className="leading-relaxed">
                    The information provided on this website is for
                    general informational purposes only and should
                    not be considered professional, legal, financial,
                    or technical advice.
                  </p>
                </div>
              </div>
              {/* Point 2 */}
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
                  ✔️
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Accuracy of Information
                  </h3>
                  <p className="leading-relaxed">
                    While we strive to keep all information accurate,
                    current, and reliable, WebCodeDeveloper makes no
                    warranties or guarantees regarding the completeness,
                    reliability, suitability, or accuracy of any content.
                  </p>
                </div>
              </div>
              {/* Point 3 */}
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
                  ⚠️
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Use at Your Own Risk
                  </h3>
                  <p className="leading-relaxed">
                    Any action you take based on the information
                    found on this website is strictly at your own risk.
                    You are responsible for evaluating the accuracy
                    and usefulness of any information before making decisions.
                  </p>
                </div>
              </div>
              {/* Point 4 */}
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-2xl">
                  🛡️
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Limitation of Liability
                  </h3>
                  <p className="leading-relaxed">
                    WebCodeDeveloper shall not be liable for any
                    losses, damages, interruptions, or consequences
                    arising from the use of this website, its content,
                    or reliance on any information provided herein.
                  </p>
                </div>
              </div>
              {/* Point 5 */}
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl">
                  🔗
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    External Links
                  </h3>
                  <p className="leading-relaxed">
                    This website may contain links to external
                    websites for convenience and reference purposes.
                    The inclusion of such links does not imply
                    endorsement, approval, or responsibility for
                    third-party content, products, or services.
                  </p>
                </div>
              </div>
            </div>
            {/* Acceptance Notice */}
            <div className="bg-orange-50 border-t border-orange-100 p-10">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📄</div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Acceptance of Disclaimer
                  </h3>
                  <p className="leading-relaxed">
                    By continuing to use this website, you acknowledge
                    that you have read, understood, and agreed to
                    this disclaimer and its terms.
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
            Need More Information?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            If you have any questions regarding this disclaimer or any
            information on our website, please contact us.
          </p>
          <a href="/contact" className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-xl font-semibold transition-all duration-300">
            Contact Us
          </a>
        </div>
      </section>
    </div>

  );
}
