import type { Metadata } from "next";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { Suspense } from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName = "DevTools Hub";
const defaultOgImage = `${siteUrl}/og-default.svg`;
const searchActionUrl = `${siteUrl}/tools?q={search_term_string}`;

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description:
      "Browser-first developer tools for formatting JSON, decoding JWTs, testing regex, generating UUIDs, previewing Markdown, creating gradients, and converting images to Base64.",
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: defaultOgImage,
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
    name: "WebCodeveloper",
    url: siteUrl,
    logo: defaultOgImage,
    sameAs: [siteUrl],
  },
];
const structuredDataJson = JSON.stringify(structuredData);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
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
    "gradient marker",
  ],
  authors: [{ name: "WebCodeveloper" }],
  themeColor: "#e7e4dc",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DevTools Hub - Free Online Developer Tools",
    description:
      "A complete toolkit for developers: JSON Formatter, JWT Decoder, Base64 Converter, Regex Tester, UUID Generator, Markdown Preview, Gradient Marker, and Image to Base64.",
    type: "website",
    url: siteUrl,
    siteName,
    images: [
      {
        url: defaultOgImage,
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
    images: [defaultOgImage],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
