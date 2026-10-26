export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  intro: string[];
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  relatedTools: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "five-developer-tool-workflows",
    title: "Five Developer Tool Workflows for Everyday Tasks",
    description:
      "A task-based guide to inspecting JSON, decoding JWTs safely, converting Base64, testing regular expressions, and generating frontend snippets.",
    publishedAt: "2026-04-25",
    updatedAt: "2026-10-26",
    intro: [
      "A small utility is useful when it removes a specific step from a developer task and makes its limits clear. This guide walks through five common jobs and the checks that matter before you reuse a result.",
      "Examples use the tools available in this directory; their browser-side processing does not prevent account-history storage when you are signed in. Avoid entering production secrets or credentials.",
    ],
    sections: [
      {
        heading: "1. Inspecting an API payload",
        paragraphs: [
          "When an API response arrives as one long line, paste a non-sensitive sample into the JSON Formatter and choose Format. For example, `{\"ok\":true,\"items\":[1,2]}` becomes a multi-line object that is easier to inspect. A trailing comma or single-quoted string is invalid JSON; correct the input rather than treating the formatter as a schema checker.",
        ],
      },
      {
        heading: "2. Reading a JWT without confusing it with verification",
        paragraphs: [
          "A JWT decoder can display the token's header and payload so you can inspect fields such as `exp` and `iss`. Decoding only reverses Base64URL encoding: it does not verify the signature, establish who issued the token, or make an untrusted token safe to use. Use a test token, and never share a live credential.",
        ],
      },
      {
        heading: "3. Converting text with Base64",
        paragraphs: [
          "Use Base64 when a text-only format must carry bytes, such as a small Data URI or an API field defined to contain Base64. It is an encoding, not encryption or compression, and adds overhead. UTF-8 text needs byte-aware encoding; the Base64 Converter handles Unicode text instead of passing arbitrary characters directly to `btoa()`.",
        ],
      },
      {
        heading: "4. Testing a regular expression",
        paragraphs: [
          "Enter a pattern and representative text in the Regex Tester, then check both matches and non-matches. Include empty strings, punctuation, newlines, and long inputs where relevant. A successful sample match is not proof that a pattern is correct for all inputs or safe from excessive backtracking.",
        ],
      },
      {
        heading: "5. Generating frontend snippets",
        paragraphs: [
          "Use the CSS Grid Generator to adjust rows, columns, gaps, and alignment while watching the preview, then copy the CSS into a project and test it at the target viewport sizes. Generated styles are a starting point; the tool does not know your container size, breakpoints, or surrounding design system.",
        ],
      },
    ],
    relatedTools: ["json-formatter", "jwt-decoder", "regex-tester", "markdown-preview"],
  },
  {
    slug: "how-to-format-json-in-javascript",
    title: "How to Format JSON in JavaScript: A Practical Guide",
    description:
      "Format JavaScript data with JSON.stringify, handle common serialization limits, and choose between readable and compact JSON.",
    publishedAt: "2026-04-25",
    updatedAt: "2026-10-26",
    intro: [
      "JavaScript's JSON methods are useful when debugging a response, writing a fixture, or saving configuration. This guide focuses on the built-in `JSON.stringify` method and explains what it can and cannot serialize.",
      "JSON uses a strict data syntax. See [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259.html) for the format definition; JavaScript object literals may contain constructs that are not valid JSON.",
    ],
    sections: [
      {
        heading: "The Power of JSON.stringify() Parameters",
        paragraphs: [
          "Most developers are familiar with `JSON.stringify(obj)`, but the function accepts `value`, `replacer`, and `space`. The `space` parameter controls indentation. See the [MDN reference for JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) for its exact behavior and limits.",
          "By passing a number (like `2`) or a string (like `\\t`), you tell JavaScript to add indentation and newlines to the output. For example: `JSON.stringify(userData, null, 2)` will produce a beautifully indented string that is easy for humans to read and audit during debugging.",
        ],
      },
      {
        heading: "Handling Circular References and BigInt",
        paragraphs: [
          "A common hurdle when formatting JSON is the 'Circular reference' error, which occurs when an object refers to itself. Standard `JSON.stringify` cannot handle these and will throw an error. In such cases, you may need a custom 'replacer' function or a library like `flatted`.",
          "Additionally, native JSON does not support `BigInt` values. If your data contains large integers, you must convert them to strings within the replacer function: `JSON.stringify(data, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2)`. This ensures your formatting doesn't break when dealing with modern JavaScript data types.",
        ],
      },
      {
        heading: "Minification for Production Payloads",
        paragraphs: [
          "Omitting `space` produces compact JSON, while passing `2` produces readable indentation. Choose the representation appropriate for the consumer: source files and debugging often benefit from formatting, while APIs commonly send compact JSON and may use HTTP compression. Measure payload and response performance rather than assuming whitespace is the bottleneck.",
        ],
      },
      {
        heading: "Practical Example: Pretty-Printing to the Console",
        paragraphs: [
          "Next time you find yourself staring at `[object Object]` in your browser console, try wrapping your log in a formatter: `console.log(JSON.stringify(myComplexObject, null, 2))`. This simple change transforms a cryptic line into a searchable, readable tree structure that speeds up root-cause analysis.",
        ],
      },
    ],
    relatedTools: ["json-formatter", "regex-tester", "base64-converter"],
  },
  {
    slug: "evaluate-online-developer-tools",
    title: "How to Evaluate an Online Developer Tool Before Using It",
    description:
      "A practical checklist for checking an online tool's behavior, data handling, validation, and generated output before use.",
    publishedAt: "2026-04-25",
    updatedAt: "2026-10-26",
    intro: [
      "An online utility may save a few steps, but verify that it performs the specific operation you need and understand what happens to submitted data. Use the following checks before using any tool with real project content.",
    ],
    sections: [
      {
        heading: "Check what runs locally and what is sent elsewhere",
        paragraphs: [
          "A page may run its calculation in your browser and still send data for account history, analytics, or third-party services. Read the site's data-handling notes and policy; use synthetic or redacted samples for sensitive workflows. For DevTools Hub, history-enabled tools can send input and output to account history when signed in.",
        ],
      },
      {
        heading: "Check the actual operation and edge cases",
        paragraphs: [
          "Compare the output with a known sample and test one invalid input. A JWT decoder is not a signature verifier; a JSON formatter is not a JSON Schema validator; and a regular-expression tester does not guarantee safe execution for every long input. Prefer a tool page that explains these distinctions.",
        ],
      },
      {
        heading: "Review and reuse generated output",
        paragraphs: [
          "Copy generated CSS, HTML, or metadata into a test page or project and inspect it in the intended browser. Check responsive behavior, content security, accessibility, and the project's own conventions before shipping a snippet.",
        ],
      },
    ],
    relatedTools: ["tools", "json-formatter", "uuid-generator", "html-formatter"],
  },
  {
    slug: "what-is-base64-encoding-with-examples",
    title: "What Is Base64 Encoding? A Comprehensive Developer Guide",
    description:
      "Learn what Base64 encoding is, how it works, when to use it, and how to handle UTF-8 and invalid input correctly in real web development workflows.",
    publishedAt: "2026-04-25",
    updatedAt: "2026-10-26",
    intro: [
      "Base64 encoding is a ubiquitous tool in a developer's arsenal, yet its internal mechanics and appropriate use cases are often misunderstood. It is not encryption, nor is it a method for data compression; rather, it is a way to represent binary data in a text-safe format.",
      "If you work with APIs, email headers, Data URIs, or debugging transport-layer payloads, Base64 turns up constantly. Use our Base64 Converter to test examples in the browser, learn how Base64 encoding works in practice, and try the Image to Base64 tool when you need a quick asset-embedding workflow.",
    ],
    sections: [
      {
        heading: "The Mechanics of Base64: How Binary Becomes Text",
        paragraphs: [
          "Base64 works by taking groups of three 8-bit bytes (24 bits total) and splitting them into four 6-bit chunks. Each 6-bit chunk maps to one of 64 characters. If the input length is not a multiple of three bytes, padding may be added at the end. See [RFC 4648](https://www.rfc-editor.org/rfc/rfc4648.html) for the Base64 specification.",
          "Because 4 characters are used to represent 3 bytes of data, Base64 encoding increases the data size by approximately 33%. This overhead is the trade-off for ensuring that binary data can pass through text-based systems like SMTP, HTML forms, and HTTP headers without corruption.",
        ],
      },
      {
        heading: "Base64 in the Browser: btoa() and atob()",
        paragraphs: [
          "Modern browsers provide two built-in functions for Base64: `btoa()` (binary to ASCII) for encoding and `atob()` (ASCII to binary) for decoding. These are incredibly useful for quick transformations in the frontend.",
          "However, `btoa()` and `atob()` only support 'Latin1' characters. If you need to encode UTF-8 strings containing emojis or non-English characters, you must first convert the string to a Uint8Array. A production-safe implementation, like the one used in our Base64 Converter, handles these edge cases automatically and rejects malformed input cleanly.",
        ],
      },
      {
        heading: "Server-Side Base64 with Node.js Buffers",
        paragraphs: [
          "In Node.js, Base64 operations are handled via the `Buffer` class. To encode a string, you can use `Buffer.from('text').toString('base64')`. To decode, use `Buffer.from(encodedString, 'base64').toString('utf-8')`.",
          "This is a common pattern when handling API credentials for Basic Auth or when processing file uploads in a backend service. Understanding these native methods allows you to build robust data pipelines without relying on external dependencies.",
        ],
      },
      {
        heading: "Practical Use Case: Data URIs and Inline Assets",
        paragraphs: [
          "One of the most visible uses of Base64 is the Data URI scheme. By encoding an image as a Base64 string, you can embed it directly into your HTML (`<img src='data:image/png;base64,...'>`) or CSS. This is excellent for small icons or low-resolution placeholders because it eliminates the need for an additional HTTP request.",
          "Check out our Image to Base64 tool to quickly generate these URIs for your projects. Just remember to use them sparingly, as large Base64 strings can increase the size of your CSS and HTML files and slow initial page loads if overused.",
        ],
      },
    ],
    relatedTools: ["base64-converter", "image-to-base64", "jwt-decoder"],
  },
];

export const legacyBlogSlugs: Record<string, string> = {
  "top-10-developer-tools-2026": "five-developer-tool-workflows",
  "best-free-online-tools-for-developers": "evaluate-online-developer-tools",
};

export function getEstimatedReadingMinutes(post: BlogPost): number {
  const words = [post.title, post.description, ...post.intro, ...post.sections.flatMap((section) => [
    section.heading,
    ...section.paragraphs,
  ])].join(" ").match(/\S+/g)?.length ?? 0;
  return Math.max(1, Math.ceil(words / 200));
}

export const blogPostsBySlug = Object.fromEntries(blogPosts.map((post) => [post.slug, post]));
