import type { Metadata } from "next";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { Suspense } from "react";
import Script from "next/script";
import Link from "next/link";
import { toolCatalog } from "@/lib/toolCatalog";
import { DEFAULT_OG_IMAGE, SITE_BRAND, SITE_NAME, SITE_URL } from "@/lib/site";

const searchActionUrl = `${SITE_URL}/tools?q={search_term_string}`;

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Browser-first developer tools for formatting JSON, decoding JWTs, testing regex, generating UUIDs, previewing Markdown, creating gradients, and converting images to Base64.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: DEFAULT_OG_IMAGE,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: searchActionUrl,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_BRAND,
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    sameAs: [SITE_URL],
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
    "Free browser-native developer tools for JSON formatting, JWT decoding, Base64 conversion, regex testing, UUID generation, gradient creation, Markdown preview, and image-to-Base64 conversion.",
  keywords: [
    "developer tools",
    "json formatter",
    "jwt decoder",
    "base64 converter",
    "regex tester",
    "uuid generator",
    "markdown preview",
    "image to base64",
    "json formatter online free",
    "base64 encoder online",
    "regex tester javascript tool",
    "uuid generator online",
    "markdown preview online",
    "css gradient generator online",
    "image to base64 converter online",
    "html formatter online free",
    "developer tools online free",
  ],
  authors: [{ name: SITE_BRAND }],
  themeColor: "#e7e4dc",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DevTools Hub - Free Online Developer Tools",
    description:
      "A complete toolkit for developers: JSON Formatter, JWT Decoder, Base64 Converter, Regex Tester, UUID Generator, Markdown Preview, Gradient Marker, and Image to Base64.",
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
    title: "DevTools Hub - Free Online Developer Tools",
    description:
      "Use JSON Formatter, JWT Decoder, Base64 Converter, Regex Tester, UUID Generator, Markdown Preview, Gradient Marker, and Image to Base64.",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RCXG9GNY5X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RCXG9GNY5X');
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
        <footer className="border-t border-[var(--border)] bg-white/70">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 transition-[padding] duration-300 sm:px-6 md:pl-[var(--app-left-offset,16rem)]">
            <div>
              <p className="font-serif text-xl italic text-[var(--ink)]">{SITE_NAME}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Free online developer tools built for fast debugging and daily engineering workflows.
              </p>
            </div>
            <nav aria-label="Footer links" className="flex flex-wrap gap-2">
              <Link href="/" className="rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--ink)]">
                Home
              </Link>
              <Link
                href="/tools"
                className="rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--ink)]"
              >
                All Tools
              </Link>
              <Link href="/blog" className="rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--ink)]">
                Blog
              </Link>
              {toolCatalog.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--ink)]"
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
