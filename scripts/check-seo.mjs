import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appOutput = path.join(root, ".next", "server", "app");
const sitemapPath = path.join(appOutput, "sitemap.xml.body");

function readSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  const envPath = path.join(root, ".env");
  if (existsSync(envPath)) {
    const match = readFileSync(envPath, "utf8").match(/^NEXT_PUBLIC_SITE_URL=(.+)$/m);
    if (match) return match[1].trim().replace(/^["']|["']$/g, "").replace(/\/$/, "");
  }

  return "https://www.webcodeveloper.co.in";
}

function collectHtmlFiles(directory, relativeDirectory = "") {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = path.join(relativeDirectory, entry.name);
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectHtmlFiles(absolutePath, relativePath);
    return entry.isFile() && entry.name.endsWith(".html") ? [relativePath] : [];
  });
}

function getAttribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=(["'])(.*?)\\1`, "i"))?.[2] ?? "";
}

function findMeta(html, key, value) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  return tags.find((tag) => getAttribute(tag, key) === value) ?? "";
}

function routeFromHtmlPath(relativePath) {
  const route = `/${relativePath.replace(/\\/g, "/").replace(/\.html$/, "").replace(/\/index$/, "")}`;
  return route === "/index" ? "/" : route;
}

const siteUrl = readSiteUrl();
const siteOrigin = new URL(siteUrl).origin;
assert.ok(existsSync(appOutput), "Production build output is missing; run `npm run build` first.");
assert.ok(existsSync(sitemapPath), "Generated sitemap is missing; run `npm run build` first.");

const htmlFiles = collectHtmlFiles(appOutput).filter(
  (file) => !file.startsWith("_") && !file.includes(`${path.sep}_`),
);
const routes = new Set(htmlFiles.map(routeFromHtmlPath));
const titles = new Map();
const canonicals = new Set();
const pageHtmlByRoute = new Map();
const priorityContent = new Map([
  ["/tools/timestamp-converter", ["1700000000", "Frequently Asked Questions"]],
  ["/tools/csv-data-cleaner", ["RFC 4180", "5 MiB"]],
  ["/tools/base64-converter", ["SGVsbG8=", "/tools/image-to-base64"]],
  ["/tools/markdown-preview", ["HTML Formatter", "/tools/html-formatter"]],
]);

for (const file of htmlFiles) {
  const route = routeFromHtmlPath(file);
  const html = readFileSync(path.join(appOutput, file), "utf8");
  pageHtmlByRoute.set(route, html);

  const title = html.match(/<title>(.*?)<\/title>/i)?.[1]?.trim() ?? "";
  const description = getAttribute(findMeta(html, "name", "description"), "content");
  const canonicalTag = (html.match(/<link\b[^>]*rel="canonical"[^>]*>/i) ?? [])[0] ?? "";
  const canonical = getAttribute(canonicalTag, "href");
  const ogTitle = getAttribute(findMeta(html, "property", "og:title"), "content");
  const ogDescription = getAttribute(findMeta(html, "property", "og:description"), "content");
  const ogUrl = getAttribute(findMeta(html, "property", "og:url"), "content");

  assert.ok(title, `${route} has no server-rendered title`);
  assert.ok(description, `${route} has no server-rendered description`);
  assert.ok(canonical, `${route} has no canonical URL`);
  assert.equal(canonical, `${siteUrl}${route === "/" ? "" : route}`, `${route} canonical mismatch`);
  assert.equal(ogUrl, canonical, `${route} Open Graph URL must match its canonical`);
  assert.ok(ogTitle, `${route} has no Open Graph title`);
  assert.ok(ogDescription, `${route} has no Open Graph description`);
  assert.ok(html.includes("<h1"), `${route} has no server-rendered primary heading`);
  assert.ok(!canonicals.has(canonical), `Duplicate canonical URL: ${canonical}`);
  assert.ok(!titles.has(title), `Duplicate page title: ${title}`);
  if (route.startsWith("/tools/")) {
    assert.ok(html.includes("How to Use This Tool"), `${route} is missing server-rendered instructions`);
    assert.ok(html.includes("Frequently Asked Questions"), `${route} is missing server-rendered FAQs`);
    assert.ok(!html.includes('"@type":"FAQPage"'), `${route} should not advertise FAQ rich results`);
  }
  for (const requiredContent of priorityContent.get(route) ?? []) {
    assert.ok(html.includes(requiredContent), `${route} is missing expected content: ${requiredContent}`);
  }
  canonicals.add(canonical);
  titles.set(title, route);
}

for (const route of [
  "/tools/timestamp-converter",
  "/tools/csv-data-cleaner",
  "/tools/base64-converter",
  "/tools/markdown-preview",
  "/tools/jwt-decoder",
]) {
  const html = pageHtmlByRoute.get(route) ?? "";
  const scripts = [...html.matchAll(/(?:src|href)="([^"]+\.js)"/g)]
    .map((match) => new URL(match[1], siteUrl).pathname)
    .filter((urlPath) => urlPath.startsWith("/_next/static/"))
    .map((urlPath) => path.join(root, ".next", "static", urlPath.slice("/_next/static/".length)));
  const byteSize = [...new Set(scripts)].reduce(
    (total, scriptPath) => total + (existsSync(scriptPath) ? readFileSync(scriptPath).byteLength : 0),
    0,
  );
  assert.ok(byteSize > 0, `${route} has no browser JavaScript output`);
  assert.ok(byteSize <= 800 * 1024, `${route} initial JavaScript is over the 800 KiB budget`);
}

const sitemap = readFileSync(sitemapPath, "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.ok(sitemapUrls.length > 0, "Generated sitemap has no URLs");
assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, "Sitemap contains duplicate URLs");

for (const sitemapUrl of sitemapUrls) {
  const parsedUrl = new URL(sitemapUrl);
  assert.equal(parsedUrl.origin, siteOrigin, `Sitemap URL is on an unexpected host: ${sitemapUrl}`);
  assert.ok(routes.has(parsedUrl.pathname || "/"), `Sitemap route has no generated page: ${sitemapUrl}`);
}

for (const route of routes) {
  assert.ok(sitemapUrls.includes(`${siteUrl}${route === "/" ? "" : route}`), `Generated page is missing from sitemap: ${route}`);
}

for (const [route, html] of pageHtmlByRoute) {
  const anchors = html.match(/<a\b[^>]*\bhref=(["'])(.*?)\1/gi) ?? [];
  for (const anchor of anchors) {
    const href = getAttribute(anchor, "href").replace(/&amp;/g, "&");
    if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
      continue;
    }

    const target = new URL(href, `${siteUrl}${route}`);
    if (target.origin !== siteOrigin || target.pathname.startsWith("/_next/") || target.pathname.startsWith("/api/")) {
      continue;
    }

    const targetRoute = target.pathname.replace(/\/$/, "") || "/";
    assert.ok(routes.has(targetRoute), `${route} links to a missing page: ${href}`);

    if (target.hash) {
      const targetHtml = pageHtmlByRoute.get(targetRoute) ?? "";
      const id = decodeURIComponent(target.hash.slice(1));
      assert.ok(
        targetHtml.includes(`id="${id}"`) || targetHtml.includes(`id='${id}'`),
        `${route} links to a missing anchor: ${href}`,
      );
    }
  }
}

console.log(`SEO checks passed: ${routes.size} rendered routes, ${sitemapUrls.length} sitemap URLs, unique metadata, internal links resolved, and priority-page content/scripts checked.`);
