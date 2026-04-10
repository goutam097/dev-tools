"use client";

import dynamic from "next/dynamic";
import { ComponentType, useEffect, useState } from "react";
import { useAuthStore } from "@/lib/authStore";
import { ToolId } from "@/lib/types";
import ToolLayout from "@/components/ToolLayout";

function ToolLoading({ label }: { label: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-[var(--border)] bg-white/60 p-8 text-center text-sm text-[var(--muted)]">
      Loading {label}…
    </div>
  );
}

const loadTool = (
  importer: () => Promise<{ default: ComponentType<unknown> }>,
  label: string,
) =>
  dynamic(importer, {
    loading: () => <ToolLoading label={label} />,
    ssr: false,
  });

const toolComponents: Record<ToolId, ComponentType<unknown>> = {
  json: loadTool(() => import("./JSONFormatter"), "JSON Formatter"),
  jwt: loadTool(() => import("./JWTDecoder"), "JWT Decoder"),
  base64: loadTool(() => import("./Base64Converter"), "Base64 Converter"),
  regex: loadTool(() => import("./RegexTester"), "Regex Tester"),
  uuid: loadTool(() => import("./UUIDGenerator"), "UUID Generator"),
  markdown: loadTool(() => import("./MarkdownConverter"), "Markdown Preview"),
  gradient: loadTool(() => import("./GradientGenerator"), "Gradient Maker"),
  "image-base64": loadTool(() => import("./ImageBase64Converter"), "Image to Base64"),
  "html-formatter": loadTool(() => import("./HTMLFormatter"), "HTML Formatter"),
  history: loadTool(() => import("./HistoryView"), "History"),
};

export default function DevToolsApp() {
  const [activeTool, setActiveTool] = useState<ToolId>("json");
  const { setUser, isLoading, setIsLoading } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!mounted) return;

        if (res.ok) {
          const data = await res.json();
          setUser({ id: data.id, username: data.username });
        } else {
          setUser(null);
        }
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    void checkAuth();

    return () => {
      mounted = false;
    };
  }, [setIsLoading, setUser]);

  const ToolComponent = toolComponents[activeTool] ?? toolComponents.json;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--ink)] border-t-transparent" />
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">Initializing suite...</p>
        </div>
      </div>
    );
  }

  return (
    <ToolLayout activeTool={activeTool} onToolSelect={setActiveTool}>
      <ToolComponent />
    </ToolLayout>
  );
}
