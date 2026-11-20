export type FormulaType = "linear" | "offset_linear" | "piecewise" | "table";

export type FormulaParams = {
  offset?: number;
  multiplier?: number;
  divisor?: number;
  bands?: Array<{ min: number; max?: number; value: number }>;
  table?: Record<string, number>;
};

export type UniversityFormula = {
  slug: string;
  name: string;
  scale: number;
  formulaType: FormulaType;
  formulaText: string;
  params: FormulaParams;
  reverseSupported: boolean;
  sourceUrl: string;
  lastVerified: string;
  verified: boolean;
  notes: string;
};

export const CGPA_UNIVERSITIES: UniversityFormula[] = [
  {
    slug: "cbse",
    name: "CBSE",
    scale: 10,
    formulaType: "linear",
    formulaText: "Percentage = CGPA × 9.5",
    params: { multiplier: 9.5 },
    reverseSupported: true,
    sourceUrl: "https://cbse.gov.in/",
    lastVerified: "2026-11-10",
    verified: true,
    notes: "CBSE official formula widely used for board result conversion.",
  },
  {
    slug: "vtu",
    name: "Visvesvaraya Technological University (VTU)",
    scale: 10,
    formulaType: "offset_linear",
    formulaText: "Percentage = (CGPA - 0.75) × 10",
    params: { offset: -0.75, multiplier: 10 },
    reverseSupported: true,
    sourceUrl: "",
    lastVerified: "",
    verified: false,
    notes: "Formula not yet verified against the official university circular.",
  },
  {
    slug: "anna-university",
    name: "Anna University",
    scale: 10,
    formulaType: "offset_linear",
    formulaText: "Percentage = (CGPA - 0.75) × 10",
    params: { offset: -0.75, multiplier: 10 },
    reverseSupported: true,
    sourceUrl: "",
    lastVerified: "",
    verified: false,
    notes: "Formula not yet verified against the official university circular.",
  },
  {
    slug: "mumbai-university",
    name: "Mumbai University",
    scale: 10,
    formulaType: "linear",
    formulaText: "Percentage = CGPA × 9.5",
    params: { multiplier: 9.5 },
    reverseSupported: true,
    sourceUrl: "",
    lastVerified: "",
    verified: false,
    notes: "Formula not yet verified against the official university circular.",
  },
  {
    slug: "sppu",
    name: "SPPU (Pune)",
    scale: 10,
    formulaType: "linear",
    formulaText: "Percentage = CGPA × 10",
    params: { multiplier: 10 },
    reverseSupported: true,
    sourceUrl: "",
    lastVerified: "",
    verified: false,
    notes: "Formula not yet verified against the official university circular.",
  },
  {
    slug: "delhi-university",
    name: "Delhi University",
    scale: 10,
    formulaType: "linear",
    formulaText: "Percentage = CGPA × 9.5",
    params: { multiplier: 9.5 },
    reverseSupported: true,
    sourceUrl: "",
    lastVerified: "",
    verified: false,
    notes: "Formula not yet verified against the official university circular.",
  },
  {
    slug: "jntu",
    name: "JNTU",
    scale: 10,
    formulaType: "linear",
    formulaText: "Percentage = CGPA × 10",
    params: { multiplier: 10 },
    reverseSupported: true,
    sourceUrl: "",
    lastVerified: "",
    verified: false,
    notes: "Formula not yet verified against the official university circular.",
  },
  {
    slug: "aktu",
    name: "AKTU",
    scale: 10,
    formulaType: "linear",
    formulaText: "Percentage = CGPA × 10",
    params: { multiplier: 10 },
    reverseSupported: true,
    sourceUrl: "",
    lastVerified: "",
    verified: false,
    notes: "Formula not yet verified against the official university circular.",
  },
  {
    slug: "gtu",
    name: "GTU",
    scale: 10,
    formulaType: "linear",
    formulaText: "Percentage = CGPA × 10",
    params: { multiplier: 10 },
    reverseSupported: true,
    sourceUrl: "",
    lastVerified: "",
    verified: false,
    notes: "Formula not yet verified against the official university circular.",
  },
  {
    slug: "rtu",
    name: "RTU",
    scale: 10,
    formulaType: "linear",
    formulaText: "Percentage = CGPA × 10",
    params: { multiplier: 10 },
    reverseSupported: true,
    sourceUrl: "",
    lastVerified: "",
    verified: false,
    notes: "Formula not yet verified against the official university circular.",
  },
  {
    slug: "calcutta-university",
    name: "Calcutta University",
    scale: 10,
    formulaType: "linear",
    formulaText: "Percentage = CGPA × 10",
    params: { multiplier: 10 },
    reverseSupported: true,
    sourceUrl: "",
    lastVerified: "",
    verified: false,
    notes: "Formula not yet verified against the official university circular.",
  },
  {
    slug: "generic",
    name: "Generic",
    scale: 10,
    formulaType: "linear",
    formulaText: "Percentage = CGPA × 10",
    params: { multiplier: 10 },
    reverseSupported: true,
    sourceUrl: "",
    lastVerified: "2026-11-10",
    verified: true,
    notes: "A generic 10-point scale estimate.",
  },
];

export const CGPA_FORMULA_BY_SLUG = Object.fromEntries(
  CGPA_UNIVERSITIES.map((entry) => [entry.slug, entry]),
);

export function evaluateCgpaFormula(
  value: number,
  formulaType: FormulaType,
  params: FormulaParams = {},
) {
  switch (formulaType) {
    case "linear": {
      const multiplier = Number(params.multiplier ?? 10);
      return value * multiplier;
    }
    case "offset_linear": {
      const offset = Number(params.offset ?? 0);
      const multiplier = Number(params.multiplier ?? 10);
      return (value + offset) * multiplier;
    }
    case "piecewise": {
      const bands = params.bands ?? [];
      const match = bands.find((band) => {
        if (band.max === undefined) {
          return value >= band.min;
        }
        return value >= band.min && value <= band.max;
      });
      if (!match) {
        return value;
      }
      return value * Number(match.value ?? 1);
    }
    case "table": {
      const table = params.table ?? {};
      const normalized = String(value);
      return Number(table[normalized] ?? value);
    }
    default:
      return value;
  }
}

export function convertCgpaToPercentage(
  cgpaValue: number,
  universitySlug: string = "generic",
) {
  const university = CGPA_FORMULA_BY_SLUG[universitySlug] ?? CGPA_FORMULA_BY_SLUG.generic;
  return evaluateCgpaFormula(cgpaValue, university.formulaType, university.params);
}

export function convertPercentageToCgpa(
  percentageValue: number,
  universitySlug: string = "generic",
) {
  const university = CGPA_FORMULA_BY_SLUG[universitySlug] ?? CGPA_FORMULA_BY_SLUG.generic;

  if (university.formulaType === "linear") {
    const multiplier = Number(university.params.multiplier ?? 10);
    return multiplier ? percentageValue / multiplier : 0;
  }

  if (university.formulaType === "offset_linear") {
    const offset = Number(university.params.offset ?? 0);
    const multiplier = Number(university.params.multiplier ?? 10);
    return multiplier ? percentageValue / multiplier - offset : 0;
  }

  return percentageValue;
}
