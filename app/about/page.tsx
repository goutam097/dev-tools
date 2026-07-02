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
                Who We Are
              </h2>
              <p className="text-lg leading-relaxed mb-5">
                WebCodeDeveloper is a professional web development and
                digital solutions company specializing in modern web
                applications, eCommerce platforms, custom software
                development, and SEO-friendly websites.
              </p>
              <p className="text-lg leading-relaxed mb-5">
                Our mission is to help businesses establish a strong online
                presence through innovative, scalable, and user-friendly
                digital solutions.
              </p>
              <p className="text-lg leading-relaxed">
                We work with technologies such as
                <span className="font-semibold">React.js</span>,
                <span className="font-semibold">Next.js</span>,
                <span className="font-semibold">Node.js</span>,
                <span className="font-semibold">MongoDB</span>,
                <span className="font-semibold">WordPress</span>, and modern
                cloud platforms to deliver high-quality products.
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Why Choose Us?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    🚀
                  </div>
                  <div>
                    <h4 className="font-semibold">Modern Technologies</h4>
                    <p className="text-slate-600">
                      Latest frameworks and scalable architecture.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    🔒
                  </div>
                  <div>
                    <h4 className="font-semibold">Secure Solutions</h4>
                    <p className="text-slate-600">
                      Security-first approach for every project.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    ⚡
                  </div>
                  <div>
                    <h4 className="font-semibold">High Performance</h4>
                    <p className="text-slate-600">
                      Optimized websites with excellent user experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    🎯
                  </div>
                  <div>
                    <h4 className="font-semibold">Client Focused</h4>
                    <p className="text-slate-600">
                      Tailored solutions based on business goals.
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
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-slate-900">
              Our Services
            </h2>
            <p className="mt-4 text-slate-600 text-lg">
              Comprehensive digital solutions for businesses of all sizes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="font-bold text-xl mb-2">
                Website Design &amp; Development
              </h3>
              <p>
                Professional, responsive, and user-friendly websites.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="font-bold text-xl mb-2">
                eCommerce Development
              </h3>
              <p>
                Powerful online stores with secure payment integration.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="font-bold text-xl mb-2">
                Custom Web Applications
              </h3>
              <p>
                Tailored software solutions designed for your workflow.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="font-bold text-xl mb-2">
                API Development &amp; Integration
              </h3>
              <p>
                Reliable APIs and third-party service integrations.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="font-bold text-xl mb-2">
                Search Engine Optimization
              </h3>
              <p>
                SEO strategies that improve rankings and visibility.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="font-bold text-xl mb-2">
                Website Maintenance &amp; Support
              </h3>
              <p>
                Ongoing updates, monitoring, and technical assistance.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Our Commitment
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">
            At WebCodeDeveloper, we focus on delivering reliable, secure,
            and performance-driven solutions tailored to our clients'
            unique business requirements. Our goal is to create digital
            experiences that help businesses grow, engage customers,
            and achieve long-term success.
          </p>
        </div>
      </section>
      {/* Contact CTA */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Let's Build Something Great Together
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            For business inquiries or project discussions, contact us through
            our Contact page.
          </p>
          <a href="/contact" className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition">
            Contact Us
          </a>
        </div>
      </section>
    </div>

  );
}
