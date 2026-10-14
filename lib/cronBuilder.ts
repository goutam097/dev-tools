export type CronFieldName = "minute" | "hour" | "day" | "month" | "weekday";

const fieldBounds: Record<CronFieldName, [number, number]> = {
  minute: [0, 59],
  hour: [0, 23],
  day: [1, 31],
  month: [1, 12],
  weekday: [0, 7],
};

const fieldLabels: Record<CronFieldName, string> = {
  minute: "minute",
  hour: "hour",
  day: "day of month",
  month: "month",
  weekday: "day of week",
};

export function validateCronField(value: string, field: CronFieldName): string | null {
  const [minimum, maximum] = fieldBounds[field];
  const validNumber = (part: string) => {
    if (!/^\d+$/.test(part)) return false;
    const number = Number(part);
    return number >= minimum && number <= maximum;
  };

  for (const item of value.split(",")) {
    if (!item) return `Enter a value for ${fieldLabels[field]}.`;
    const [rangeOrValue, step, ...extra] = item.split("/");
    if (extra.length || (step !== undefined && (!/^\d+$/.test(step) || Number(step) < 1))) {
      return `Use a positive step value, such as */5, for ${fieldLabels[field]}.`;
    }
    if (rangeOrValue === "*") continue;
    const range = rangeOrValue.split("-");
    if (range.length === 1 && validNumber(range[0])) continue;
    if (range.length === 2 && validNumber(range[0]) && validNumber(range[1]) && Number(range[0]) <= Number(range[1])) continue;
    return `${fieldLabels[field]} must use numbers from ${minimum} to ${maximum}, or a valid list, range, or step.`;
  }
  return null;
}

function explainField(value: string, label: string): string {
  if (value === "*") return `every ${label}`;
  const every = value.match(/^\*\/(\d+)$/);
  if (every) return `every ${every[1]} ${label}${every[1] === "1" ? "" : "s"}`;
  return `${label}${label === "minute" || label === "hour" ? " " : " on "}${value}`;
}

export function describeCron(fields: string[]): string {
  const [minute, hour, day, month, weekday] = fields;
  if (day === "*" && month === "*" && weekday === "*") {
    if (minute === "*" && hour === "*") return "Runs every minute.";
    if (hour === "*" && minute.startsWith("*/")) return `Runs ${explainField(minute, "minute")}.`;
    if (minute === "*" && hour !== "*") return `Runs every minute during hour ${hour} each day.`;
    if (minute !== "*" && hour === "*") return `Runs at minute ${minute} of every hour.`;
    if (minute !== "*" && hour !== "*") return `Runs at ${hour.padStart(2, "0")}:${minute.padStart(2, "0")} every day.`;
  }
  return `Runs at ${explainField(minute, "minute")}, ${explainField(hour, "hour")}, on day ${day} of month ${month}, and weekday ${weekday}.`;
}

export const cronPresets = {
  everyMinute: ["*", "*", "*", "*", "*"],
  everyFiveMinutes: ["*/5", "*", "*", "*", "*"],
  hourly: ["0", "*", "*", "*", "*"],
  daily: ["0", "9", "*", "*", "*"],
  weekdays: ["0", "9", "*", "*", "1-5"],
  weekly: ["0", "9", "*", "*", "1"],
  monthly: ["0", "9", "1", "*", "*"],
} as const;
