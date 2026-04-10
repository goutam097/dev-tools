import type { Metadata } from "next";
import DevToolsApp from "@/components/DevToolsApp";
import Link from "next/link";
import { toolCatalog } from "@/lib/toolCatalog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const defaultOgImage = `${siteUrl}/og-default.svg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DevTools Hub | Free Browser Utilities",
  description:
    "DevTools Hub hosts fast, private, browser-first suites for JSON formatting, JWT decoding, Base64 conversion, regex testing, UUID generation, Markdown preview, gradient creation, and image-to-Base64 conversion.",
  keywords: [
    "developer tools",
    "browser developer utilities",
    "json formatter",
    "jwt decoder",
    "base64 converter",
    "javascript regex tester",
    "uuid generator",
    "markdown preview",
    "image to base64",
    "gradient marker",
    "developer tools online",
    "free developer tools",
    "web developer tools",
    "online coding tools",
    "developer utilities free",
    "json formatter online free",
    "json beautifier tool",
    "json validator online",
    "format json online",
    "json pretty print tool",
    "fix invalid json online",
    "jwt decoder online",
    "decode jwt token online",
    "jwt debugger tool",
    "jwt parser online",
    "verify jwt token online",
    "jwt token viewer",
    "base64 encode decode online",
    "base64 to image converter",
    "image to base64 converter online",
    "base64 string decoder",
    "encode file to base64",
    "regex tester online free",
    "regular expression tester",
    "regex validator tool",
    "test regex online",
    "regex pattern checker",
    "uuid generator online",
    "generate uuid v4 online",
    "random uuid generator",
    "unique id generator tool",
    "markdown preview online",
    "markdown editor live preview",
    "markdown to html converter",
    "online markdown viewer",
    "image to base64 online",
    "convert image to base64 string",
    "image encoder online tool",
    "css gradient generator online",
    "gradient maker tool",
    "css gradient background generator",
    "how to format json online",
    "how to decode jwt token",
    "convert image to base64 online",
    "how to test regex online",
    "generate uuid for database",
    "how to preview markdown online",
    "free json formatter and validator online",
    "decode jwt token without secret online",
    "best regex tester for developers",
    "online base64 encoder and decoder tool",
    "live markdown editor with preview",
    "fast uuid generator online free"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DevTools Hub | Free Browser Utilities",
    description:
      "Access instant JSON formatting, JWT decoding, Base64 tools, regex testers, UUID generators, gradient creatives, and image-to-Base64 conversion in the browser.",
    url: siteUrl,
    siteName: "DevTools Hub",
    type: "website",
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "DevTools Hub share card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTools Hub | Free Browser Utilities",
    description:
      "Use browser-native JSON formatting, JWT decoding, Base64 encoding, regex testing, UUID generation, gradients, and image converters with zero uploads.",
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const heroHighlights = [
  {
    title: "Client-side privacy",
    description: "All tools run entirely in the browser so your data never leaves the tab.",
  },
  {
    title: "Zero friction",
    description: "Launch any utility instantly without signing up or waiting for modules to load.",
  },
  {
    title: "History & persistence",
    description: "Save frequently used data points and tooling workflows with built-in history.",
  },
];

const whyList = [
  "No account gate for instant access—just open your browser and start debugging.",
  "Consistent responsive experience across desktop and mobile, thanks to Tailwind-powered layout.",
  "SEO-first routing keeps each utility indexable, with clean URLs and friendly metadata.",
];

export default function HomePage() {
  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-8 transition-[padding] duration-300 sm:px-6 sm:py-10 md:pl-[var(--app-left-offset,16rem)]">
        <section>
          <h1 className="font-serif text-3xl italic text-[var(--ink)] sm:text-4xl">DevTools Hub</h1>
          <p className="mt-3 max-w-3xl text-sm text-[var(--muted)]">
            Free, browser-first utilities for formatting JSON, decoding JWTs, testing regex, generating UUIDs, previewing
            Markdown, creating gradients, and converting images to Base64 strings without touching any backend.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
            <Link
              href="/tools"
              className="rounded-lg bg-[var(--ink)] px-3 py-2 font-mono text-xs uppercase tracking-widest text-[var(--bg)]"
            >
              Explore all tools
            </Link>
            {toolCatalog.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 font-mono text-xs uppercase tracking-widest text-[var(--ink)]"
              >
                {tool.shortTitle}
              </Link>
            ))}
          </div>
        </section>

        <section aria-label="Hero highlights" className="mt-10 grid gap-4 sm:grid-cols-3">
          {heroHighlights.map((highlight) => (
            <article key={highlight.title} className="rounded-3xl border border-[var(--border)] bg-white p-5 shadow-sm">
              <h2 className="font-serif text-lg italic text-[var(--ink)]">{highlight.title}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{highlight.description}</p>
            </article>
          ))}
        </section>

        <section aria-label="Why DevTools Hub" className="mt-10 space-y-4 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">Purpose-built</p>
            <h2 className="mt-2 text-2xl font-serif italic text-[var(--ink)]">Why builders rely on DevTools Hub</h2>
          </div>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            {whyList.map((statement) => (
              <li key={statement} className="flex gap-3">
                <span aria-hidden="true" className="text-[var(--accent)]">
                  •
                </span>
                <span>{statement}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <DevToolsApp />
    </>
  );
}
