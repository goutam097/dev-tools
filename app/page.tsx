import DevToolsApp from "@/components/DevToolsApp";
import Link from "next/link";
import { toolCatalog } from "@/lib/toolCatalog";

export default function HomePage() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DevTools Hub",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    potentialAction: {
      "@type": "SearchAction",
      target: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/tools?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-8 transition-[padding] duration-300 sm:px-6 sm:py-10 md:pl-[var(--app-left-offset,1rem)]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

        <h1 className="font-serif text-3xl italic text-[var(--ink)] sm:text-4xl">DevTools Hub</h1>
        <p className="mt-3 max-w-3xl text-sm text-[var(--muted)]">
          Free developer tools for JSON formatting, JWT decoding, Base64 conversion, regex testing, UUID generation,
          Markdown preview, CSS gradient creation, and image to Base64 conversion.
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
      </main>
      <DevToolsApp />
    </>
  );
}
