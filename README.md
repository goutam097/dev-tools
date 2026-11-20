## DevTools Hub

DevTools Hub includes:

- JSON Formatter
- JWT Decoder
- Base64 Converter
- Regex Tester
- UUID Generator
- Markdown Preview
- Gradient Marker
- Image to Base64

The app now uses MongoDB for users and history storage, and includes SEO routes (`/tools`, `/tools/[slug]`, `sitemap.xml`, `robots.txt`).

## Getting Started

1. Create env vars from `.env.example`.
2. Install dependencies.
3. Run the development server.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Analytics

Set these environment variables to enable analytics:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` for Google Analytics 4
- `NEXT_PUBLIC_CLARITY_PROJECT_ID` for Microsoft Clarity

Tracked signals:

- Page visits (`page_view`)
- Tool interactions: `tool_open`, `tool_execute`, `tool_copy`, `tool_download`, and `tool_error`
- Related-tool navigation (`related_tool_click`) from tool and guide pages

Analytics events use tool identifiers and a page/source category only. Tool inputs, uploaded content, JWT values, query-string parameters, and location details are not sent to GA4. GA4 loads only when a valid measurement ID is configured.

Run `npm run build` followed by `npm test` to check tool utility behavior and built-page SEO metadata, canonicals, sitemap coverage, and internal links.
