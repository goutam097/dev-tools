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
    keywords: [
      "json formatter",
      "json validator",
      "pretty print json",
      "format json online",
      "validate json online",
      "pretty print json online",
      "json formatter and validator",
      "free json formatter tool",
      "json beautifier online free",
      "json parser online",
      "json syntax validator",
      "check json validity online",
      "minify and format json",
      "convert json to readable format",
      "json formatting tool for developers",
      "online json editor and formatter",
      "json validator with error highlighting",
      "beautify json data online",
      "json formatter for developers",
      "api response json formatter",
      "json debugging tool",
      "json validation for api testing",
      "format api json response",
      "json lint tool",
      "json checker online",
      "validate json schema",
      "json parser and validator",
      "json code formatter",
    ],
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
  {
    slug: "json-to-typescript",
    title: "JSON to TypeScript Converter",
    shortTitle: "JSON to TypeScript",
    description: "Convert JSON samples into TypeScript interfaces or type aliases.",
    metaTitle: "JSON to TypeScript Converter Online",
    metaDescription:
      "Convert JSON into TypeScript interfaces and type aliases, including nested objects, arrays, nullable values, and optional properties.",
    keywords: [
      "json to typescript",
      "json to typescript interface",
      "json type generator",
      "typescript interface generator",
      "json schema to typescript",
    ],
    updatedAt: "2026-10-11",
    content: `
Generate TypeScript interfaces and type aliases from representative JSON data.
The converter infers nested structures, array element types, nullable values, and optional fields.
`,
    faqs: [
      {
        q: "How are nested JSON objects represented?",
        a: "Nested objects are generated as named interfaces or type aliases and referenced by their parent type.",
      },
      {
        q: "Does the converter support null values and arrays?",
        a: "Yes. Null is included in the inferred union type, and array types are inferred from their item values.",
      },
    ],
    relatedTools: ["json-formatter", "html-formatter"],
  },
  {
    slug: "url-encoder-decoder",
    title: "URL Encoder / Decoder",
    shortTitle: "URL Encoder / Decoder",
    description: "Encode and decode URLs or individual URL components.",
    metaTitle: "URL Encoder and Decoder Online",
    metaDescription:
      "Encode or decode text and URLs using encodeURIComponent, encodeURI, decodeURIComponent, and decodeURI.",
    keywords: [
      "url encoder",
      "url decoder",
      "url encode online",
      "url decode online",
      "percent encoding",
      "encodeURIComponent online",
      "decodeURIComponent online",
    ],
    updatedAt: "2026-10-11",
    content: `
Encode and decode URL text and full URLs using the standard JavaScript URI encoding functions.
Choose component mode to encode reserved characters, or full URL mode to preserve URL delimiters.
`,
    faqs: [
      {
        q: "What is the difference between URL and URL component encoding?",
        a: "URL component encoding also escapes reserved delimiters, while full URL encoding preserves them so the URL structure remains intact.",
      },
      {
        q: "Why does decoding sometimes fail?",
        a: "A percent-encoded value must use valid hexadecimal escape sequences and valid UTF-8. Malformed sequences cannot be decoded.",
      },
    ],
    relatedTools: ["json-formatter", "base64-converter"],
  },
  {
    slug: "timestamp-converter",
    title: "Timestamp Converter",
    shortTitle: "Timestamp Converter",
    description: "Convert Unix timestamps and dates with local, UTC, and ISO 8601 output.",
    metaTitle: "Unix Timestamp Converter - Convert Epoch Time to Date",
    metaDescription:
      "Convert Unix timestamps to local time, UTC, and ISO 8601, or turn a date and time into seconds and milliseconds.",
    keywords: [
      "unix timestamp converter",
      "epoch converter",
      "timestamp to date",
      "date to unix timestamp",
      "unix time milliseconds",
      "timestamp converter online",
    ],
    updatedAt: "2026-10-12",
    content: `
Convert Unix timestamps in seconds or milliseconds to readable local and UTC dates, or convert a selected date and time into Unix timestamps.
Results include ISO 8601 format and both timestamp units.
`,
    faqs: [
      {
        q: "How can I tell whether a timestamp uses seconds or milliseconds?",
        a: "Select the unit explicitly. Unix timestamps in seconds are typically 10 digits, while millisecond timestamps are typically 13 digits.",
      },
      {
        q: "Which timezone is used for date and time input?",
        a: "Choose your browser's local timezone or UTC before converting. The results always include local time, UTC, and ISO 8601.",
      },
    ],
    relatedTools: ["json-formatter", "url-encoder-decoder"],
  },
  {
    slug: "csv-data-cleaner",
    title: "CSV Data Cleaner",
    shortTitle: "CSV Cleaner",
    description: "Clean CSV rows, remove duplicates, trim whitespace, and fill missing values.",
    metaTitle: "CSV Data Cleaner Online - Clean and Download CSV Files",
    metaDescription: "Clean CSV data in your browser by removing blank rows and duplicates, trimming whitespace, and filling missing values.",
    keywords: ["csv cleaner", "clean csv online", "remove duplicate csv rows", "csv whitespace cleaner"],
    updatedAt: "2026-10-13",
    content: "Clean pasted or uploaded CSV data locally, preview the results, and download the cleaned file.",
    faqs: [{ q: "Is my CSV uploaded?", a: "No. The file is read and processed locally in your browser." }],
    relatedTools: ["json-formatter", "json-schema-playground"],
  },
  {
    slug: "cron-expression-builder",
    title: "Cron Expression Builder",
    shortTitle: "Cron Builder",
    description: "Build, validate, and explain five-field cron expressions with common schedules.",
    metaTitle: "Cron Expression Builder - Create and Explain Cron Schedules",
    metaDescription: "Configure cron minute, hour, day, month, and weekday fields and see a plain-language schedule explanation.",
    keywords: ["cron expression builder", "cron generator", "cron schedule generator", "cron expression parser"],
    updatedAt: "2026-10-13",
    content: "Compose and validate standard five-field cron expressions with human-readable explanations.",
    faqs: [{ q: "Which cron format is supported?", a: "The builder supports standard five-field cron expressions for minute, hour, day of month, month, and day of week." }],
    relatedTools: ["timestamp-converter", "json-formatter"],
  },
  {
    slug: "json-schema-playground",
    title: "JSON Schema Playground",
    shortTitle: "JSON Schema",
    description: "Generate JSON Schema from sample JSON and validate data against an editable schema.",
    metaTitle: "JSON Schema Playground - Generate and Validate JSON Schema",
    metaDescription: "Infer a JSON Schema from sample data, edit schemas, validate JSON, and inspect clear field-level errors.",
    keywords: ["json schema generator", "json schema validator", "generate schema from json", "json validation playground"],
    updatedAt: "2026-10-13",
    content: "Infer a starting schema from JSON or validate an instance against an editable JSON Schema in your browser.",
    faqs: [{ q: "Which schema keywords are validated?", a: "The playground supports common types, required properties, properties, arrays, enum, const, and basic size and value constraints." }],
    relatedTools: ["json-formatter", "json-to-typescript"],
  },
  {
    slug: "css-grid-generator",
    title: "CSS Grid Generator",
    shortTitle: "CSS Grid",
    description: "Configure a live CSS Grid layout and copy the generated CSS.",
    metaTitle: "CSS Grid Generator - Build and Preview CSS Grid Layouts",
    metaDescription: "Adjust grid rows, columns, gaps, alignment, and preview items while generating copy-ready CSS.",
    keywords: ["css grid generator", "css grid builder", "grid layout generator", "css grid preview"],
    updatedAt: "2026-10-13",
    content: "Adjust grid dimensions, spacing, alignment, and preview labels to generate a live CSS Grid example.",
    faqs: [{ q: "Can I customize the preview items?", a: "Yes. Change the number of items and edit each label; the preview updates immediately." }],
    relatedTools: ["gradient-marker", "html-formatter"],
  },
  {
    slug: "meta-tag-generator",
    title: "Meta Tag Generator",
    shortTitle: "Meta Tags",
    description: "Generate HTML, Open Graph, and Twitter Card metadata with live previews.",
    metaTitle: "Meta Tag Generator - Create HTML, Open Graph and Twitter Tags",
    metaDescription: "Create copy-ready HTML title, description, canonical, robots, Open Graph, and Twitter Card tags with previews.",
    keywords: ["meta tag generator", "open graph tag generator", "twitter card generator", "seo meta tags"],
    updatedAt: "2026-10-13",
    content: "Generate search and social metadata from editable page details, preview how they may appear, and download the HTML.",
    faqs: [{ q: "Does the generator publish metadata to my site?", a: "No. It generates an HTML snippet and a downloadable example; add the tags to your own page to publish them." }],
    relatedTools: ["html-formatter", "json-formatter"],
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
