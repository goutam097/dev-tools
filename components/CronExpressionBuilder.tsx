"use client";

import { useMemo, useState } from "react";
import { cronPresets, describeCron, validateCronField, type CronFieldName } from "@/lib/cronBuilder";

const fieldConfig: { key: CronFieldName; label: string; placeholder: string }[] = [
  { key: "minute", label: "Minute (0–59)", placeholder: "*/5" },
  { key: "hour", label: "Hour (0–23)", placeholder: "9" },
  { key: "day", label: "Day of month (1–31)", placeholder: "*" },
  { key: "month", label: "Month (1–12)", placeholder: "*" },
  { key: "weekday", label: "Day of week (0–7)", placeholder: "1-5" },
];

const presetOptions: { label: string; fields: readonly string[] }[] = [
  { label: "Every minute", fields: cronPresets.everyMinute },
  { label: "Every 5 minutes", fields: cronPresets.everyFiveMinutes },
  { label: "Hourly", fields: cronPresets.hourly },
  { label: "Daily at 9:00 AM", fields: cronPresets.daily },
  { label: "Weekdays at 9:00 AM", fields: cronPresets.weekdays },
  { label: "Weekly on Monday", fields: cronPresets.weekly },
  { label: "Monthly on the 1st", fields: cronPresets.monthly },
];

export default function CronExpressionBuilder() {
  const [fields, setFields] = useState(["*/5", "*", "*", "*", "*"]);
  const [copied, setCopied] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const errors = useMemo(() => fieldConfig.map(({ key }, index) => validateCronField(fields[index], key)), [fields]);
  const valid = errors.every((error) => !error);
  const expression = fields.join(" ");

  const setField = (index: number, value: string) => setFields((current) => current.map((field, fieldIndex) => fieldIndex === index ? value : field));
  const reset = () => {
    setFields(["*/5", "*", "*", "*", "*"]);
    setCopied(false);
    setCopyMessage("");
  };
  const copyExpression = async () => {
    try {
      await navigator.clipboard.writeText(expression);
      setCopied(true);
      setCopyMessage("Cron expression copied.");
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
      setCopyMessage("Clipboard access was blocked. Select and copy the expression manually.");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-5 rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><p className="tool-label">Configure schedule</p><p className="mt-1 text-sm text-(--muted)">Use a number, list (1,3), range (1-5), or step (*/10).</p></div>
          <div className="flex flex-wrap items-end gap-3">
            <label className="min-w-48 space-y-1"><span className="tool-label">Common presets</span><select value="" onChange={(event) => { const preset = presetOptions[Number(event.target.value)]; if (preset) setFields([...preset.fields]); }} className="w-full rounded-lg border border-(--border) bg-white px-3 py-2 text-sm"><option value="">Select a schedule…</option>{presetOptions.map((preset, index) => <option key={preset.label} value={index}>{preset.label}</option>)}</select></label>
            <button type="button" onClick={reset} className="rounded-lg border border-(--border) px-3 py-2 text-xs text-(--muted) hover:bg-(--surface)">Reset</button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {fieldConfig.map(({ key, label, placeholder }, index) => (
            <label key={key} className="space-y-2">
              <span className="tool-label">{label}</span>
              <input value={fields[index]} onChange={(event) => setField(index, event.target.value)} placeholder={placeholder} aria-invalid={Boolean(errors[index])} className="w-full rounded-xl border border-(--border) bg-white px-3 py-3 font-mono text-base outline-none focus:ring-2 focus:ring-(--accent) aria-[invalid=true]:border-red-400" />
              {errors[index] && <span role="alert" className="block text-xs text-red-700">{errors[index]}</span>}
            </label>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {presetOptions.slice(1, 5).map((preset) => <button key={preset.label} type="button" onClick={() => setFields([...preset.fields])} className="rounded-full border border-(--border) px-3 py-2 text-xs transition hover:bg-(--surface)">{preset.label}</button>)}
        </div>
      </section>
      <section className="space-y-5 rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-center justify-between"><p className="tool-label">Generated expression</p><span className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${valid ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>{valid ? "Valid format" : "Check fields"}</span></div>
        <div className="rounded-2xl bg-(--ink) p-5 text-center font-mono text-xl tracking-wider text-(--bg) sm:text-2xl" aria-live="polite">{expression}</div>
        <button type="button" onClick={() => void copyExpression()} disabled={!valid} className="tool-btn-primary w-full justify-center disabled:opacity-40">{copied ? "Copied" : "Copy expression"}</button>
        <p className="min-h-4 text-xs text-(--muted)" role="status" aria-live="polite">{copyMessage}</p>
        <div className="rounded-2xl bg-(--surface) p-4"><p className="tool-label">In plain English</p><p className="mt-2 text-sm leading-6" aria-live="polite">{valid ? describeCron(fields) : "Fix the highlighted fields to see a schedule explanation."}</p></div>
        <p className="text-xs leading-5 text-(--muted)">This builder outputs standard five-field cron syntax. Day-of-week accepts 0 or 7 for Sunday; exact runtime behavior can vary by scheduler.</p>
      </section>
    </div>
  );
}
