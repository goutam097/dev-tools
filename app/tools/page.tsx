import type { Metadata } from "next";
import Link from "next/link";
import { toolCatalog } from "@/lib/toolCatalog";

export const metadata: Metadata = {
  title: "Free Developer Tools",
  description:
    "Use free online developer tools: JSON Formatter, JWT Decoder, Base64 Converter, Regex Tester, UUID Generator, Markdown Preview, Gradient Marker, and Image to Base64.",
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
