"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { Download, Upload } from "lucide-react";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { saveHistory } from "@/lib/clientHistory";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ImageBase64Converter() {
  const [base64, setBase64] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be 5MB or smaller");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const value = String(event.target?.result ?? "");
      setBase64(value);
      setPreview(value);
      await saveHistory("image-base64", file.name, "data-url-generated");
    };
    reader.readAsDataURL(file);
  };

  const onInputFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      void handleFile(file);
    }
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      void handleFile(file);
    }
  };

  const onBase64Change = (value: string) => {
    setBase64(value);
    if (!value.trim()) {
      setPreview(null);
      return;
    }

    if (value.startsWith("data:image/")) {
      setPreview(value);
      return;
    }

    setPreview(`data:image/png;base64,${value.trim()}`);
  };

  const downloadPreview = () => {
    if (!preview) return;
    const link = document.createElement("a");
    link.href = preview;
    link.download = "decoded-image";
    link.click();
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <section className="space-y-6">
        <div className="space-y-3">
          <label className="tool-label">Image Upload</label>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "flex h-44 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-4 text-center transition sm:h-52",
              isDragging ? "border-[var(--ink)] bg-[var(--surface)]" : "border-[var(--border)] hover:border-[var(--muted)]",
            )}
          >
            <input ref={fileInputRef} type="file" accept="image/*" onChange={onInputFile} className="hidden" />
            <div className="mb-3 rounded-2xl bg-[var(--ink)] p-3 text-[var(--bg)]">
              <Upload size={22} />
            </div>
            <p className="font-serif text-lg italic">Drop image here or click to browse</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">PNG/JPG/SVG/WEBP up to 5MB</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="tool-label">Base64 String</label>
          <textarea
            value={base64}
            onChange={(e) => onBase64Change(e.target.value)}
            className="tool-textarea h-64"
            placeholder="Paste base64 or data:image/..."
          />
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="tool-label">Preview</label>
          {preview && (
            <button type="button" onClick={downloadPreview} className="tool-btn-primary">
              <Download size={14} />
              <span>Download</span>
            </button>
          )}
        </div>
        <div className="flex min-h-[260px] items-center justify-center overflow-hidden rounded-3xl border border-[var(--border)] bg-white p-4 sm:min-h-[320px] sm:p-8 md:min-h-[420px]">
          {preview ? (
            <Image
              src={preview}
              alt="Converted preview"
              width={800}
              height={800}
              unoptimized
              className="max-h-full max-w-full rounded-lg object-contain shadow-xl"
              referrerPolicy="no-referrer"
            />
          ) : (
            <p className="font-serif text-xl italic text-[var(--muted)]">No image selected</p>
          )}
        </div>
      </section>
    </div>
  );
}
