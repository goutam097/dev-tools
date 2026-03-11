"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/lib/authStore";
import { ToolId } from "@/lib/types";
import AuthPage from "@/components/AuthPage";
import ToolLayout from "@/components/ToolLayout";
import JSONFormatter from "@/components/JSONFormatter";
import JWTDecoder from "@/components/JWTDecoder";
import Base64Converter from "@/components/Base64Converter";
import RegexTester from "@/components/RegexTester";
import UUIDGenerator from "@/components/UUIDGenerator";
import MarkdownConverter from "@/components/MarkdownConverter";
import GradientGenerator from "@/components/GradientGenerator";
import ImageBase64Converter from "@/components/ImageBase64Converter";
import HistoryView from "@/components/HistoryView";

export default function DevToolsApp() {
  const [activeTool, setActiveTool] = useState<ToolId>("json");
  const { user, setUser, isLoading, setIsLoading } = useAuthStore();

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

  const content = useMemo(() => {
    switch (activeTool) {
      case "json":
        return <JSONFormatter />;
      case "jwt":
        return <JWTDecoder />;
      case "base64":
        return <Base64Converter />;
      case "regex":
        return <RegexTester />;
      case "uuid":
        return <UUIDGenerator />;
      case "markdown":
        return <MarkdownConverter />;
      case "gradient":
        return <GradientGenerator />;
      case "image-base64":
        return <ImageBase64Converter />;
      case "history":
        return <HistoryView />;
      default:
        return <JSONFormatter />;
    }
  }, [activeTool]);

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

  if (!user) {
    return <AuthPage />;
  }

  return (
    <ToolLayout activeTool={activeTool} onToolSelect={setActiveTool}>
      {content}
    </ToolLayout>
  );
}