"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { buildMetaTags, type MetaTagValues } from "@/lib/metaTagGenerator";

const robotOptions = ["index", "follow", "noindex", "nofollow", "noarchive", "nosnippet"];

export default function MetaTagGenerator() {
  const [values, setValues] = useState<MetaTagValues>({
    title: "",
    description: "",
    keywords: "",
    author: "",
    canonicalUrl: "",
    robots: ["index", "follow"],
    imageUrl: "",
    twitterCard: "summary_large_image",
  });
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const canonicalError = getUrlError(values.canonicalUrl, "Canonical URL");
  const imageError = getUrlError(values.imageUrl, "Social image URL");
  const output = useMemo(() => buildMetaTags({
    ...values,
    canonicalUrl: canonicalError ? "" : values.canonicalUrl,
    imageUrl: imageError ? "" : values.imageUrl,
  }), [values, canonicalError, imageError]);

  const update = <K extends keyof MetaTagValues>(key: K, value: MetaTagValues[K]) =>
    setValues((current) => ({ ...current, [key]: value }));

  const toggleRobot = (robot: string) => {
    const current = values.robots;
    if (current.includes(robot)) {
      update("robots", current.filter((item) => item !== robot));
    } else {
      const counterpart = robot === "index" ? "noindex" : robot === "noindex" ? "index" : robot === "follow" ? "nofollow" : robot === "nofollow" ? "follow" : "";
      update("robots", [...current.filter((item) => item !== counterpart), robot]);
    }
  };

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setMessage("HTML copied to clipboard.");
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
      setMessage("Clipboard access was blocked. Select and copy the HTML manually.");
    }
  };

  const downloadHtml = () => {
    const documentHtml = `<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  ${output.split("\n").join("\n  ")}\n</head>\n<body>\n</body>\n</html>\n`;
    const url = URL.createObjectURL(new Blob([documentHtml], { type: "text/html;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "meta-tags.html";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("HTML file downloaded.");
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
      <section className="space-y-5 rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-7">
        <p className="tool-label">Page metadata</p>
        <label className="block space-y-2"><span className="tool-label">Page title</span><input value={values.title} maxLength={70} onChange={(event) => update("title", event.target.value)} placeholder="A clear, descriptive page title" className="w-full rounded-xl border border-(--border) px-3 py-2 text-sm" /><span className="text-xs text-(--muted)">{values.title.length}/70 characters</span></label>
        <label className="block space-y-2"><span className="tool-label">Description</span><textarea value={values.description} maxLength={320} onChange={(event) => update("description", event.target.value)} placeholder="Summarize the page for search and social previews" rows={3} className="w-full resize-y rounded-xl border border-(--border) px-3 py-2 text-sm" /><span className="text-xs text-(--muted)">{values.description.length}/320 characters</span></label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2"><span className="tool-label">Keywords</span><input value={values.keywords} onChange={(event) => update("keywords", event.target.value)} placeholder="web, developer, tools" className="w-full rounded-xl border border-(--border) px-3 py-2 text-sm" /></label>
          <label className="space-y-2"><span className="tool-label">Author</span><input value={values.author} onChange={(event) => update("author", event.target.value)} placeholder="Author name" className="w-full rounded-xl border border-(--border) px-3 py-2 text-sm" /></label>
        </div>
        <label className="block space-y-2"><span className="tool-label">Canonical URL</span><input type="url" value={values.canonicalUrl} onChange={(event) => update("canonicalUrl", event.target.value)} placeholder="https://example.com/page" aria-invalid={Boolean(canonicalError)} className="w-full rounded-xl border border-(--border) px-3 py-2 text-sm aria-[invalid=true]:border-red-400" />{canonicalError && <span role="alert" className="text-xs text-red-700">{canonicalError}</span>}</label>
        <label className="block space-y-2"><span className="tool-label">Social preview image URL</span><input type="url" value={values.imageUrl} onChange={(event) => update("imageUrl", event.target.value)} placeholder="https://example.com/share-image.jpg" aria-invalid={Boolean(imageError)} className="w-full rounded-xl border border-(--border) px-3 py-2 text-sm aria-[invalid=true]:border-red-400" />{imageError && <span role="alert" className="text-xs text-red-700">{imageError}</span>}</label>
        <div className="space-y-2"><p className="tool-label">Robots directives</p><div className="flex flex-wrap gap-x-4 gap-y-2">{robotOptions.map((robot) => <label key={robot} className="flex items-center gap-2 text-xs"><input type="checkbox" checked={values.robots.includes(robot)} onChange={() => toggleRobot(robot)} className="accent-(--ink)" />{robot}</label>)}</div></div>
        <label className="block space-y-2"><span className="tool-label">Twitter card type</span><select value={values.twitterCard} onChange={(event) => update("twitterCard", event.target.value === "summary" ? "summary" : "summary_large_image")} className="w-full rounded-xl border border-(--border) bg-white px-3 py-2 text-sm"><option value="summary_large_image">Summary with large image</option><option value="summary">Summary</option></select></label>
      </section>
      <div className="space-y-5">
        <section className="space-y-4 rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-7">
          <p className="tool-label">Search result preview</p>
          <div className="rounded-xl border border-(--border) p-4">
            <p className="truncate text-sm text-emerald-800">{(canonicalError ? "" : values.canonicalUrl) || "https://example.com/page"}</p>
            <h2 className="mt-1 line-clamp-2 text-xl text-blue-800">{values.title || "Your page title appears here"}</h2>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-(--muted)">{values.description || "A clear page description helps people understand what they will find."}</p>
          </div>
          <p className="tool-label">Social sharing preview</p>
          <div className="overflow-hidden rounded-xl border border-(--border) bg-(--surface)">
            {values.imageUrl && !imageError ? <div className="relative h-40 w-full"><Image src={values.imageUrl} alt="Social share image preview" fill unoptimized sizes="(max-width: 1280px) 100vw, 50vw" className="object-cover" /></div> : <div className="flex h-32 items-center justify-center bg-linear-to-br from-orange-200 to-stone-300 font-mono text-xs uppercase tracking-widest text-(--muted)">Social image preview</div>}
            <div className="p-4"><p className="font-mono text-[10px] uppercase text-(--muted)">{hostOf(values.canonicalUrl) || "example.com"}</p><p className="mt-1 font-semibold">{values.title || "Your page title"}</p><p className="mt-1 line-clamp-2 text-xs text-(--muted)">{values.description || "Your social description"}</p></div>
          </div>
        </section>
        <section className="space-y-3 rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3"><p className="tool-label">Generated HTML</p><div className="flex gap-2"><button type="button" onClick={() => void copyHtml()} disabled={Boolean(canonicalError || imageError)} className="tool-copy-btn disabled:opacity-40">{copied ? "Copied" : "Copy HTML"}</button><button type="button" onClick={downloadHtml} disabled={Boolean(canonicalError || imageError)} className="tool-copy-btn disabled:opacity-40">Download</button></div></div>
          <pre className="tool-output-pre min-h-64 whitespace-pre-wrap break-words">{output || "Fill in the page fields to generate tags."}</pre>
          <p role="status" aria-live="polite" className="min-h-4 text-xs text-(--muted)">{message}</p>
        </section>
      </div>
    </div>
  );
}

function getUrlError(value: string, label: string): string {
  if (!value.trim()) return "";
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? "" : `${label} must use HTTP or HTTPS.`;
  } catch {
    return `${label} must be a valid absolute URL.`;
  }
}

function hostOf(value: string): string {
  try {
    return new URL(value).hostname;
  } catch {
    return "";
  }
}
