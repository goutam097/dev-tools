"use client";

import { ReactNode, useMemo, useState } from "react";

function createGlobalRegex(pattern: string, flags: string) {
  const regex = new RegExp(pattern, flags);
  return regex.global ? regex : new RegExp(pattern, `${flags}g`);
}

export default function RegexTester() {
  const [regex, setRegex] = useState("");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("");
  const computed = useMemo(() => {
    if (!regex.trim()) {
      return { matches: [] as RegExpMatchArray[], error: "" };
    }

    try {
      const re = createGlobalRegex(regex, flags);
      return { matches: Array.from(testText.matchAll(re)), error: "" };
    } catch (err) {
      return { matches: [] as RegExpMatchArray[], error: err instanceof Error ? err.message : "Invalid regex" };
    }
  }, [flags, regex, testText]);

  const { matches, error } = computed;

  const renderHighlighted = () => {
    if (!regex || !testText || error) return testText;

    try {
      const re = createGlobalRegex(regex, flags);
      const segments: ReactNode[] = [];
      let last = 0;

      for (const match of Array.from(testText.matchAll(re))) {
        const start = match.index ?? 0;
        const end = start + match[0].length;
        segments.push(testText.slice(last, start));
        segments.push(
          <mark key={`${start}-${end}`} className="rounded bg-amber-200 px-0.5">
            {match[0]}
          </mark>,
        );
        last = end;
      }

      segments.push(testText.slice(last));
      return segments;
    } catch {
      return testText;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="space-y-2 md:col-span-3">
          <label htmlFor="regex-pattern" className="tool-label">Regular Expression</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-slate-400">/</span>
            <input
              id="regex-pattern"
              type="text"
              value={regex}
              onChange={(e) => setRegex(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--ink)] py-3 pl-7 pr-16 font-mono text-sm text-[var(--bg)] outline-none ring-[var(--accent)] transition focus:ring-2"
              placeholder="[a-z]+"
            />
            <span className="absolute right-12 top-1/2 -translate-y-1/2 font-mono text-sm text-slate-400">/</span>
            <input
              id="regex-flags"
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              aria-label="Regular expression flags"
              className="absolute right-3 top-1/2 w-10 -translate-y-1/2 bg-transparent font-mono text-sm text-[var(--accent)] outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="tool-label">Matches</p>
          <div aria-live="polite" className="rounded-xl border border-[var(--border)] bg-white py-3 text-center font-mono text-sm font-bold">{matches.length}</div>
        </div>
      </div>

      {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 font-mono text-xs text-red-700">{error}</p>}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="space-y-3">
          <label htmlFor="regex-test-text" className="tool-label">Test Text</label>
          <textarea
            id="regex-test-text"
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            className="tool-textarea h-64"
            placeholder="Type text to test"
          />
        </section>
        <section className="space-y-3">
          <p id="regex-result-label" className="tool-label">Highlighted Result</p>
          <div aria-labelledby="regex-result-label" aria-live="polite" className="tool-output-pre h-64 whitespace-pre-wrap">{renderHighlighted()}</div>
        </section>
      </div>
    </div>
  );
}
