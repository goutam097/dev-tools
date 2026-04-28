export type ToolCatalogItem = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  keywords: string[];

  // SEO
  metaTitle: string;
  metaDescription: string;
  content: string;
  faqs: { q: string; a: string }[];

  // Linking & freshness
  relatedTools: string[];
  updatedAt: string;
};

export const toolCatalog: ToolCatalogItem[] = [
  {
    slug: "json-formatter",
    title: "JSON Formatter",
    shortTitle: "JSON Formatter",
    description: "Format, validate, and beautify JSON instantly.",
    metaTitle: "Free JSON Formatter Online – Beautify & Validate JSON",
    metaDescription:
      "Format, validate, and beautify JSON data instantly. Detect errors and improve readability.",
    keywords: ["json formatter", "json validator", "pretty print json"],
    updatedAt: "2026-04-25",

    content: `
JSON Formatter helps developers format and validate JSON data quickly. 
It converts minified JSON into a structured, readable format.

This tool is useful when working with APIs, debugging responses, and improving readability.
`,

    faqs: [
      {
        q: "What is JSON formatting?",
        a: "It structures JSON data for readability.",
      },
      {
        q: "Why use a JSON formatter?",
        a: "To debug and validate API responses easily.",
      },
    ],

    relatedTools: ["jwt-decoder", "regex-tester"],
  },

  {
    slug: "jwt-decoder",
    title: "JWT Decoder",
    shortTitle: "JWT Decoder",
    description: "Decode JWT tokens and inspect payload easily.",
    metaTitle: "JWT Decoder Online – Decode JWT Tokens Instantly",
    metaDescription:
      "Decode JWT tokens and view payload, header, and claims instantly.",
    keywords: ["jwt decoder", "decode jwt", "jwt viewer"],
    updatedAt: "2026-04-25",

    content: `
JWT Decoder allows developers to inspect JSON Web Tokens.

It helps you understand token structure, debug authentication, and verify payload data.
`,

    faqs: [
      {
        q: "What is a JWT?",
        a: "JWT is a token used for secure data transmission.",
      },
    ],

    relatedTools: ["json-formatter"],
  },

  {
    slug: "base64-converter",
    title: "Base64 Converter",
    shortTitle: "Base64 Converter",
    description: "Encode and decode Base64 strings instantly.",
    metaTitle: "Base64 Encode & Decode Online Tool",
    metaDescription:
      "Convert text to Base64 and decode Base64 instantly using this free tool.",
    keywords: ["base64 encode", "base64 decode", "base64 converter"],
    updatedAt: "2026-04-25",

    content: `
Base64 Converter helps encode and decode data using Base64 format.

It is commonly used for transmitting binary data and embedding images.
`,

    faqs: [
      {
        q: "What is Base64?",
        a: "A method to encode binary data into text format.",
      },
    ],

    relatedTools: ["image-to-base64"],
  },

  {
    slug: "image-to-base64",
    title: "Image to Base64",
    shortTitle: "Image to Base64",
    description: "Convert images into Base64 strings.",
    metaTitle: "Convert Image to Base64 Online",
    metaDescription:
      "Upload images and convert them into Base64 strings instantly.",
    keywords: ["image to base64", "convert image base64"],
    updatedAt: "2026-04-25",

    content: `
Convert images into Base64 format for embedding in HTML, CSS, or APIs.

This is useful for reducing HTTP requests and embedding assets directly.
`,

    faqs: [
      {
        q: "Why convert image to Base64?",
        a: "To embed images directly in code and reduce requests.",
      },
    ],

    relatedTools: ["base64-converter"],
  },

  {
    slug: "regex-tester",
    title: "Regex Tester",
    shortTitle: "Regex Tester",
    description: "Test and debug regular expressions in real time.",
    metaTitle: "Regex Tester Online – Test Regular Expressions",
    metaDescription:
      "Test and debug regex patterns with instant matching results.",
    keywords: ["regex tester", "regex tool", "regular expression tester"],
    updatedAt: "2026-04-25",

    content: `
Regex Tester helps developers test regular expressions with live feedback.

It is useful for validation, parsing text, and debugging patterns.
`,

    faqs: [
      {
        q: "What is regex?",
        a: "A pattern used to match text.",
      },
    ],

    relatedTools: ["json-formatter"],
  },

  {
    slug: "uuid-generator",
    title: "UUID Generator",
    shortTitle: "UUID Generator",
    description: "Generate UUIDs instantly for apps and APIs.",
    metaTitle: "UUID Generator Online – Generate UUID v4",
    metaDescription:
      "Generate secure UUIDs instantly for use in applications and APIs.",
    keywords: ["uuid generator", "uuid v4", "generate uuid"],
    updatedAt: "2026-04-25",

    content: `
UUID Generator helps create unique identifiers for systems and APIs.

Useful for databases, distributed systems, and tracking IDs.
`,

    faqs: [
      {
        q: "What is UUID?",
        a: "A universally unique identifier used in software systems.",
      },
    ],

    relatedTools: ["jwt-decoder"],
  },

  {
    slug: "markdown-preview",
    title: "Markdown Preview",
    shortTitle: "Markdown Preview",
    description: "Write and preview Markdown in real time.",
    metaTitle: "Markdown Preview Online – Live Markdown Editor",
    metaDescription: "Write Markdown and preview rendered output instantly.",
    keywords: ["markdown preview", "markdown editor"],
    updatedAt: "2026-04-25",

    content: `
Markdown Preview allows you to write Markdown and see live output.

Useful for documentation, blogs, and README files.
`,

    faqs: [
      {
        q: "What is Markdown?",
        a: "A lightweight markup language for formatting text.",
      },
    ],

    relatedTools: ["html-formatter"],
  },

  {
    slug: "gradient-marker",
    title: "Gradient Generator",
    shortTitle: "Gradient Generator",
    description: "Create CSS gradients easily.",
    metaTitle: "CSS Gradient Generator Online",
    metaDescription:
      "Generate beautiful CSS gradients and copy ready-to-use code.",
    keywords: ["css gradient", "gradient generator"],
    updatedAt: "2026-04-25",

    content: `
Create beautiful CSS gradients and copy production-ready code.

Perfect for UI designers and frontend developers.
`,

    faqs: [
      {
        q: "What is CSS gradient?",
        a: "A gradual transition between colors.",
      },
    ],

    relatedTools: ["html-formatter"],
  },

  {
    slug: "html-formatter",
    title: "HTML Formatter",
    shortTitle: "HTML Formatter",
    description: "Beautify and format HTML code instantly.",
    metaTitle: "HTML Formatter Online – Beautify HTML Code",
    metaDescription:
      "Format and clean HTML code with proper indentation instantly.",
    keywords: ["html formatter", "html beautifier"],
    updatedAt: "2026-04-25",

    content: `
HTML Formatter helps structure messy HTML into clean, readable code.

Useful for debugging and improving code quality.
`,

    faqs: [
      {
        q: "Why format HTML?",
        a: "To improve readability and maintainability.",
      },
    ],

    relatedTools: ["markdown-preview"],
  },
];

