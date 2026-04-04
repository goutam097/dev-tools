import type { Metadata } from "next";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { Suspense } from "react";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName = "DevTools Hub";
// const defaultOgImage = `${siteUrl}/og-default.svg`;
const defaultOgImage =
  "https://raw.githubusercontent.com/goutam097/dev-tools/8b2f0270e309b99fa218a60e523712b91268cd79/public/og-default.svg";
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
    "developer tools online",
    "free developer tools",
    "web developer tools",
    "online coding tools",
    "developer utilities free",
    "json formatter online free",
    "json beautifier tool",
    "json validator online",
    "format json online",
    "json pretty print tool",
    "fix invalid json online",
    "jwt decoder online",
    "decode jwt token online",
    "jwt debugger tool",
    "jwt parser online",
    "verify jwt token online",
    "jwt token viewer",
    "base64 encode decode online",
    "base64 to image converter",
    "image to base64 converter online",
    "base64 string decoder",
    "encode file to base64",
    "regex tester online free",
    "regular expression tester",
    "regex validator tool",
    "test regex online",
    "regex pattern checker",
    "uuid generator online",
    "generate uuid v4 online",
    "random uuid generator",
    "unique id generator tool",
    "markdown preview online",
    "markdown editor live preview",
    "markdown to html converter",
    "online markdown viewer",
    "image to base64 online",
    "convert image to base64 string",
    "image encoder online tool",
    "css gradient generator online",
    "gradient maker tool",
    "css gradient background generator",
    "how to format json online",
    "how to decode jwt token",
    "convert image to base64 online",
    "how to test regex online",
    "generate uuid for database",
    "how to preview markdown online",
    "free json formatter and validator online",
    "decode jwt token without secret online",
    "best regex tester for developers",
    "online base64 encoder and decoder tool",
    "live markdown editor with preview",
    "fast uuid generator online free"
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
      </body>
    </html>
  );
}
