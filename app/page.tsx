import type { Metadata } from "next";
import DevToolsApp from "@/components/DevToolsApp";
import Link from "next/link";
import { toolCatalog } from "@/lib/toolCatalog";
import { blogPosts } from "@/lib/blogPosts";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

const featuredLearningPaths = [
  {
    title: "API debugging workflow",
    description: "Learn how to inspect payloads, validate JSON, and debug auth flows with browser-based tools.",
    href: "/blog/how-to-format-json-in-javascript",
  },
  {
    title: "Developer productivity stack",
    description: "Build a repeatable toolkit for formatting, encoding, and documentation tasks that save hours weekly.",
    href: "/blog/best-free-online-tools-for-developers",
  },
  {
    title: "Modern engineering essentials",
    description: "See how the right utilities improve throughput for frontend, backend, and QA teams alike.",
    href: "/blog/top-10-developer-tools-2026",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Free Developer Utilities for Modern Web Developers",
  description:
    "Developer tools online free for JSON formatting, JWT decoding, Base64 conversion, regex testing, UUID generation, Markdown preview, and HTML formatting.",
  keywords: [
    "developer tools online free",
    "json formatter online free",
    "jwt decoder online",
    "base64 encoder online",
    "regex tester javascript tool",
    "uuid generator online",
    "markdown preview online",
    "css gradient generator online",
    "image to base64 converter online",
    "html formatter online free",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free Developer Utilities for Modern Web Developers",
    description:
      "Access JSON formatting, JWT decoding, Base64 tools, regex testing, UUID generation, Markdown preview, and HTML formatting in your browser.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "DevTools Hub share card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Developer Utilities for Modern Web Developers",
    description: "Use browser-native developer tools with zero uploads and fast, practical workflows.",
    images: [DEFAULT_OG_IMAGE],
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
    title: "History and persistence",
    description: "Save frequently used data points and tooling workflows with built-in history.",
  },
];

const whyList = [
  "No account gate for instant access; open the browser and start debugging.",
  "Consistent responsive experience across desktop and mobile with utility-first design.",
  "SEO-first routing keeps each utility indexable, with clean URLs and descriptive metadata.",
];

export default function HomePage() {
  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-8 transition-[padding] duration-300 sm:px-6 sm:py-10 md:pl-(--app-left-offset,16rem)">
        <section className="rounded-4xl border border-(--border) bg-white/80 p-6 shadow-sm sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-widest text-(--muted)">Trusted developer education hub</p>
          <h1 className="mt-2 font-serif text-3xl italic text-(--ink) sm:text-4xl">
            Practical developer tools and tutorials for modern engineering teams
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-(--muted)">
            DevTools Hub combines browser-based utilities with actionable tutorials so developers can validate APIs, debug authentication, format content, and ship faster without leaving their workflow.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
            <Link
              href="/tools"
              className="rounded-lg bg-(--ink) px-3 py-2 font-mono text-xs uppercase tracking-widest text-(--bg)"
            >
              Explore all tools
            </Link>
            <Link href="/blog" className="rounded-lg border border-(--border) bg-white px-3 py-2 font-mono text-xs uppercase tracking-widest text-(--ink)">
              Read the blog
            </Link>
            <Link href="/about" className="rounded-lg border border-(--border) bg-white px-3 py-2 font-mono text-xs uppercase tracking-widest text-(--ink)">
              About the publisher
            </Link>
          </div>
        </section>

        <section aria-label="Featured learning paths" className="mt-8 grid gap-4 md:grid-cols-3">
          {featuredLearningPaths.map((path) => (
            <article key={path.title} className="rounded-3xl border border-(--border) bg-white p-5 shadow-sm">
              <p className="font-mono text-[10px] uppercase tracking-widest text-(--muted)">Learning path</p>
              <h2 className="mt-2 font-serif text-xl italic text-(--ink)">{path.title}</h2>
              <p className="mt-2 text-sm leading-7 text-(--muted)">{path.description}</p>
              <Link href={path.href} className="mt-4 inline-flex text-sm font-semibold text-(--ink)">
                Continue reading →
              </Link>
            </article>
          ))}
        </section>

        <section aria-label="Developer tools overview" className="mt-8 rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-(--muted)">Developer tools</p>
              <h2 className="mt-2 font-serif text-2xl italic text-(--ink)">Core utilities for everyday engineering work</h2>
            </div>
            <Link href="/tools" className="text-sm font-semibold text-(--ink)">
              Browse the full directory →
            </Link>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {toolCatalog.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="rounded-2xl border border-(--border) bg-(--surface) p-4 transition hover:-translate-y-0.5"
              >
                <h3 className="font-serif text-xl italic text-(--ink)">{tool.title}</h3>
                <p className="mt-2 text-sm leading-7 text-(--muted)">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section aria-label="Latest tutorials" className="mt-8 space-y-4 rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-(--muted)">Latest tutorials</p>
            <h2 className="mt-2 text-2xl font-serif italic text-(--ink)">Educational guides that support search intent and real-world practice</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {blogPosts.map((post) => (
              <article key={post.slug} className="rounded-2xl border border-(--border) p-4">
                <h3 className="font-serif text-xl italic text-(--ink)">{post.title}</h3>
                <p className="mt-2 text-sm leading-7 text-(--muted)">{post.description}</p>
                <Link href={`/blog/${post.slug}`} className="mt-3 inline-flex rounded-lg bg-(--ink) px-3 py-2 font-mono text-xs uppercase tracking-widest text-(--bg)">
                  Read article
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <DevToolsApp />
    </>
  );
}