export const toolCatalogBySlug = Object.fromEntries(
  toolCatalog.map((tool) => [tool.slug, tool]),
);

/* export type ToolCatalogItem = {
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
    description:
      "Format, validate, and beautify JSON data instantly in your browser.",
    keywords: ["json formatter", "json validator", "pretty print json"],
  },
  {
    slug: "jwt-decoder",
    title: "JWT Decoder",
    shortTitle: "JWT Decoder",
    description:
      "Decode JWT tokens and inspect header, payload, and claims quickly.",
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
    description:
      "Test and debug regular expressions with real-time pattern matching.",
    keywords: [
      "regex tester",
      "regular expression tester",
      "regex online tool",
    ],
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
    description:
      "Create CSS gradients and copy production-ready gradient code.",
    keywords: ["gradient generator", "css gradient maker", "gradient marker"],
  },
  {
    slug: "image-to-base64",
    title: "Image to Base64",
    shortTitle: "Image to Base64",
    description:
      "Convert images into Base64 strings for embedding and transport.",
    keywords: [
      "image to base64",
      "convert image to base64",
      "base64 image encoder",
    ],
  },
  {
    slug: "html-formatter",
    title: "HTML Formatter",
    shortTitle: "HTML Formatter",
    description:
      "Free online HTML formatter to beautify and clean your code. Fix indentation, improve structure, and make HTML more readable instantly.",
    keywords: [
      "HTML formatter",
      "HTML beautifier",
      "HTML prettifier",
      "format HTML online",
      "HTML code formatter",
      "free HTML formatter",
      "HTML formatter online tool",
    ],
  },
];

export const toolCatalogBySlug = Object.fromEntries(
  toolCatalog.map((tool) => [tool.slug, tool]),
);
 */
