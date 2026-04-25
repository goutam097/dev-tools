import type { Metadata } from "next";
import DevToolsApp from "@/components/DevToolsApp";
import Link from "next/link";
import { toolCatalog } from "@/lib/toolCatalog";
import { blogPosts } from "@/lib/blogPosts";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Developer Tools Online Free | DevTools Hub",
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
    title: "Developer Tools Online Free | DevTools Hub",
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
    title: "Developer Tools Online Free | DevTools Hub",
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
      <main className="mx-auto max-w-6xl px-4 py-8 transition-[padding] duration-300 sm:px-6 sm:py-10 md:pl-[var(--app-left-offset,16rem)]">
        <section>
          <h1 className="font-serif text-3xl italic text-[var(--ink)] sm:text-4xl">
            Developer Tools Online Free for Daily Engineering Work
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-[var(--muted)]">
            DevTools Hub provides fast browser utilities for JSON formatting, JWT decoding, regex testing, Base64 conversion,
            UUID generation, Markdown preview, HTML formatting, and gradient creation. The tools are built for practical
            debugging, data cleanup, and frontend/backend workflows.
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
            <Link
              href="/blog"
              className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 font-mono text-xs uppercase tracking-widest text-[var(--ink)]"
            >
              Read blog
            </Link>
          </div>
        </section>

        {/* <section aria-label="Hero highlights" className="mt-10 grid gap-4 sm:grid-cols-3">
          {heroHighlights.map((highlight) => (
            <article key={highlight.title} className="rounded-3xl border border-[var(--border)] bg-white p-5 shadow-sm">
              <h2 className="font-serif text-lg italic text-[var(--ink)]">{highlight.title}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{highlight.description}</p>
            </article>
          ))}
        </section>

        <section
          aria-label="Why DevTools Hub"
          className="mt-10 space-y-4 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">Purpose-built</p>
            <h2 className="mt-2 text-2xl font-serif italic text-[var(--ink)]">Why builders rely on DevTools Hub</h2>
          </div>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            {whyList.map((statement) => (
              <li key={statement} className="flex gap-3">
                <span aria-hidden="true" className="text-[var(--accent)]">
                  *
                </span>
                <span>{statement}</span>
              </li>
            ))}
          </ul>
        </section> */}

        <section
          aria-label="SEO guides"
          className="mt-10 space-y-4 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">Learn and apply</p>
            <h2 className="mt-2 text-2xl font-serif italic text-[var(--ink)]">Technical guides for developers</h2>
          </div>
          <p className="text-sm text-[var(--muted)]">
            Explore our blog for practical tutorials on JSON handling, Base64 encoding, and lightweight developer workflows.
            Each article links directly to tools so you can apply techniques immediately.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {blogPosts.map((post) => (
              <article key={post.slug} className="rounded-2xl border border-[var(--border)] p-4">
                <h3 className="font-serif text-xl italic text-[var(--ink)]">{post.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{post.description}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-3 inline-flex rounded-lg bg-[var(--ink)] px-3 py-2 font-mono text-xs uppercase tracking-widest text-[var(--bg)]"
                >
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
