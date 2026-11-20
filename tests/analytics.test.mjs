import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const Module = require("node:module");
const fs = require("node:fs");
const root = path.resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadAnalyticsModule() {
  const filename = path.join(root, "lib", "analytics.ts");
  const compiledSource = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const compiledModule = new Module(filename, null);
  compiledModule.filename = filename;
  compiledModule.paths = Module._nodeModulePaths(dirname(filename));
  compiledModule._compile(compiledSource, filename);
  return compiledModule.exports;
}

test("GA4 events contain only tool metadata and page visits omit query strings", () => {
  const previousMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const previousLegacyId = process.env.NEXT_PUBLIC_GA_ID;
  const previousWindow = globalThis.window;
  const calls = [];
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST123";
  delete process.env.NEXT_PUBLIC_GA_ID;
  globalThis.window = {
    gtag: (...args) => calls.push(args),
  };

  try {
    const analytics = loadAnalyticsModule();
    const privateValue = "fake-jwt-value-do-not-send";
    analytics.trackToolEvent("tool_open", "jwt-decoder", "seo-page");
    analytics.trackToolEvent("tool_execute", "jwt-decoder", "seo-page", privateValue);
    analytics.trackToolEvent("tool_copy", "jwt-decoder", "seo-page");
    analytics.trackToolEvent("tool_download", "csv-data-cleaner", "seo-page");
    analytics.trackToolEvent("tool_error", "jwt-decoder", "seo-page");
    analytics.trackRelatedToolClick("what-is-base64", "base64-converter", "blog-page");
    analytics.trackPageVisit(`/tools/jwt-decoder?token=${privateValue}`, "JWT Decoder");

    assert.deepEqual(calls, [
      ["event", "tool_open", { tool_id: "jwt-decoder", source: "seo-page" }],
      ["event", "tool_execute", { tool_id: "jwt-decoder", source: "seo-page" }],
      ["event", "tool_copy", { tool_id: "jwt-decoder", source: "seo-page" }],
      ["event", "tool_download", { tool_id: "csv-data-cleaner", source: "seo-page" }],
      ["event", "tool_error", { tool_id: "jwt-decoder", source: "seo-page" }],
      ["event", "related_tool_click", {
        source_id: "what-is-base64",
        related_tool_id: "base64-converter",
        source: "blog-page",
      }],
      ["event", "page_view", { page_path: "/tools/jwt-decoder", page_title: "JWT Decoder" }],
    ]);
    assert.ok(!JSON.stringify(calls).includes(privateValue));
  } finally {
    if (previousMeasurementId === undefined) delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    else process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = previousMeasurementId;
    if (previousLegacyId === undefined) delete process.env.NEXT_PUBLIC_GA_ID;
    else process.env.NEXT_PUBLIC_GA_ID = previousLegacyId;
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});
