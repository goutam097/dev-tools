export type SalaryInput = {
  grossMonthlySalary: number;
  incomeTaxRate: number;
  providentFundPercent: number;
  professionalTax: number;
  otherDeductions: number;
};

export function calculateInHandSalary(input: SalaryInput) {
  const grossMonthlySalary = Number.isFinite(input.grossMonthlySalary) ? input.grossMonthlySalary : 0;
  const incomeTaxRate = Number.isFinite(input.incomeTaxRate) ? input.incomeTaxRate : 0;
  const providentFundPercent = Number.isFinite(input.providentFundPercent) ? input.providentFundPercent : 0;
  const professionalTax = Number.isFinite(input.professionalTax) ? input.professionalTax : 0;
  const otherDeductions = Number.isFinite(input.otherDeductions) ? input.otherDeductions : 0;

  const taxAmount = grossMonthlySalary * (incomeTaxRate / 100);
  const providentFundAmount = grossMonthlySalary * (providentFundPercent / 100);
  const totalDeductions = taxAmount + providentFundAmount + professionalTax + otherDeductions;
  const inHandMonthlySalary = Math.max(grossMonthlySalary - totalDeductions, 0);

  return {
    grossMonthlySalary,
    taxAmount,
    providentFundAmount,
    professionalTax,
    otherDeductions,
    totalDeductions,
    inHandMonthlySalary,
    annualInHandSalary: inHandMonthlySalary * 12,
  };
}
