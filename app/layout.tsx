import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DevTools Hub - Free Online Developer Tools",
    template: "%s | DevTools Hub",
  },
  description:
    "Free online developer tools including JSON Formatter, JWT Decoder, Base64 Converter, Regex Tester, UUID Generator, Markdown Preview, Gradient Marker, and Image to Base64.",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DevTools Hub - Free Online Developer Tools",
    description:
      "A complete toolkit for developers: JSON Formatter, JWT Decoder, Base64 Converter, Regex Tester, UUID Generator, Markdown Preview, Gradient Marker, and Image to Base64.",
    type: "website",
    url: siteUrl,
    siteName: "DevTools Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTools Hub - Free Online Developer Tools",
    description:
      "Use JSON Formatter, JWT Decoder, Base64 Converter, Regex Tester, UUID Generator, Markdown Preview, Gradient Marker, and Image to Base64.",
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
      <body className={`${manrope.variable} ${jetBrainsMono.variable} ${cormorant.variable} antialiased`}>
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
