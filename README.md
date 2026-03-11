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
- Tool usage (`tool_usage`) from app sidebar and `/tools/[slug]` pages
- User location (country/region/city when available via edge headers, plus browser timezone/locale)
- Popular tools (derived from `tool_usage` event counts by tool)
