import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact WebCodeveloper for support, bug reports, partnerships, and service inquiries.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-sm font-medium">
            Contact WebCodeDeveloper
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold">
            Get In Touch
          </h1>
          <p className="mt-6 text-lg text-blue-100 max-w-3xl mx-auto">
            Have a project idea, business inquiry, or need technical assistance?
            We'd love to hear from you.
          </p>
        </div>
      </section>
      {/* Home Redirect */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Link href="/" className="inline-flex items-center px-6 py-3 bg-orange-100 hover:bg-slate-200 text-slate-900 rounded-lg font-semibold transition">
            ← Back to Home
          </Link>
        </div>
      </section>
      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      📧
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Email
                      </h3>
                      <p className="text-slate-600">
                        <a
                          href="mailto:webcodeveloper731@gmail.com"
                          className="hover:text-blue-600 hover:underline"
                        >
                          webcodeveloper731@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      📱
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Phone
                      </h3>
                      <p className="text-slate-600">
                        +91 XXXXX XXXXX
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      🌐
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Website
                      </h3>
                      <p className="text-slate-600">
                        <a
                          href="https://www.webcodedeveloper.co.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 hover:underline"
                        >
                          www.webcodedeveloper.co.in
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="mt-8 p-5 bg-slate-50 rounded-xl">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Business Hours
                  </h3>
                  <p className="text-sm text-slate-600">
                    Monday - Saturday<br />
                    9:00 AM - 7:00 PM IST
                  </p>
                </div> */}
              </div>
            </div>
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  Send an Inquiry
                </h2>
                <p className="text-slate-600 mb-8">
                  Fill out the form below and we'll get back to you
                  as soon as possible.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>
            © 2026 WebCodeDeveloper. All rights reserved.
          </p>
        </div>
      </footer>
    </div>

  );
}
