export type ToolCatalogItem = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  keywords: string[];
};

export const toolCatalog: ToolCatalogItem[] = [
  {
    slug: "json-formatter",
    title: "JSON Formatter",
    shortTitle: "JSON Formatter",
    description: "Format, validate, and beautify JSON data instantly in your browser.",
    keywords: ["json formatter", "json validator", "pretty print json"],
  },
  {
    slug: "jwt-decoder",
    title: "JWT Decoder",
    shortTitle: "JWT Decoder",
    description: "Decode JWT tokens and inspect header, payload, and claims quickly.",
    keywords: ["jwt decoder", "decode jwt token", "jwt payload viewer"],
  },
  {
    slug: "base64-converter",
    title: "Base64 Converter",
    shortTitle: "Base64 Converter",
    description: "Encode and decode text using Base64 format with one click.",
    keywords: ["base64 converter", "base64 encode decode", "text to base64"],
  },
  {
    slug: "regex-tester",
    title: "Regex Tester",
    shortTitle: "Regex Tester",
    description: "Test and debug regular expressions with real-time pattern matching.",
    keywords: ["regex tester", "regular expression tester", "regex online tool"],
  },
  {
    slug: "uuid-generator",
    title: "UUID Generator",
    shortTitle: "UUID Generator",
    description: "Generate secure UUIDs for application identifiers and APIs.",
    keywords: ["uuid generator", "generate uuid", "uuid v4 generator"],
  },
  {
    slug: "markdown-preview",
    title: "Markdown Preview",
    shortTitle: "Markdown Preview",
    description: "Write Markdown and preview the rendered output side by side.",
    keywords: ["markdown preview", "markdown editor", "markdown live preview"],
  },
  {
    slug: "gradient-marker",
    title: "Gradient Marker",
    shortTitle: "Gradient Marker",
    description: "Create CSS gradients and copy production-ready gradient code.",
    keywords: ["gradient generator", "css gradient maker", "gradient marker"],
  },
  {
    slug: "image-to-base64",
    title: "Image to Base64",
    shortTitle: "Image to Base64",
    description: "Convert images into Base64 strings for embedding and transport.",
    keywords: ["image to base64", "convert image to base64", "base64 image encoder"],
  },
];

export const toolCatalogBySlug = Object.fromEntries(toolCatalog.map((tool) => [tool.slug, tool]));
