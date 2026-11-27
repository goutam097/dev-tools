import type { Metadata } from "next";
import Link from "next/link";
import SidebarScaffold from "@/components/SidebarScaffold";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free PDF Tools - Merge, Split and Convert PDFs",
  description: "Use browser-based PDF tools to merge, split, rotate and convert images to PDF.",
  alternates: { canonical: "/pdf-tools" },
  openGraph: { title: "Free PDF Tools", description: "Merge, split, rotate, and convert PDF files.", url: `${SITE_URL}/pdf-tools`, siteName: SITE_NAME, type: "website" },
};

const tools = [
  { href: "/pdf-tools/merge-pdf", title: "Merge PDF", text: "Combine multiple PDF documents into one file." },
  { href: "/pdf-tools/split-pdf", title: "Split PDF", text: "Extract selected pages into a new PDF." },
  { href: "/pdf-tools/rotate-pdf", title: "Rotate PDF", text: "Rotate every page by 90, 180 or 270 degrees." },
  { href: "/pdf-tools/jpg-to-pdf", title: "JPG to PDF", text: "Place JPG or PNG images into a PDF document." },
];

export default function PDFToolsPage() {
  return (
    <SidebarScaffold title="PDF Tools">
      <main className="mx-auto max-w-5xl px-4 py-10">
        <Breadcrumbs items={[{ label: "PDF Tools" }]} />
        <header><p className="font-mono text-[10px] uppercase tracking-widest text-(--muted)">Browser-based PDF utilities</p><h1 className="mt-2 font-serif text-4xl italic">Free PDF Tools</h1><p className="mt-3 max-w-3xl text-sm leading-7 text-(--muted)">Process PDF documents locally with pdf-lib. Files are not uploaded to a server by these tools.</p></header>
        <div className="mt-8 grid gap-4 md:grid-cols-2">{tools.map((tool) => <article key={tool.href} className="rounded-3xl border border-(--border) bg-white p-6 shadow-sm"><h2 className="font-serif text-2xl italic">{tool.title}</h2><p className="mt-2 text-sm text-(--muted)">{tool.text}</p><Link href={tool.href} className="tool-btn-primary mt-5">Open tool</Link></article>)}</div>
      </main>
    </SidebarScaffold>
  );
}
