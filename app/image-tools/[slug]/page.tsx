import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SidebarScaffold from "@/components/SidebarScaffold";
import Breadcrumbs from "@/components/Breadcrumbs";
import ImageToolsSuite, { type ImageToolMode } from "@/components/ImageToolsSuite";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

const routeConfig: Record<string, { title: string; description: string; mode: ImageToolMode; initialTargetKb?: number }> = {
  "image-resizer": { title: "Image Resizer", description: "Resize images to exact dimensions while keeping quality under your control.", mode: "resize" },
  "image-resizer-to-kb": { title: "Resize Image to KB", description: "Resize dimensions and choose quality to reduce image output size.", mode: "resize" },
  "image-resizer-to-pixels": { title: "Resize Image to Pixels", description: "Set a custom image width and height in pixels.", mode: "resize" },
  "image-resizer-for-social-media": { title: "Image Resizer for Social Media", description: "Resize an image for common social media and sharing dimensions.", mode: "resize" },
  "image-compressor": { title: "Image Compressor", description: "Compress JPG and PNG images and target a smaller file size.", mode: "compress" },
  "compress-jpg": { title: "Compress JPG Online", description: "Reduce JPG file size with browser-based quality controls.", mode: "compress" },
  "compress-png": { title: "Compress PNG Online", description: "Compress PNG images in your browser and download the result.", mode: "compress" },
  "compress-webp": { title: "Compress WebP Online", description: "Compress WebP image files with adjustable output quality.", mode: "compress" },
  "compress-image-to-100kb": { title: "Compress Image to 100KB", description: "Aim for a 100 KB image output using quality-based compression.", mode: "compress" },
  "compress-image-to-50kb": { title: "Compress Image to 50KB", description: "Aim for a 50 KB image output using quality-based compression.", mode: "compress" },
  "resize-image-to-500-kb": { title: "Resize Image to 500 KB", description: "Resize and compress an image to a maximum target size of 500 KB.", mode: "compress", initialTargetKb: 500 },
  "bulk-image-compressor": { title: "Bulk Image Compressor", description: "Compress multiple images and download individual results or a ZIP.", mode: "compress" },
  "image-converter": { title: "Image Converter", description: "Convert JPG, PNG and WebP images in the browser.", mode: "convert" },
  "jpg-to-png": { title: "JPG to PNG Converter", description: "Convert JPG images to PNG format online.", mode: "convert" },
  "png-to-jpg": { title: "PNG to JPG Converter", description: "Convert PNG images to JPG format online.", mode: "convert" },
  "jpg-to-webp": { title: "JPG to WebP Converter", description: "Convert JPG images to efficient WebP files.", mode: "convert" },
  "png-to-webp": { title: "PNG to WebP Converter", description: "Convert PNG images to WebP format online.", mode: "convert" },
  "webp-to-jpg": { title: "WebP to JPG Converter", description: "Convert WebP images to JPG format in your browser.", mode: "convert" },
  "webp-to-png": { title: "WebP to PNG Converter", description: "Convert WebP images to PNG format in your browser.", mode: "convert" },
  "ai-image-upscaler": { title: "AI Image Upscaler", description: "AI image upscaling requires a compatible external image model API.", mode: "resize" },
  "background-remover": { title: "AI Background Remover", description: "Automatic background removal requires a compatible external AI API.", mode: "convert" },
  "ai-image-enhancer": { title: "AI Image Enhancer", description: "AI enhancement requires a compatible external image model API.", mode: "resize" },
  "ai-photo-editor": { title: "AI Photo Editor", description: "Generative photo editing requires a compatible external AI API.", mode: "resize" },
};

export function generateStaticParams() {
  return Object.keys(routeConfig).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = routeConfig[slug];
  if (!config) return {};
  const canonical = `${SITE_URL}/image-tools/${slug}`;
  return { title: config.title, description: config.description, alternates: { canonical }, openGraph: { title: config.title, description: config.description, url: canonical, siteName: SITE_NAME, type: "website" }, twitter: { card: "summary_large_image", title: config.title, description: config.description } };
}

export default async function ImageToolPage({ params }: Props) {
  const { slug } = await params;
  const config = routeConfig[slug];
  if (!config) notFound();
  const requiresApi = slug === "ai-image-upscaler" || slug === "background-remover" || slug === "ai-image-enhancer" || slug === "ai-photo-editor";
  return (
    <SidebarScaffold title={config.title}>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Breadcrumbs items={[{ label: "Image Tools", href: "/image-tools" }, { label: config.title }]} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: config.title, url: `${SITE_URL}/image-tools/${slug}`, applicationCategory: "MultimediaApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />
        <h1 className="font-serif text-3xl italic sm:text-4xl">{config.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-(--muted)">{config.description} Processing uses browser APIs; uploaded files are not sent to our server.</p>
        {requiresApi ? (
          <section className="mt-8 rounded-3xl border border-amber-300 bg-amber-50 p-6">
            <h2 className="font-serif text-2xl italic text-(--ink)">API integration required</h2>
            <p className="mt-3 text-sm leading-7 text-(--muted)">This tool is reserved for a compatible external AI provider. It does not claim or perform AI processing locally. No uploaded image is processed or stored by this page until a provider is configured.</p>
          </section>
        ) : (
          <section className="mt-8"><ImageToolsSuite mode={config.mode} initialTargetKb={config.initialTargetKb} toolTitle={config.title} /></section>
        )}
        <section className="mt-10 rounded-3xl border border-(--border) bg-white p-6"><h2 className="font-serif text-2xl italic">How to Use</h2><ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-(--muted)"><li>Upload or drop one or more supported images.</li><li>Choose dimensions, size, quality, or output format.</li><li>Process the image and review the generated file details.</li><li>Download the result or a ZIP for multiple images.</li></ol></section>
        <section className="mt-6 rounded-3xl border border-(--border) bg-white p-6"><h2 className="font-serif text-2xl italic">Frequently Asked Questions</h2><div className="mt-4 space-y-4 text-sm leading-7 text-(--muted)"><div><h3 className="text-base font-semibold text-(--ink)">Are files uploaded to a server?</h3><p>No. Resizing, compression, and conversion run in the browser with local Canvas APIs.</p></div><div><h3 className="text-base font-semibold text-(--ink)">Which formats are supported?</h3><p>JPG, PNG, WebP, GIF, BMP and SVG inputs are accepted where the browser can decode them. HEIC/HEIF conversion requires native conversion before upload.</p></div></div></section>
      </main>
    </SidebarScaffold>
  );
}
