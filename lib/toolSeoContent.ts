import type { ToolCatalogItem } from "@/lib/toolCatalog";

export type ToolFaqItem = {
  question: string;
  answer: string;
};

export type ToolSeoSection = {
  heading: string;
  paragraphs: string[];
};

export type ToolSeoContent = {
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  howToSteps: string[];
  sections: ToolSeoSection[];
  faqs: ToolFaqItem[];
  relatedSlugs: string[];
};

export const toolSeoContentBySlug: Record<string, ToolSeoContent> = {
  "json-formatter": {
    primaryKeyword: "json formatter online free",
    metaTitle: "JSON Formatter Online Free - Validate, Beautify & Minify JSON",
    metaDescription:
      "Use our JSON formatter online free to beautify, validate, and minify JSON instantly in your browser. Fast, private, and built for developers.",
    intro: [
      "This JSON formatter online free tool helps you clean up raw JSON strings in seconds, whether you are debugging API responses, validating configuration files, or preparing payloads for documentation. Everything runs in the browser, so there is no upload step and no delay caused by server-side processing.",
      "When JSON is hard to read, bugs become hard to spot. The formatter makes nested objects readable, highlights parsing errors, and gives you copy-ready output for code reviews, Postman collections, frontend fixtures, and backend logging workflows.",
    ],
    howToSteps: [
      "Paste your JSON into the input panel.",
      "Select Format for readable output or Minify for compressed JSON.",
      "Review validation errors if parsing fails and fix syntax quickly.",
      "Copy the output and use it in your app, docs, or test data.",
    ],
    sections: [
      {
        heading: "Why Developers Use a JSON Formatter Daily",
        paragraphs: [
          "Most modern apps exchange data through JSON APIs. During development, payloads often include nested arrays, optional fields, and mixed data types that are difficult to scan in a single line response. A formatted view gives you immediate structure awareness and lets you compare fields without mental overhead.",
          "You can also use this tool as a JSON validator before committing config updates. Catching one trailing comma or missing quote early can save deployment time, especially in CI pipelines, environment files, and webhook templates where invalid JSON can break automation.",
        ],
      },
      {
        heading: "Best Practices for Clean JSON Workflows",
        paragraphs: [
          "Keep both formatted and minified variants in your workflow. Formatted output is ideal for debugging and collaboration, while minified output is useful for transport and embedding into compact files. Switching between both formats quickly helps when moving between development and production contexts.",
          "For team projects, pair formatted JSON with clear key naming conventions and stable field ordering for human readability. This reduces noisy diffs in pull requests and helps teammates review API changes faster, especially when payloads evolve across multiple services.",
        ],
      },
      {
        heading: "Common JSON Errors You Can Catch Quickly",
        paragraphs: [
          "The most frequent syntax issues include trailing commas, smart quotes copied from documents, and unescaped characters inside strings. A live JSON formatter spots these problems immediately so you can repair them before they cause runtime exceptions in JavaScript, Node.js, or backend parsers.",
          "Another common issue is accidental type mismatch, such as sending string values where numeric values are expected. While a formatter does not enforce schema rules by itself, making the structure readable is the first step to reliable validation and easier API troubleshooting.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this JSON formatter online free for unlimited use?",
        answer:
          "Yes. You can format and validate JSON as often as needed without sign-up, usage caps, or hidden limits.",
      },
      {
        question: "Does my JSON data leave the browser?",
        answer:
          "No. The formatter runs client-side in your browser tab, so your JSON stays local while you work.",
      },
      {
        question: "Can I minify JSON after formatting it?",
        answer:
          "Yes. You can switch between beautified and minified output based on whether you need readability or compact transport.",
      },
    ],
    relatedSlugs: ["base64-converter", "regex-tester", "html-formatter"],
  },
  "base64-converter": {
    primaryKeyword: "base64 encoder online",
    metaTitle: "Base64 Encoder Online - Encode & Decode Text Instantly",
    metaDescription:
      "Free Base64 encoder online tool to encode or decode text quickly. Browser-based, secure, and ideal for developers working with APIs and tokens.",
    intro: [
      "This Base64 encoder online tool makes text encoding and decoding simple when you are handling API credentials, data URIs, or transport-safe payloads. It is optimized for fast conversion without requiring external libraries or command-line utilities.",
      "Because processing happens in your browser, you can safely test sample strings, debug malformed payloads, and verify outputs before using them in production scripts, frontend components, or backend services.",
    ],
    howToSteps: [
      "Paste plain text to encode into Base64.",
      "Paste Base64 text to decode back to readable content.",
      "Validate the output and copy it directly for your workflow.",
      "Use the result in headers, JSON payloads, or configuration values.",
    ],
    sections: [
      {
        heading: "When Base64 Encoding Is Useful",
        paragraphs: [
          "Base64 is commonly used when binary or special characters need to move safely through text-based systems. You will see it in authentication headers, encrypted token payloads, embedded assets, and integration middleware where strict character sets are required.",
          "For web developers, Base64 is also useful for quick prototyping. You can test encoded snippets in API calls, validate transformation pipelines, and troubleshoot integrations without leaving the browser or switching contexts.",
        ],
      },
      {
        heading: "Avoiding Base64 Mistakes in Production",
        paragraphs: [
          "A frequent error is treating Base64 as encryption. Base64 only transforms data representation; it does not secure content. Sensitive values should still be encrypted or protected by proper transport security and secret management.",
          "Another common issue is incorrect character encoding. If text includes non-ASCII symbols, ensure your pipeline consistently uses UTF-8 before and after conversion. This prevents unreadable output and broken payload handling across services.",
        ],
      },
      {
        heading: "Practical Developer Use Cases",
        paragraphs: [
          "You can use Base64 conversion to quickly inspect token segments, generate mock payloads for automated tests, or prepare inline content for lightweight demos. This is especially helpful when you need controlled sample data while debugging network requests.",
          "The tool also supports workflow speed during collaboration. Instead of sharing scripts or shell commands, teammates can use a consistent browser-based utility to reproduce conversions and validate expected output with minimal friction.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Base64 encoding secure for passwords?",
        answer:
          "No. Base64 is not encryption and should not be used to secure passwords or secrets by itself.",
      },
      {
        question: "Can I decode any Base64 string here?",
        answer:
          "Yes, as long as the input is valid Base64 text. Invalid characters will cause decoding errors.",
      },
      {
        question: "Is this Base64 converter free?",
        answer: "Yes. The tool is free to use and runs entirely in the browser.",
      },
    ],
    relatedSlugs: ["image-to-base64", "jwt-decoder", "json-formatter"],
  },
  "regex-tester": {
    primaryKeyword: "regex tester javascript tool",
    metaTitle: "Regex Tester JavaScript Tool - Test Patterns in Real Time",
    metaDescription:
      "Use this regex tester JavaScript tool to test, debug, and refine regular expressions instantly. Fast matching feedback with browser-based privacy.",
    intro: [
      "This regex tester JavaScript tool gives immediate feedback while you build patterns for validation, parsing, and search logic. Instead of guessing pattern behavior in production code, you can iterate safely with live match feedback.",
      "It is especially useful for frontend and Node.js teams that rely on regular expressions for form validation, URL parsing, log filtering, and custom text transformations.",
    ],
    howToSteps: [
      "Enter your sample text in the input field.",
      "Write your regular expression pattern and flags.",
      "Inspect matched groups and adjust edge-case handling.",
      "Copy the tested regex into your JavaScript or TypeScript code.",
    ],
    sections: [
      {
        heading: "Build Reliable Regex with Live Testing",
        paragraphs: [
          "Regular expressions are powerful but easy to overcomplicate. A live tester helps you start simple, validate each token, and expand patterns gradually so behavior remains predictable. This approach reduces false positives and hard-to-debug production issues.",
          "When teams review regex in pull requests, tested examples improve confidence. Shared sample text and match expectations make pattern intent explicit, which reduces maintenance risk when other developers need to update logic later.",
        ],
      },
      {
        heading: "Common Pattern Pitfalls and Fixes",
        paragraphs: [
          "Greedy quantifiers often match too much text. Testing with realistic multi-line input helps reveal these over-matches early so you can introduce lazy quantifiers or boundary checks. Another issue is unescaped special characters that silently change pattern meaning.",
          "Flag handling is equally important. For example, global matching and multiline behavior can produce very different results depending on input shape. A regex tester lets you verify those effects immediately before shipping.",
        ],
      },
      {
        heading: "Regex Use Cases for Web Development",
        paragraphs: [
          "Typical use cases include email and username validation, route parameter parsing, markdown syntax processing, and sanitization checks. By validating these expressions with sample datasets, you can prevent user-facing errors and reduce invalid data entry.",
          "For backend services, regex helps parse logs, normalize identifiers, and classify incoming records. Testing expressions with representative examples keeps matching logic maintainable and avoids brittle assumptions.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does this regex tester support JavaScript flags?",
        answer:
          "Yes. You can test common JavaScript regex flags like global, case-insensitive, and multiline behavior.",
      },
      {
        question: "Can I test complex regex patterns?",
        answer:
          "Yes. The tool is built for both basic and advanced expressions, including grouped and nested pattern logic.",
      },
      {
        question: "Is my test data uploaded anywhere?",
        answer:
          "No. Testing runs locally in your browser for privacy and fast feedback.",
      },
    ],
    relatedSlugs: ["json-formatter", "markdown-preview", "uuid-generator"],
  },
  "jwt-decoder": {
    primaryKeyword: "jwt decoder online",
    metaTitle: "JWT Decoder Online - Decode Token Header & Payload",
    metaDescription:
      "Free JWT decoder online tool to inspect token headers, payload claims, and timestamps quickly. Browser-based and helpful for API debugging workflows.",
    intro: [
      "This JWT decoder online utility helps you inspect token structure without writing custom scripts. You can decode header and payload segments instantly to troubleshoot authentication, verify claim values, and debug integration behavior.",
      "Developers commonly use it while working with OAuth flows, role-based access control, and expiration handling. Fast token visibility improves confidence during local testing and production issue investigation.",
    ],
    howToSteps: [
      "Paste your JWT string into the decoder input.",
      "Inspect header values such as algorithm and token type.",
      "Review payload claims including issuer, subject, and expiry.",
      "Compare decoded claims with expected auth logic in your app.",
    ],
    sections: [
      {
        heading: "Understand JWT Structure Faster",
        paragraphs: [
          "A JWT contains three dot-separated segments: header, payload, and signature. Decoding the first two segments quickly helps validate claim content and identify mismatches between expected and actual token data.",
          "This is useful when access control fails unexpectedly. You can check user roles, audience values, and expiration timestamps to determine whether the issue is token generation, validation logic, or environment configuration.",
        ],
      },
      {
        heading: "JWT Debugging Best Practices",
        paragraphs: [
          "Do not rely on decoded payload visibility as proof of authenticity. A decoded token still requires signature verification on trusted backend systems. Use this tool for inspection and debugging, not for security validation decisions.",
          "During troubleshooting, compare decoded claims with your authorization middleware logs. This helps identify drift between identity provider configuration and application-side policy checks.",
        ],
      },
      {
        heading: "Practical Scenarios for API Teams",
        paragraphs: [
          "JWT decoding is handy when testing login flows, diagnosing expired session behavior, and confirming tenant-specific claims in multi-tenant apps. It also supports onboarding by helping team members understand token contracts quickly.",
          "In CI and integration tests, you can use decoded payload checks to validate fixture tokens and expected permissions. Clear token visibility reduces ambiguity and speeds up root-cause analysis.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does this JWT decoder verify signatures?",
        answer:
          "No. It decodes readable token segments only. Signature verification should happen on trusted backend systems.",
      },
      {
        question: "Can I decode expired JWT tokens?",
        answer:
          "Yes. Expired tokens can still be decoded for inspection and debugging purposes.",
      },
      {
        question: "Is JWT data stored on your servers?",
        answer:
          "No. Decoding runs in-browser so token content is processed locally.",
      },
    ],
    relatedSlugs: ["base64-converter", "json-formatter", "regex-tester"],
  },
  "uuid-generator": {
    primaryKeyword: "uuid generator online",
    metaTitle: "UUID Generator Online - Generate UUID v4 Instantly",
    metaDescription:
      "Generate UUID v4 values with this free UUID generator online tool. Create secure unique IDs for databases, APIs, and distributed systems.",
    intro: [
      "This UUID generator online tool helps you create unique identifiers in one click for database records, API resources, and distributed workflows. UUID v4 values are ideal when you need globally unique IDs without central coordination.",
      "Use generated UUIDs for testing, seeding, temporary identifiers, or production-ready ID placeholders while building features across frontend and backend systems.",
    ],
    howToSteps: [
      "Choose how many UUIDs you want to generate.",
      "Generate UUID v4 values instantly.",
      "Copy one or many IDs for your project.",
      "Use the UUIDs in database records, APIs, or test fixtures.",
    ],
    sections: [
      {
        heading: "Why UUIDs Matter in Modern Systems",
        paragraphs: [
          "Unlike incremental IDs, UUIDs reduce collision risk across distributed services and offline-generated records. This makes them useful for microservices, edge devices, and multi-region applications where central ID coordination can become a bottleneck.",
          "UUIDs also make client-side temporary record creation easier. Frontend apps can assign IDs before server confirmation, enabling optimistic UI patterns and smoother user interactions.",
        ],
      },
      {
        heading: "UUID v4 Usage Recommendations",
        paragraphs: [
          "Store UUIDs in normalized formats and keep consistent casing across services to avoid avoidable comparison bugs. If database indexing performance is a concern, evaluate storage format strategies and indexing trade-offs in your chosen engine.",
          "For debugging clarity, pair UUIDs with human-readable metadata in logs. This helps trace workflows while preserving unique identification in async systems.",
        ],
      },
      {
        heading: "Development and Testing Use Cases",
        paragraphs: [
          "During development, UUID generators speed up seed data creation and API mock responses. You can quickly populate fixtures for forms, dashboards, and relationship mapping tests without writing additional helper scripts.",
          "QA teams can also generate controlled ID sets when reproducing edge cases involving duplicate checks, sync retries, and idempotent request behavior.",
        ],
      },
    ],
    faqs: [
      {
        question: "What UUID version does this tool generate?",
        answer: "The tool is intended for UUID v4 generation using random values.",
      },
      {
        question: "Can I generate multiple UUIDs at once?",
        answer:
          "Yes. You can generate a list of UUIDs quickly for fixtures, seeds, and bulk workflows.",
      },
      {
        question: "Is this UUID generator free?",
        answer: "Yes. It is free for development and production preparation use cases.",
      },
    ],
    relatedSlugs: ["json-formatter", "regex-tester", "base64-converter"],
  },
  "markdown-preview": {
    primaryKeyword: "markdown preview online",
    metaTitle: "Markdown Preview Online - Live Markdown Editor & Viewer",
    metaDescription:
      "Use Markdown preview online with live rendering. Write Markdown and instantly view formatted output for docs, READMEs, and technical content.",
    intro: [
      "This Markdown preview online tool lets you write and render Markdown side by side so documentation workflows stay fast and predictable. It is useful for README authoring, technical notes, and content drafted for docs portals.",
      "Live preview reduces formatting guesswork and helps teams produce cleaner documentation with fewer iteration cycles during review.",
    ],
    howToSteps: [
      "Type or paste Markdown content in the editor pane.",
      "Review live rendered output instantly.",
      "Adjust headings, lists, and code blocks for readability.",
      "Copy polished Markdown into docs, wikis, or repositories.",
    ],
    sections: [
      {
        heading: "Write Better Technical Docs Faster",
        paragraphs: [
          "Markdown is a standard format for engineering communication, but raw syntax can hide final readability issues. Live preview helps you catch heading hierarchy problems, broken list flow, and code block formatting before publishing.",
          "For teams, consistent Markdown structure improves onboarding and long-term maintainability. Clear headings and predictable formatting make internal documentation easier to scan and update.",
        ],
      },
      {
        heading: "Markdown Tips for Developer Teams",
        paragraphs: [
          "Use concise headings, task-focused sections, and short code snippets to keep documentation practical. Previewing as you write helps maintain visual rhythm and prevents oversized paragraphs that reduce comprehension.",
          "Link related references directly inside docs so readers can navigate to API endpoints, schema notes, and tool pages without losing context. This improves discoverability and internal linking across documentation ecosystems.",
        ],
      },
      {
        heading: "Where Markdown Preview Helps Most",
        paragraphs: [
          "Use this tool to draft release notes, changelogs, pull request templates, and setup guides. These documents often require quick iteration and clear formatting guarantees before team-wide distribution.",
          "Content writers and developer advocates can also validate markdown articles before CMS publishing, reducing formatting regressions between local drafts and production output.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I preview Markdown in real time?",
        answer: "Yes. The rendered output updates as you type for immediate feedback.",
      },
      {
        question: "Does this support common Markdown syntax?",
        answer:
          "Yes. It supports standard headings, lists, links, code blocks, and other typical Markdown structures.",
      },
      {
        question: "Is the markdown content stored online?",
        answer:
          "No. Draft content is processed in your browser for fast local preview.",
      },
    ],
    relatedSlugs: ["html-formatter", "json-formatter", "regex-tester"],
  },
  "gradient-marker": {
    primaryKeyword: "css gradient generator online",
    metaTitle: "CSS Gradient Generator Online - Build Custom Background Gradients",
    metaDescription:
      "Create beautiful gradients with this CSS gradient generator online tool. Design, preview, and copy production-ready CSS instantly.",
    intro: [
      "This CSS gradient generator online tool helps you design linear gradients visually and export clean CSS for production. It is great for hero backgrounds, UI accents, cards, and modern landing page styling.",
      "Instead of manually tweaking angle and color stops in code, you can experiment quickly and copy final values once the visual result matches your design direction.",
    ],
    howToSteps: [
      "Choose start and end colors for your gradient.",
      "Adjust direction or angle to match the desired layout.",
      "Preview the gradient in real time.",
      "Copy generated CSS and paste into your stylesheet or component.",
    ],
    sections: [
      {
        heading: "Design Better Visual Hierarchy with Gradients",
        paragraphs: [
          "Gradients can guide attention and add depth without heavy graphics. When used carefully, they improve contrast and visual flow in sections like headers, call-to-action blocks, and onboarding screens.",
          "This tool speeds up experimentation by letting you compare options quickly. You can test subtle and bold styles before committing CSS values into a design system.",
        ],
      },
      {
        heading: "Production Tips for Gradient CSS",
        paragraphs: [
          "Always test gradients against text contrast rules, especially on smaller mobile screens. A visually attractive gradient can still reduce readability if color transitions interfere with foreground elements.",
          "Use reusable CSS variables for gradient values when possible. This makes theme updates easier and reduces repetitive style maintenance across components.",
        ],
      },
      {
        heading: "Common Developer Use Cases",
        paragraphs: [
          "Developers often use gradients in marketing pages, dashboards, and data cards where a flat background feels too plain. Quick iteration helps teams align visual tone with brand identity while maintaining engineering efficiency.",
          "For prototypes and demos, generating gradients instantly avoids extra design tooling overhead and keeps implementation velocity high.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I copy CSS directly from this tool?",
        answer:
          "Yes. The generated gradient CSS is ready to paste into stylesheets or component files.",
      },
      {
        question: "Does the gradient preview update live?",
        answer:
          "Yes. Visual output changes in real time as you adjust colors and direction.",
      },
      {
        question: "Is this CSS gradient generator free?",
        answer: "Yes. It is free and browser-based.",
      },
    ],
    relatedSlugs: ["markdown-preview", "html-formatter", "image-to-base64"],
  },
  "image-to-base64": {
    primaryKeyword: "image to base64 converter online",
    metaTitle: "Image to Base64 Converter Online - Encode Images Quickly",
    metaDescription:
      "Convert images to Base64 strings with this free online tool. Great for data URIs, testing, and embedding assets in HTML, CSS, and JSON payloads.",
    intro: [
      "This image to Base64 converter online utility helps you encode image files into text strings for embedding and transfer. It is useful for quick prototyping, transport-safe payloads, and debugging asset handling workflows.",
      "By converting locally in the browser, you avoid uploading files to third-party servers and keep sensitive design assets private during development.",
    ],
    howToSteps: [
      "Upload or drop an image file into the converter.",
      "Generate a Base64 string instantly.",
      "Copy the output as plain Base64 or data URI format.",
      "Use it in CSS, HTML, JSON payloads, or test fixtures.",
    ],
    sections: [
      {
        heading: "When to Use Image-to-Base64 Conversion",
        paragraphs: [
          "Base64 image strings are useful when you need a self-contained payload, such as inline demos, temporary embeds, or API fixtures. They are common in quick prototypes where separate file hosting is unnecessary.",
          "Developers also use conversion for automated testing where storing small images as strings simplifies fixture management and reduces dependency on external asset paths.",
        ],
      },
      {
        heading: "Performance Considerations for Production",
        paragraphs: [
          "Base64 increases file size compared to binary formats, so avoid overusing it for large images in production. For performance-sensitive pages, optimized file delivery and caching usually provide better Core Web Vitals outcomes.",
          "Use image-to-Base64 strategically for small icons, placeholders, and controlled use cases. This keeps payloads manageable while preserving the convenience of inline assets.",
        ],
      },
      {
        heading: "Practical Workflow Tips",
        paragraphs: [
          "When embedding data URIs, keep naming and comments clear so future maintainers know why inline assets were chosen. This prevents confusion during refactors and helps teams migrate to CDN-based assets when needed.",
          "Pair this converter with Base64 decode utilities to validate round-trip behavior during debugging. Quick encode/decode loops reduce integration uncertainty.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is image conversion done in the browser?",
        answer:
          "Yes. Images are processed locally in your browser for privacy and speed.",
      },
      {
        question: "Can I use the output as a data URI?",
        answer:
          "Yes. You can use the generated Base64 string directly in data URI-based HTML and CSS contexts.",
      },
      {
        question: "Should I use Base64 for large images?",
        answer:
          "Usually no. Large files are better served as optimized images with caching for better performance.",
      },
    ],
    relatedSlugs: ["base64-converter", "gradient-marker", "html-formatter"],
  },
  "html-formatter": {
    primaryKeyword: "html formatter online free",
    metaTitle: "HTML Formatter Online Free - Beautify and Clean HTML Code",
    metaDescription:
      "Use this HTML formatter online free to beautify messy markup, fix indentation, and improve readability instantly. Great for frontend debugging and cleanup.",
    intro: [
      "This HTML formatter online free tool helps you turn unreadable markup into clean, properly indented code that is easier to debug and maintain. It is ideal for frontend development, CMS cleanup, and quick inspection of generated templates.",
      "Readable HTML improves collaboration and reduces regression risk when teams edit shared components. Clean structure also helps identify misplaced tags and layout issues faster.",
    ],
    howToSteps: [
      "Paste raw or minified HTML into the editor.",
      "Run the formatter to apply clean indentation.",
      "Review nested elements and semantic structure.",
      "Copy formatted markup back into your project files.",
    ],
    sections: [
      {
        heading: "Why HTML Formatting Improves Development Speed",
        paragraphs: [
          "Poorly formatted HTML slows down debugging because nesting errors and unclosed tags become hard to spot. A formatted structure provides visual hierarchy that makes section-level changes safer and more predictable.",
          "Formatting also reduces code review friction. Teammates can understand intent quickly, comment on real issues, and avoid wasting time parsing compressed markup.",
        ],
      },
      {
        heading: "Semantic HTML and SEO Benefits",
        paragraphs: [
          "A formatter does more than aesthetics; it encourages semantic structure checks. While cleaning markup, you can verify heading order, landmark sections, list usage, and accessible attribute patterns that support stronger technical SEO.",
          "Search engines parse document structure to understand content relevance. Keeping HTML organized helps prevent accidental hierarchy breaks that can weaken on-page clarity.",
        ],
      },
      {
        heading: "Practical Cleanup Use Cases",
        paragraphs: [
          "HTML formatting is useful after copying snippets from email builders, CMS exports, or third-party widgets. These sources often include inconsistent spacing and deeply nested wrappers that complicate maintenance.",
          "The tool also helps when comparing template changes. Clean indentation makes diffs smaller and improves reliability during iterative UI work.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can this tool format minified HTML?",
        answer: "Yes. It can expand minified markup into readable, indented HTML.",
      },
      {
        question: "Does HTML formatting affect page behavior?",
        answer:
          "Formatting mainly changes whitespace and readability. Functional behavior stays the same in most cases.",
      },
      {
        question: "Is this HTML formatter free to use?",
        answer: "Yes. It is free and available directly in the browser.",
      },
    ],
    relatedSlugs: ["markdown-preview", "json-formatter", "gradient-marker"],
  },
};

export function buildToolKeywords(tool: ToolCatalogItem, primaryKeyword: string): string[] {
  return Array.from(new Set([primaryKeyword, ...tool.keywords, "developer tools online free"]));
}
