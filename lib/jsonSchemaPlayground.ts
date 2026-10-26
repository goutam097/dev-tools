export type JsonSchema = {
  type?: string | string[];
  properties?: Record<string, JsonSchema>;
  required?: string[];
  items?: JsonSchema;
  enum?: unknown[];
  const?: unknown;
  additionalProperties?: boolean;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  minItems?: number;
  maxItems?: number;
  minProperties?: number;
  maxProperties?: number;
  pattern?: string;
  format?: string;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  anyOf?: JsonSchema[];
  oneOf?: JsonSchema[];
  allOf?: JsonSchema[];
  not?: JsonSchema;
  [key: string]: unknown;
};

export type SchemaValidationIssue = { path: string; message: string };

export function isJsonSchema(value: unknown): value is JsonSchema {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function validateSchemaDefinition(value: unknown): string[] {
  const errors: string[] = [];
  const unsupportedKeywords = [
    "$ref",
    "$dynamicRef",
    "$recursiveRef",
    "dependentRequired",
    "dependentSchemas",
    "dependencies",
    "if",
    "then",
    "else",
    "multipleOf",
    "patternProperties",
    "prefixItems",
    "contains",
    "minContains",
    "maxContains",
    "propertyNames",
    "unevaluatedItems",
    "unevaluatedProperties",
    "additionalItems",
    "contentEncoding",
    "contentMediaType",
    "contentSchema",
  ];
  const visit = (current: unknown, path: string) => {
    if (!isJsonSchema(current)) {
      errors.push(`${path} must be a schema object.`);
      return;
    }
    for (const keyword of unsupportedKeywords) {
      if (Object.hasOwn(current, keyword)) {
        errors.push(`${path}.${keyword} is not supported by this playground.`);
      }
    }
    if (current.type !== undefined &&
      !(typeof current.type === "string" || (Array.isArray(current.type) && current.type.every((type) => typeof type === "string")))) {
      errors.push(`${path}.type must be a string or an array of strings.`);
    }
    const types = typeof current.type === "string"
      ? [current.type]
      : Array.isArray(current.type) ? current.type : [];
    if (types.some((type) => !["null", "boolean", "object", "array", "number", "integer", "string"].includes(type))) {
      errors.push(`${path}.type contains an unsupported JSON Schema type.`);
    }
    if (current.required !== undefined &&
      (!Array.isArray(current.required) || current.required.some((key) => typeof key !== "string"))) {
      errors.push(`${path}.required must be an array of property names.`);
    }
    if (current.enum !== undefined && !Array.isArray(current.enum)) errors.push(`${path}.enum must be an array.`);
    if (current.properties !== undefined && !isJsonSchema(current.properties)) {
      errors.push(`${path}.properties must be an object of property schemas.`);
    } else if (isJsonSchema(current.properties)) {
      for (const [key, schema] of Object.entries(current.properties)) visit(schema, `${path}.properties.${key}`);
    }
    if (current.items !== undefined) visit(current.items, `${path}.items`);
    if (current.additionalProperties !== undefined &&
      typeof current.additionalProperties !== "boolean" && !isJsonSchema(current.additionalProperties)) {
      errors.push(`${path}.additionalProperties must be a boolean or schema object.`);
    } else if (isJsonSchema(current.additionalProperties)) {
      visit(current.additionalProperties, `${path}.additionalProperties`);
    }
    for (const keyword of ["anyOf", "oneOf", "allOf"] as const) {
      const alternatives = current[keyword];
      if (alternatives !== undefined && !Array.isArray(alternatives)) {
        errors.push(`${path}.${keyword} must be an array of schema objects.`);
      } else if (Array.isArray(alternatives)) {
        alternatives.forEach((schema, index) => visit(schema, `${path}.${keyword}[${index}]`));
      }
    }
    if (current.not !== undefined) visit(current.not, `${path}.not`);
    if (current.pattern !== undefined && typeof current.pattern !== "string") errors.push(`${path}.pattern must be a string.`);
    if (typeof current.pattern === "string") {
      try {
        new RegExp(current.pattern);
      } catch {
        errors.push(`${path}.pattern must be a valid regular expression.`);
      }
    }
    if (current.format !== undefined && typeof current.format !== "string") errors.push(`${path}.format must be a string.`);
  };
  visit(value, "$schema");
  return errors;
}

function valueType(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value === "number") return Number.isInteger(value) ? "integer" : "number";
  return typeof value;
}

