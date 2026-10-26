"use client";

import { useRef, useState } from "react";
import { cleanCsv, stringifyCsv, type CsvCleanResult } from "@/lib/csvCleaner";

const sampleCsv = `name,email,notes
Ada Lovelace,ada@example.com,"first row, with comma"
Linus Torvalds,linus@example.com,
Ada Lovelace,ada@example.com,"first row, with comma"
, ,blank name
`;
const MAX_CSV_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export default function CsvDataCleaner() {
  const [input, setInput] = useState("");
  const [hasHeader, setHasHeader] = useState(true);
  const [missingValue, setMissingValue] = useState("");
  const [result, setResult] = useState<CsvCleanResult | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<number[]>([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const runCleaner = () => {
    try {
      const cleaned = cleanCsv(input, { hasHeader, missingValue });
      setResult(cleaned);
      setSelectedColumns(cleaned.headers.map((_, index) => index));
      setError("");
    } catch (cleanError) {
      setResult(null);
      setSelectedColumns([]);
      setError(cleanError instanceof Error ? cleanError.message : "Unable to clean this CSV.");
    }
  };

  const loadFile = async (file?: File) => {
    if (!file) return;
    if (file.size > MAX_CSV_FILE_SIZE_BYTES) {
      setError("Choose a CSV file no larger than 5 MiB so it can be processed in your browser.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    if (!file.name.toLowerCase().endsWith(".csv") && file.type !== "text/csv") {
      setError("Choose a CSV file to continue.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    try {
      setInput(await file.text());
      setResult(null);
      setSelectedColumns([]);
      setError("");
    } catch {
      setError("The selected file could not be read. Try another CSV file.");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const download = () => {
    if (!result || selectedColumns.length === 0) return;
    const csv = stringifyCsv(
      selectedColumns.map((index) => result.headers[index]),
      result.rows.map((row) => selectedColumns.map((index) => row[index] ?? "")),
    );
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "cleaned-data.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const visibleRows = result?.rows.slice(0, 100) ?? [];
  const visibleColumns = result
    ? selectedColumns.map((index) => ({ index, header: result.headers[index] }))
    : [];
  const visibleData = result?.rows.slice(0, 100).map((row) =>
    selectedColumns.map((index) => row[index] ?? ""),
  ) ?? [];

  const loadSample = () => {
    setInput(sampleCsv);
    setResult(null);
    setSelectedColumns([]);
    setError("");
  };

  const reset = () => {
    setInput("");
    setHasHeader(true);
    setMissingValue("");
    setResult(null);
    setSelectedColumns([]);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-6 rounded-3xl border border-(--border) bg-white p-5 shadow-sm lg:grid-cols-2 sm:p-7">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label htmlFor="csv-input" className="tool-label">CSV data</label>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={loadSample} className="rounded-lg border border-(--border) px-3 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-(--surface)">Load sample</button>
              <label className="cursor-pointer rounded-lg border border-(--border) px-3 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-(--surface)">
                Upload .csv
                <input ref={fileInputRef} type="file" accept=".csv,text/csv" className="sr-only" onChange={(event) => void loadFile(event.target.files?.[0])} />
              </label>
              <button type="button" onClick={reset} className="rounded-lg border border-(--border) px-3 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-(--surface)">Reset</button>
            </div>
          </div>
          <textarea
            id="csv-input"
            value={input}
            onChange={(event) => { setInput(event.target.value); setResult(null); setSelectedColumns([]); setError(""); }}
            placeholder={"name,email\nAda, ada@example.com\nLinus,linus@example.com"}
            className="tool-textarea min-h-64 resize-y"
            aria-describedby="csv-help"
          />
          <p id="csv-help" className="text-xs leading-5 text-(--muted)">Paste comma-separated data or upload a local CSV up to 5 MiB. Files are read in your browser and are not uploaded.</p>
        </div>
        <div className="space-y-5">
          <p className="tool-label">Cleaning options</p>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" checked={hasHeader} onChange={(event) => setHasHeader(event.target.checked)} className="mt-1 accent-(--ink)" />
            <span><span className="font-semibold">First row contains headers</span><span className="mt-1 block text-xs text-(--muted)">When disabled, columns are named Column 1, Column 2, and so on.</span></span>
          </label>
          <label className="block space-y-2">
            <span className="tool-label">Replace missing values with</span>
            <input value={missingValue} onChange={(event) => setMissingValue(event.target.value)} className="w-full rounded-xl border border-(--border) bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-(--accent)" placeholder="Leave blank" />
          </label>
          <ul className="space-y-2 text-sm text-(--muted)">
            <li>• Removes fully empty rows and duplicate records.</li>
            <li>• Trims leading/trailing whitespace and fills empty cells.</li>
            <li>• Preserves quoted commas, quotes, and line breaks.</li>
          </ul>
          <button type="button" onClick={runCleaner} className="tool-btn-primary w-full justify-center">Clean CSV</button>
          {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        </div>
      </section>

      {result ? (
        <section className="space-y-4 rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="tool-label">Cleaned preview</p>
              <p className="mt-1 text-sm text-(--muted)">{result.rows.length} records · {result.headers.length} columns</p>
            </div>
            <button type="button" onClick={download} disabled={selectedColumns.length === 0} className="tool-btn-secondary disabled:cursor-not-allowed disabled:opacity-50">Download selected columns</button>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ["Empty rows removed", result.emptyRowsRemoved],
              ["Duplicates removed", result.duplicatesRemoved],
              ["Missing values filled", result.missingValuesFilled],
              ["Cells trimmed", result.whitespaceTrimmed],
            ].map(([label, count]) => <div key={label} className="rounded-xl bg-(--surface) p-3"><p className="font-mono text-[10px] uppercase tracking-wider text-(--muted)">{label}</p><p className="mt-1 text-xl font-semibold">{count}</p></div>)}
          </div>
            <fieldset className="rounded-xl border border-(--border) p-4">
              <legend className="px-2 font-mono text-[10px] uppercase tracking-widest text-(--muted)">Columns to include in preview and export</legend>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {result.headers.map((header, index) => (
                  <label key={`${header}-${index}`} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedColumns.includes(index)}
                      onChange={(event) => setSelectedColumns((current) =>
                        event.target.checked
                          ? [...current, index].sort((left, right) => left - right)
                          : current.filter((column) => column !== index),
                      )}
                    />
                    {header}
                  </label>
                ))}
              </div>
              {selectedColumns.length === 0 && <p className="mt-2 text-xs text-amber-800">Select at least one column to download CSV data.</p>}
            </fieldset>
            <div className="overflow-auto rounded-xl border border-(--border)">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-(--ink) text-(--bg)"><tr>{visibleColumns.map(({ index, header }) => <th key={`${header}-${index}`} className="whitespace-nowrap px-4 py-3 font-mono text-xs">{header}</th>)}</tr></thead>
                <tbody>{visibleData.map((row, rowIndex) => <tr key={rowIndex} className="border-t border-(--border) odd:bg-white even:bg-(--surface)">{row.map((cell, index) => <td key={index} className="max-w-64 whitespace-pre-wrap break-words px-4 py-3">{cell || <span className="text-(--muted)">—</span>}</td>)}</tr>)}</tbody>
              </table>
            </div>
            {result.rows.length > visibleRows.length && <p className="text-xs text-(--muted)">Showing the first {visibleRows.length} records. The download contains all {result.rows.length} cleaned records using the selected columns.</p>}
        </section>
      ) : (
        <div className="rounded-3xl border border-dashed border-(--border) bg-white/60 p-8 text-center text-sm text-(--muted)">Your cleaned CSV preview and change summary will appear here.</div>
      )}
    </div>
  );
}
