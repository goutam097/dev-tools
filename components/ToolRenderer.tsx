"use client";

import { lazy, Suspense } from "react";

const toolComponents = {
  "json-formatter": lazy(() => import("./JSONFormatter")),
  "json-to-typescript": lazy(() => import("./JSONToTypeScriptConverter")),
  "url-encoder-decoder": lazy(() => import("./UrlEncoderDecoder")),
  "timestamp-converter": lazy(() => import("./TimestampConverter")),
  "jwt-decoder": lazy(() => import("./JWTDecoder")),
  "base64-converter": lazy(() => import("./Base64Converter")),
  "regex-tester": lazy(() => import("./RegexTester")),
  "uuid-generator": lazy(() => import("./UUIDGenerator")),
  "markdown-preview": lazy(() => import("./MarkdownConverter")),
  "gradient-marker": lazy(() => import("./GradientGenerator")),
  "image-to-base64": lazy(() => import("./ImageBase64Converter")),
  "html-formatter": lazy(() => import("./HTMLFormatter")),
  "csv-data-cleaner": lazy(() => import("./CsvDataCleaner")),
  "cron-expression-builder": lazy(() => import("./CronExpressionBuilder")),
  "json-schema-playground": lazy(() => import("./JsonSchemaPlayground")),
  "css-grid-generator": lazy(() => import("./CssGridGenerator")),
  "meta-tag-generator": lazy(() => import("./MetaTagGenerator")),
  "bulk-qr-code-generator": lazy(() => import("./BulkQrCodeGenerator")),
};

export default function ToolRenderer({ slug }: { slug: string }) {
  const Tool = Object.entries(toolComponents).find(([toolSlug]) => toolSlug === slug)?.[1];
  if (!Tool) return null;

  return (
    <Suspense fallback={<div className="py-8 text-center text-sm text-(--muted)" aria-busy="true">Loading tool...</div>}>
      <Tool />
    </Suspense>
  );
}
