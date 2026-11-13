export type SupportedLanguage = "hindi" | "bengali" | "nepali";

export type ConversionType =
  | "kruti-dev-to-unicode"
  | "unicode-to-kruti-dev"
  | "devlys-to-unicode"
  | "unicode-to-devlys"
  | "bijoy-to-unicode"
  | "unicode-to-bijoy"
  | "preeti-to-unicode"
  | "unicode-to-preeti";

export const languageOptions: Record<SupportedLanguage, Array<{ value: ConversionType; label: string }>> = {
  hindi: [
    { value: "kruti-dev-to-unicode", label: "Kruti Dev to Unicode" },
    { value: "unicode-to-kruti-dev", label: "Unicode to Kruti Dev" },
    { value: "devlys-to-unicode", label: "Devlys to Unicode" },
    { value: "unicode-to-devlys", label: "Unicode to Devlys" },
  ],
  bengali: [
    { value: "bijoy-to-unicode", label: "Bijoy to Unicode" },
    { value: "unicode-to-bijoy", label: "Unicode to Bijoy" },
  ],
  nepali: [
    { value: "preeti-to-unicode", label: "Preeti to Unicode" },
    { value: "unicode-to-preeti", label: "Unicode to Preeti" },
  ],
};

const unicodeToKrutiDev: Record<string, string> = {
  "": "",
  अ: "a",
  आ: "A",
  इ: "i",
  ई: "I",
  उ: "u",
  ऊ: "U",
  ऋ: "R",
  ए: "e",
  ऐ: "E",
  ओ: "o",
  औ: "O",
  क: "k",
  ख: "K",
  ग: "g",
  घ: "G",
  च: "c",
  छ: "C",
  ज: "j",
  झ: "J",
  ट: "t",
  ठ: "T",
  ड: "d",
  ढ: "D",
  ण: "N",
  त: "w",
  थ: "W",
  द: "x",
  ध: "X",
  न: "n",
  प: "p",
  फ: "P",
  ब: "b",
  भ: "B",
  म: "m",
  य: "y",
  र: "r",
  ल: "l",
  व: "v",
  श: "S",
  ष: "z",
  स: "s",
  ह: "h",
  "्": "",
  "ा": "F",
  "ि": "f",
  "ु": "q",
  "ू": "Q",
  "े": "e",
  "ै": "E",
  "ो": "o",
  "ौ": "O",
  "ं": "M",
  "ः": "H",
  "ँ": "N",
  "़": "~",
  "।": ".",
  "ऽ": "~",
  "०": "0",
  "१": "1",
  "२": "2",
  "३": "3",
  "४": "4",
  "५": "5",
  "६": "6",
  "७": "7",
  "८": "8",
  "९": "9",
};

const krutiDevToUnicode: Array<[string, string]> = [
  ["aa", "आ"],
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
  ["Z", "़"],
  ["~", "़"],
  ["N", "ँ"],
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
  ["n", "न"],
  ["p", "प"],
  ["P", "फ"],
  ["b", "ब"],
  ["B", "भ"],
  ["m", "म"],
  ["y", "य"],
  ["l", "ल"],
  ["v", "व"],
  ["S", "श"],
  ["s", "स"],
  ["h", "ह"],
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
  ["/", "/"],
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
];

const devlysToUnicode: Array<[string, string]> = [
  ["क़", "क़"],
  ["क्", "क्"],
  ["क", "क"],
  ["ख", "ख"],
  ["ग", "ग"],
  ["घ", "घ"],
  ["च", "च"],
  ["छ", "छ"],
  ["ज", "ज"],
  ["झ", "झ"],
  ["ट", "ट"],
  ["ठ", "ठ"],
  ["ड", "ड"],
  ["ढ", "ढ"],
  ["त", "त"],
  ["थ", "थ"],
  ["द", "द"],
  ["ध", "ध"],
  ["न", "न"],
  ["प", "प"],
  ["फ", "फ"],
  ["ब", "ब"],
  ["भ", "भ"],
  ["म", "म"],
  ["य", "य"],
  ["र", "र"],
  ["ल", "ल"],
  ["व", "व"],
  ["श", "श"],
  ["ष", "ष"],
  ["स", "स"],
  ["ह", "ह"],
];

