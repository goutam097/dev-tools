"use client";

import { useState } from "react";
import { inferJsonSchema, isJsonSchema, validateJsonSchema, validateSchemaDefinition, type SchemaValidationIssue } from "@/lib/jsonSchemaPlayground";

const sampleData = `{
  "name": "Ada Lovelace",
  "active": true,
  "scores": [10, 12],
  "profile": { "city": "London" }
}`;

const sampleSchema = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string", "minLength": 1 },
    "active": { "type": "boolean" },
    "scores": { "type": "array", "items": { "type": "integer" } },
    "profile": {
      "type": "object",
      "properties": { "city": { "type": "string" } },
      "required": ["city"]
    }
  },
  "required": ["name", "active", "scores"]
}`;

export default function JsonSchemaPlayground() {
  const [data, setData] = useState("");
  const [schemaText, setSchemaText] = useState("");
  const [issues, setIssues] = useState<SchemaValidationIssue[]>([]);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const generateSchema = () => {
    try {
      const parsed: unknown = JSON.parse(data);
      const generated = {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        ...inferJsonSchema(parsed),
      };
      setSchemaText(JSON.stringify(generated, null, 2));
      setIssues([]);
      setMessage("Schema generated from the JSON sample.");
    } catch (error) {
      setMessage(error instanceof Error ? `JSON data: ${error.message}` : "Enter valid JSON data.");
      setIssues([]);
    }
  };

  const validate = () => {
    let parsedData: unknown;
    let parsedSchema;
    try {
      parsedData = JSON.parse(data);
    } catch (error) {
      setMessage(error instanceof Error ? `JSON data: ${error.message}` : "Enter valid JSON data.");
      setIssues([]);
      return;
    }
    try {
      const schema: unknown = JSON.parse(schemaText);
      if (!isJsonSchema(schema)) throw new Error("Schema must be a JSON object.");
      const schemaErrors = validateSchemaDefinition(schema);
      if (schemaErrors.length) throw new Error(schemaErrors.join(" "));
      parsedSchema = schema;
    } catch (error) {
      setMessage(error instanceof Error ? `JSON Schema: ${error.message}` : "Enter a valid JSON Schema.");
      setIssues([]);
      return;
    }
    const validationIssues = validateJsonSchema(parsedData, parsedSchema);
    setIssues(validationIssues);
    setMessage(validationIssues.length ? `${validationIssues.length} validation issue${validationIssues.length === 1 ? "" : "s"} found.` : "Valid: JSON data matches the schema.");
  };

  const copySchema = async () => {
    try {
      await navigator.clipboard.writeText(schemaText);
      setCopied(true);
      setMessage("Schema copied to clipboard.");
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
      setMessage("Clipboard access was blocked. Select and copy the schema manually.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={generateSchema} className="tool-btn-primary">Generate schema from JSON</button>
        <button type="button" onClick={validate} className="tool-btn-secondary">Validate JSON</button>
        <button type="button" onClick={() => { setData(sampleData); setSchemaText(sampleSchema); setIssues([]); setMessage("Sample data and schema loaded."); }} className="tool-btn-secondary">Load sample</button>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <section className="space-y-3 rounded-3xl border border-(--border) bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between"><label htmlFor="schema-data" className="tool-label">JSON data</label><button type="button" onClick={() => setData("")} className="text-xs text-(--muted) underline">Clear</button></div>
          <textarea id="schema-data" value={data} onChange={(event) => setData(event.target.value)} placeholder='{"name":"Ada","active":true}' className="tool-textarea min-h-72 resize-y" spellCheck={false} />
          <p className="text-xs text-(--muted)">Paste the JSON instance to turn into a schema or validate against one.</p>
        </section>
        <section className="space-y-3 rounded-3xl border border-(--border) bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between"><label htmlFor="schema-editor" className="tool-label">JSON Schema</label><button type="button" onClick={() => void copySchema()} disabled={!schemaText} className="tool-copy-btn disabled:opacity-40">{copied ? "Copied" : "Copy schema"}</button></div>
          <textarea id="schema-editor" value={schemaText} onChange={(event) => setSchemaText(event.target.value)} placeholder={'{\n  "type": "object",\n  "properties": {}\n}'} className="tool-textarea min-h-72 resize-y" spellCheck={false} />
          <p className="text-xs text-(--muted)">Edit the schema directly. Common type, object, array, enum, composition, format, and size/value constraints are supported.</p>
        </section>
      </div>
      <section className="rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-6">
        <p className={`text-sm font-semibold ${issues.length ? "text-red-700" : "text-(--ink)"}`} role="status" aria-live="polite">{message || "Generate a schema or validate data to see results here."}</p>
        {issues.length > 0 && <ul className="mt-3 space-y-2">{issues.map((issue, index) => <li key={`${issue.path}-${index}`} className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800"><code className="font-mono font-semibold">{issue.path}</code>: {issue.message}</li>)}</ul>}
      </section>
    </div>
  );
}
