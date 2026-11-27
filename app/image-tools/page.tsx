import type { Metadata } from "next";
import Link from "next/link";
import SidebarScaffold from "@/components/SidebarScaffold";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Image Tools - Resizer, Compressor and Converter",
  description: "Resize, compress, and convert images privately in your browser with free image tools.",
  alternates: { canonical: "/image-tools" },
  openGraph: { title: "Free Image Tools", description: "Resize, compress, and convert images in your browser.", url: `${SITE_URL}/image-tools`, siteName: SITE_NAME, type: "website" },
};

const tools = [
  { href: "/image-tools/image-resizer", title: "Image Resizer", text: "Set exact pixel dimensions or use social presets." },
  { href: "/image-tools/image-compressor", title: "Image Compressor", text: "Reduce JPG or PNG file size with quality controls." },
  { href: "/image-tools/image-converter", title: "Image Converter", text: "Convert images to JPG, PNG or WebP." },
  { href: "/tools/image-to-base64", title: "Image to Base64", text: "Create a Base64 data URI from an image." },
];

export default function ImageToolsPage() {
  return (
    <SidebarScaffold title="Image Tools">
      <main className="mx-auto max-w-5xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Image Tools" }]} />
        <header><p className="font-mono text-[10px] uppercase tracking-widest text-(--muted)">Browser-based image utilities</p><h1 className="mt-2 font-serif text-4xl italic">Free Image Tools</h1><p className="mt-3 max-w-3xl text-sm leading-7 text-(--muted)">Resize, compress, and convert common image formats without uploading files to a server.</p></header>
        <div className="mt-8 grid gap-4 md:grid-cols-2">{tools.map((tool) => <article key={tool.href} className="rounded-3xl border border-(--border) bg-white p-6 shadow-sm"><h2 className="font-serif text-2xl italic">{tool.title}</h2><p className="mt-2 text-sm text-(--muted)">{tool.text}</p><Link href={tool.href} className="tool-btn-primary mt-5">Open tool</Link></article>)}</div>
      </main>
    </SidebarScaffold>
  );
}