export function inferJsonSchema(value: unknown): JsonSchema {
  if (value === null) return { type: "null" };
  if (Array.isArray(value)) {
    const itemSchemas = value.map(inferJsonSchema);
    const first = itemSchemas[0];
    const identical = first && itemSchemas.every((item) => JSON.stringify(item) === JSON.stringify(first));
    return { type: "array", items: identical ? first : { anyOf: itemSchemas.length ? itemSchemas : [{}] } };
  }
  if (typeof value === "object") {
    const entries = Object.entries(value);
    return {
      type: "object",
      properties: Object.fromEntries(entries.map(([key, item]) => [key, inferJsonSchema(item)])),
      required: entries.map(([key]) => key),
      additionalProperties: false,
    };
  }
  return { type: valueType(value) };
}

function sameJsonValue(left: unknown, right: unknown): boolean {
  if (left === right) return true;
  if (left === null || right === null || typeof left !== "object" || typeof right !== "object") return false;
  if (Array.isArray(left) !== Array.isArray(right)) return false;
  const leftEntries = Object.entries(left);
  const rightEntries = Object.entries(right);
  return leftEntries.length === rightEntries.length &&
    leftEntries.every(([key, value]) => Object.hasOwn(right, key) && sameJsonValue(value, (right as Record<string, unknown>)[key]));
}

function matchesType(value: unknown, type: string): boolean {
  const actual = valueType(value);
  if (type === "number") return actual === "number" || actual === "integer";
  if (type === "integer") return actual === "integer";
  return actual === type;
}

