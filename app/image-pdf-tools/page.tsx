import type { Metadata } from "next";
import Link from "next/link";
import SidebarScaffold from "@/components/SidebarScaffold";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Image & PDF Tools Suite",
  description: "Resize and convert images, compress files, merge PDFs, split pages, rotate documents, and create PDFs in one browser-based suite.",
  alternates: { canonical: "/image-pdf-tools" },
  openGraph: {
    title: "Image & PDF Tools Suite",
    description: "A focused suite of free browser-based image and PDF tools.",
    url: `${SITE_URL}/image-pdf-tools`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const imageTools = [
  ["Image Resizer", "/image-tools/image-resizer"],
  ["Resize to Pixels", "/image-tools/image-resizer-to-pixels"],
  ["Social Media Resizer", "/image-tools/image-resizer-for-social-media"],
  ["Image Compressor", "/image-tools/image-compressor"],
  ["Compress to 100KB", "/image-tools/compress-image-to-100kb"],
  ["Resize to 500KB", "/image-tools/resize-image-to-500-kb"],
  ["Bulk Image Compressor", "/image-tools/bulk-image-compressor"],
  ["Image Converter", "/image-tools/image-converter"],
  ["JPG to PNG", "/image-tools/jpg-to-png"],
];

const pdfTools = [
  ["Merge PDF", "/pdf-tools/merge-pdf"],
  ["Split PDF", "/pdf-tools/split-pdf"],
  ["Rotate PDF", "/pdf-tools/rotate-pdf"],
  ["JPG to PDF", "/pdf-tools/jpg-to-pdf"],
];

export default function ImagePDFToolsPage() {
  return (
    <SidebarScaffold title="Image & PDF Tools">
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Image & PDF Tools Suite" }]} />
        <header>
          <p className="font-mono text-[10px] uppercase tracking-widest text-(--muted)">Browser-based productivity suite</p>
          <h1 className="mt-2 font-serif text-4xl italic">Image &amp; PDF Tools Suite</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-(--muted)">
            Choose a dedicated image or PDF category, then open the exact tool for your file operation. Processing is designed to happen in the browser without uploading files to a server.
          </p>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
            <p className="font-mono text-[10px] uppercase tracking-widest text-(--muted)">Image category</p>
            <h2 className="mt-2 font-serif text-3xl italic">Image Tools</h2>
            <p className="mt-2 text-sm text-(--muted)">Resize, compress, and convert images locally.</p>
            <Link href="/image-tools" className="tool-btn-primary mt-5">Browse all image tools</Link>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {imageTools.map(([title, href]) => (
                <Link key={href} href={href} className="rounded-xl border border-(--border) px-3 py-3 text-sm text-(--ink) transition hover:bg-slate-50">{title}</Link>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
            <p className="font-mono text-[10px] uppercase tracking-widest text-(--muted)">PDF category</p>
            <h2 className="mt-2 font-serif text-3xl italic">PDF Tools</h2>
            <p className="mt-2 text-sm text-(--muted)">Merge, split, rotate, and create PDFs locally.</p>
            <Link href="/pdf-tools" className="tool-btn-primary mt-5">Browse all PDF tools</Link>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {pdfTools.map(([title, href]) => (
                <Link key={href} href={href} className="rounded-xl border border-(--border) px-3 py-3 text-sm text-(--ink) transition hover:bg-slate-50">{title}</Link>
              ))}
            </div>
          </article>
        </div>
      </main>
    </SidebarScaffold>
  );
}
