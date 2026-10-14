export type CsvCleanOptions = {
  hasHeader: boolean;
  missingValue: string;
};

export type CsvCleanResult = {
  headers: string[];
  rows: string[][];
  emptyRowsRemoved: number;
  duplicatesRemoved: number;
  missingValuesFilled: number;
  whitespaceTrimmed: number;
};

export function parseCsv(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (quoted) {
      if (character === '"') {
        if (input[index + 1] === '"') {
          cell += '"';
          index += 1;
        } else {
          quoted = false;
        }
      } else {
        cell += character;
      }
      continue;
    }

    if (character === '"' && cell.length === 0) {
      quoted = true;
    } else if (character === ",") {
      row.push(cell);
      cell = "";
    } else if (character === "\n" || character === "\r") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      if (character === "\r" && input[index + 1] === "\n") index += 1;
    } else {
      cell += character;
    }
  }

  if (quoted) throw new Error("CSV contains a quoted field that was not closed.");
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

export function cleanCsv(input: string, options: CsvCleanOptions): CsvCleanResult {
  const records = parseCsv(input);
  if (records.length === 0) throw new Error("Add CSV data or upload a CSV file to begin.");

  let whitespaceTrimmed = 0;
  const trimmed = records.map((record) =>
    record.map((value) => {
      const clean = value.trim();
      if (clean !== value) whitespaceTrimmed += 1;
      return clean;
    }),
  );
  const nonempty = trimmed.filter((record) => record.some((value) => value.length > 0));
  const emptyRowsRemoved = trimmed.length - nonempty.length;
  if (nonempty.length === 0) throw new Error("The CSV contains no non-empty rows.");

  const sourceHeaders = options.hasHeader ? nonempty.shift() ?? [] : [];
  const width = Math.max(sourceHeaders.length, ...nonempty.map((record) => record.length), options.hasHeader ? 0 : (nonempty[0]?.length ?? 0));
  const headers = Array.from({ length: width }, (_, index) => {
    const header = sourceHeaders[index] ?? "";
    return header || `Column ${index + 1}`;
  });
  const seen = new Set<string>();
  let duplicatesRemoved = 0;
  let missingValuesFilled = 0;
  const rows: string[][] = [];

  for (const record of nonempty) {
    const normalized = Array.from({ length: width }, (_, index) => {
      const value = record[index] ?? "";
      if (value === "") {
        missingValuesFilled += 1;
        return options.missingValue;
      }
      return value;
    });
    const key = JSON.stringify(normalized);
    if (seen.has(key)) {
      duplicatesRemoved += 1;
      continue;
    }
    seen.add(key);
    rows.push(normalized);
  }

  return { headers, rows, emptyRowsRemoved, duplicatesRemoved, missingValuesFilled, whitespaceTrimmed };
}

export function stringifyCsv(headers: string[], rows: string[][]): string {
  const escape = (value: string) =>
    /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
  return [headers, ...rows].map((record) => record.map(escape).join(",")).join("\r\n");
}
