export type TargetSizeUnit = "KB" | "MB";

export const TARGET_SIZE_PRESETS: Record<TargetSizeUnit, number[]> = {
  KB: [
    10, 50, 100, 150, 200, 250, 300, 350, 400, 450,
    500, 550, 600, 650, 700, 750, 800, 850, 900, 950,
  ],
  MB: Array.from({ length: 19 }, (_, index) => 1 + index * 0.5),
};

export function targetSizeToBytes(value: number, unit: TargetSizeUnit) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error("Enter a target size greater than zero.");
  }
  return Math.round(value * (unit === "MB" ? 1024 * 1024 : 1024));
}
