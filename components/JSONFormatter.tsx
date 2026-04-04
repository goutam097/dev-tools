"use client";

import { useState } from "react";
import { Check, Copy, Trash2, Wand2 } from "lucide-react";
import JsonViewer from "./JsonViewer";
import { saveHistory } from "@/lib/clientHistory";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<any>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formatJson = async () => {
    try {
      if (!input.trim()) return;

      const parsed = JSON.parse(input);

      setOutput(parsed); // store object directly
      setError("");

      await saveHistory(
        "json",
        input,
        JSON.stringify(parsed, null, 2)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput(null);
    }
  };

  const minifyJson = async () => {
    try {
      if (!input.trim()) return;

      const parsed = JSON.parse(input);

      setOutput(parsed);
      setError("");

      await saveHistory(
        "json",
        input,
        JSON.stringify(parsed)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput(null);
    }
  };

  const copyOutput = async () => {
    if (!output) return;

    await navigator.clipboard.writeText(
      JSON.stringify(output, null, 2)
    );

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* INPUT */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="tool-label">Input</label>
          <button
            type="button"
            onClick={() => setInput("")}
            className="rounded p-2 text-red-500 hover:bg-red-100"
          >
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
          <button
            type="button"
            onClick={() => void formatJson()}
            className="tool-btn-primary sm:flex-1"
          >
            <Wand2 size={16} />
            <span>Format</span>
          </button>

          <button
            type="button"
            onClick={() => void minifyJson()}
            className="tool-btn-secondary"
          >
            Minify
          </button>
        </div>
      </section>

      {/* OUTPUT */}
      <section className="space-y-4">
  <div className="flex items-center justify-between">
    <label className="tool-label">Output</label>

    <button
      type="button"
      onClick={() => void copyOutput()}
      disabled={!output}
      className="flex items-center gap-2 rounded-md bg-gray-800 px-3 py-1.5 text-sm text-white hover:bg-gray-700 disabled:opacity-40"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  </div>

  <div className="h-[420px] overflow-auto rounded-xl border bg-[#0f172a] p-4 font-mono text-sm shadow-inner">
    {error ? (
      <span className="text-red-400">{error}</span>
    ) : output ? (
      <JsonViewer data={output} />
    ) : (
      <span className="text-gray-500">Output appears here</span>
    )}
  </div>
</section>
    </div>
  );
}