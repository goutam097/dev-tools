export type TimestampUnit = "seconds" | "milliseconds";
export type DateTimeZone = "local" | "utc";

export type TimestampConversion = {
  date: Date;
  localDateTime: string;
  utcDateTime: string;
  iso: string;
  timeZone: string;
  unixSeconds: string;
  unixMilliseconds: number;
};

const MAX_DATE_MILLISECONDS = 8.64e15;
const DATE_TIME_PATTERN =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?$/;

function buildDateTime(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  millisecond: number,
  zone: DateTimeZone,
): Date {
  const date = new Date(0);

  if (zone === "utc") {
    date.setUTCFullYear(year, month - 1, day);
    date.setUTCHours(hour, minute, second, millisecond);
  } else {
    date.setFullYear(year, month - 1, day);
    date.setHours(hour, minute, second, millisecond);
  }

  const actual = zone === "utc"
    ? [
        date.getUTCFullYear(),
        date.getUTCMonth() + 1,
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds(),
      ]
    : [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
      ];

  if (
    !Number.isFinite(date.getTime()) ||
    actual.some((value, index) =>
      value !== [year, month, day, hour, minute, second, millisecond][index],
    )
  ) {
    throw new Error(
      zone === "local"
        ? "That local date and time does not exist, often because of a daylight-saving clock change."
        : "Enter a valid UTC date and time.",
    );
  }

  return date;
}

function toConversion(date: Date): TimestampConversion {
  const timestamp = date.getTime();

  if (!Number.isFinite(timestamp)) {
    throw new Error("The date is outside the supported timestamp range.");
  }

  return {
    date,
    localDateTime: new Intl.DateTimeFormat(undefined, {
      dateStyle: "full",
      timeStyle: "long",
    }).format(date),
    utcDateTime: new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "UTC",
    }).format(date),
    iso: date.toISOString(),
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    unixSeconds: String(timestamp / 1000),
    unixMilliseconds: timestamp,
  };
}

export function convertTimestamp(
  value: string,
  unit: TimestampUnit,
): TimestampConversion {
  const trimmed = value.trim();
  if (!trimmed || !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(trimmed)) {
    throw new Error("Enter a valid numeric Unix timestamp.");
  }

  const numericValue = Number(trimmed);
  const milliseconds =
    unit === "seconds" ? numericValue * 1000 : numericValue;

  if (
    !Number.isFinite(milliseconds) ||
    Math.abs(milliseconds) > MAX_DATE_MILLISECONDS
  ) {
    throw new Error("This timestamp is outside the supported date range.");
  }

  const date = new Date(Math.trunc(milliseconds));
  if (!Number.isFinite(date.getTime())) {
    throw new Error("This timestamp is not a valid date.");
  }

  return toConversion(date);
}

export function convertDateTime(
  value: string,
  zone: DateTimeZone,
): TimestampConversion {
  const match = DATE_TIME_PATTERN.exec(value);
  if (!match) {
    throw new Error("Choose a valid date and time.");
  }

  const [
    ,
    yearText,
    monthText,
    dayText,
    hourText,
    minuteText,
    secondText = "0",
    fractionText = "",
  ] = match;
  const parts = [
    Number(yearText),
    Number(monthText),
    Number(dayText),
    Number(hourText),
    Number(minuteText),
    Number(secondText),
    Number(fractionText.padEnd(3, "0")),
  ];
  const [year, month, day, hour, minute, second, millisecond] = parts;

  if (
    year < 1 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    hour > 23 ||
    minute > 59 ||
    second > 59
  ) {
    throw new Error("Enter a valid calendar date and time.");
  }

  return toConversion(
    buildDateTime(
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond,
      zone,
    ),
  );
}

export function formatLocalDateTimeInput(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
