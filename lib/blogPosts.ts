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
    title: "What Is Base64 Encoding? Examples, Uses, and JavaScript",
    description:
      "Learn how Base64 represents bytes as text, see working JavaScript and Node.js encode/decode examples, and understand UTF-8, Data URIs, and its limits.",
    publishedAt: "2026-04-25",
    updatedAt: "2026-10-27",
    intro: [
      "Base64 represents bytes as printable text. It is neither encryption nor compression: anyone with the encoded value can decode it, and the encoded data is typically about one-third larger.",
      "For example, the UTF-8 bytes for `Hello` encode to `SGVsbG8=` and decode back to `Hello`. Try the [Base64 Converter](/tools/base64-converter) for text, or the [Image to Base64 Converter](/tools/image-to-base64) for a small image data URI.",
    ],
    sections: [
      {
        heading: "How Base64 encoding works",
        paragraphs: [
          "Base64 groups input into sets of three bytes (24 bits), then represents each group as four 6-bit values from a 64-character alphabet. If the final group has fewer than three bytes, `=` padding may be used. The encoding is specified in [RFC 4648](https://www.rfc-editor.org/rfc/rfc4648.html).",
          "Four output characters represent three input bytes, so the encoded representation is approximately 33% larger before accounting for padding and surrounding format. Base64 can carry bytes through text-only interfaces, but it is not compression and does not make data private.",
        ],
      },
      {
        heading: "Simple browser example for ASCII text",
        paragraphs: [
          "For ASCII-only input, the browser's built-in `btoa()` and `atob()` methods provide a short example: `btoa(\"Hello\")` returns `SGVsbG8=`, and `atob(\"SGVsbG8=\")` returns `Hello`. These functions operate on byte-like strings; they do not directly encode arbitrary Unicode text as UTF-8.",
          "For UTF-8 text, convert to bytes before Base64 encoding and decode the bytes with `TextDecoder`. This browser example handles general Unicode strings:",
          "```js\nfunction encodeBase64Utf8(text) {\n  const bytes = new TextEncoder().encode(text);\n  let binary = \"\";\n  for (const byte of bytes) binary += String.fromCharCode(byte);\n  return btoa(binary);\n}\n\nfunction decodeBase64Utf8(base64) {\n  const binary = atob(base64);\n  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));\n  return new TextDecoder(\"utf-8\", { fatal: true }).decode(bytes);\n}\n\nencodeBase64Utf8(\"Hello 👋\");\n```",
        ],
      },
      {
        heading: "Node.js encode and decode example",
        paragraphs: [
          "Node.js `Buffer` can encode and decode UTF-8 text directly: `Buffer.from(\"Hello 👋\", \"utf8\").toString(\"base64\")` produces a Base64 string, and `Buffer.from(encoded, \"base64\").toString(\"utf8\")` decodes it. Validate data according to the protocol using it; a decoder accepting a string does not guarantee that the input was valid canonical Base64.",
        ],
      },
      {
        heading: "Data URIs and practical uses",
        paragraphs: [
          "A Data URI includes a media type and data, for example `data:text/plain;base64,SGVsbG8=`. Image data URIs can place small image bytes directly into HTML or CSS. The [Image to Base64 tool](/tools/image-to-base64) creates a data URI from an image file.",
          "Other uses include representing binary data in JSON fields or text-based transport formats that explicitly expect Base64. Use the encoding required by the receiving protocol; standard Base64 and URL-safe Base64 use different characters.",
        ],
      },
      {
        heading: "Limitations and safe handling",
        paragraphs: [
          "Base64 is reversible and should not be used to hide passwords, API keys, personal data, or other secrets. Use encryption and access controls when confidentiality is required. Encoding also adds size, so for large images or files, normal binary delivery with appropriate caching is usually more efficient.",
          "When decoding, handle invalid characters and invalid UTF-8 according to the application needs. Never assume that successful Base64 decoding proves a payload is trustworthy or authentic.",
        ],
      },
    ],
    relatedTools: ["base64-converter", "image-to-base64"],
  },
  {
    slug: "best-free-online-tools-for-developers",
    title: "Best Free Online Developer Tools for Everyday Coding",
    description:
      "Choose practical browser-based tools for timestamps, CSV cleanup, regular expressions, Markdown, Base64, JWT inspection, and UUID generation.",
    publishedAt: "2026-04-25",
    updatedAt: "2026-10-27",
    intro: [
      "The best online developer tool depends on the job: a timestamp converter should make seconds, milliseconds, and timezones clear; a CSV cleaner should explain exactly what it changes; and a JWT decoder must not imply that decoding verifies a signature. This task-based guide matches common coding jobs to the tools available here.",
      "These utilities are intended for quick development and test workflows, not for processing secrets. Some tools can save submitted values or generated results to account history when you are signed in; check the individual tool's data-handling note before use.",
    ],
    sections: [
      {
        heading: "Convert Unix timestamps and dates",
        paragraphs: [
          "Use the [Unix Timestamp Converter](/tools/timestamp-converter) to convert seconds or milliseconds to local time, UTC, and ISO 8601, or convert a selected date and time back to both timestamp units. The example `1700000000` seconds represents `2023-11-14T22:13:20.000Z`; choose local time or UTC when entering a date.",
        ],
      },
      {
        heading: "Clean a CSV before using it",
        paragraphs: [
          "The [CSV Data Cleaner](/tools/csv-data-cleaner) removes fully blank rows and duplicate full rows, trims surrounding whitespace, optionally fills blank values, and lets you choose columns for the downloaded CSV. It handles local files up to 5 MiB and previews up to 100 rows; review its cleaning rules before relying on the output.",
        ],
      },
      {
        heading: "Test a JavaScript regular expression",
        paragraphs: [
          "Try a pattern in the [JavaScript Regex Tester](/tools/regex-tester) against representative sample text. It shows a match count and highlights full matches; it does not display individual capture-group values. Include non-matching and edge-case samples because a few successful examples do not prove a pattern is correct for every input.",
        ],
      },
      {
        heading: "Preview Markdown and convert text",
        paragraphs: [
          "The [Markdown Previewer](/tools/markdown-preview) renders Markdown as you type and can copy the rendered HTML. Use the [Base64 Converter](/tools/base64-converter) to encode UTF-8 text or decode Base64 text; Base64 is not encryption. For a small image data URI, the [Image to Base64 Converter](/tools/image-to-base64) reads an image up to 5 MiB in the browser.",
        ],
      },
      {
        heading: "Inspect tokens or generate test identifiers",
        paragraphs: [
          "Use the [JWT Decoder](/tools/jwt-decoder) to view a token's decoded header and payload. Decoding does not verify its signature or claims, so never trust the output as authentication and do not paste production tokens. The [UUID v4 Generator](/tools/uuid-generator) creates up to 50 identifiers per batch for development and test data; UUIDs are not authentication tokens.",
        ],
      },
      {
        heading: "Choose tools with clear limits",
        paragraphs: [
          "Before reusing output, check input limits, supported formats, and what the page sends to account history. Tool calculations may run locally in your browser while separate history or analytics requests still occur. Use synthetic or redacted examples for sensitive work, and validate important output in the application that will consume it.",
        ],
      },
    ],
    relatedTools: [
      "timestamp-converter",
      "csv-data-cleaner",
      "regex-tester",
      "markdown-preview",
      "base64-converter",
      "image-to-base64",
      "jwt-decoder",
      "uuid-generator",
    ],
  },
];

export const legacyBlogSlugs: Record<string, string> = {
  "top-10-developer-tools-2026": "five-developer-tool-workflows",
};

export function getEstimatedReadingMinutes(post: BlogPost): number {
  const words = [post.title, post.description, ...post.intro, ...post.sections.flatMap((section) => [
    section.heading,
    ...section.paragraphs,
  ])].join(" ").match(/\S+/g)?.length ?? 0;
  return Math.max(1, Math.ceil(words / 200));
}

export const blogPostsBySlug = Object.fromEntries(blogPosts.map((post) => [post.slug, post]));
