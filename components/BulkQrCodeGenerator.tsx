"use client";

import { useRef, useState } from "react";
import {
  Archive,
  Check,
  Copy,
  Download,
  FileUp,
  LoaderCircle,
  QrCode,
  RefreshCw,
  Trash2,
} from "lucide-react";
import JSZip from "jszip";
import QRCode from "qrcode";
import { parseCsv } from "@/lib/csvCleaner";

type GeneratedQrCode = {
  text: string;
  dataUrl: string;
  filename: string;
};

const MAX_ENTRIES = 100;
const MAX_FILE_SIZE_BYTES = 1_048_576;
const SAMPLE_ENTRIES = [
  "https://example.com",
  "https://example.com/docs",
  "Contact: hello@example.com",
];

function triggerDownload(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export default function BulkQrCodeGenerator() {
  const [input, setInput] = useState("");
  const [inputFormat, setInputFormat] = useState<"lines" | "csv">("lines");
  const [csvHasHeader, setCsvHasHeader] = useState(false);
  const [size, setSize] = useState(256);
  const [foreground, setForeground] = useState("#161616");
  const [background, setBackground] = useState("#ffffff");
  const [codes, setCodes] = useState<GeneratedQrCode[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getEntries = () => {
    const entries =
      inputFormat === "csv"
        ? parseCsv(input).map((row) => row[0] ?? "")
        : input.split(/\r\n?|\n/);
    if (inputFormat === "csv" && csvHasHeader) entries.shift();
    return entries.filter((entry) => entry.trim().length > 0);
  };

  const generate = async () => {
    setError("");
    setNotice("");
    let entries: string[];
    try {
      entries = getEntries();
    } catch (parseError) {
      setCodes([]);
      setError(parseError instanceof Error ? parseError.message : "The CSV file could not be parsed.");
      return;
    }

    if (entries.length === 0) {
      setCodes([]);
      setError("Add at least one non-empty line or CSV row before generating QR codes.");
      return;
    }
    if (entries.length > MAX_ENTRIES) {
      setError(`This batch contains ${entries.length} entries. Generate up to ${MAX_ENTRIES} at a time.`);
      return;
    }

    setIsGenerating(true);
    setCodes([]);
    setProgress(0);
    const generated: GeneratedQrCode[] = [];
    try {
      for (const [index, text] of entries.entries()) {
        const dataUrl = await QRCode.toDataURL(text, {
          width: size,
          margin: 2,
          errorCorrectionLevel: "M",
          color: { dark: foreground, light: background },
        });
        generated.push({
          text,
          dataUrl,
          filename: `qr-code-${String(index + 1).padStart(3, "0")}.png`,
        });
        setProgress(index + 1);
      }
      setCodes(generated);
      setNotice(`${generated.length} QR ${generated.length === 1 ? "code" : "codes"} generated locally.`);
    } catch (generationError) {
      setError(
        generationError instanceof Error
          ? `Could not generate QR code ${generated.length + 1}: ${generationError.message}`
          : "A QR code could not be generated. Check the entry and try again.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const loadFile = async (file?: File) => {
    if (!file) return;
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError("Choose a file smaller than 1 MB, or split it into smaller batches.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    const extension = file.name.toLowerCase().split(".").pop();
    if (extension !== "csv" && extension !== "txt") {
      setError("Choose a .csv or .txt file.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    try {
      const content = await file.text();
      if (extension === "csv") {
        parseCsv(content);
        setInputFormat("csv");
      } else {
        setInputFormat("lines");
      }
      setInput(content);
      setCodes([]);
      setError("");
      setNotice(`${file.name} loaded locally. Generate QR codes when you are ready.`);
    } catch (fileError) {
      setError(fileError instanceof Error ? fileError.message : "The selected file could not be read.");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const copyEntry = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setNotice(`Entry ${index + 1} copied to the clipboard.`);
      window.setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      setError("Clipboard access is unavailable. Select and copy the entry text instead.");
    }
  };

  const downloadAll = async () => {
    if (codes.length === 0) return;
    setError("");
    setIsZipping(true);
    try {
      const zip = new JSZip();
      codes.forEach((code) => {
        zip.file(code.filename, code.dataUrl.split(",")[1], { base64: true });
      });
      const archive = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
      const archiveUrl = URL.createObjectURL(archive);
      triggerDownload(archiveUrl, "qr-codes.zip");
      window.setTimeout(() => URL.revokeObjectURL(archiveUrl), 1000);
      setNotice(`${codes.length} PNG ${codes.length === 1 ? "image" : "images"} added to qr-codes.zip.`);
    } catch (zipError) {
      setError(zipError instanceof Error ? `Could not create the ZIP file: ${zipError.message}` : "Could not create the ZIP file.");
    } finally {
      setIsZipping(false);
    }
  };

  const clearInput = () => {
    setInput("");
    setInputFormat("lines");
    setCodes([]);
    setError("");
    setNotice("");
    setProgress(0);
  };

  const loadSample = () => {
    setInput(SAMPLE_ENTRIES.join("\n"));
    setInputFormat("lines");
    setCodes([]);
    setError("");
    setNotice("Sample entries loaded. Generate QR codes when you are ready.");
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-6 rounded-3xl border border-(--border) bg-white p-5 shadow-sm lg:grid-cols-[minmax(0,1.3fr)_minmax(17rem,0.7fr)] sm:p-7">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label htmlFor="qr-input" className="tool-label">
              {inputFormat === "csv" ? "CSV input · first column becomes each code" : "Text or URL · one entry per line"}
            </label>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={loadSample} className="rounded-lg border border-(--border) px-3 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-(--surface)">
                Sample data
              </button>
              <button type="button" onClick={() => fileInputRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg border border-(--border) px-3 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-(--surface)">
                <FileUp size={14} /> Upload CSV / TXT
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.txt,text/csv,text/plain"
                className="sr-only"
                onChange={(event) => void loadFile(event.target.files?.[0])}
              />
            </div>
          </div>
          <textarea
            id="qr-input"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setInputFormat("lines");
              setCodes([]);
              setError("");
              setNotice("");
            }}
            placeholder={"https://example.com\nhttps://example.com/docs\nContact: hello@example.com"}
            className="tool-textarea min-h-64 resize-y"
            aria-describedby="qr-input-help"
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p id="qr-input-help" className="text-xs leading-5 text-(--muted)">
              Blank lines are skipped. Files up to 1 MB are read locally and are never uploaded.
            </p>
            <button type="button" onClick={clearInput} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-(--muted) transition hover:bg-(--surface) hover:text-(--ink)">
              <Trash2 size={14} /> Clear input
            </button>
          </div>
          {inputFormat === "csv" && (
            <label className="flex items-center gap-2 text-sm text-(--muted)">
              <input
                type="checkbox"
                checked={csvHasHeader}
                onChange={(event) => setCsvHasHeader(event.target.checked)}
                className="accent-(--ink)"
              />
              Skip the first CSV row as a header
            </label>
          )}
        </div>

        <div className="space-y-5">
          <div>
            <p className="tool-label">QR code settings</p>
            <label htmlFor="qr-size" className="mt-3 flex items-center justify-between gap-3 text-sm">
              <span>Image size</span>
              <span className="font-mono text-xs text-(--muted)">{size} × {size} px</span>
            </label>
            <input
              id="qr-size"
              type="range"
              min={128}
              max={512}
              step={16}
              value={size}
              onChange={(event) => setSize(Number(event.target.value))}
              className="mt-2 w-full accent-(--ink)"
            />
            <div className="flex justify-between font-mono text-[10px] text-(--muted)"><span>128 px</span><span>512 px</span></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-2">
              <span className="tool-label block">Foreground</span>
              <span className="flex items-center gap-2 rounded-xl border border-(--border) p-2">
                <input type="color" value={foreground} onChange={(event) => setForeground(event.target.value)} className="h-8 w-10 cursor-pointer rounded" aria-label="QR code foreground color" />
                <span className="font-mono text-xs uppercase">{foreground}</span>
              </span>
            </label>
            <label className="space-y-2">
              <span className="tool-label block">Background</span>
              <span className="flex items-center gap-2 rounded-xl border border-(--border) p-2">
                <input type="color" value={background} onChange={(event) => setBackground(event.target.value)} className="h-8 w-10 cursor-pointer rounded" aria-label="QR code background color" />
                <span className="font-mono text-xs uppercase">{background}</span>
              </span>
            </label>
          </div>
          <p className="text-xs leading-5 text-(--muted)">For best scanning, keep strong contrast between the foreground and background.</p>
          <button type="button" onClick={() => void generate()} disabled={isGenerating || isZipping} className="tool-btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60">
            {isGenerating ? <LoaderCircle size={16} className="animate-spin" /> : codes.length > 0 ? <RefreshCw size={16} /> : <QrCode size={16} />}
            {isGenerating ? `Generating ${progress} / ${Math.min(getEntries().length, MAX_ENTRIES)}…` : codes.length > 0 ? "Regenerate QR codes" : "Generate QR codes"}
          </button>
          <p className="text-center font-mono text-[10px] uppercase tracking-wider text-(--muted)">Up to {MAX_ENTRIES} entries per batch</p>
        </div>
      </section>

      {(error || notice) && (
        <p role={error ? "alert" : "status"} aria-live="polite" className={`rounded-xl border p-3 text-sm ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
          {error || notice}
        </p>
      )}

      {codes.length > 0 ? (
        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3 rounded-2xl border border-(--border) bg-white p-4 sm:p-5">
            <div>
              <p className="tool-label">Generated QR codes</p>
              <p className="mt-1 text-sm text-(--muted)">{codes.length} {codes.length === 1 ? "code" : "codes"} ready to download</p>
            </div>
            <button type="button" onClick={() => void downloadAll()} disabled={isZipping || isGenerating} className="tool-btn-primary justify-center disabled:cursor-not-allowed disabled:opacity-60">
              {isZipping ? <LoaderCircle size={16} className="animate-spin" /> : <Archive size={16} />}
              {isZipping ? "Creating ZIP…" : "Download all as ZIP"}
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {codes.map((code, index) => (
              <article key={`${index}-${code.filename}`} className="min-w-0 rounded-2xl border border-(--border) bg-white p-4 shadow-sm">
                <div className="flex justify-center rounded-xl bg-(--surface) p-4">
                  {/* QR images are locally generated data URLs, not remote resources. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={code.dataUrl} alt={`QR code for ${code.text}`} width={size} height={size} className="h-auto max-w-full" />
                </div>
                <p className="mt-4 min-h-10 break-words text-sm leading-5 text-(--ink)" title={code.text}>{code.text}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-(--muted)">PNG · {size} × {size} px</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" onClick={() => triggerDownload(code.dataUrl, code.filename)} className="tool-btn-secondary inline-flex flex-1 items-center justify-center gap-2">
                    <Download size={14} /> PNG
                  </button>
                  <button type="button" onClick={() => void copyEntry(code.text, index)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-(--border) px-3 py-3 text-xs transition hover:bg-(--surface)" aria-label={`Copy entry ${index + 1}`}>
                    {copiedIndex === index ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
                    <span className="sr-only sm:not-sr-only">{copiedIndex === index ? "Copied" : "Copy text"}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <div className="rounded-3xl border border-dashed border-(--border) bg-white/60 px-6 py-12 text-center">
          {isGenerating ? <LoaderCircle size={24} className="mx-auto animate-spin text-(--muted)" /> : <QrCode size={24} className="mx-auto text-(--muted)" />}
          <p className="mt-3 font-serif text-xl italic text-(--ink)">{isGenerating ? "Generating your QR codes…" : "Your QR codes will appear here"}</p>
          <p className="mt-2 text-sm text-(--muted)">{isGenerating ? `${progress} of ${Math.min(getEntries().length, MAX_ENTRIES)} complete` : "Add text or URLs above, then select Generate QR Codes."}</p>
        </div>
      )}
    </div>
  );
}
