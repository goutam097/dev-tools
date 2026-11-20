export type KrutiDevRule = [pattern: string, replacement: string];

export const KRUTIDEV_TO_UNICODE_RULES: KrutiDevRule[] = [
  ["aa", "आ"],
  ["ii", "ई"],
  ["uu", "ऊ"],
  ["ai", "ऐ"],
  ["au", "औ"],
  ["ee", "ई"],
  ["oo", "ओ"],
  ["A", "आ"],
  ["I", "ई"],
  ["U", "ऊ"],
  ["E", "ए"],
  ["O", "ओ"],
  ["f", "ि"],
  ["F", "ी"],
  ["q", "ु"],
  ["Q", "ू"],
  ["r", "र"],
  ["R", "ऋ"],
  ["M", "ं"],
  ["H", "ः"],
  ["~", "़"],
  ["`", "़"],
  ["Z", "़"],
  ["N", "ँ"],
  ["w", "त"],
  ["W", "थ"],
  ["x", "द"],
  ["X", "ध"],
  ["b", "ब"],
  ["B", "भ"],
  ["m", "म"],
  ["k", "क"],
  ["K", "ख"],
  ["g", "ग"],
  ["G", "घ"],
  ["c", "च"],
  ["C", "छ"],
  ["j", "ज"],
  ["J", "झ"],
  ["t", "ट"],
  ["T", "ठ"],
  ["d", "ड"],
  ["D", "ढ"],
  ["p", "प"],
  ["P", "फ"],
  ["s", "स"],
  ["S", "श"],
  ["l", "ल"],
  ["L", "ळ"],
  ["y", "य"],
  ["Y", "य"],
  ["v", "व"],
  ["h", "ह"],
  ["n", "न"],
  ["a", "अ"],
  ["i", "इ"],
  ["u", "उ"],
  ["e", "ए"],
  ["o", "ओ"],
  ["0", "०"],
  ["1", "१"],
  ["2", "२"],
  ["3", "३"],
  ["4", "४"],
  ["5", "५"],
  ["6", "६"],
  ["7", "७"],
  ["8", "८"],
  ["9", "९"],
  [".", "।"],
  ["-", "-"],
  [";", ";"],
  [":", ":"],
  [",", ","],
  ["?", "?"],
  ["!", "!"],
  ["(", "("],
  [")", ")"],
  ["[", "["],
  ["]", "]"],
  ["{", "{"],
  ["}", "}"],
  ["/", "/"],
  ["\u0027", "\u0027"],
  ["\"", "\""]
];

const KRUTIDEV_RULES_SORTED = [...KRUTIDEV_TO_UNICODE_RULES].sort(
  (left, right) => right[0].length - left[0].length,
);

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function normalizeKrutiDevOutput(value: string) {
  const consonants = "कखगघचछजझञटठडढणतथदधनपफबभमयरलळवशषसह";
  let nextValue = value ?? "";

  nextValue = nextValue
    .replace(new RegExp(`([${consonants}])अ`, "g"), "$1ा")
    .replace(new RegExp(`([${consonants}])इ`, "g"), "$1ि")
    .replace(new RegExp(`([${consonants}])उ`, "g"), "$1ु")
    .replace(new RegExp(`([${consonants}])ए`, "g"), "$1े")
    .replace(new RegExp(`([${consonants}])ओ`, "g"), "$1ो")
    .replace(new RegExp(`([${consonants}])ऐ`, "g"), "$1ै")
    .replace(new RegExp(`([${consonants}])औ`, "g"), "$1ौ")
    .replace(new RegExp(`([${consonants}])आ`, "g"), "$1ा")
    .replace(new RegExp(`([${consonants}])ई`, "g"), "$1ी")
    .replace(new RegExp(`([${consonants}])ऊ`, "g"), "$1ू")
    .replace(new RegExp(`([${consonants}])ऋ`, "g"), "$1ृ");

  return nextValue.replace(/\s+/g, " ").trim();
}

export function convertKrutiDevToUnicode(input: string): string {
  if (!input) {
    return "";
  }

  const escaped = KRUTIDEV_RULES_SORTED.map(([pattern]) => escapeRegExp(pattern)).join("|");
  const pattern = new RegExp(escaped, "g");

  const converted = input.replace(pattern, (match) => {
    const mapping = KRUTIDEV_RULES_SORTED.find(([patternValue]) => patternValue === match);
    return mapping ? mapping[1] : match;
  });

  return normalizeKrutiDevOutput(converted);
}
