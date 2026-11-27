"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { Download, RotateCw, Upload } from "lucide-react";
import { degrees, PDFDocument } from "pdf-lib";
import { trackToolEvent } from "@/lib/analytics";

export type PDFToolMode = "merge" | "split" | "rotate" | "jpg-to-pdf";

export default function PDFToolsSuite({ mode }: { mode: PDFToolMode }) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);
  const [pages, setPages] = useState("1");
  const [rotation, setRotation] = useState(90);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (incoming: File[]) => {
    const allowed = mode === "jpg-to-pdf"
      ? incoming.filter((file) => /^image\/(jpeg|png|webp)$/.test(file.type))
      : incoming.filter((file) => file.type === "application/pdf");
    if (!allowed.length) {
      setError(mode === "jpg-to-pdf" ? "Select JPG or PNG image files." : "Select valid PDF files.");
      return;
    }
    if (mode !== "merge" && mode !== "jpg-to-pdf") allowed.splice(1);
    setFiles(allowed);
    setResult(null);
    setError("");
  };

  const process = async () => {
    if (!files.length) return setError("Select a file first.");
    setError("");
    setProgress(10);
    trackToolEvent("tool_execute", `pdf-${mode}`, "seo-page");

    try {
      const output = await PDFDocument.create();
      if (mode === "merge") {
        for (let index = 0; index < files.length; index += 1) {
          const source = await PDFDocument.load(await files[index].arrayBuffer());
          const copied = await output.copyPages(source, source.getPageIndices());
          copied.forEach((page) => output.addPage(page));
          setProgress(Math.round(((index + 1) / files.length) * 80));
        }
        setResult({ blob: new Blob([new Uint8Array(await output.save())], { type: "application/pdf" }), name: "merged.pdf" });
      } else if (mode === "split") {
        const source = await PDFDocument.load(await files[0].arrayBuffer());
        const indices = parsePageSelection(pages, source.getPageCount());
        const copied = await output.copyPages(source, indices);
        copied.forEach((page) => output.addPage(page));
        setResult({ blob: new Blob([new Uint8Array(await output.save())], { type: "application/pdf" }), name: "split-pages.pdf" });
      } else if (mode === "rotate") {
        const source = await PDFDocument.load(await files[0].arrayBuffer());
        source.getPages().forEach((page) => page.setRotation(degrees(page.getRotation().angle + rotation)));
        setResult({ blob: new Blob([new Uint8Array(await source.save())], { type: "application/pdf" }), name: "rotated.pdf" });
      } else {
        for (const file of files) {
          const bytes = await file.arrayBuffer();
          const image = file.type === "image/png" ? await output.embedPng(bytes) : await output.embedJpg(bytes);
          const page = output.addPage([image.width, image.height]);
          page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
        }
        setResult({ blob: new Blob([new Uint8Array(await output.save())], { type: "application/pdf" }), name: "images.pdf" });
      }
      setProgress(100);
      trackToolEvent("tool_download", `pdf-${mode}`, "seo-page");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to process this PDF.");
      trackToolEvent("tool_error", `pdf-${mode}`, "seo-page");
    }
  };

  const download = () => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = result.name;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,.9fr)]">
      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event: DragEvent<HTMLDivElement>) => { event.preventDefault(); handleFiles(Array.from(event.dataTransfer.files)); }}
        onClick={() => inputRef.current?.click()}
        className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-(--border) bg-white px-4 text-center"
      >
        <input ref={inputRef} type="file" accept={mode === "jpg-to-pdf" ? "image/jpeg,image/png,image/webp" : "application/pdf"} multiple={mode === "merge" || mode === "jpg-to-pdf"} onChange={(event: ChangeEvent<HTMLInputElement>) => handleFiles(Array.from(event.target.files ?? []))} className="hidden" />
        <div className="mb-3 rounded-2xl bg-(--ink) p-3 text-(--bg)"><Upload size={22} /></div>
        <p className="font-serif text-lg italic">Drop {mode === "jpg-to-pdf" ? "images" : "PDF files"} here or click to browse</p>
        <p className="mt-2 text-xs text-(--muted)">{files.length ? files.map((file) => file.name).join(", ") : "No files selected"}</p>
      </div>
      <aside className="space-y-4 rounded-3xl border border-(--border) bg-white p-5">
        <h2 className="font-serif text-xl italic">{mode.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase())}</h2>
        {mode === "split" && <label className="block space-y-2"><span className="tool-label">Pages</span><input value={pages} onChange={(event) => setPages(event.target.value)} className="tool-textarea !h-11 !rounded-lg px-3" placeholder="1,3-5" /></label>}
        {mode === "rotate" && <label className="block space-y-2"><span className="tool-label">Rotation</span><select value={rotation} onChange={(event) => setRotation(Number(event.target.value))} className="tool-textarea !h-11 !rounded-lg px-3"><option value="90">Clockwise 90°</option><option value="180">180°</option><option value="270">Counter-clockwise 90°</option></select></label>}
        {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {progress > 0 && <p className="font-mono text-xs uppercase tracking-widest text-(--muted)">Progress: {progress}%</p>}
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => void process()} className="tool-btn-primary">{mode === "rotate" ? <><RotateCw size={14} />Rotate PDF</> : "Process PDF"}</button>
          {result && <button type="button" onClick={download} className="tool-btn-secondary !w-auto"><Download size={14} />Download</button>}
        </div>
      </aside>
    </div>
  );
}

function parsePageSelection(value: string, pageCount: number) {
  const indices = new Set<number>();
  value.split(",").forEach((part) => {
    const trimmed = part.trim();
    if (/^\d+$/.test(trimmed)) {
      const page = Number(trimmed);
      if (page >= 1 && page <= pageCount) indices.add(page - 1);
    } else {
      const match = trimmed.match(/^(\d+)\s*-\s*(\d+)$/);
      if (match) {
        const start = Math.max(1, Number(match[1]));
        const end = Math.min(pageCount, Number(match[2]));
        for (let page = start; page <= end; page += 1) indices.add(page - 1);
      }
    }
  });
  if (!indices.size) throw new Error("Enter at least one valid page number.");
  return [...indices].sort((a, b) => a - b);
}
