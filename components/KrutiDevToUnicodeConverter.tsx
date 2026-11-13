"use client";

import { useMemo, useState } from "react";
import { convertKrutiDevToUnicode } from "@/lib/krutidev";

export default function KrutiDevToUnicodeConverter() {
  const [inputValue, setInputValue] = useState("k`rA gM l`k");
  const outputValue = useMemo(() => convertKrutiDevToUnicode(inputValue), [inputValue]);

  const copyOutput = async () => {
    if (!outputValue) return;
    await navigator.clipboard.writeText(outputValue);
  };

  const downloadOutput = () => {
    if (!outputValue) return;
    const blob = new Blob([outputValue], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "kruti-dev-to-unicode.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="space-y-3">
          <label className="tool-label">Kruti Dev input</label>
          <textarea
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="tool-textarea h-64"
            placeholder="Type or paste Kruti Dev text here"
          />
        </section>

        <section className="space-y-3">
          <label className="tool-label">Devanagari Unicode output</label>
          <pre aria-live="polite" className="tool-output-pre h-64">
            {outputValue || "Converted output will appear here"}
          </pre>
        </section>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={copyOutput} className="tool-copy-btn" aria-label="Copy Unicode output">
          Copy
        </button>
        <button type="button" onClick={() => setInputValue("")} className="tool-btn-secondary">
          Clear
        </button>
        <button type="button" onClick={downloadOutput} className="tool-btn-secondary">
          Download .txt
        </button>
      </div>
    </div>
  );
}