const bijoyToUnicode: Array<[string, string]> = [
  ["k", "ক"],
  ["K", "খ"],
  ["g", "গ"],
  ["G", "ঘ"],
  ["c", "চ"],
  ["C", "ছ"],
  ["j", "জ"],
  ["J", "ঝ"],
  ["T", "ট"],
  ["Th", "ঠ"],
  ["D", "ড"],
  ["Dh", "ঢ"],
  ["n", "ন"],
  ["t", "ত"],
  ["th", "থ"],
  ["d", "দ"],
  ["dh", "ধ"],
  ["p", "প"],
  ["ph", "ফ"],
  ["b", "ব"],
  ["bh", "ভ"],
  ["m", "ম"],
  ["r", "র"],
  ["l", "ল"],
  ["s", "স"],
  ["sh", "শ"],
  ["x", "ষ"],
  ["h", "হ"],
  ["a", "া"],
  ["i", "ি"],
  ["u", "ু"],
  ["e", "ে"],
  ["o", "ো"],
  ["A", "আ"],
  ["I", "ই"],
  ["U", "উ"],
  ["E", "এ"],
  ["O", "ও"],
  ["0", "০"],
  ["1", "১"],
  ["2", "২"],
  ["3", "৩"],
  ["4", "৪"],
  ["5", "৫"],
  ["6", "৬"],
  ["7", "৭"],
  ["8", "৮"],
  ["9", "৯"],
];

const preetiToUnicode: Array<[string, string]> = [
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
  ["n", "न"],
  ["p", "प"],
  ["P", "फ"],
  ["b", "ब"],
  ["B", "भ"],
  ["m", "म"],
  ["y", "य"],
  ["r", "र"],
  ["l", "ल"],
  ["w", "व"],
  ["s", "स"],
  ["h", "ह"],
  ["a", "ा"],
  ["i", "ि"],
  ["u", "ु"],
  ["e", "े"],
  ["o", "ो"],
  ["A", "अ"],
  ["I", "इ"],
  ["U", "उ"],
  ["E", "ए"],
  ["O", "ओ"],
];

