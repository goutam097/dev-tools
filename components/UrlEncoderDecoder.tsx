"use client";

import { useState } from "react";
import { AlertCircle, Check, Copy, Link2, RotateCcw, ArrowLeftRight } from "lucide-react";
import { convertUrlText, type UrlEncodingScope } from "@/lib/urlCodec";

const sampleText = "https://example.com/search?q=hello world&category=developer tools";

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [scope, setScope] = useState<UrlEncodingScope>("component");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const convert = (action: "encode" | "decode") => {
    try {
      setOutput(convertUrlText(input, action, scope));
      setError("");
      setNotice(action === "encode" ? "Input encoded successfully." : "Input decoded successfully.");
    } catch (conversionError) {
      setOutput("");
      setError(
        conversionError instanceof Error
          ? conversionError.message
          : "Unable to decode this input. Check the encoded URL and try again.",
      );
      setNotice("");
    }
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
    setNotice("");
  };

  const swap = () => {
    setInput(output);
    setOutput(input);
    setError("");
    setNotice("Input and output swapped.");
  };

  const copyOutput = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setNotice("Output copied to clipboard.");
    } catch {
      setNotice("Clipboard access was denied. Select and copy the output instead.");
    }
  };

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-(--border) bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl italic text-(--ink)">URL Encoder / Decoder</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-(--muted)">
              Encode or decode text and URLs locally in your browser. Choose whether to preserve URL structure or encode every component character.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setInput(sampleText);
              setOutput("");
              setError("");
              setNotice("Sample URL loaded.");
            }}
            className="tool-btn-secondary inline-flex items-center gap-2"
          >
            <Link2 size={15} />
            Load sample
          </button>
        </div>

        <fieldset className="mb-6">
          <legend className="tool-label">Encoding scope</legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {([
              {
                value: "component",
                label: "URL component",
                description: "Uses encodeURIComponent — encodes reserved URL characters.",
              },
              {
                value: "url",
                label: "Full URL",
                description: "Uses encodeURI — preserves URL delimiters such as /, ?, and &.",
              },
            ] as const).map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition ${
                  scope === option.value
                    ? "border-(--ink) bg-(--bg)"
                    : "border-(--border) bg-white hover:bg-(--surface)"
                }`}
              >
                <input
                  type="radio"
                  name="url-encoding-scope"
                  value={option.value}
                  checked={scope === option.value}
                  onChange={() => {
                    setScope(option.value);
                    setError("");
                    setNotice("");
                  }}
                  className="mt-1 accent-(--ink)"
                />
                <span>
                  <span className="block text-sm font-semibold text-(--ink)">{option.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-(--muted)">{option.description}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center">
          <div className="min-w-0 space-y-2">
            <label htmlFor="url-codec-input" className="tool-label">Input</label>
            <textarea
              id="url-codec-input"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setError("");
                setNotice("");
              }}
              placeholder="Paste text or a URL to encode or decode…"
              spellCheck={false}
              className="h-64 w-full resize-y rounded-2xl border border-(--border) bg-[#151515] p-4 font-mono text-xs leading-6 text-[#f5f2e9] outline-none transition placeholder:text-white/40 focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/25 sm:h-72"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "url-codec-error" : undefined}
            />
          </div>

          <div className="flex flex-row gap-2 lg:flex-col">
            <button
              type="button"
              onClick={() => convert("encode")}
              disabled={!input}
              className="tool-btn-primary inline-flex flex-1 items-center justify-center disabled:cursor-not-allowed disabled:opacity-40 lg:flex-none"
            >
              Encode
            </button>
            <button
              type="button"
              onClick={() => convert("decode")}
              disabled={!input}
              className="tool-btn-secondary flex-1 disabled:cursor-not-allowed disabled:opacity-40 lg:flex-none"
            >
              Decode
            </button>
          </div>

          <div className="min-w-0 space-y-2">
            <div className="flex min-h-6 items-center justify-between gap-2">
              <label htmlFor="url-codec-output" className="tool-label">Result</label>
              <button
                type="button"
                onClick={() => void copyOutput()}
                disabled={!output}
                className="tool-copy-btn disabled:cursor-not-allowed disabled:opacity-40"
              >
                {notice === "Output copied to clipboard." ? <Check size={13} /> : <Copy size={13} />}
                Copy
              </button>
            </div>
            <textarea
              id="url-codec-output"
              value={output}
              readOnly
              placeholder="The converted result will appear here…"
              spellCheck={false}
              className="h-64 w-full resize-y rounded-2xl border border-(--border) bg-white p-4 font-mono text-xs leading-6 text-(--ink) outline-none placeholder:text-(--muted)/60 sm:h-72"
              aria-label="Converted result"
            />
          </div>
        </div>

        {error && (
          <p id="url-codec-error" role="alert" className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-(--border) pt-4">
          <p role="status" aria-live="polite" className="min-h-5 text-xs text-(--muted)">
            {notice || "Your input is processed only in this browser."}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={swap}
              disabled={!input && !output}
              className="tool-btn-secondary inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeftRight size={15} />
              Swap
            </button>
            <button
              type="button"
              onClick={clear}
              disabled={!input && !output && !error}
              className="tool-btn-secondary inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw size={15} />
              Clear
            </button>
          </div>
        </div>
      </section>

      <p className="px-1 text-xs leading-5 text-(--muted)">
        Use URL component mode for individual query values. Use Full URL mode to encode or decode a complete URL while preserving its structural delimiters.
      </p>
    </div>
  );
}
