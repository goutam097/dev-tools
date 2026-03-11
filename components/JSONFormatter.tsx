"use client";

import { useState } from "react";
import { Check, Copy, Trash2, Wand2 } from "lucide-react";
import { saveHistory } from "@/lib/clientHistory";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formatJson = async (indent = 2) => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setError("");
      await saveHistory("json", input, formatted);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
    }
  };

  const minifyJson = async () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
      await saveHistory("json", input, minified);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
    }
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="tool-label">Input</label>
          <button type="button" onClick={() => setInput("")} className="rounded p-2 text-red-500 transition hover:bg-red-100">
            <Trash2 size={16} />
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"hello":"world"}'
          className="tool-textarea"
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => void formatJson(2)} className="tool-btn-primary sm:flex-1">
            <Wand2 size={16} />
            <span>Format</span>
          </button>
          <button type="button" onClick={() => void minifyJson()} className="tool-btn-secondary sm:w-auto">
            Minify
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="tool-label">Output</label>
          <button type="button" onClick={() => void copyOutput()} disabled={!output} className="tool-copy-btn">
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
        <pre className="tool-output-pre">
          {error ? <span className="text-red-600">{error}</span> : output || <span className="opacity-40">Output appears here</span>}
        </pre>
      </section>
    </div>
  );
}
