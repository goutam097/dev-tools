"use client";

import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { saveHistory } from "@/lib/clientHistory";

function randomHexColor() {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;
}

export default function GradientGenerator() {
  const [color1, setColor1] = useState("#F27D26");
  const [color2, setColor2] = useState("#141414");
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);

  const gradient = useMemo(() => `linear-gradient(${angle}deg, ${color1}, ${color2})`, [angle, color1, color2]);
  const css = `background: ${gradient};`;

  const randomize = () => {
    setColor1(randomHexColor());
    setColor2(randomHexColor());
    setAngle(Math.floor(Math.random() * 360));
  };

  const copyCss = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    await saveHistory("gradient", `${color1},${color2},${angle}`, css);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <section className="space-y-6 rounded-3xl border border-[var(--border)] bg-white p-5 shadow-sm sm:p-8">
        <div className="space-y-3">
          <label className="tool-label">Colors</label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="rounded-xl border border-[var(--border)] p-3">
              <span className="mb-2 block font-mono text-xs uppercase text-[var(--muted)]">Start</span>
              <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="h-10 w-full cursor-pointer" />
            </label>
            <label className="rounded-xl border border-[var(--border)] p-3">
              <span className="mb-2 block font-mono text-xs uppercase text-[var(--muted)]">End</span>
              <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="h-10 w-full cursor-pointer" />
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <label className="tool-label">Angle ({angle} deg)</label>
          <input
            type="range"
            min={0}
            max={360}
            value={angle}
            onChange={(e) => setAngle(Number.parseInt(e.target.value, 10))}
            className="w-full accent-[var(--ink)]"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={randomize} className="tool-btn-primary flex-1 justify-center">
            <RefreshCw size={16} />
            <span>Randomize</span>
          </button>
          <button type="button" onClick={() => void copyCss()} className="tool-btn-secondary sm:min-w-28 sm:w-auto">
            {copied ? "Copied" : "Copy CSS"}
          </button>
        </div>

        <pre className="tool-output-pre">{css}</pre>
      </section>

      <section className="space-y-3">
        <label className="tool-label">Preview</label>
        <div className="min-h-[260px] w-full rounded-3xl border-8 border-white shadow-2xl sm:min-h-[320px] md:min-h-[420px]" style={{ background: gradient }} />
      </section>
    </div>
  );
}
