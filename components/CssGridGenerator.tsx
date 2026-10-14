"use client";

import { useMemo, useState } from "react";
import { createGridCss } from "@/lib/cssGrid";

const colorOptions = ["#ff7d33", "#2563eb", "#059669", "#7c3aed", "#db2777", "#d97706"];
const alignmentOptions = ["start", "center", "end", "stretch"] as const;
type Alignment = (typeof alignmentOptions)[number];

export default function CssGridGenerator() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(2);
  const [columnGap, setColumnGap] = useState(12);
  const [rowGap, setRowGap] = useState(12);
  const [justifyItems, setJustifyItems] = useState<"start" | "center" | "end" | "stretch">("stretch");
  const [alignItems, setAlignItems] = useState<"start" | "center" | "end" | "stretch">("stretch");
  const [itemCount, setItemCount] = useState(6);
  const [itemLabels, setItemLabels] = useState(["One", "Two", "Three", "Four", "Five", "Six"]);
  const [copied, setCopied] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const css = useMemo(() => createGridCss({ columns, rows, columnGap, rowGap, justifyItems, alignItems }), [columns, rows, columnGap, rowGap, justifyItems, alignItems]);

  const setLabel = (index: number, label: string) => setItemLabels((current) =>
    Array.from({ length: Math.max(current.length, index + 1) }, (_, itemIndex) =>
      itemIndex === index ? label : current[itemIndex] ?? `Item ${itemIndex + 1}`,
    ),
  );
  const setAlignment = (value: string, update: (alignment: Alignment) => void) => {
    switch (value) {
      case "start":
      case "center":
      case "end":
      case "stretch":
        update(value);
        break;
      default:
        break;
    }
  };
  const copyCss = async () => {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setCopyMessage("CSS copied to clipboard.");
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
      setCopyMessage("Clipboard access was blocked. Select and copy the CSS manually.");
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="space-y-6 rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-7">
        <p className="tool-label">Grid settings</p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Columns", value: columns, update: setColumns, max: 12 },
            { label: "Rows", value: rows, update: setRows, max: 12 },
            { label: "Column gap (px)", value: columnGap, update: setColumnGap, max: 64 },
            { label: "Row gap (px)", value: rowGap, update: setRowGap, max: 64 },
          ].map(({ label, value, update, max }) => <label key={label} className="space-y-2"><span className="tool-label">{label}</span><input type="number" min={label.includes("gap") ? 0 : 1} max={max} value={value} onChange={(event) => update(Math.max(label.includes("gap") ? 0 : 1, Math.min(max, Number(event.target.value) || 0)))} className="w-full rounded-xl border border-(--border) px-3 py-2 text-sm" /></label>)}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2"><span className="tool-label">Horizontal alignment</span><select value={justifyItems} onChange={(event) => setAlignment(event.target.value, setJustifyItems)} className="w-full rounded-xl border border-(--border) bg-white px-3 py-2 text-sm">{alignmentOptions.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className="space-y-2"><span className="tool-label">Vertical alignment</span><select value={alignItems} onChange={(event) => setAlignment(event.target.value, setAlignItems)} className="w-full rounded-xl border border-(--border) bg-white px-3 py-2 text-sm">{alignmentOptions.map((value) => <option key={value}>{value}</option>)}</select></label>
        </div>
        <label className="block space-y-2"><span className="tool-label">Preview items ({itemCount})</span><input type="range" min={1} max={12} value={itemCount} onChange={(event) => setItemCount(Number(event.target.value))} className="w-full accent-(--ink)" /></label>
        <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto">
          {Array.from({ length: itemCount }, (_, index) => <label key={index} className="flex items-center gap-2"><span className="w-12 shrink-0 font-mono text-[10px] text-(--muted)">ITEM {index + 1}</span><input aria-label={`Grid item ${index + 1} label`} value={itemLabels[index] ?? `Item ${index + 1}`} onChange={(event) => setLabel(index, event.target.value)} className="min-w-0 flex-1 rounded-lg border border-(--border) px-2 py-1.5 text-xs" /></label>)}
        </div>
      </section>
      <div className="space-y-5">
        <section className="space-y-3 rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center justify-between"><p className="tool-label">Live grid preview</p><span className="font-mono text-xs text-(--muted)">{columns} × {rows}</span></div>
          <div className="min-h-64 rounded-2xl border border-dashed border-(--border) bg-(--surface) p-3" style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rows}, minmax(4rem, auto))`, columnGap: `${columnGap}px`, rowGap: `${rowGap}px`, justifyItems, alignItems }}>
            {Array.from({ length: itemCount }, (_, index) => <div key={index} className="flex min-w-0 items-center justify-center rounded-xl p-2 text-center text-xs font-semibold text-white shadow-sm" style={{ backgroundColor: colorOptions[index % colorOptions.length] }}>{itemLabels[index] || `Item ${index + 1}`}</div>)}
          </div>
          <p className="text-xs text-(--muted)">Items automatically flow onto additional implicit rows when needed.</p>
        </section>
        <section className="space-y-3 rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center justify-between"><p className="tool-label">Generated CSS</p><button type="button" onClick={() => void copyCss()} className="tool-copy-btn">{copied ? "Copied" : "Copy CSS"}</button></div>
          <pre className="tool-output-pre min-h-40">{css}</pre>
          <p className="min-h-4 text-xs text-(--muted)" role="status" aria-live="polite">{copyMessage}</p>
        </section>
      </div>
    </div>
  );
}
