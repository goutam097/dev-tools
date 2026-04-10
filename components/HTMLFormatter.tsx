"use client";

import { useState } from "react";
import { html as beautifyHtml } from "js-beautify";
import { ChevronRight, ChevronDown } from "lucide-react";

/* ================= TYPES ================= */
type NodeType = {
  type: "tag" | "text";
  name?: string;
  attributes?: Record<string, string>;
  children?: NodeType[]| any;
  content?: string;
};

/* ================= PARSER ================= */
function parseHTMLToTree(htmlString: string): NodeType[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const traverse = (node: any): NodeType | null => {
    // TEXT NODE
    if (node.nodeType === 3) {
      const text = node.textContent.trim();
      if (!text) return null;
      return { type: "text", content: text };
    }

    // ELEMENT NODE
    if (node.nodeType === 1) {
      const attrs: Record<string, string> = {};

      for (let attr of node.attributes) {
        attrs[attr.name] = attr.value;
      }

      return {
        type: "tag",
        name: node.tagName.toLowerCase(),
        attributes: attrs,
        children: Array.from(node.childNodes)
          .map(traverse)
          .filter(Boolean),
      };
    }

    return null;
  };

  return Array.from(doc.body.childNodes)
    .map(traverse)
    .filter(Boolean) as NodeType[];
}

/* ================= TREE NODE ================= */
const TreeNode = ({ node }: { node: NodeType }) => {
  const [open, setOpen] = useState(true);

  // TEXT NODE
  if (node.type === "text") {
    return (
      <div className="pl-6 text-gray-600 whitespace-pre-wrap">
        {node.content}
      </div>
    );
  }

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="pl-4">
      {/* OPEN TAG */}
      <div
        className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 px-1 rounded"
        onClick={() => hasChildren && setOpen(!open)}
      >
        {/* ICON */}
        {hasChildren ? (
          open ? (
            <ChevronDown size={14} />
          ) : (
            <ChevronRight size={14} />
          )
        ) : (
          <span className="w-[14px]" />
        )}

        {/* TAG NAME */}
        <span className="text-blue-600">&lt;{node.name}</span>

        {/* ATTRIBUTES */}
        {node.attributes &&
          Object.entries(node.attributes).map(([key, value]) => (
            <span key={key} className="ml-1">
              <span
                className={
                  key === "class"
                    ? "text-purple-500"
                    : key === "id"
                    ? "text-orange-500"
                    : "text-red-500"
                }
              >
                {key}
              </span>
              =
              <span className="text-green-600">"{value}"</span>
            </span>
          ))}

        <span className="text-blue-600">&gt;</span>
      </div>

      {/* CHILDREN */}
      {open && hasChildren && (
        <div className="ml-4 border-l pl-2">
          {node.children!.map((child:any, i:any) => (
            <TreeNode key={i} node={child} />
          ))}
        </div>
      )}

      {/* CLOSE TAG */}
      <div className="pl-6 text-blue-600">
        &lt;/{node.name}&gt;
      </div>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */
export default function HTMLFormatter() {
  const [input, setInput] = useState("");
  const [tree, setTree] = useState<NodeType[]>([]);
  const [error, setError] = useState("");

  const formatHTML = () => {
    try {
      const formatted = beautifyHtml(input, {
        indent_size: 2,
      });

      const parsedTree = parseHTMLToTree(formatted);
      setTree(parsedTree);
      setError("");
    } catch (err) {
      setError("Invalid HTML");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        HTML Formatter (Collapsible Tree)
      </h1>

      {/* INPUT */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your HTML here..."
        className="w-full h-[180px] p-3 border rounded-lg font-mono mb-4"
      />

      {/* BUTTON */}
      <button
        onClick={formatHTML}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-4 hover:bg-blue-700"
      >
        Format & Show Structure
      </button>

      {/* ERROR */}
      {error && <div className="text-red-500 mb-3">{error}</div>}

      {/* OUTPUT */}
      <div className="bg-gray-50 p-4 rounded-lg max-h-[500px] overflow-auto text-sm font-mono shadow-inner">
        {tree.length === 0 ? (
          <div className="text-gray-400">
            Structured HTML will appear here...
          </div>
        ) : (
          tree.map((node, i) => <TreeNode key={i} node={node} />)
        )}
      </div>
    </div>
  );
}