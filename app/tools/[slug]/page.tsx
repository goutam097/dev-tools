import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Base64Converter from "@/components/Base64Converter";
import GradientGenerator from "@/components/GradientGenerator";
import ImageBase64Converter from "@/components/ImageBase64Converter";
import JSONFormatter from "@/components/JSONFormatter";
import JWTDecoder from "@/components/JWTDecoder";
import MarkdownConverter from "@/components/MarkdownConverter";
import RegexTester from "@/components/RegexTester";
import UUIDGenerator from "@/components/UUIDGenerator";
import HTMLFormatter from "@/components/HTMLFormatter";
import { toolCatalog, toolCatalogBySlug } from "@/lib/toolCatalog";
import { buildToolKeywords, toolSeoContentBySlug } from "@/lib/toolSeoContent";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";
import SidebarScaffold from "@/components/SidebarScaffold";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 86400;

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
    case "html-formatter":
      return <HTMLFormatter />;
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
  const seoContent = toolSeoContentBySlug[slug];

  if (!tool || !seoContent) {
    return {};
  }

  const canonical = `${SITE_URL}/tools/${tool.slug}`;
  const title = seoContent.metaTitle;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: seoContent.metaDescription,
    keywords: buildToolKeywords(tool, seoContent.primaryKeyword),
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description: seoContent.metaDescription,
      type: "article",
      url: canonical,
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${tool.title} share card`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: seoContent.metaDescription,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = toolCatalogBySlug[slug];
  const seoContent = toolSeoContentBySlug[slug];

  if (!tool || !seoContent) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/tools/${tool.slug}`;
  const relatedTools = seoContent.relatedSlugs
    .map((relatedSlug) => toolCatalogBySlug[relatedSlug])
    .filter(Boolean)
    .slice(0, 3);

  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description: seoContent.metaDescription,
    url: canonicalUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seoContent.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${SITE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <SidebarScaffold title={tool.title}>
      <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <header className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">Developer Utility</p>
        <h1 className="mt-2 font-serif text-3xl italic text-[var(--ink)] sm:text-4xl">{seoContent.metaTitle}</h1>
        <p className="mt-3 max-w-3xl text-sm text-[var(--muted)]">{seoContent.metaDescription}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 font-mono text-xs uppercase tracking-widest text-[var(--ink)]"
          >
            All tools
          </Link>
          <Link
            href="/blog"
            className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 font-mono text-xs uppercase tracking-widest text-[var(--ink)]"
          >
            SEO blog
          </Link>
          <Link
            href="/"
            className="rounded-lg bg-[var(--ink)] px-3 py-2 font-mono text-xs uppercase tracking-widest text-[var(--bg)]"
          >
            Open app shell
          </Link>
        </div>
      </header>

      <section aria-label={tool.shortTitle}>
        <ToolRenderer slug={slug} />
      </section>

      <section className="mt-10 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
        {seoContent.intro.map((paragraph) => (
          <p key={paragraph} className="mb-4 text-sm leading-7 text-[var(--muted)] last:mb-0">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mt-10 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
        <h2 className="font-serif text-2xl italic text-[var(--ink)]">How to Use This Tool</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-[var(--muted)]">
          {seoContent.howToSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      {seoContent.sections.map((section) => (
        <section key={section.heading} className="mt-10 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-[var(--ink)]">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-sm leading-7 text-[var(--muted)]">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      <section className="mt-10 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
        <h2 className="font-serif text-2xl italic text-[var(--ink)]">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-4">
          {seoContent.faqs.map((faq) => (
            <article key={faq.question}>
              <h3 className="font-serif text-xl italic text-[var(--ink)]">{faq.question}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      {relatedTools.length > 0 && (
        <section className="mt-10 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-[var(--ink)]">Related Developer Tools</h2>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Explore these related utilities to complete your workflow faster and help search engines discover connected pages.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedTools.map((relatedTool) => (
              <Link
                key={relatedTool.slug}
                href={`/tools/${relatedTool.slug}`}
                className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--ink)]"
              >
                {relatedTool.title}
              </Link>
            ))}
          </div>
        </section>
      )}
      </main>
    </SidebarScaffold>
  );
}
