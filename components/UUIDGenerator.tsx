"use client";

import { useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { saveHistory } from "@/lib/clientHistory";

export default function UUIDGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generate = async () => {
    const amount = Math.min(50, Math.max(1, count));
    const generated = Array.from({ length: amount }, () => crypto.randomUUID());
    setUuids(generated);
    await saveHistory("uuid", `count:${amount}`, generated.join("\n"));
  };

  const copyLine = async (value: string, index: number) => {
    await navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <label className="tool-label">Quantity</label>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Number.parseInt(e.target.value, 10) || 1)}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--ink)] px-4 py-3 font-mono text-sm text-[var(--bg)] outline-none ring-[var(--accent)] transition focus:ring-2"
          />
        </div>
        <button type="button" onClick={() => void generate()} className="tool-btn-primary px-8 py-3 sm:w-auto">
          <RefreshCw size={16} />
          <span>Generate</span>
        </button>
      </div>

      <div className="space-y-3">
        {uuids.length > 0 ? (
          uuids.map((uuid, index) => (
            <div key={uuid} className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-white p-4">
              <code className="truncate font-mono text-xs sm:text-sm">{uuid}</code>
              <button type="button" onClick={() => void copyLine(uuid, index)} className="rounded p-2 transition hover:bg-[var(--surface)]">
                {copiedIndex === index ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} className="text-[var(--muted)]" />}
              </button>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-[var(--border)] py-16 text-center text-[var(--muted)]">
            Generate UUIDs to start
          </div>
        )}
      </div>
    </div>
  );
}
