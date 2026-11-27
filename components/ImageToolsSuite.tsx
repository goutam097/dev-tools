"use client";

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { Download, RotateCcw, Upload } from "lucide-react";
import JSZip from "jszip";
import {
  compressImage,
  processImage,
  type ImageOutputFormat,
  type ProcessedImage,
  validateImageFile,
} from "@/lib/image/process";
import { TARGET_SIZE_PRESETS, targetSizeToBytes, type TargetSizeUnit } from "@/lib/image/targetSize";
import { trackToolEvent } from "@/lib/analytics";

export type ImageToolMode = "resize" | "compress" | "convert";

export default function ImageToolsSuite({
  mode,
  initialTargetKb = 100,
  toolTitle,
}: {
  mode: ImageToolMode;
  initialTargetKb?: number;
  toolTitle?: string;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<ProcessedImage[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(800);
  const [aspectRatio, setAspectRatio] = useState(true);
  const [quality, setQuality] = useState(85);
  const [mime, setMime] = useState<ImageOutputFormat>("image/jpeg");
  const [targetUnit, setTargetUnit] = useState<TargetSizeUnit>("KB");
  const [targetPreset, setTargetPreset] = useState(String(initialTargetKb));
  const [customTarget, setCustomTarget] = useState(String(initialTargetKb));
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const aspectRef = useRef(1);
  const previewUrlsRef = useRef<string[]>([]);

  useEffect(() => () => previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url)), []);

  const handleFiles = (incoming: File[]) => {
    try {
      incoming.forEach(validateImageFile);
      const supported = incoming.filter((file) => file.type !== "image/heic" && file.type !== "image/heif");
      if (supported.length !== incoming.length) {
        throw new Error("HEIC/HEIF is not supported in this browser. Convert it to JPG using a native converter first.");
      }
      setFiles(mode === "convert" || mode === "compress" ? supported : supported.slice(0, 1));
      setError("");
      setProgress(0);
      setResults([]);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to read the selected file.");
    }
  };

  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) handleFiles(Array.from(event.target.files));
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    handleFiles(Array.from(event.dataTransfer.files));
  };

  const loadDimensions = async (file: File) => {
    const url = URL.createObjectURL(file);
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("The image could not be previewed."));
      img.src = url;
    });
    URL.revokeObjectURL(url);
    aspectRef.current = image.naturalWidth / image.naturalHeight;
    setWidth(image.naturalWidth);
    setHeight(image.naturalHeight);
  };

  useEffect(() => {
    if (mode === "resize" && files[0]) void loadDimensions(files[0]);
  }, [files, mode]);

  useEffect(() => {
    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    previewUrlsRef.current = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrlsRef.current);
  }, [files]);

  const process = async () => {
    if (!files.length) {
      setError("Select at least one image first.");
      return;
    }
    setError("");
    setProgress(5);
    trackToolEvent("tool_execute", `image-${mode}`, "seo-page");

    try {
      const output: ProcessedImage[] = [];
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        let processed: ProcessedImage;
        if (mode === "resize") {
          processed = await processImage(file, { width, height, mime, quality: quality / 100 });
        } else if (mode === "compress") {
          const targetValue = targetPreset === "custom" ? Number(customTarget) : Number(targetPreset);
          processed = await compressImage(file, quality / 100, targetSizeToBytes(targetValue, targetUnit));
        } else {
          processed = await processImage(file, {
            width: await imageWidth(file),
            height: await imageHeight(file),
            mime,
            quality: quality / 100,
          });
        }
        output.push(processed);
        setProgress(Math.round(((index + 1) / files.length) * 100));
      }
      setResults(output);
      trackToolEvent("tool_download", `image-${mode}`, "seo-page");
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Processing failed.";
      setError(message);
      trackToolEvent("tool_error", `image-${mode}`, "seo-page");
    }
  };

  const reset = () => {
    setFiles([]);
    setResults([]);
    setError("");
    setProgress(0);
  };

  const downloadOne = (result: ProcessedImage) => {
    const url = URL.createObjectURL(result.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = result.name;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const downloadAll = async () => {
    if (results.length === 1) {
      downloadOne(results[0]);
      return;
    }
    const zip = new JSZip();
    results.forEach((result) => zip.file(result.name, result.blob));
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `converted-images-${Date.now()}.zip`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const title = toolTitle ?? (mode === "resize" ? "Image Resizer" : mode === "compress" ? "Image Compressor" : "Image Converter");

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,.9fr)]">
      <section className="space-y-5">
        <div
          onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-4 text-center transition ${dragging ? "border-(--ink) bg-(--surface)" : "border-(--border) bg-white"}`}
        >
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/bmp,image/svg+xml" multiple={mode !== "resize"} onChange={onInput} className="hidden" />
          <div className="mb-3 rounded-2xl bg-(--ink) p-3 text-(--bg)"><Upload size={22} /></div>
          <p className="font-serif text-lg italic">Drop images here or click to browse</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-(--muted)">JPG, PNG, WebP, GIF, BMP or SVG · 25 MB each</p>
        </div>

        {previews.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {previews.map((preview, index) => (
              <div key={preview} className="overflow-hidden rounded-2xl border border-(--border) bg-white p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt={`Uploaded image ${index + 1}: ${files[index]?.name ?? "preview"}`} className="h-36 w-full rounded-xl object-contain" />
                <p className="mt-2 truncate px-1 text-xs text-(--muted)">{files[index]?.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <aside className="space-y-4 rounded-3xl border border-(--border) bg-white p-5">
        <h2 className="font-serif text-xl italic">{title} Settings</h2>
        {mode === "resize" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-2"><span className="tool-label">Width (px)</span><input type="number" min="1" max="12000" value={width} onChange={(event) => { const nextWidth = Number(event.target.value); setWidth(nextWidth); if (aspectRatio) setHeight(Math.max(1, Math.round(nextWidth / aspectRef.current))); }} className="tool-textarea !h-11 !rounded-lg px-3" /></label>
              <label className="space-y-2"><span className="tool-label">Height (px)</span><input type="number" min="1" max="12000" value={height} onChange={(event) => { const nextHeight = Number(event.target.value); setHeight(nextHeight); if (aspectRatio) setWidth(Math.max(1, Math.round(nextHeight * aspectRef.current))); }} className="tool-textarea !h-11 !rounded-lg px-3" /></label>
            </div>
            <label className="flex items-center gap-2 text-sm text-(--muted)">
              <input type="checkbox" checked={aspectRatio} onChange={(event) => setAspectRatio(event.target.checked)} />
              Maintain source dimensions as a custom fixed size
            </label>
            <div className="flex flex-wrap gap-2">
              {[{ w: 1080, h: 1080, n: "Instagram" }, { w: 1280, h: 720, n: "YouTube" }, { w: 1200, h: 630, n: "Social" }].map((preset) => (
                <button key={preset.n} type="button" onClick={() => { setWidth(preset.w); setHeight(preset.h); setAspectRatio(false); }} className="tool-btn-secondary !w-auto px-3 py-2">{preset.n}</button>
              ))}
            </div>
          </>
        )}
        {mode === "compress" && (
          <div className="space-y-3">
            <fieldset>
              <legend className="tool-label">Target file size unit</legend>
              <div className="mt-2 flex gap-4 text-sm">
                {(["KB", "MB"] as const).map((unit) => (
                  <label key={unit} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="target-size-unit"
                      value={unit}
                      checked={targetUnit === unit}
                      onChange={() => {
                        setTargetUnit(unit);
                        setTargetPreset(String(TARGET_SIZE_PRESETS[unit][0]));
                      }}
                    />
                    {unit}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="block space-y-2">
              <span className="tool-label">Choose a preset or enter a custom size</span>
              <select
                value={targetPreset}
                onChange={(event) => setTargetPreset(event.target.value)}
                className="tool-textarea !h-11 !rounded-lg px-3"
              >
                {TARGET_SIZE_PRESETS[targetUnit].map((value) => (
                  <option key={value} value={value}>{value} {targetUnit}</option>
                ))}
                <option value="custom">Custom</option>
              </select>
            </label>
            {targetPreset === "custom" && (
              <label className="block space-y-2">
                <span className="tool-label">Custom target ({targetUnit})</span>
                <input
                  type="number"
                  min="0.1"
                  step={targetUnit === "MB" ? "0.1" : "1"}
                  value={customTarget}
                  onChange={(event) => setCustomTarget(event.target.value)}
                  className="tool-textarea !h-11 !rounded-lg px-3"
                  placeholder={`Enter size in ${targetUnit}`}
                />
              </label>
            )}
            <p className="text-xs leading-5 text-(--muted)">The selected size is a maximum, not a guaranteed exact file size. The tool lowers image quality and, if needed, dimensions to fit.</p>
          </div>
        )}
        <label className="block space-y-2"><span className="tool-label">Quality: {quality}%</span><input type="range" min="10" max="100" value={quality} onChange={(event) => setQuality(Number(event.target.value))} className="w-full" /></label>
        {mode !== "compress" && (
          <label className="block space-y-2"><span className="tool-label">Output format</span><select value={mime} onChange={(event) => setMime(event.target.value as ImageOutputFormat)} className="tool-textarea !h-11 !rounded-lg px-3"><option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></select></label>
        )}
        {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs leading-5 text-emerald-900">
          Privacy: images stay in your browser and are not uploaded or shared. Reset or leave this page to clear the working files; no server copy is created.
        </p>
        {progress > 0 && <p className="font-mono text-xs uppercase tracking-widest text-(--muted)">Progress: {progress}%</p>}
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => void process()} className="tool-btn-primary">Process {mode}</button>
          <button type="button" onClick={reset} className="tool-btn-secondary !w-auto"><RotateCcw size={14} />Reset</button>
        </div>
        {results.length > 0 && (
          <div className="space-y-2 border-t border-(--border) pt-4">
            {results.map((result) => (
              <div key={result.name} className="flex items-center justify-between gap-3 rounded-xl bg-[var(--surface)] p-3">
                <div className="min-w-0"><p className="truncate text-sm font-medium">{result.name}</p><p className="text-xs text-(--muted)">{(result.blob.size / 1024).toFixed(1)} KB · {result.width}×{result.height}</p></div>
                <button type="button" onClick={() => downloadOne(result)} className="tool-btn-secondary !w-auto !px-3" aria-label={`Download ${result.name}`}><Download size={14} /></button>
              </div>
            ))}
            {results.length > 1 && <button type="button" onClick={() => void downloadAll()} className="tool-btn-primary"><Download size={14} />Download ZIP</button>}
          </div>
        )}
      </aside>
    </div>
  );
}

async function imageWidth(file: File) {
  const url = URL.createObjectURL(file);
  const image = await new Promise<HTMLImageElement>((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = () => reject(new Error("Invalid image")); img.src = url; });
  URL.revokeObjectURL(url);
  return image.naturalWidth;
}

async function imageHeight(file: File) {
  const url = URL.createObjectURL(file);
  const image = await new Promise<HTMLImageElement>((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = () => reject(new Error("Invalid image")); img.src = url; });
  URL.revokeObjectURL(url);
  return image.naturalHeight;
}
