import type { Metadata } from "next";
import Link from "next/link";
// import { notFound } from "next/navigation";
import Base64Converter from "@/components/Base64Converter";
import GradientGenerator from "@/components/GradientGenerator";
import ImageBase64Converter from "@/components/ImageBase64Converter";
import JSONFormatter from "@/components/JSONFormatter";
import JWTDecoder from "@/components/JWTDecoder";
import MarkdownConverter from "@/components/MarkdownConverter";
import RegexTester from "@/components/RegexTester";
import UUIDGenerator from "@/components/UUIDGenerator";
import { toolCatalog, toolCatalogBySlug } from "@/lib/toolCatalog";
import NotFound from "@/app/not-found";

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function ToolRenderer({ slug }: { slug: string }) {
  switch (slug) {
    case "json-formatter":
      return <JSONFormatter />;
    case "jwt-decoder":
      return <JWTDecoder />;
    case "base64-converter":
      return <Base64Converter />;
    case "regex-tester":
      return <RegexTester />;
    case "uuid-generator":
      return <UUIDGenerator />;
    case "markdown-preview":
      return <MarkdownConverter />;
    case "gradient-marker":
      return <GradientGenerator />;
    case "image-to-base64":
      return <ImageBase64Converter />;
    default:
      return null;
  }
}

export function generateStaticParams() {
  return toolCatalog.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolCatalogBySlug[slug];

  if (!tool) {
    return {};
  }

  const canonical = `${SITE_URL}/tools/${tool.slug}`;
  const title = `${tool.title} - Free Online Developer Tool`;

  return {
    title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description: tool.description,
      type: "website",
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: tool.description,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = toolCatalogBySlug[slug];

  if (!tool) {
    // notFound();
    <NotFound />
  }

  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description: tool.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: `${SITE_URL}/tools/${tool.slug}`,
  };

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />

      <header className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">Developer Utility</p>
        <h1 className="mt-2 font-serif text-3xl italic text-[var(--ink)] sm:text-4xl">{tool.title}</h1>
        <p className="mt-3 max-w-3xl text-sm text-[var(--muted)]">{tool.description}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 font-mono text-xs uppercase tracking-widest text-[var(--ink)]"
          >
            All tools
          </Link>
          <Link
            href="/"
            className="rounded-lg bg-[var(--ink)] px-3 py-2 font-mono text-xs uppercase tracking-widest text-[var(--bg)]"
          >
            Open app
          </Link>
        </div>
      </header>

      <section aria-label={tool.shortTitle}>
        <ToolRenderer slug={slug} />
      </section>
    </main>
  );
}
