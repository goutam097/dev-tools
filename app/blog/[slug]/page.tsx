import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, blogPostsBySlug } from "@/lib/blogPosts";
import { toolCatalogBySlug } from "@/lib/toolCatalog";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";
import SidebarScaffold from "@/components/SidebarScaffold";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 86400;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsBySlug[slug];

  if (!post) {
    return {};
  }

  const canonical = `${SITE_URL}/blog/${post.slug}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: post.title,
    description: post.description,
    keywords: [post.targetKeyword, "developer tools online free", "technical seo for developers"],
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      siteName: SITE_NAME,
      type: "article",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${post.title} share image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPostsBySlug[slug];

  if (!post) {
    notFound();
  }

  const relatedToolLinks = post.relatedTools
    .map((slugOrRoute) => {
      if (slugOrRoute === "tools") {
        return { href: "/tools", title: "All Tools Directory" };
      }

      const tool = toolCatalogBySlug[slugOrRoute];
      if (!tool) return null;
      return { href: `/tools/${tool.slug}`, title: tool.title };
    })
    .filter(Boolean) as { href: string; title: string }[];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "WebCodeveloper",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_OG_IMAGE,
      },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <SidebarScaffold title={post.title}>
      <main className="mx-auto min-h-screen max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <header>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
          Published {post.publishedAt} | {post.readingMinutes} min read
        </p>
        <h1 className="mt-2 font-serif text-3xl italic text-[var(--ink)] sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">{post.description}</p>
      </header>

      <section className="mt-8 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
        {post.intro.map((paragraph) => (
          <p key={paragraph} className="mb-4 text-sm leading-7 text-[var(--muted)] last:mb-0">
            {paragraph}
          </p>
        ))}
      </section>

      {post.sections.map((section) => (
        <section key={section.heading} className="mt-8 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-[var(--ink)]">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-sm leading-7 text-[var(--muted)]">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      {relatedToolLinks.length > 0 && (
        <section className="mt-8 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-[var(--ink)]">Related Tools</h2>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Apply the concepts from this article with the linked tools below.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedToolLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--ink)]"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      )}
      </main>
    </SidebarScaffold>
  );
}

