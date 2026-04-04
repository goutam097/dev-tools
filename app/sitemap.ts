import type { MetadataRoute } from "next";
import { toolCatalog } from "@/lib/toolCatalog";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
// const defaultOgImage = `${siteUrl}/og-default.svg`;
const defaultOgImage = 'https://raw.githubusercontent.com/goutam097/dev-tools/8b2f0270e309b99fa218a60e523712b91268cd79/public/og-default.svg';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const toolUrls = toolCatalog.map((tool) => ({
    url: `${siteUrl}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: [defaultOgImage],
  }));

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [defaultOgImage],
    },
    {
      url: `${siteUrl}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [defaultOgImage],
    },
    ...toolUrls,
  ];
}
