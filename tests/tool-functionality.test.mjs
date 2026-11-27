import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = path.resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadTypeScriptModule(relativePath) {
  const filename = path.join(root, relativePath);
  const source = require("node:fs").readFileSync(filename, "utf8");
  const compiledSource = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const Module = require("node:module");
  const compiledModule = new Module(filename, null);
  compiledModule.filename = filename;
  compiledModule.paths = Module._nodeModulePaths(dirname(filename));
  compiledModule._compile(compiledSource, filename);
  return compiledModule.exports;
}

const { cleanCsv, parseCsv, stringifyCsv } = loadTypeScriptModule("lib/csvCleaner.ts");
const { convertDateTime, convertTimestamp } = loadTypeScriptModule("lib/timestampConverter.ts");
const { TARGET_SIZE_PRESETS, targetSizeToBytes } = loadTypeScriptModule("lib/image/targetSize.ts");

test("CSV cleaning handles BOM, CRLF, escaped quotes, whitespace, duplicates, and empty values", () => {
  const csv = '\uFEFFname,notes\r\nAda,"Hello, ""world"""\r\n Ada ,"Hello, ""world"""\r\nGrace,\r\n,\r\n';
  const result = cleanCsv(csv, { hasHeader: true, missingValue: "(missing)" });

  assert.deepEqual(result.headers, ["name", "notes"]);
  assert.deepEqual(result.rows, [
    ["Ada", 'Hello, "world"'],
    ["Grace", "(missing)"],
  ]);
  assert.equal(result.duplicatesRemoved, 1);
  assert.equal(result.emptyRowsRemoved, 1);
  assert.equal(result.missingValuesFilled, 1);
  assert.ok(result.whitespaceTrimmed > 0);
});

test("CSV parsing rejects malformed quoting and exports escaped cells", () => {
  assert.throws(() => parseCsv('name,note\nAda,"not closed'), /not closed/);
  assert.throws(() => parseCsv('name,note\nAda,sa"id'), /quote inside an unquoted field/);
  assert.equal(stringifyCsv(["name", "note"], [["Ada", 'said "hello", then left']]), 'name,note\r\nAda,"said ""hello"", then left"');
});

test("timestamp conversion supports seconds, milliseconds, UTC dates, and invalid input errors", () => {
  assert.equal(convertTimestamp("1700000000", "seconds").iso, "2023-11-14T22:13:20.000Z");
  assert.equal(convertTimestamp("1700000000000", "milliseconds").iso, "2023-11-14T22:13:20.000Z");
  assert.equal(convertDateTime("2023-11-14T22:13:20", "utc").unixMilliseconds, 1700000000000);
  assert.throws(() => convertTimestamp("not-a-timestamp", "seconds"), /numeric Unix timestamp/);
});

test("image target-size presets cover requested KB and MB ranges", () => {
  assert.deepEqual(TARGET_SIZE_PRESETS.KB, [
    10, 50, 100, 150, 200, 250, 300, 350, 400, 450,
    500, 550, 600, 650, 700, 750, 800, 850, 900, 950,
  ]);
  assert.deepEqual(TARGET_SIZE_PRESETS.MB, [
    1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5,
    6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10,
  ]);
  assert.equal(targetSizeToBytes(500, "KB"), 512000);
  assert.equal(targetSizeToBytes(1.5, "MB"), 1572864);
  assert.throws(() => targetSizeToBytes(0, "KB"), /greater than zero/);
});
