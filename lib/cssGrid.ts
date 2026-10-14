export type GridSettings = {
  columns: number;
  rows: number;
  columnGap: number;
  rowGap: number;
  justifyItems: "start" | "center" | "end" | "stretch";
  alignItems: "start" | "center" | "end" | "stretch";
};

export function createGridCss(settings: GridSettings): string {
  return [
    ".grid-container {",
    "  display: grid;",
    `  grid-template-columns: repeat(${settings.columns}, minmax(0, 1fr));`,
    `  grid-template-rows: repeat(${settings.rows}, minmax(4rem, auto));`,
    `  column-gap: ${settings.columnGap}px;`,
    `  row-gap: ${settings.rowGap}px;`,
    `  justify-items: ${settings.justifyItems};`,
    `  align-items: ${settings.alignItems};`,
    "}",
  ].join("\n");
}