export function validateJsonSchema(value: unknown, schema: JsonSchema): SchemaValidationIssue[] {
  const issues: SchemaValidationIssue[] = [];
  const visit = (current: unknown, currentSchema: JsonSchema, path: string) => {
    const types = currentSchema.type === undefined
      ? []
      : Array.isArray(currentSchema.type) ? currentSchema.type : [currentSchema.type];
    if (types.length && !types.some((type) => matchesType(current, type))) {
      issues.push({ path, message: `Expected ${types.join(" or ")}, received ${valueType(current)}.` });
      return;
    }
    if ("const" in currentSchema && !sameJsonValue(current, currentSchema.const)) {
      issues.push({ path, message: `Value must equal ${JSON.stringify(currentSchema.const)}.` });
    }
    if (currentSchema.enum && !currentSchema.enum.some((item) => sameJsonValue(item, current))) {
      issues.push({ path, message: `Value must be one of: ${currentSchema.enum.map((item) => JSON.stringify(item)).join(", ")}.` });
    }
    if (Array.isArray(currentSchema.anyOf) && !currentSchema.anyOf.some((alternative) => validateJsonSchema(current, alternative).length === 0)) {
      issues.push({ path, message: "Value must match at least one allowed schema." });
    }
    if (Array.isArray(currentSchema.oneOf) && currentSchema.oneOf.filter((alternative) => validateJsonSchema(current, alternative).length === 0).length !== 1) {
      issues.push({ path, message: "Value must match exactly one allowed schema." });
    }
    if (Array.isArray(currentSchema.allOf)) {
      currentSchema.allOf.forEach((schema) => visit(current, schema, path));
    }
    if (isJsonSchema(currentSchema.not) && validateJsonSchema(current, currentSchema.not).length === 0) {
      issues.push({ path, message: "Value must not match the excluded schema." });
    }
    if (typeof current === "string") {
      const characterCount = Array.from(current).length;
      if (typeof currentSchema.minLength === "number" && characterCount < currentSchema.minLength) {
        issues.push({ path, message: `Must contain at least ${currentSchema.minLength} characters.` });
      }
      if (typeof currentSchema.maxLength === "number" && characterCount > currentSchema.maxLength) {
        issues.push({ path, message: `Must contain no more than ${currentSchema.maxLength} characters.` });
      }
      if (typeof currentSchema.pattern === "string") {
        try {
          if (!new RegExp(currentSchema.pattern).test(current)) issues.push({ path, message: `Must match pattern ${currentSchema.pattern}.` });
        } catch {
          issues.push({ path, message: "Schema contains an invalid regular expression pattern." });
        }
      }
      if (typeof currentSchema.format === "string" && !matchesFormat(current, currentSchema.format)) {
        issues.push({ path, message: `Must use the ${currentSchema.format} format.` });
      }
    }
    if (typeof current === "number") {
      if (typeof currentSchema.minimum === "number" && current < currentSchema.minimum) issues.push({ path, message: `Must be at least ${currentSchema.minimum}.` });
      if (typeof currentSchema.maximum === "number" && current > currentSchema.maximum) issues.push({ path, message: `Must be no greater than ${currentSchema.maximum}.` });
      if (typeof currentSchema.exclusiveMinimum === "number" && current <= currentSchema.exclusiveMinimum) issues.push({ path, message: `Must be greater than ${currentSchema.exclusiveMinimum}.` });
      if (typeof currentSchema.exclusiveMaximum === "number" && current >= currentSchema.exclusiveMaximum) issues.push({ path, message: `Must be less than ${currentSchema.exclusiveMaximum}.` });
    }
    if (Array.isArray(current)) {
      if (typeof currentSchema.minItems === "number" && current.length < currentSchema.minItems) issues.push({ path, message: `Must contain at least ${currentSchema.minItems} items.` });
      if (typeof currentSchema.maxItems === "number" && current.length > currentSchema.maxItems) issues.push({ path, message: `Must contain no more than ${currentSchema.maxItems} items.` });
      if (currentSchema.uniqueItems === true && current.some((item, index) => current.slice(0, index).some((prior) => sameJsonValue(prior, item)))) {
        issues.push({ path, message: "Array items must be unique." });
      }
      const itemSchema = currentSchema.items;
      if (isJsonSchema(itemSchema)) {
        current.forEach((item, index) => visit(item, itemSchema, `${path}[${index}]`));
      }
    }
    if (current !== null && typeof current === "object" && !Array.isArray(current)) {
      const object = current as Record<string, unknown>;
      const properties = currentSchema.properties ?? {};
      if (typeof currentSchema.minProperties === "number" && Object.keys(object).length < currentSchema.minProperties) {
        issues.push({ path, message: `Must contain at least ${currentSchema.minProperties} properties.` });
      }
      if (typeof currentSchema.maxProperties === "number" && Object.keys(object).length > currentSchema.maxProperties) {
        issues.push({ path, message: `Must contain no more than ${currentSchema.maxProperties} properties.` });
      }
      for (const required of currentSchema.required ?? []) {
        if (!Object.hasOwn(object, required)) issues.push({ path: `${path}.${required}`, message: "Required property is missing." });
      }
      for (const [key, child] of Object.entries(object)) {
        if (Object.hasOwn(properties, key) && isJsonSchema(properties[key])) visit(child, properties[key], `${path}.${key}`);
        else if (currentSchema.additionalProperties === false) issues.push({ path: `${path}.${key}`, message: "Additional property is not allowed." });
        else if (isJsonSchema(currentSchema.additionalProperties)) visit(child, currentSchema.additionalProperties, `${path}.${key}`);
      }
    }
  };
  visit(value, schema, "$");
  return issues;
}

function matchesFormat(value: string, format: string): boolean {
  if (format === "date-time") {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) &&
      isValidDate(value.slice(0, 10)) &&
      !Number.isNaN(Date.parse(value));
  }
  if (format === "date") {
    return isValidDate(value);
  }
  if (format === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (format === "uri" || format === "url") {
    try {
      return Boolean(new URL(value).protocol);
    } catch {
      return false;
    }
  }
  return true;
}

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}
