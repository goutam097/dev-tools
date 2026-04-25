import type { MetadataRoute } from "next";
import { toolCatalog } from "@/lib/toolCatalog";
import { blogPosts } from "@/lib/blogPosts";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const toolUrls = toolCatalog.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: [DEFAULT_OG_IMAGE],
  }));

  const blogUrls = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: [DEFAULT_OG_IMAGE],
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [DEFAULT_OG_IMAGE],
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [DEFAULT_OG_IMAGE],
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      images: [DEFAULT_OG_IMAGE],
    },
    ...toolUrls,
    ...blogUrls,
  ];
}
