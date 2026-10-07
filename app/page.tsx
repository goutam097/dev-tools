import type { Metadata } from "next";
import Link from "next/link";
import { toolCatalog } from "@/lib/toolCatalog";
import { blogPosts } from "@/lib/blogPosts";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";

const featuredLearningPaths = [
  {
    title: "API Debugging Workflow",
    description: "Master the art of inspecting payloads, validating JSON structure, and troubleshooting authentication flows with browser-based tools.",
    href: "/blog/how-to-format-json-in-javascript",
  },
  {
    title: "Working with Base64",
    description: "Understand what Base64 does, where it is useful, and how to handle text and binary data in common JavaScript environments.",
    href: "/blog/what-is-base64-encoding-with-examples",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Online Developer Tools and Practical Guides | DevTools Hub",
  description:
    "Use practical browser-based tools to format JSON, decode JWTs, convert Base64, test regular expressions, and work with common developer formats.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Online Developer Tools and Practical Guides | DevTools Hub",
    description:
      "Format JSON, decode JWTs, convert Base64, test regular expressions, and read practical guides for developer workflows.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "DevTools Hub - Developer Utilities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Developer Tools and Practical Guides | DevTools Hub",
    description: "Use practical tools for common developer tasks and browse concise technical guides.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const heroHighlights = [
  {
    title: "Browser-based processing",
    description: "Conversions run in your browser. If you are signed in, some tools save input and output to your account history; see the privacy policy.",
  },
  {
    title: "No Account Required",
    description: "Launch any utility instantly without signing up or waiting for heavy modules to load.",
  },
  {
    title: "Built for Speed",
    description: "Optimized for low latency and fast interaction, even on mobile and slow connections.",
  },
];

export default function HomePage() {
  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-8 transition-[padding] duration-300 sm:px-6 sm:py-10 md:pl-(--app-left-offset,16rem)">
        <Breadcrumbs items={[{ label: "Developer Tools" }]} />
        <section className="rounded-4xl border border-(--border) bg-white/80 p-6 shadow-sm sm:p-10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-(--muted)">Practical Developer Resource</p>
          <h1 className="mt-2 font-serif text-3xl italic text-(--ink) sm:text-5xl lg:text-6xl">
            Streamline your workflow with private, browser-native tools.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-(--muted) sm:text-lg">
            DevTools Hub provides browser-based utilities and technical guides for common development tasks. Tool inputs are processed in your browser; when signed in, tools that support history can also send input and output to your account history.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="rounded-xl bg-(--ink) px-5 py-3 font-mono text-sm uppercase tracking-widest text-(--bg) transition hover:opacity-90"
            >
              Explore all tools
            </Link>
            <Link href="/blog" className="rounded-xl border border-(--border) bg-white px-5 py-3 font-mono text-sm uppercase tracking-widest text-(--ink) transition hover:bg-slate-50">
              Read guides
            </Link>
          </div>
        </section>

        <section aria-label="Why use DevTools Hub" className="mt-8 grid gap-4 md:grid-cols-3">
          {heroHighlights.map((item) => (
            <div key={item.title} className="rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
              <h3 className="font-serif text-xl italic text-(--ink)">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-(--muted)">{item.description}</p>
            </div>
          ))}
        </section>

        <section aria-label="Core developer utilities" className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-(--border) pb-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-(--muted)">Toolbox</p>
              <h2 className="mt-2 font-serif text-3xl italic text-(--ink)">Core Utilities</h2>
            </div>
            <Link href="/tools" className="text-sm font-semibold text-(--ink) hover:underline">
              Browse the full directory →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {toolCatalog.slice(0, 6).map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group flex flex-col justify-between rounded-3xl border border-(--border) bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <h3 className="font-serif text-xl italic text-(--ink) group-hover:underline">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-(--muted)">{tool.description}</p>
                </div>
                <span className="mt-4 inline-flex text-xs font-mono uppercase tracking-widest text-(--muted)">Open Tool →</span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-label="Latest learning paths" className="mt-16">
          <div className="border-b border-(--border) pb-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-(--muted)">Learning</p>
            <h2 className="mt-2 font-serif text-3xl italic text-(--ink)">Educational Paths</h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featuredLearningPaths.map((path) => (
              <article key={path.title} className="flex flex-col justify-between rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
                <div>
                  <h3 className="font-serif text-xl italic text-(--ink)">{path.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-(--muted)">{path.description}</p>
                </div>
                <Link href={path.href} className="mt-6 inline-flex items-center text-sm font-bold text-(--ink) hover:underline">
                  Read Guide <span className="ml-1 text-xs">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section aria-label="Recent blog posts" className="mt-16 rounded-4xl border border-(--border) bg-slate-50 p-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-(--border)/50 pb-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-(--muted)">Latest Updates</p>
              <h2 className="mt-2 font-serif text-3xl italic text-(--ink)">Technical Blog</h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-(--ink) hover:underline">
              View all posts →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {blogPosts.slice(0, 4).map((post) => (
              <article key={post.slug} className="group rounded-3xl border border-(--border) bg-white p-6 transition hover:shadow-md">
                <p className="font-mono text-[10px] text-(--muted)">{post.publishedAt} • {post.readingMinutes} min read</p>
                <h3 className="mt-2 font-serif text-xl italic text-(--ink) group-hover:underline">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-(--muted)">{post.description}</p>
                <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex rounded-lg bg-(--ink) px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-(--bg)">
                  Read Full Post
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
