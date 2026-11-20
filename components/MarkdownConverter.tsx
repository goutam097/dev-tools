"use client";

import { useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy } from "lucide-react";
import { saveHistory } from "@/lib/clientHistory";
import { trackToolEvent } from "@/lib/analytics";

export default function MarkdownConverter() {
  const [markdown, setMarkdown] = useState("# Hello\n\nWrite markdown on the left.");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const hasTrackedPreviewRef = useRef(false);

  const copyHtml = async () => {
    const preview = document.getElementById("markdown-preview");
    if (!preview) return;

    try {
      await navigator.clipboard.writeText(preview.innerHTML);
    } catch {
      trackToolEvent("tool_error", "markdown-preview", "seo-page");
      setCopyError("Clipboard access is unavailable. Select and copy the preview manually.");
      return;
    }

    trackToolEvent("tool_copy", "markdown-preview", "seo-page");
    setCopyError("");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    await saveHistory("markdown", markdown, "html-copied");
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <section className="space-y-3">
        <label htmlFor="markdown-input" className="tool-label">Markdown Input</label>
        <textarea
          id="markdown-input"
          value={markdown}
          onChange={(e) => {
            setMarkdown(e.target.value);
            if (!hasTrackedPreviewRef.current) {
              hasTrackedPreviewRef.current = true;
              trackToolEvent("tool_execute", "markdown-preview", "seo-page");
            }
          }}
          className="tool-textarea"
          placeholder="# Heading"
        />
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="tool-label">Live Preview</p>
          <button type="button" onClick={() => void copyHtml()} className="tool-copy-btn">
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? "Copied" : "Copy HTML"}</span>
          </button>
        </div>
        {copyError && <p role="alert" className="text-sm text-red-700">{copyError}</p>}
        <article id="markdown-preview" className="tool-output-pre prose h-[42vh] min-h-[260px] max-w-none overflow-auto md:h-[500px]">
          <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        </article>
      </section>
    </div>
  );
}
