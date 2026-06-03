import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for DevTools Hub and WebCodeveloper.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
            Legal Information
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold">
            Privacy Policy
          </h1>
          <p className="mt-6 text-lg text-blue-100 max-w-3xl mx-auto">
            Your privacy is important to us. Learn how WebCodeDeveloper
            collects, uses, and protects your information.
          </p>
          <p className="mt-4 text-sm text-blue-200">
            Last Updated: May 2026
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
      {/* Privacy Policy Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Introduction
              </h2>
              <p className="text-lg leading-relaxed">
                WebCodeDeveloper respects your privacy and is committed
                to protecting your personal information. This Privacy
                Policy explains how we collect, use, and safeguard
                information when you visit our website or use our services.
              </p>
            </div>
            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Information We Collect
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
                  <span className="text-2xl">👤</span>
                  <span className="font-medium">Name</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
                  <span className="text-2xl">📧</span>
                  <span className="font-medium">Email Address</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
                  <span className="text-2xl">📱</span>
                  <span className="font-medium">Phone Number</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
                  <span className="text-2xl">📝</span>
                  <span className="font-medium">
                    Contact Form Information
                  </span>
                </div>
              </div>
            </div>
            {/* How We Use Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                How We Use Information
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <p>To respond to inquiries and customer requests.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <p>To provide requested services and support.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <p>
                    To improve website performance and user experience.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <p>
                    To communicate important updates and information.
                  </p>
                </div>
              </div>
            </div>
            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Cookies
              </h2>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <p className="leading-relaxed">
                  🍪 Our website may use cookies and analytics tools
                  to improve functionality, enhance user experience,
                  and better understand visitor behavior.
                </p>
              </div>
            </div>
            {/* Third Party Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Third-Party Services
              </h2>
              <div className="bg-slate-50 rounded-2xl p-6">
                <p className="leading-relaxed mb-4">
                  We may use third-party services such as:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="text-green-600">✓</span>
                    Google Analytics
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-600">✓</span>
                    Google AdSense
                  </li>
                </ul>
                <p className="mt-4 text-slate-600">
                  These services may collect information according
                  to their own privacy policies.
                </p>
              </div>
            </div>
            {/* Data Protection */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Data Protection
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                <p className="leading-relaxed">
                  🔒 We implement reasonable security measures to
                  protect user information from unauthorized access,
                  disclosure, alteration, or destruction.
                </p>
              </div>
            </div>
            {/* Contact */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Contact Us
              </h2>
              <p className="leading-relaxed">
                If you have any questions regarding this Privacy Policy,
                please contact us through our Contact page.
              </p>
            </div>
            {/* Agreement */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-bold text-xl text-slate-900 mb-3">
                Acceptance of This Policy
              </h3>
              <p>
                By using this website, you agree to this Privacy Policy
                and the collection and use of information in accordance
                with the terms outlined above.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Questions About Your Privacy?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            We're committed to transparency and protecting your personal
            information. Feel free to contact us anytime.
          </p>
          <a href="/contact" className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition">
            Contact Us
          </a>
        </div>
      </section>
    </div>

  );
}
