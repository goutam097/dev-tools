"use client";

import { useMemo, useState } from "react";
import { calculateInHandSalary } from "@/lib/salaryCalculator";

export default function SalaryCalculator() {
  const [grossMonthlySalary, setGrossMonthlySalary] = useState("75000");
  const [incomeTaxRate, setIncomeTaxRate] = useState("5");
  const [providentFundPercent, setProvidentFundPercent] = useState("12");
  const [professionalTax, setProfessionalTax] = useState("200");
  const [otherDeductions, setOtherDeductions] = useState("0");

  const result = useMemo(() => {
    return calculateInHandSalary({
      grossMonthlySalary: Number(grossMonthlySalary) || 0,
      incomeTaxRate: Number(incomeTaxRate) || 0,
      providentFundPercent: Number(providentFundPercent) || 0,
      professionalTax: Number(professionalTax) || 0,
      otherDeductions: Number(otherDeductions) || 0,
    });
  }, [grossMonthlySalary, incomeTaxRate, providentFundPercent, professionalTax, otherDeductions]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="tool-label">Gross monthly salary</label>
            <input
              value={grossMonthlySalary}
              onChange={(event) => setGrossMonthlySalary(event.target.value)}
              className="mt-2 w-full rounded-xl border border-(--border) bg-white px-4 py-3 text-sm text-(--ink) outline-none focus:border-(--ink)"
              type="number"
            />
          </div>
          <div>
            <label className="tool-label">Income tax rate (%)</label>
            <input
              value={incomeTaxRate}
              onChange={(event) => setIncomeTaxRate(event.target.value)}
              className="mt-2 w-full rounded-xl border border-(--border) bg-white px-4 py-3 text-sm text-(--ink) outline-none focus:border-(--ink)"
              type="number"
            />
          </div>
          <div>
            <label className="tool-label">Provident fund (%)</label>
            <input
              value={providentFundPercent}
              onChange={(event) => setProvidentFundPercent(event.target.value)}
              className="mt-2 w-full rounded-xl border border-(--border) bg-white px-4 py-3 text-sm text-(--ink) outline-none focus:border-(--ink)"
              type="number"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="tool-label">Professional tax</label>
            <input
              value={professionalTax}
              onChange={(event) => setProfessionalTax(event.target.value)}
              className="mt-2 w-full rounded-xl border border-(--border) bg-white px-4 py-3 text-sm text-(--ink) outline-none focus:border-(--ink)"
              type="number"
            />
          </div>
          <div>
            <label className="tool-label">Other deductions</label>
            <input
              value={otherDeductions}
              onChange={(event) => setOtherDeductions(event.target.value)}
              className="mt-2 w-full rounded-xl border border-(--border) bg-white px-4 py-3 text-sm text-(--ink) outline-none focus:border-(--ink)"
              type="number"
            />
          </div>

          <div className="rounded-2xl border border-(--border) bg-white p-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-(--muted)">In-hand salary</p>
            <div className="mt-3 text-3xl font-bold text-(--ink)">
              ₹{result.inHandMonthlySalary.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </div>
            <p className="mt-2 text-sm text-(--muted)">
              Annual: ₹{result.annualInHandSalary.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
