"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import mammoth from "mammoth";
import {
  convertTextByType,
  getConversionLabel,
  getLanguageFromType,
  getNextConversionType,
  languageOptions,
  type ConversionType,
  type SupportedLanguage,
} from "@/lib/indianFontConverters";

const DEFAULT_EXAMPLE = "कृपया हिंदी टेक्स्ट दर्ज करें";

const textToWords = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;
const textToChars = (value: string) => Array.from(value).length;

export default function IndianFontConverter({
  defaultLanguage = "hindi",
  defaultConversionType = "kruti-dev-to-unicode",
}: {
  defaultLanguage?: SupportedLanguage;
  defaultConversionType?: ConversionType;
}) {
  const [language, setLanguage] = useState<SupportedLanguage>(defaultLanguage);
  const [conversionType, setConversionType] = useState<ConversionType>(defaultConversionType);
  const [input, setInput] = useState(DEFAULT_EXAMPLE);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<string>("");
  const [isBusy, setIsBusy] = useState(false);
  const [fileName, setFileName] = useState("No document selected");
  const [fileSize, setFileSize] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const options = languageOptions[language];

  useEffect(() => {
    const nextType = options.some((option) => option.value === conversionType)
      ? conversionType
      : options[0]?.value ?? defaultConversionType;
    setConversionType(nextType);
  }, [language]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const converted = convertTextByType(input, conversionType);
      setOutput(converted);
      setStatus("");
    }, 250);

    return () => window.clearTimeout(timer);
  }, [input, conversionType]);

  const label = useMemo(() => getConversionLabel(conversionType), [conversionType]);
  const currentLanguage = useMemo(() => getLanguageFromType(conversionType), [conversionType]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied to clipboard.");
    } catch {
      setStatus("Clipboard access was blocked.");
    }
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("File downloaded successfully.");
  };

  const handleConvert = () => {
    setIsBusy(true);
    const converted = convertTextByType(input, conversionType);
    setOutput(converted);
    setStatus("Conversion complete.");
    window.setTimeout(() => setIsBusy(false), 300);
  };

  const handleSwap = () => {
    const nextType = getNextConversionType(conversionType);
    setConversionType(nextType);
    setLanguage(getLanguageFromType(nextType));
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setStatus("Cleared.");
  };

  const handleDocumentConvert = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsBusy(true);
    setStatus("Reading document...");
    setFileName(file.name);
    setFileSize(file.size);

    try {
      let text = "";
      if (file.name.toLowerCase().endsWith(".docx")) {
        const fileBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer: fileBuffer });
        text = result.value || "";
      } else if (file.name.toLowerCase().endsWith(".txt")) {
        text = await file.text();
      } else {
        throw new Error("Unsupported document format. Please upload .docx or .txt.");
      }

      const converted = convertTextByType(text, conversionType);
      setInput(text);
      setOutput(converted);
      setStatus(`${file.name} was converted locally in the browser.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to process the document.");
    } finally {
      setIsBusy(false);
    }
  };

  const handleDocumentDownload = async () => {
    if (!output.trim()) return;

    const content = output.replace(/\r\n/g, "\n");
    const doc = new Document({
      sections: [
        {
          children: content.split(/\n/).map((paragraph) => new Paragraph({ children: [new TextRun(paragraph || "")] })),
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${fileName.replace(/\.[^/.]+$/, "") || "converted"}-converted.docx`;
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("DOCX download created.");
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:pl-(--app-left-offset,16rem)">
      <div className="rounded-[2rem] border border-(--border) bg-white/90 p-5 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--muted)">Indian Font Converter</p>
            <h1 className="mt-2 font-serif text-3xl italic text-(--ink)">{label}</h1>
          </div>
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:max-w-xl">
            <label className="space-y-2 text-xs font-mono uppercase tracking-[0.15em] text-(--muted)">
              Language
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value as SupportedLanguage)}
                className="w-full rounded-xl border border-(--border) bg-white px-3 py-3 text-sm text-(--ink) outline-none"
              >
                <option value="hindi">Hindi</option>
                <option value="bengali">Bengali</option>
                <option value="nepali">Nepali</option>
              </select>
            </label>
            <label className="space-y-2 text-xs font-mono uppercase tracking-[0.15em] text-(--muted)">
              Conversion type
              <select
                value={conversionType}
                onChange={(event) => setConversionType(event.target.value as ConversionType)}
                className="w-full rounded-xl border border-(--border) bg-white px-3 py-3 text-sm text-(--ink) outline-none"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="tool-label">Input text</label>
              <span className="text-[10px] uppercase tracking-[0.15em] text-(--muted)">{textToChars(input)} chars</span>
            </div>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="tool-textarea h-[320px]"
              placeholder="Paste text here"
            />
            <div className="flex flex-wrap gap-3">
              <button type="button" className="tool-btn-primary" onClick={() => copyToClipboard(input)}>
                Copy Input
              </button>
              <button type="button" className="tool-btn-secondary" onClick={() => setInput("")}>
                Clear
              </button>
              <button type="button" className="tool-btn-secondary" onClick={handleConvert}>
                {isBusy ? "Converting..." : "Convert"}
              </button>
              <button type="button" className="tool-btn-secondary" onClick={handleSwap}>
                Swap
              </button>
            </div>
            <p className="text-xs text-(--muted)">Words: {textToWords(input)}</p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="tool-label">Converted output</label>
              <span className="text-[10px] uppercase tracking-[0.15em] text-(--muted)">{textToChars(output)} chars</span>
            </div>
            <pre className="tool-output-pre h-[320px] whitespace-pre-wrap" aria-live="polite">
              {output || "Converted output appears here"}
            </pre>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="tool-btn-primary" onClick={() => copyToClipboard(output)}>
                Copy Output
              </button>
              <button type="button" className="tool-btn-secondary" onClick={() => handleDownload(output, "converted.txt")}>
                Download TXT
              </button>
              <button type="button" className="tool-btn-secondary" onClick={handleClear}>
                Clear All
              </button>
            </div>
            <p className="text-xs text-(--muted)">Words: {textToWords(output)}</p>
          </section>
        </div>

        <div className="mt-8 rounded-2xl border border-(--border) bg-slate-50 p-4 text-sm text-(--muted)">
          <p className="font-semibold text-(--ink)">Conversion status</p>
          <p className="mt-2">{status || `Current mode: ${label}. Language: ${currentLanguage}.`}</p>
        </div>

        <section className="mt-10 border-t border-(--border) pt-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-(--muted)">Document converter</p>
              <h2 className="mt-2 font-serif text-2xl italic text-(--ink)">Convert DOCX or TXT files locally</h2>
            </div>
            <button type="button" className="tool-btn-secondary" onClick={() => inputRef.current?.click()}>
              Upload file
            </button>
          </div>
          <input ref={inputRef} type="file" accept=".docx,.txt" onChange={handleDocumentConvert} className="hidden" />
          <div className="mt-4 grid gap-4 rounded-2xl border border-(--border) bg-white p-4 md:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-(--muted)">File name</p>
              <p className="mt-2 text-sm text-(--ink)">{fileName}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-(--muted)">Size</p>
              <p className="mt-2 text-sm text-(--ink)">{fileSize ? `${(fileSize / 1024).toFixed(1)} KB` : "—"}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-(--muted)">Output</p>
              <button type="button" className="tool-btn-primary mt-2" onClick={handleDocumentDownload}>
                Download DOCX
              </button>
            </div>
          </div>
          <p className="mt-4 text-sm text-(--muted)">
            All document conversion happens in the browser. .docx is processed locally with a client-side parser and the converted file is downloaded without uploading your content to a server.
          </p>
        </section>
      </div>
    </main>
  );
}
