import type { Metadata } from "next";
import Link from "next/link";
import { toolCatalog } from "@/lib/toolCatalog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const defaultOgImage = `${siteUrl}/og-default.svg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Free Developer Tools | DevTools Hub",
  description:
    "Browse the entire DevTools Hub catalog for JSON formatting, JWT decoding, Base64 conversions, regex testing, UUID generation, Markdown preview, gradient creation, and image-to-Base64 conversion.",
  keywords: [
    "free developer tools",
    "json formatter",
    "jwt decoder",
    "base64 converter",
    "regex tester",
    "uuid generator",
    "markdown preview",
    "image to base64",
  ],
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "Free Developer Tools | DevTools Hub",
    description:
      "DevTools Hub centralizes every utility you need for JSON, JWT, Base64, regex, UUID, Markdown, gradient, and image conversion work.",
    url: `${siteUrl}/tools`,
    siteName: "DevTools Hub",
    type: "website",
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "DevTools Hub tools catalog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Developer Tools | DevTools Hub",
    description:
      "DevTools Hub centralizes every utility you need for JSON, JWT, Base64, regex, UUID, Markdown, gradient, and image conversion work.",
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolsIndexPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-serif text-3xl italic text-[var(--ink)] sm:text-4xl">Free Developer Tools</h1>
      <p className="mt-3 max-w-3xl text-sm text-[var(--muted)]">
        Fast browser tools for developers. Pick a utility below and start using it immediately.
      </p>

      <section className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2">
        {toolCatalog.map((tool) => (
          <article key={tool.slug} className="rounded-2xl border border-[var(--border)] bg-white p-5">
            <h2 className="font-serif text-2xl italic text-[var(--ink)]">{tool.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{tool.description}</p>
            <Link
              href={`/tools/${tool.slug}`}
              className="mt-4 inline-flex rounded-lg bg-[var(--ink)] px-3 py-2 font-mono text-xs uppercase tracking-widest text-[var(--bg)]"
            >
              Open tool
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
