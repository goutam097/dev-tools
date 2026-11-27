import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SidebarScaffold from "@/components/SidebarScaffold";
import Breadcrumbs from "@/components/Breadcrumbs";
import PDFToolsSuite, { type PDFToolMode } from "@/components/PDFToolsSuite";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

const routeConfig: Record<string, { title: string; description: string; mode: PDFToolMode }> = {
  "merge-pdf": { title: "Merge PDF", description: "Combine two or more PDF documents into one downloadable PDF.", mode: "merge" },
  "split-pdf": { title: "Split PDF", description: "Extract selected PDF pages into a new document.", mode: "split" },
  "rotate-pdf": { title: "Rotate PDF", description: "Rotate every page in a PDF and download the updated file.", mode: "rotate" },
  "jpg-to-pdf": { title: "JPG to PDF", description: "Convert JPG or PNG images into a single PDF document.", mode: "jpg-to-pdf" },
};

export function generateStaticParams() {
  return Object.keys(routeConfig).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = routeConfig[slug];
  if (!config) return {};
  const canonical = `${SITE_URL}/pdf-tools/${slug}`;
  return { title: config.title, description: config.description, alternates: { canonical }, openGraph: { title: config.title, description: config.description, url: canonical, siteName: SITE_NAME, type: "website" } };
}

export default async function PDFToolPage({ params }: Props) {
  const { slug } = await params;
  const config = routeConfig[slug];
  if (!config) notFound();
  return (
    <SidebarScaffold title={config.title}>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Breadcrumbs items={[{ label: "PDF Tools", href: "/pdf-tools" }, { label: config.title }]} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: config.title, url: `${SITE_URL}/pdf-tools/${slug}`, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />
        <h1 className="font-serif text-3xl italic sm:text-4xl">{config.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-(--muted)">{config.description} Processing happens locally in the browser with pdf-lib.</p>
        <section className="mt-8"><PDFToolsSuite mode={config.mode} /></section>
        <section className="mt-10 rounded-3xl border border-(--border) bg-white p-6"><h2 className="font-serif text-2xl italic">How to Use</h2><ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-(--muted)"><li>Select the PDF or image files required for this operation.</li><li>Enter page or rotation settings when applicable.</li><li>Process the file and review the progress status.</li><li>Download the generated document.</li></ol></section>
        <section className="mt-6 rounded-3xl border border-(--border) bg-white p-6"><h2 className="font-serif text-2xl italic">Frequently Asked Questions</h2><div className="mt-4 space-y-4 text-sm leading-7 text-(--muted)"><div><h3 className="text-base font-semibold text-(--ink)">Are PDF files uploaded?</h3><p>No. Supported operations run locally in this browser using pdf-lib.</p></div><div><h3 className="text-base font-semibold text-(--ink)">Can I process password-protected PDFs?</h3><p>No. Remove password protection only if you are authorized to modify it, then upload the unlocked PDF.</p></div></div></section>
      </main>
    </SidebarScaffold>
  );
}
