"use client";

import { useMemo, useState } from "react";
import { CGPA_UNIVERSITIES, convertCgpaToPercentage } from "@/lib/cgpa";

export default function CgpaToPercentageConverter() {
  const [selectedSlug, setSelectedSlug] = useState("cbse");
  const [cgpaValue, setCgpaValue] = useState("8.5");

  const selectedUniversity = useMemo(
    () => CGPA_UNIVERSITIES.find((university) => university.slug === selectedSlug) ?? CGPA_UNIVERSITIES[0],
    [selectedSlug],
  );

  const numericValue = Number.parseFloat(cgpaValue) || 0;
  const percentage = useMemo(
    () => convertCgpaToPercentage(numericValue, selectedUniversity.slug),
    [numericValue, selectedUniversity.slug],
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="space-y-3">
          <label className="tool-label">Select university</label>
          <select
            value={selectedSlug}
            onChange={(event) => setSelectedSlug(event.target.value)}
            className="w-full rounded-xl border border-(--border) bg-white px-4 py-3 text-sm text-(--ink) outline-none focus:border-(--ink)"
          >
            {CGPA_UNIVERSITIES.map((university) => (
              <option key={university.slug} value={university.slug}>
                {university.name}
              </option>
            ))}
          </select>

          <label className="tool-label">CGPA input</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={cgpaValue}
            onChange={(event) => setCgpaValue(event.target.value)}
            className="w-full rounded-xl border border-(--border) bg-white px-4 py-3 text-sm text-(--ink) outline-none focus:border-(--ink)"
          />
        </section>

        <section className="space-y-3">
          <label className="tool-label">Converted percentage</label>
          <div className="rounded-2xl border border-(--border) bg-white p-5 text-3xl font-bold text-(--ink)">
            {percentage.toFixed(2)}%
          </div>

          <div className="rounded-2xl border border-(--border) bg-[#fffaf5] p-4 text-sm leading-6 text-(--muted)">
            <p className="font-semibold text-(--ink)">{selectedUniversity.name}</p>
            <p className="mt-1">Formula: {selectedUniversity.formulaText}</p>
          </div>
        </section>
      </div>

      {!selectedUniversity.verified && (
        <div className="rounded-2xl border border-amber-400 bg-amber-50 p-4 text-sm text-amber-900">
          Formula not yet verified against the official university circular. Please confirm with your university.
        </div>
      )}
    </div>
  );
}
