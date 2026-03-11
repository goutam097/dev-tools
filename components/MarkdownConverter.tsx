"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy } from "lucide-react";
import { saveHistory } from "@/lib/clientHistory";

export default function MarkdownConverter() {
  const [markdown, setMarkdown] = useState("# Hello\n\nWrite markdown on the left.");
  const [copied, setCopied] = useState(false);

  const copyHtml = async () => {
    const preview = document.getElementById("markdown-preview");
    if (!preview) return;

    const html = preview.innerHTML;
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    await saveHistory("markdown", markdown, "html-copied");
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <section className="space-y-3">
        <label className="tool-label">Markdown Input</label>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="tool-textarea"
          placeholder="# Heading"
        />
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="tool-label">Live Preview</label>
          <button type="button" onClick={() => void copyHtml()} className="tool-copy-btn">
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? "Copied" : "Copy HTML"}</span>
          </button>
        </div>
        <article id="markdown-preview" className="tool-output-pre prose h-[42vh] min-h-[260px] max-w-none overflow-auto md:h-[500px]">
          <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        </article>
      </section>
    </div>
  );
}
