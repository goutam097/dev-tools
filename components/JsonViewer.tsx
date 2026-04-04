"use client";

import { useState } from "react";

type Props = {
  data: any;
  level?: number;
};

export default function JsonViewer({ data, level = 0 }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const isObject = typeof data === "object" && data !== null;

  if (!isObject) {
    return (
      <span className="text-emerald-400">
        {typeof data === "string" ? `"${data}"` : String(data)}
      </span>
    );
  }

  const isArray = Array.isArray(data);
  const entries = isArray ? data : Object.entries(data);

  return (
    <div className="font-mono text-sm" style={{ paddingLeft: level * 14 }}>
      {/* Toggle */}
      <div
        className="flex items-center gap-2 cursor-pointer hover:bg-white/5 px-1 rounded"
        onClick={() => setCollapsed(!collapsed)}
      >
        <span className="text-gray-400">
          {collapsed ? "▶" : "▼"}
        </span>

        <span className="text-blue-400">
          {isArray ? "[" : "{"}
        </span>

        <span className="text-xs text-gray-500">
          {isArray
            ? `${entries.length} items`
            : `${entries.length} keys`}
        </span>
      </div>

      {/* Content */}
      {!collapsed && (
        <div className="mt-1">
          {entries.map((item: any, index: number) => {
            const key = isArray ? index : item[0];
            const value = isArray ? item : item[1];

            return (
              <div
                key={index}
                className="flex items-start hover:bg-white/5 px-1 rounded"
              >
                {!isArray && (
                  <span className="text-purple-400 mr-2">
                    "{key}":
                  </span>
                )}

                <JsonViewer data={value} level={level + 1} />
              </div>
            );
          })}
        </div>
      )}

      {/* Closing */}
      <div className="text-blue-400">
        {isArray ? "]" : "}"}
      </div>
    </div>
  );
}