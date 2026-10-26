import type { Metadata, Viewport } from "next";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { Suspense } from "react";
import Script from "next/script";
import Link from "next/link";
import { toolCatalog } from "@/lib/toolCatalog";
import { DEFAULT_OG_IMAGE, SITE_BRAND, SITE_NAME, SITE_URL } from "@/lib/site";
import { getAnalyticsConfig } from "@/lib/analytics";

const { gaMeasurementId } = getAnalyticsConfig();
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Browser-based utilities for formatting and validating developer data, encoding text, generating frontend snippets, and common engineering workflows.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: DEFAULT_OG_IMAGE,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_BRAND,
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "support",
      email: "webcodeveloper731@gmail.com",
    },
  },
];
const structuredDataJson = JSON.stringify(structuredData);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "DevTools Hub - Free Online Developer Tools",
    template: "%s | DevTools Hub",
  },
  description:
    "Free browser-based tools for data cleanup and validation, scheduling, QR codes, frontend layouts, page metadata, and common developer workflows.",
  authors: [{ name: SITE_BRAND, url: SITE_URL }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DevTools Hub - Developer Tools and Practical Guides",
    description:
      "Use practical tools for data cleanup, validation, schedules, QR codes, frontend layouts, and common developer workflows.",
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "DevTools Hub share card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTools Hub - Developer Tools and Practical Guides",
    description: "Use practical tools for common developer tasks and browse concise technical guides.",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    // icon: "/favicon.webp",
    // shortcut: "/favicon.webp",
    // apple: "/favicon.webp",
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  verification: {
    google: "HrN1X_laGO1ECJ9OddudyNdwhHSpTRGTowVqVqIAvBM",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#e7e4dc",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4344677734190475" />
        {/* Google AdSense */}
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4344677734190475"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}', { send_page_view: false });
          `}
        </Script>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
        <footer className="border-t border-(--border) bg-white/70">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 transition-[padding] duration-300 sm:px-6 md:pl-(--app-left-offset,16rem)">
            <div>
              <p className="font-serif text-xl italic text-(--ink)">{SITE_NAME}</p>
              <p className="mt-2 text-sm text-(--muted)">
                Free online developer tools and educational guides published by WebCodeveloper for practical engineering workflows.
              </p>
              <p className="mt-2 text-sm text-(--muted)">
                Contact: <a href="mailto:webcodeveloper731@gmail.com" className="underline decoration-(--border) underline-offset-4">webcodeveloper731@gmail.com</a>
              </p>
              <p className="mt-2 text-sm text-(--muted)">
                This site may display Google AdSense advertising to support free access to tools and tutorials. Advertising does not influence the accuracy of our tool output or educational content.
              </p>
            </div>
            <nav aria-label="Footer links" className="flex flex-wrap gap-2">
              <Link href="/" className="rounded-md border border-(--border) px-3 py-2 text-sm text-(--ink)">
                Home
              </Link>
              <Link
                href="/tools"
                className="rounded-md border border-(--border) px-3 py-2 text-sm text-(--ink)"
              >
                All Tools
              </Link>
              <Link href="/blog" className="rounded-md border border-(--border) px-3 py-2 text-sm text-(--ink)">
                Blog
              </Link>
              <Link href="/about" className="rounded-md border border-(--border) px-3 py-2 text-sm text-(--ink)">
                About
              </Link>
              <Link href="/contact" className="rounded-md border border-(--border) px-3 py-2 text-sm text-(--ink)">
                Contact
              </Link>
              <Link href="/author" className="rounded-md border border-(--border) px-3 py-2 text-sm text-(--ink)">
                Author
              </Link>
              <Link href="/editorial-policy" className="rounded-md border border-(--border) px-3 py-2 text-sm text-(--ink)">
                Editorial Policy
              </Link>
              <Link href="/content-update-policy" className="rounded-md border border-(--border) px-3 py-2 text-sm text-(--ink)">
                Update Policy
              </Link>
              <Link href="/code-testing-policy" className="rounded-md border border-(--border) px-3 py-2 text-sm text-(--ink)">
                Code Testing Policy
              </Link>
              <Link href="/privacy-policy" className="rounded-md border border-(--border) px-3 py-2 text-sm text-(--ink)">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="rounded-md border border-(--border) px-3 py-2 text-sm text-(--ink)">
                Terms
              </Link>
              <Link href="/disclaimer" className="rounded-md border border-(--border) px-3 py-2 text-sm text-(--ink)">
                Disclaimer
              </Link>
              {toolCatalog.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="rounded-md border border-(--border) px-3 py-2 text-sm text-(--ink)"
                >
                  {tool.shortTitle}
                </Link>
              ))}
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
