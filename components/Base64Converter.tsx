"use client";

import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { saveHistory } from "@/lib/clientHistory";

function encodeUtf8(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

function decodeUtf8(value: string) {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export default function Base64Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const convert = async () => {
    try {
      if (!input.trim()) return;
      const result = mode === "encode" ? encodeUtf8(input) : decodeUtf8(input.trim());
      setOutput(result);
      setError("");
      await saveHistory("base64", input, result);
    } catch (err) {
      setOutput("");
      setError(err instanceof Error ? err.message : "Conversion failed");
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
        >
          <ArrowLeftRight size={20} />
        </button>
        <span className={mode === "decode" ? "font-serif text-xl italic" : "font-serif text-xl italic opacity-40"}>Base64</span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="space-y-3">
          <label className="tool-label">Input</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className="tool-textarea h-64" />
        </section>
        <section className="space-y-3">
          <label className="tool-label">Output</label>
          <pre className="tool-output-pre h-64">{error ? <span className="text-red-600">{error}</span> : output || "Result appears here"}</pre>
        </section>
      </div>

      <button type="button" onClick={() => void convert()} className="tool-btn-primary w-full justify-center py-4">
        {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
      </button>
    </div>
  );
}
