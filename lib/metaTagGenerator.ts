export type MetaTagValues = {
  title: string;
  description: string;
  keywords: string;
  author: string;
  canonicalUrl: string;
  robots: string[];
  imageUrl: string;
  twitterCard: "summary" | "summary_large_image";
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

export function buildMetaTags(values: MetaTagValues): string {
  const tags: string[] = [];
  const addMeta = (key: string, content: string, attribute = "name") => {
    if (content.trim()) tags.push(`<meta ${attribute}="${key}" content="${escapeHtml(content.trim())}">`);
  };

  if (values.title.trim()) tags.push(`<title>${escapeHtml(values.title.trim())}</title>`);
  addMeta("description", values.description);
  addMeta("keywords", values.keywords);
  addMeta("author", values.author);
  addMeta("robots", values.robots.join(", "));
  if (values.canonicalUrl.trim()) tags.push(`<link rel="canonical" href="${escapeHtml(values.canonicalUrl.trim())}">`);
  addMeta("og:type", "website", "property");
  addMeta("og:title", values.title, "property");
  addMeta("og:description", values.description, "property");
  addMeta("og:url", values.canonicalUrl, "property");
  addMeta("og:image", values.imageUrl, "property");
  addMeta("twitter:card", values.twitterCard);
  addMeta("twitter:title", values.title);
  addMeta("twitter:description", values.description);
  addMeta("twitter:image", values.imageUrl);
  return tags.join("\n");
}
