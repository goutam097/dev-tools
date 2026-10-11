export type TypeScriptOutputStyle = "interface" | "type";

type JsonProperty = {
  name: string;
  type: JsonType;
  optional: boolean;
};

type JsonType =
  | { kind: "primitive"; value: string }
  | { kind: "array"; element: JsonType }
  | { kind: "union"; members: JsonType[] }
  | { kind: "object"; name: string; properties: JsonProperty[] };

type ObjectDeclaration = Extract<JsonType, { kind: "object" }>;

const reservedTypeNames = new Set([
  "any",
  "boolean",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "interface",
  "let",
  "module",
  "namespace",
  "new",
  "null",
  "number",
  "object",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "static",
  "string",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "type",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
]);

function toTypeName(value: string): string {
  const words = value.match(/[A-Za-z0-9]+/g) ?? [];
  const name = words.map((word) => word[0].toUpperCase() + word.slice(1)).join("");
  const safeName = name || "Root";
  const identifier = /^[A-Za-z_$]/.test(safeName) ? safeName : `Type${safeName}`;
  return reservedTypeNames.has(identifier.toLowerCase()) ? `Type${identifier}` : identifier;
}

function singularize(value: string): string {
  if (/ies$/i.test(value)) {
    return `${value.slice(0, -3)}y`;
  }
  if (/sses$/i.test(value)) {
    return value.slice(0, -2);
  }
  if (/s$/i.test(value) && !/ss$/i.test(value)) {
    return value.slice(0, -1);
  }
  return value || "Item";
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function primitiveType(value: unknown): string | null {
  if (value === null) return "null";
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "boolean";
  return null;
}

function unionOf(members: JsonType[]): JsonType {
  const distinct = new Map<string, JsonType>();
  for (const member of members) {
    const key = member.kind === "primitive" ? member.value : JSON.stringify(member);
    distinct.set(key, member);
  }
  const values = [...distinct.values()];
  if (values.length === 1) return values[0];
  return { kind: "union", members: values };
}

function buildTypeScriptTypes(value: unknown, requestedRootName: string): {
  root: JsonType;
  declarations: ObjectDeclaration[];
} {
  const usedNames = new Set<string>();
  const declarations: ObjectDeclaration[] = [];

  const allocateName = (requestedName: string): string => {
    const baseName = toTypeName(requestedName);
    let name = baseName;
    let suffix = 2;
    while (usedNames.has(name)) {
      name = `${baseName}${suffix}`;
      suffix += 1;
    }
    usedNames.add(name);
    return name;
  };

  const infer = (values: unknown[], requestedName: string): JsonType => {
    const objects = values.filter(isObject);
    const arrays = values.filter(Array.isArray);
    const primitives = values
      .map(primitiveType)
      .filter((type): type is string => type !== null);
    const members: JsonType[] = [];

    if (objects.length > 0) {
      const name = allocateName(requestedName);
      const keys = new Set(objects.flatMap((object) => Object.keys(object)));
      const properties = [...keys].map((key): JsonProperty => {
        const propertyValues = objects
          .filter((object) => Object.prototype.hasOwnProperty.call(object, key))
          .map((object) => object[key]);

        return {
          name: key,
          type: infer(propertyValues, key),
          optional: propertyValues.length < objects.length,
        };
      });
      const objectType: ObjectDeclaration = { kind: "object", name, properties };
      declarations.push(objectType);
      members.push(objectType);
    }

    if (arrays.length > 0) {
      const items = arrays.flat();
      const itemName = singularize(requestedName);
      members.push({
        kind: "array",
        element: items.length > 0 ? infer(items, itemName) : { kind: "primitive", value: "unknown" },
      });
    }

    for (const primitive of new Set(primitives)) {
      members.push({ kind: "primitive", value: primitive });
    }

    if (members.length === 0) {
      return { kind: "primitive", value: "unknown" };
    }
    return unionOf(members);
  };

  const rootName = allocateName(requestedRootName);
  if (isObject(value)) {
    usedNames.delete(rootName);
  }
  const root = infer([value], rootName);
  return { root, declarations };
}

function renderType(type: JsonType): string {
  switch (type.kind) {
    case "primitive":
      return type.value;
    case "object":
      return type.name;
    case "array": {
      const elementType = renderType(type.element);
      return type.element.kind === "union" ? `(${elementType})[]` : `${elementType}[]`;
    }
    case "union":
      return type.members.map(renderType).join(" | ");
  }
}

function renderObject(
  object: ObjectDeclaration,
  style: TypeScriptOutputStyle,
  isRoot: boolean,
): string {
  const prefix = isRoot ? "export " : "";
  const properties = object.properties
    .map(({ name, type, optional }) => {
      const propertyName = /^[A-Za-z_$][\w$]*$/.test(name) ? name : JSON.stringify(name);
      return `  ${propertyName}${optional ? "?" : ""}: ${renderType(type)};`;
    })
    .join("\n");

  if (style === "interface") {
    return `${prefix}interface ${object.name} {${properties ? `\n${properties}\n` : "\n"}}`;
  }

  return `${prefix}type ${object.name} = {${properties ? `\n${properties}\n` : "\n"  }};`;
}

export function convertJsonToTypeScript(
  value: unknown,
  rootTypeName: string,
  style: TypeScriptOutputStyle,
): string {
  const normalizedRootName = toTypeName(rootTypeName);
  const { root, declarations } = buildTypeScriptTypes(value, normalizedRootName);

  const renderedDeclarations = declarations.map((declaration) =>
    renderObject(declaration, style, declaration.name === normalizedRootName),
  );

  if (root.kind !== "object") {
    renderedDeclarations.push(`export type ${normalizedRootName} = ${renderType(root)};`);
  }

  return renderedDeclarations.join("\n\n");
}