function replaceWithDictionary(input: string, dictionary: Array<[string, string]>): string {
  if (!input) return "";
  const entries = [...dictionary].sort((left, right) => right[0].length - left[0].length);
  const pattern = new RegExp(entries.map(([value]) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g");

  return input.replace(pattern, (matched) => {
    const found = entries.find(([value]) => value === matched);
    return found ? found[1] : matched;
  });
}

function normalizeDevanagariText(value: string): string {
  return value
    .replace(/([क-ह])ा/g, "$1ा")
    .replace(/([क-ह])ि/g, "$1ि")
    .replace(/([क-ह])ु/g, "$1ु")
    .replace(/([क-ह])े/g, "$1े")
    .replace(/([क-ह])ो/g, "$1ो")
    .replace(/([क-ह])ै/g, "$1ै")
    .replace(/([क-ह])ौ/g, "$1ौ")
    .replace(/([क-ह])ऊ/g, "$1ू")
    .replace(/([क-ह])आ/g, "$1ा")
    .replace(/([क-ह])अ/g, "$1ा")
    .replace(/([क-ह])इ/g, "$1ि")
    .replace(/([क-ह])उ/g, "$1ु")
    .replace(/\s+/g, " ")
    .trim();
}

export function convertKrutiDevToUnicode(input: string): string {
  const replaced = replaceWithDictionary(input, krutiDevToUnicode);
  return normalizeDevanagariText(replaced);
}

export function convertUnicodeToKrutiDev(input: string): string {
  const values = Array.from(input).map((char) => unicodeToKrutiDev[char] ?? char).join("");
  return values.replace(/\s+/g, " ").trim();
}

export function convertDevlysToUnicode(input: string): string {
  return replaceWithDictionary(input, devlysToUnicode);
}

export function convertUnicodeToDevlys(input: string): string {
  const values = Array.from(input).map((char) => {
    const mapped = Array.from(Object.entries(unicodeToKrutiDev)).find(([key]) => key === char);
    return mapped ? mapped[1] : char;
  }).join("");

  return values.replace(/\s+/g, " ").trim();
}

export function convertBijoyToUnicode(input: string): string {
  return replaceWithDictionary(input, bijoyToUnicode);
}

export function convertUnicodeToBijoy(input: string): string {
  const map: Record<string, string> = {
    "আ": "A",
    "ই": "I",
    "উ": "U",
    "এ": "E",
    "ও": "O",
    "া": "a",
    "ি": "i",
    "ু": "u",
    "ূ": "u",
    "ে": "e",
    "ো": "o",
    "ক": "k",
    "খ": "K",
    "গ": "g",
    "ঘ": "G",
    "চ": "c",
    "ছ": "C",
    "জ": "j",
    "ঝ": "J",
    "ট": "T",
    "ঠ": "Th",
    "ড": "D",
    "ঢ": "Dh",
    "ন": "n",
    "ত": "t",
    "থ": "th",
    "দ": "d",
    "ধ": "dh",
    "প": "p",
    "ফ": "ph",
    "ব": "b",
    "ভ": "bh",
    "ম": "m",
    "র": "r",
    "ল": "l",
    "শ": "sh",
    "স": "s",
    "হ": "h",
    "ং": "M",
    "ঃ": "H",
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };

  return Array.from(input).map((char) => map[char] ?? char).join("").replace(/\s+/g, " ").trim();
}

export function convertPreetiToUnicode(input: string): string {
  return replaceWithDictionary(input, preetiToUnicode);
}

export function convertUnicodeToPreeti(input: string): string {
  const map: Record<string, string> = {
    "अ": "A",
    "आ": "A",
    "इ": "I",
    "ई": "I",
    "उ": "U",
    "ऊ": "U",
    "ए": "E",
    "ओ": "O",
    "क": "k",
    "ख": "K",
    "ग": "g",
    "घ": "G",
    "च": "c",
    "छ": "C",
    "ज": "j",
    "झ": "J",
    "ट": "t",
    "ठ": "T",
    "ड": "d",
    "ढ": "D",
    "त": "t",
    "थ": "T",
    "द": "d",
    "ध": "D",
    "न": "n",
    "प": "p",
    "फ": "P",
    "ब": "b",
    "भ": "B",
    "म": "m",
    "य": "y",
    "र": "r",
    "ल": "l",
    "व": "w",
    "श": "s",
    "स": "s",
    "ह": "h",
    "ा": "a",
    "ि": "i",
    "ु": "u",
    "ू": "u",
    "े": "e",
    "ो": "o",
    "०": "0",
    "१": "1",
    "२": "2",
    "३": "3",
    "४": "4",
    "५": "5",
    "६": "6",
    "७": "7",
    "८": "8",
    "९": "9",
  };

  return Array.from(input).map((char) => map[char] ?? char).join("").replace(/\s+/g, " ").trim();
}

export function getConversionLabel(type: ConversionType): string {
  const labels: Record<ConversionType, string> = {
    "kruti-dev-to-unicode": "Kruti Dev to Unicode",
    "unicode-to-kruti-dev": "Unicode to Kruti Dev",
    "devlys-to-unicode": "Devlys to Unicode",
    "unicode-to-devlys": "Unicode to Devlys",
    "bijoy-to-unicode": "Bijoy to Unicode",
    "unicode-to-bijoy": "Unicode to Bijoy",
    "preeti-to-unicode": "Preeti to Unicode",
    "unicode-to-preeti": "Unicode to Preeti",
  };

  return labels[type];
}

export function convertTextByType(input: string, type: ConversionType): string {
  switch (type) {
    case "kruti-dev-to-unicode":
      return convertKrutiDevToUnicode(input);
    case "unicode-to-kruti-dev":
      return convertUnicodeToKrutiDev(input);
    case "devlys-to-unicode":
      return convertDevlysToUnicode(input);
    case "unicode-to-devlys":
      return convertUnicodeToDevlys(input);
    case "bijoy-to-unicode":
      return convertBijoyToUnicode(input);
    case "unicode-to-bijoy":
      return convertUnicodeToBijoy(input);
    case "preeti-to-unicode":
      return convertPreetiToUnicode(input);
    case "unicode-to-preeti":
      return convertUnicodeToPreeti(input);
    default:
      return input;
  }
}

export function getLanguageFromType(type: ConversionType): SupportedLanguage {
  if (type.includes("bijoy")) return "bengali";
  if (type.includes("preeti")) return "nepali";
  return "hindi";
}

export function getNextConversionType(type: ConversionType): ConversionType {
  const mapping: Record<ConversionType, ConversionType> = {
    "kruti-dev-to-unicode": "unicode-to-kruti-dev",
    "unicode-to-kruti-dev": "kruti-dev-to-unicode",
    "devlys-to-unicode": "unicode-to-devlys",
    "unicode-to-devlys": "devlys-to-unicode",
    "bijoy-to-unicode": "unicode-to-bijoy",
    "unicode-to-bijoy": "bijoy-to-unicode",
    "preeti-to-unicode": "unicode-to-preeti",
    "unicode-to-preeti": "preeti-to-unicode",
  };

  return mapping[type] ?? type;
}
