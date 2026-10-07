import type { Metadata } from "next";
import Link from "next/link";
import { toolCatalog } from "@/lib/toolCatalog";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";
import SidebarScaffold from "@/components/SidebarScaffold";
import AdSenseSlot from "@/components/AdSenseSlot";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Developer Tools Directory | DevTools Hub",
  description:
    "Explore all free online developer tools by category: JSON formatter, JWT decoder, Base64 encoder, regex tester, UUID generator, HTML formatter, and more.",
  keywords: [
    "developer tools directory",
    "developer tools online free",
    "json formatter online free",
    "base64 encoder online",
    "regex tester javascript tool",
    "html formatter online free",
  ],
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "Developer Tools Directory | DevTools Hub",
    description:
      "Browse every DevTools Hub utility with direct links, use cases, and quick access for day-to-day engineering tasks.",
    url: `${SITE_URL}/tools`,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "DevTools Hub tools catalog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Tools Directory | DevTools Hub",
    description: "Browse all browser-based developer tools in one indexable hub.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqItems = [
  {
    q: "Are all tools free to use?",
    a: "Yes. Every tool listed in this directory is free and accessible without mandatory sign-up.",
  },
  {
    q: "Do tools process data in the browser?",
    a: "Transformations run in your browser. If you are signed in, tools that save history send submitted input and output to your account history. Avoid entering secrets or production credentials.",
  },
  {
    q: "Which tools are best for API debugging?",
    a: "Start with JSON Formatter, JWT Decoder, Base64 Converter, and Regex Tester for common API and payload workflows.",
  },
];

export default function ToolsIndexPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <SidebarScaffold title="Free Developer Tools">
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs items={[{ label: "Tools" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <h1 className="font-serif text-3xl italic text-(--ink) sm:text-4xl">Developer Tools Directory</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-(--muted)">
        Access a curated suite of free, browser-native developer utilities designed for speed and privacy. 
        Whether you are validating API payloads, decoding authentication tokens, or optimizing frontend assets, 
        our directory provides instant access to the tools you need for efficient engineering workflows.
      </p>

      <AdSenseSlot slot="2222222222" />

      <section className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 lg:grid-cols-3">
        {toolCatalog.map((tool) => (
          <article key={tool.slug} className="flex flex-col justify-between rounded-3xl border border-(--border) bg-white p-6 shadow-sm transition hover:shadow-md">
            <div>
              <h2 className="font-serif text-2xl italic text-(--ink)">{tool.title}</h2>
              <p className="mt-2 text-sm leading-6 text-(--muted)">{tool.description}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href={`/tools/${tool.slug}`}
                className="inline-flex rounded-xl bg-(--ink) px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-(--bg)"
              >
                Open tool
              </Link>
              <Link href={`/tools/${tool.slug}#how-to-use`} className="inline-flex rounded-xl border border-(--border) px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-(--ink)">
                Learn more
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
        <h2 className="font-serif text-2xl italic text-(--ink)">How to Choose the Right Tool Quickly</h2>
        <p className="mt-3 text-sm text-(--muted)">
          For API payload cleanup, start with JSON Formatter. For token troubleshooting, use JWT Decoder. If you need text
          encoding work, go to Base64 Converter or Image to Base64. Regex Tester is ideal when validation patterns fail,
          while UUID Generator helps with unique IDs for databases and services. Markdown Preview and HTML Formatter support
          documentation and frontend cleanup workflows.
        </p>
        <p className="mt-3 text-sm text-(--muted)">
          Each tool page includes usage notes and links to related tools. Check the handling notes before entering sensitive data; signed-in history may retain inputs and outputs.
        </p>
      </section>

      <section className="mt-10 rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
        <h2 className="font-serif text-2xl italic text-(--ink)">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-4">
          {faqItems.map((faq) => (
            <article key={faq.q}>
              <h3 className="font-serif text-xl italic text-(--ink)">{faq.q}</h3>
              <p className="mt-2 text-sm text-(--muted)">{faq.a}</p>
            </article>
          ))}
        </div>
      </section>
      </main>
    </SidebarScaffold>
  );
}
