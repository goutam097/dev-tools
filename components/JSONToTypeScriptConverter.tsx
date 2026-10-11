"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, Clipboard, Copy, Download, FileCode2, RotateCcw } from "lucide-react";
import { convertJsonToTypeScript, type TypeScriptOutputStyle } from "@/lib/jsonToTypeScript";

const sampleJson = JSON.stringify(
  {
    id: 42,
    name: "Ada Lovelace",
    active: true,
    profile: {
      email: "ada@example.com",
      bio: null,
    },
    roles: ["admin", "editor"],
    projects: [
      { name: "Analytical Engine", stars: 12 },
      { name: "Notes", stars: 4, archived: false },
    ],
  },
  null,
  2,
);

export default function JSONToTypeScriptConverter() {
  const [input, setInput] = useState(sampleJson);
  const [rootTypeName, setRootTypeName] = useState("Root");
  const [outputStyle, setOutputStyle] = useState<TypeScriptOutputStyle>("interface");
  const [notice, setNotice] = useState("");

  const conversion = useMemo(() => {
    if (!input.trim()) {
      return { output: "", error: "" };
    }

    try {
      const parsed: unknown = JSON.parse(input);
      return {
        output: convertJsonToTypeScript(parsed, rootTypeName, outputStyle),
        error: "",
      };
    } catch (error) {
      return {
        output: "",
        error: error instanceof Error ? error.message : "The input is not valid JSON.",
      };
    }
  }, [input, outputStyle, rootTypeName]);

  const clearInput = () => {
    setInput("");
    setNotice("");
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      setNotice(text ? "Pasted from clipboard." : "Clipboard is empty.");
    } catch {
      setNotice("Clipboard access was denied. Paste directly into the editor instead.");
    }
  };

  const copyOutput = async () => {
    if (!conversion.output) return;

    try {
      await navigator.clipboard.writeText(conversion.output);
      setNotice("TypeScript copied to clipboard.");
    } catch {
      setNotice("Could not access the clipboard. Select and copy the output instead.");
    }
  };

  const downloadOutput = () => {
    if (!conversion.output) return;

    const file = new Blob([conversion.output], { type: "text/typescript;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    const filename = rootTypeName.trim().replace(/[^A-Za-z0-9_$-]+/g, "-").replace(/^-+|-+$/g, "");
    anchor.download = `${filename || "Root"}.ts`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("TypeScript file downloaded.");
  };

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-(--border) bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-2xl italic text-(--ink)">JSON to TypeScript</h2>
            <p className="mt-1 text-sm text-(--muted)">Paste a JSON sample and get ready-to-use TypeScript types.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setInput(sampleJson);
                setNotice("Sample JSON loaded.");
              }}
              className="tool-btn-secondary inline-flex items-center gap-2"
            >
              <FileCode2 size={15} />
              Sample
            </button>
            <button
              type="button"
              onClick={() => void pasteFromClipboard()}
              className="tool-btn-secondary inline-flex items-center gap-2"
            >
              <Clipboard size={15} />
              Paste
            </button>
            <button
              type="button"
              onClick={clearInput}
              className="tool-btn-secondary inline-flex items-center gap-2"
            >
              <RotateCcw size={15} />
              Clear
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="min-w-0 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="json-to-ts-input" className="tool-label">JSON input</label>
              <span className="font-mono text-[10px] text-(--muted)">Processed in your browser</span>
            </div>
            <textarea
              id="json-to-ts-input"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setNotice("");
              }}
              placeholder={'{\n  "name": "Ada"\n}'}
              spellCheck={false}
              className="h-[360px] w-full resize-y rounded-2xl border border-(--border) bg-[#151515] p-4 font-mono text-xs leading-6 text-[#f5f2e9] outline-none transition placeholder:text-white/35 focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/25 sm:h-[440px]"
              aria-describedby={conversion.error ? "json-to-ts-error" : undefined}
              aria-invalid={Boolean(conversion.error)}
            />
            {conversion.error && (
              <p id="json-to-ts-error" role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span><strong>Invalid JSON:</strong> {conversion.error}</span>
              </p>
            )}
          </div>

          <div className="min-w-0 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="json-to-ts-root-name" className="tool-label">Root type name</label>
                <input
                  id="json-to-ts-root-name"
                  value={rootTypeName}
                  onChange={(event) => setRootTypeName(event.target.value)}
                  placeholder="Root"
                  className="w-full rounded-xl border border-(--border) bg-white px-3 py-2.5 font-mono text-sm text-(--ink) outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20"
                />
              </div>
              <fieldset className="space-y-2">
                <legend className="tool-label">Output style</legend>
                <div className="flex rounded-xl border border-(--border) bg-(--bg) p-1">
                  {(["interface", "type"] as const).map((style) => (
                    <button
                      key={style}
                      type="button"
                      aria-pressed={outputStyle === style}
                      onClick={() => setOutputStyle(style)}
                      className={`flex-1 rounded-lg px-3 py-2 font-mono text-xs capitalize transition ${
                        outputStyle === style ? "bg-(--ink) text-(--bg)" : "text-(--muted) hover:bg-white"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="flex min-h-9 flex-wrap items-center justify-between gap-2">
              <label htmlFor="json-to-ts-output" className="tool-label">TypeScript output</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => void copyOutput()}
                  disabled={!conversion.output}
                  className="inline-flex items-center gap-2 rounded-lg bg-(--ink) px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-(--bg) transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {notice === "TypeScript copied to clipboard." ? <Check size={14} /> : <Copy size={14} />}
                  Copy
                </button>
                <button
                  type="button"
                  onClick={downloadOutput}
                  disabled={!conversion.output}
                  className="inline-flex items-center gap-2 rounded-lg border border-(--border) bg-white px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-(--ink) transition hover:bg-(--bg) disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Download size={14} />
                  Download .ts
                </button>
              </div>
            </div>

            <pre
              id="json-to-ts-output"
              className="h-[360px] overflow-auto rounded-2xl border border-(--border) bg-[#151515] p-4 font-mono text-xs leading-6 text-[#d8e5c4] sm:h-[440px]"
            >
              <code>{conversion.output || (conversion.error ? "// Fix the JSON errors to generate TypeScript." : "// TypeScript output appears here.")}</code>
            </pre>
          </div>
        </div>

        <p className="mt-4 min-h-5 text-xs text-(--muted)" role="status" aria-live="polite">
          {notice}
        </p>
      </section>

      <p className="px-1 text-xs leading-5 text-(--muted)">
        The converter infers nested objects, array item types, nullable values, and optional properties from object arrays. Type names are normalized into valid TypeScript identifiers.
      </p>
    </div>
  );
}
