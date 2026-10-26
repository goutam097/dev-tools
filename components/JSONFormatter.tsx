"use client";

import { useState } from "react";
import { Check, Copy, Trash2, Wand2 } from "lucide-react";
import JsonViewer from "./JsonViewer";
import { saveHistory } from "@/lib/clientHistory";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<unknown>(null);
  const [hasOutput, setHasOutput] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formatJson = async () => {
    try {
      if (!input.trim()) {
        setOutput(null);
        setHasOutput(false);
        setError("Enter JSON to format.");
        return;
      }

      const parsed = JSON.parse(input);

      setOutput(parsed);
      setHasOutput(true);
      setError("");

      await saveHistory(
        "json",
        input,
        JSON.stringify(parsed, null, 2)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput(null);
      setHasOutput(false);
    }
  };

  const minifyJson = async () => {
    try {
      if (!input.trim()) {
        setOutput(null);
        setHasOutput(false);
        setError("Enter JSON to minify.");
        return;
      }

      const parsed = JSON.parse(input);

      setOutput(parsed);
      setHasOutput(true);
      setError("");

      await saveHistory(
        "json",
        input,
        JSON.stringify(parsed)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput(null);
      setHasOutput(false);
    }
  };

  const copyOutput = async () => {
    if (!hasOutput) return;
    try {
      const formatted = JSON.stringify(output, null, 2);
      if (formatted === undefined) {
        setError("The JSON value could not be serialized.");
        return;
      }
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setError("");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
      setError("Clipboard access was blocked. Select and copy the output manually.");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* INPUT */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="json-formatter-input" className="tool-label">Input</label>
          <button
            type="button"
            aria-label="Clear JSON input and output"
            onClick={() => {
              setInput("");
              setOutput(null);
              setHasOutput(false);
              setError("");
            }}
            className="rounded p-2 text-red-500 hover:bg-red-100"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <textarea
          id="json-formatter-input"
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
    <p className="tool-label">Output</p>

    <button
      type="button"
      onClick={() => void copyOutput()}
      disabled={!hasOutput}
      className="flex items-center gap-2 rounded-md bg-gray-800 px-3 py-1.5 text-sm text-white hover:bg-gray-700 disabled:opacity-40"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  </div>

  <div className="h-[420px] overflow-auto rounded-xl border bg-[#0f172a] p-4 font-mono text-sm shadow-inner">
    {error ? (
      <span role="alert" className="text-red-400">{error}</span>
    ) : hasOutput ? (
      <JsonViewer data={output} />
    ) : (
      <span className="text-gray-500">Output appears here</span>
    )}
  </div>
</section>
    </div>
  );
}