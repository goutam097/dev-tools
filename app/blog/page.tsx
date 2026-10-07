import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";
import SidebarScaffold from "@/components/SidebarScaffold";
import AdSenseSlot from "@/components/AdSenseSlot";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Developer Guides | DevTools Hub",
  description:
    "Read practical guides about JSON formatting, Base64 encoding, and common developer workflows.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Developer Guides | DevTools Hub",
    description:
      "Explanations and examples for common developer tools and workflows.",
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "DevTools Hub blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Guides | DevTools Hub",
    description: "Guides about developer tools and practical workflows.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogIndexPage() {
  return (
    <SidebarScaffold title="Developer Blog">
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <h1 className="font-serif text-3xl italic text-(--ink) sm:text-4xl">Developer Guides</h1>
      <p className="mt-3 max-w-3xl text-sm text-(--muted)">
        Practical explanations and examples for common developer tasks, with links to tools where they help you try a workflow.
      </p>

      <AdSenseSlot slot="1111111111" />

      <section className="mt-8 grid gap-4 md:mt-10">
        {blogPosts.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-(--border) bg-white p-5">
            <h2 className="mt-2 font-serif text-2xl italic text-(--ink)">{post.title}</h2>
            <p className="mt-2 text-sm text-(--muted)">{post.description}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex rounded-lg bg-(--ink) px-3 py-2 font-mono text-xs uppercase tracking-widest text-(--bg)"
              >
                Read article
              </Link>
              <Link href="/tools" className="inline-flex rounded-lg border border-(--border) px-3 py-2 font-mono text-xs uppercase tracking-widest text-(--ink)">
                Related tools
              </Link>
            </div>
          </article>
        ))}
      </section>
      </main>
    </SidebarScaffold>
  );
}
