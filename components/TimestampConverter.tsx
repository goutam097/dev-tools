"use client";

import { useEffect, useState } from "react";
import { Check, Clipboard, Clock3, RefreshCw, Trash2 } from "lucide-react";
import {
  convertDateTime,
  convertTimestamp,
  formatLocalDateTimeInput,
  type DateTimeZone,
  type TimestampConversion,
  type TimestampUnit,
} from "@/lib/timestampConverter";

type ConversionMode = "timestamp" | "date";

function ResultRow({
  label,
  value,
  copyValue,
  onCopy,
}: {
  label: string;
  value: string;
  copyValue: string;
  onCopy: (value: string) => void;
}) {
  return (
    <div className="flex min-w-0 items-start justify-between gap-3 border-b border-(--border) py-3 last:border-b-0">
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-widest text-(--muted)">{label}</p>
        <p className="mt-1 break-words font-mono text-sm text-(--ink)">{value}</p>
      </div>
      <button
        type="button"
        onClick={() => onCopy(copyValue)}
        className="tool-copy-btn shrink-0"
        aria-label={`Copy ${label}`}
      >
        <Clipboard size={13} />
        Copy
      </button>
    </div>
  );
}

export default function TimestampConverter() {
  const [mode, setMode] = useState<ConversionMode>("timestamp");
  const [timestampInput, setTimestampInput] = useState("");
  const [timestampUnit, setTimestampUnit] = useState<TimestampUnit>("seconds");
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [dateTimeZone, setDateTimeZone] = useState<DateTimeZone>("local");
  const [result, setResult] = useState<TimestampConversion | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      const now = new Date();
      setCurrentTime(now);
      setDateTimeInput(formatLocalDateTimeInput(now));
    }, 0);

    return () => window.clearTimeout(timerId);
  }, []);

  const convert = () => {
    try {
      const converted = mode === "timestamp"
        ? convertTimestamp(timestampInput, timestampUnit)
        : convertDateTime(dateTimeInput, dateTimeZone);
      setResult(converted);
      setError("");
      setNotice("");
    } catch (conversionError) {
      setResult(null);
      setError(
        conversionError instanceof Error
          ? conversionError.message
          : "Unable to convert this value.",
      );
    }
  };

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setNotice("Copied to clipboard.");
      setError("");
    } catch {
      setNotice("");
      setError("Clipboard access is unavailable. Check your browser permissions.");
    }
  };

  const clear = () => {
    setTimestampInput("");
    setDateTimeInput("");
    setResult(null);
    setError("");
    setNotice("");
  };

  const refreshCurrentTime = () => {
    setCurrentTime(new Date());
    setNotice("Current timestamp refreshed.");
    setError("");
  };

  const currentMilliseconds = currentTime?.getTime();
  const currentSeconds = currentMilliseconds === undefined
    ? "—"
    : Math.floor(currentMilliseconds / 1000);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-(--muted)">
              <Clock3 size={14} />
              Current Unix timestamp
            </p>
            <p className="mt-3 font-mono text-2xl font-semibold tracking-tight text-(--ink)" aria-live="polite">
              {currentSeconds}
            </p>
            <p className="mt-1 font-mono text-xs text-(--muted)">
              {currentMilliseconds === undefined ? "—" : `${currentMilliseconds} milliseconds`}
            </p>
          </div>
          <button type="button" onClick={refreshCurrentTime} className="tool-btn-secondary inline-flex items-center gap-2">
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-6">
        <div className="grid grid-cols-2 rounded-xl bg-(--surface) p-1" role="tablist" aria-label="Conversion direction">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "timestamp"}
            onClick={() => {
              setMode("timestamp");
              setResult(null);
              setError("");
            }}
            className={`rounded-lg px-3 py-3 text-sm font-semibold transition ${mode === "timestamp" ? "bg-(--ink) text-(--bg)" : "text-(--muted) hover:bg-white"}`}
          >
            Timestamp to date
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "date"}
            onClick={() => {
              setMode("date");
              setResult(null);
              setError("");
            }}
            className={`rounded-lg px-3 py-3 text-sm font-semibold transition ${mode === "date" ? "bg-(--ink) text-(--bg)" : "text-(--muted) hover:bg-white"}`}
          >
            Date to timestamp
          </button>
        </div>

        {mode === "timestamp" ? (
          <div className="mt-6 space-y-4">
            <label className="block space-y-2">
              <span className="tool-label">Unix timestamp</span>
              <input
                inputMode="decimal"
                value={timestampInput}
                onChange={(event) => setTimestampInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") convert();
                }}
                placeholder="e.g. 1700000000"
                className="w-full rounded-xl border border-(--border) bg-white px-4 py-3 font-mono text-sm text-(--ink) outline-none transition focus:border-(--ink)"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "timestamp-error" : undefined}
              />
            </label>
            <fieldset>
              <legend className="tool-label mb-2">Timestamp unit</legend>
              <div className="flex flex-wrap gap-2">
                {(["seconds", "milliseconds"] as const).map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    aria-pressed={timestampUnit === unit}
                    onClick={() => setTimestampUnit(unit)}
                    className={`rounded-lg border px-4 py-2 text-sm transition ${timestampUnit === unit ? "border-(--ink) bg-(--ink) text-(--bg)" : "border-(--border) bg-white text-(--ink) hover:bg-(--surface)"}`}
                  >
                    {unit === "seconds" ? "Seconds" : "Milliseconds"}
                  </button>
                ))}
              </div>
            </fieldset>
            <p className="text-xs leading-5 text-(--muted)">
              Negative values represent dates before January 1, 1970. Decimal seconds are accepted and rounded down to millisecond precision.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <label className="block space-y-2">
              <span className="tool-label">Date and time</span>
              <input
                type="datetime-local"
                step="1"
                value={dateTimeInput}
                onChange={(event) => setDateTimeInput(event.target.value)}
                className="w-full rounded-xl border border-(--border) bg-white px-4 py-3 font-mono text-sm text-(--ink) outline-none transition focus:border-(--ink)"
                aria-invalid={Boolean(error)}
              />
            </label>
            <label className="block space-y-2">
              <span className="tool-label">Interpret selected date and time as</span>
              <select
                value={dateTimeZone}
                onChange={(event) => setDateTimeZone(event.target.value as DateTimeZone)}
                className="w-full rounded-xl border border-(--border) bg-white px-4 py-3 text-sm text-(--ink) outline-none focus:border-(--ink)"
              >
                <option value="local">My local time</option>
                <option value="utc">UTC</option>
              </select>
            </label>
            <p className="text-xs leading-5 text-(--muted)">
              Local times that fall inside a daylight-saving clock gap are rejected rather than silently shifted.
            </p>
          </div>
        )}

        {error && (
          <p id="timestamp-error" role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        {notice && <p role="status" className="mt-4 text-sm text-emerald-700">{notice}</p>}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={convert} className="tool-btn-primary flex-1 justify-center py-3">
            Convert
          </button>
          <button type="button" onClick={clear} className="tool-btn-secondary inline-flex items-center justify-center gap-2">
            <Trash2 size={14} />
            Clear
          </button>
        </div>
      </section>

      {result && (
        <section className="rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-6" aria-label="Conversion results">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-(--muted)">Conversion result</p>
              <h2 className="mt-1 font-serif text-2xl italic text-(--ink)">Date and time formats</h2>
            </div>
            <button
              type="button"
              onClick={() => void copy([
                `Local: ${result.localDateTime} (${result.timeZone})`,
                `UTC: ${result.utcDateTime}`,
                `ISO 8601: ${result.iso}`,
                `Unix seconds: ${result.unixSeconds}`,
                `Unix milliseconds: ${result.unixMilliseconds}`,
              ].join("\n"))}
              className="tool-btn-secondary inline-flex items-center gap-2"
            >
              <Check size={14} />
              Copy all
            </button>
          </div>
          <div className="mt-4">
            <ResultRow
              label={`Local time · ${result.timeZone}`}
              value={result.localDateTime}
              copyValue={result.localDateTime}
              onCopy={(value) => void copy(value)}
            />
            <ResultRow
              label="UTC"
              value={result.utcDateTime}
              copyValue={result.utcDateTime}
              onCopy={(value) => void copy(value)}
            />
            <ResultRow label="ISO 8601" value={result.iso} copyValue={result.iso} onCopy={(value) => void copy(value)} />
            <ResultRow label="Unix timestamp · seconds" value={result.unixSeconds} copyValue={result.unixSeconds} onCopy={(value) => void copy(value)} />
            <ResultRow
              label="Unix timestamp · milliseconds"
              value={String(result.unixMilliseconds)}
              copyValue={String(result.unixMilliseconds)}
              onCopy={(value) => void copy(value)}
            />
          </div>
        </section>
      )}
    </div>
  );
}
