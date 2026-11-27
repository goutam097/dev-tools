import type { MetadataRoute } from "next";
import { toolCatalog } from "@/lib/toolCatalog";
import { blogPosts } from "@/lib/blogPosts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/tools`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/image-tools`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/image-pdf-tools`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/pdf-tools`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/author`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-and-conditions`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/editorial-policy`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/content-update-policy`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/code-testing-policy`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const toolUrls: MetadataRoute.Sitemap = toolCatalog.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: new Date(tool.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const imageToolSlugs = [
    "image-resizer",
    "image-resizer-to-kb",
    "image-resizer-to-pixels",
    "image-resizer-for-social-media",
    "image-compressor",
    "compress-jpg",
    "compress-png",
    "compress-webp",
    "compress-image-to-100kb",
    "compress-image-to-50kb",
    "resize-image-to-500-kb",
    "bulk-image-compressor",
    "image-converter",
    "jpg-to-png",
    "png-to-jpg",
    "jpg-to-webp",
    "png-to-webp",
    "webp-to-jpg",
    "webp-to-png",
    "ai-image-upscaler",
    "background-remover",
    "ai-image-enhancer",
    "ai-photo-editor",
  ];
  const pdfToolSlugs = ["merge-pdf", "split-pdf", "rotate-pdf", "jpg-to-pdf"];
  const newToolUrls: MetadataRoute.Sitemap = [
    ...imageToolSlugs.map((slug) => ({
      url: `${SITE_URL}/image-tools/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...pdfToolSlugs.map((slug) => ({
      url: `${SITE_URL}/pdf-tools/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return [...staticPages, ...toolUrls, ...newToolUrls, ...blogUrls];
}
