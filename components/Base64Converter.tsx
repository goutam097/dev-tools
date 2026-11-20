"use client";

import { useState } from "react";
import { ArrowLeftRight, Check, Copy } from "lucide-react";
import { saveHistory } from "@/lib/clientHistory";
import { trackToolEvent } from "@/lib/analytics";

function normalizeBase64Input(value: string) {
  const trimmed = value.trim().replace(/\s+/g, "");
  if (!trimmed) return "";

  const normalized = trimmed.includes("-") || trimmed.includes("_") ? trimmed.replace(/-/g, "+").replace(/_/g, "/") : trimmed;
  const remainder = normalized.length % 4;
  if (remainder === 0) return normalized;
  return normalized + "=".repeat(4 - remainder);
}

function encodeUtf8(value: string) {
  if (!value) return "";
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function decodeUtf8(value: string) {
  const normalized = normalizeBase64Input(value);
  if (!normalized) return "";

  const isValidBase64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u.test(normalized);
  if (!isValidBase64) {
    throw new Error("Invalid Base64 input. Check the string and try again.");
  }

  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

export default function Base64Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = async () => {
    try {
      if (!input.trim()) {
        setOutput("");
        setError("");
        return;
      }

      const result = mode === "encode" ? encodeUtf8(input) : decodeUtf8(input);
      setOutput(result);
      setError("");
      trackToolEvent("tool_execute", "base64-converter", "seo-page");
      await saveHistory("base64", input, result);
    } catch (err) {
      setOutput("");
      trackToolEvent("tool_error", "base64-converter", "seo-page");
      setError(err instanceof Error ? err.message : "Conversion failed");
    }
  };

  const copyOutput = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      trackToolEvent("tool_copy", "base64-converter", "seo-page");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      trackToolEvent("tool_error", "base64-converter", "seo-page");
      setError("Clipboard access is unavailable. Select and copy the output manually.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <span className={mode === "encode" ? "font-serif text-xl italic" : "font-serif text-xl italic opacity-40"}>Text</span>
        <button
          type="button"
          onClick={() => {
            setMode((prev) => (prev === "encode" ? "decode" : "encode"));
            setInput(output);
            setOutput(input);
            setError("");
          }}
          className="rounded-full bg-[var(--ink)] p-3 text-[var(--bg)] transition hover:rotate-180"
          aria-label="Toggle encode and decode modes"
        >
          <ArrowLeftRight size={20} />
        </button>
        <span className={mode === "decode" ? "font-serif text-xl italic" : "font-serif text-xl italic opacity-40"}>Base64</span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="space-y-3">
          <label htmlFor="base64-input" className="tool-label">Input</label>
          <textarea id="base64-input" value={input} onChange={(e) => setInput(e.target.value)} className="tool-textarea h-64" />
        </section>
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="tool-label">Output</p>
            <button type="button" onClick={() => void copyOutput()} disabled={!output} className="tool-copy-btn disabled:cursor-not-allowed disabled:opacity-40">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="tool-output-pre h-64" aria-label="Base64 conversion output">{output || "Result appears here"}</pre>
        </section>
      </div>

      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button type="button" onClick={() => void convert()} className="tool-btn-primary w-full justify-center py-4">
        {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
      </button>
    </div>
  );
}
