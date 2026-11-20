import assert from "node:assert/strict";
import { convertKrutiDevToUnicode } from "../lib/krutidev.ts";

const cases = [
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
  ["b", "ब"],
  ["B", "भ"],
  ["m", "म"],
  ["y", "य"],
  ["r", "र"],
  ["l", "ल"],
  ["v", "व"],
  ["s", "स"],
  ["h", "ह"],
  ["a", "अ"],
  ["i", "इ"],
  ["u", "उ"],
  ["f", "ि"],
  ["F", "ी"],
  ["M", "ं"],
  ["N", "ँ"],
  ["kM", "कं"],
  ["kf", "कि"],
  ["kF", "की"],
  ["rZ", "ऱ"],
  ["gk", "गक"],
  ["kq", "कु"],
  ["kQ", "कू"],
  ["n0", "न०"],
  ["3", "३"],
  ["1-2", "१-२"],
  ["k i", "क इ"],
  ["ka", "का"],
  ["kA", "का"],
  ["kh", "कह"],
  ["saj", "साज"],
  ["hari", "हारि"],
  ["krishn", "करिसहन"],
  ["q", "ु"],
];

let passCount = 0;
for (const [input, expected] of cases) {
  const actual = convertKrutiDevToUnicode(input);
  assert.equal(actual, expected, `Input: ${input} => expected ${expected}, got ${actual}`);
  passCount += 1;
}

console.log(`Kruti Dev conversion tests passed: ${passCount}/${cases.length}`);
