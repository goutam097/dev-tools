"use client";

import { useState } from "react";
import { AlertCircle, Key } from "lucide-react";
import { saveHistory } from "@/lib/clientHistory";

type DecodedToken = {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
};

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  return atob(padded);
}

export default function JWTDecoder() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<DecodedToken | null>(null);
  const [error, setError] = useState("");

  const decodeToken = async () => {
    try {
      if (!token.trim()) return;
      const parts = token.trim().split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT format");

      const header = JSON.parse(decodeBase64Url(parts[0]));
      const payload = JSON.parse(decodeBase64Url(parts[1]));

      setDecoded({ header, payload });
      setError("");
      await saveHistory("jwt", token, JSON.stringify({ header, payload }, null, 2));
    } catch (err) {
      setDecoded(null);
      setError(err instanceof Error ? err.message : "Failed to decode JWT");
    }
  };

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <label className="tool-label">Encoded Token</label>
        <div className="space-y-3">
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="tool-textarea h-52 md:h-36"
            placeholder="Paste JWT token here"
          />
          <button type="button" onClick={() => void decodeToken()} className="tool-btn-primary w-full sm:w-auto">
            <Key size={16} />
            <span>Decode</span>
          </button>
        </div>
        {error && (
          <p className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 font-mono text-xs text-red-700">
            <AlertCircle size={14} />
            <span>{error}</span>
          </p>
        )}
      </section>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="space-y-3">
          <label className="tool-label">Header</label>
          <pre className="tool-output-pre min-h-[220px]">{decoded ? JSON.stringify(decoded.header, null, 2) : "{}"}</pre>
        </section>
        <section className="space-y-3">
          <label className="tool-label">Payload</label>
          <pre className="tool-output-pre min-h-[220px]">{decoded ? JSON.stringify(decoded.payload, null, 2) : "{}"}</pre>
        </section>
      </div>
    </div>
  );
}
