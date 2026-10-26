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
  let quoteClosed = false;
  const source = input.charCodeAt(0) === 0xfeff ? input.slice(1) : input;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quoted) {
      if (character === '"') {
        if (source[index + 1] === '"') {
          cell += '"';
          index += 1;
        } else {
          quoted = false;
          quoteClosed = true;
        }
      } else {
        cell += character;
      }
      continue;
    }

    if (quoteClosed && character !== "," && character !== "\n" && character !== "\r") {
      throw new Error("CSV contains unexpected characters after a quoted field.");
    }

    if (character === '"' && cell.length === 0 && !quoteClosed) {
      quoted = true;
    } else if (character === ",") {
      row.push(cell);
      cell = "";
      quoteClosed = false;
    } else if (character === "\n" || character === "\r") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      quoteClosed = false;
      if (character === "\r" && source[index + 1] === "\n") index += 1;
    } else if (character === '"') {
      throw new Error("CSV contains a quote inside an unquoted field.");
    } else {
      cell += character;
    }
  }

  if (quoted) throw new Error("CSV contains a quoted field that was not closed.");
  if (cell.length > 0 || row.length > 0 || quoteClosed) {
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
