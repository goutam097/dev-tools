"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { HistoryItem } from "@/lib/types";

export default function HistoryView() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/history");
        if (!mounted) return;

        if (res.ok) {
          const data = (await res.json()) as HistoryItem[];
          setHistory(data);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <p className="py-16 text-center font-mono text-sm text-[var(--muted)]">Loading history...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <p className="font-serif text-lg italic">Recent activity (50 latest)</p>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">Stored in MongoDB</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {history.length > 0 ? (
          history.map((entry) => (
            <article key={entry.id} className="rounded-2xl border border-[var(--border)] bg-white p-5">
              <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                <span className="rounded bg-[var(--ink)] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--bg)]">
                  {entry.tool_type}
                </span>
                <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
                  <Clock size={12} />
                  {new Date(entry.created_at).toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">Input</p>
                  <pre className="max-h-28 overflow-auto rounded-lg bg-[var(--surface)] p-3 font-mono text-xs">{entry.input_data}</pre>
                </div>
                <div>
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">Output</p>
                  <pre className="max-h-28 overflow-auto rounded-lg bg-[var(--surface)] p-3 font-mono text-xs">{entry.output_data}</pre>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-[var(--border)] py-16 text-center text-[var(--muted)]">No history yet</div>
        )}
      </div>
    </div>
  );
}
