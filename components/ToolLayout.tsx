"use client";

import {
  Binary,
  Code2,
  FileText,
  Fingerprint,
  Hash,
  History,
  Image as ImageIcon,
  Key,
  LogOut,
  Menu,
  Palette,
  Terminal,
  User as UserIcon,
  X,
} from "lucide-react";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "@/lib/authStore";
import { ToolId } from "@/lib/types";
import { trackToolUsage } from "@/lib/analytics";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ToolLayoutProps = {
  activeTool: ToolId;
  onToolSelect: (tool: ToolId) => void;
  children: ReactNode;
};

const tools: { id: ToolId; name: string; icon: typeof Code2 }[] = [
  { id: "json", name: "JSON Formatter", icon: Code2 },
  { id: "jwt", name: "JWT Decoder", icon: Key },
  { id: "base64", name: "Base64 Converter", icon: Binary },
  { id: "regex", name: "Regex Tester", icon: Hash },
  { id: "uuid", name: "UUID Generator", icon: Fingerprint },
  { id: "markdown", name: "Markdown Preview", icon: FileText },
  { id: "gradient", name: "Gradient Maker", icon: Palette },
  { id: "image-base64", name: "Image to Base64", icon: ImageIcon },
  { id: "history", name: "History", icon: History },
];

export default function ToolLayout({ activeTool, onToolSelect, children }: ToolLayoutProps) {
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const sidebarWidth = isDesktopSidebarOpen ? "16rem" : "5rem";
    document.documentElement.style.setProperty("--app-left-offset", sidebarWidth);

    return () => {
      document.documentElement.style.removeProperty("--app-left-offset");
    };
  }, [isDesktopSidebarOpen]);

  const currentTool = useMemo(
    () => tools.find((tool) => tool.id === activeTool)?.name ?? "Dev Tool",
    [activeTool],
  );

  useEffect(() => {
    const activeToolMeta = tools.find((tool) => tool.id === activeTool);
    if (!activeToolMeta) {
      return;
    }

    trackToolUsage(activeToolMeta.id, activeToolMeta.name, "app-shell");
  }, [activeTool]);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full overflow-y-auto bg-[var(--ink)] text-[var(--bg)] transition-all duration-300 md:translate-x-0",
          isMobileMenuOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full",
          isDesktopSidebarOpen ? "md:w-64" : "md:w-20",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 p-4 md:p-6">
            {(isDesktopSidebarOpen || isMobileMenuOpen) && (
              <div className="flex items-center gap-2 font-mono text-base font-bold md:text-lg">
                <Terminal size={22} />
                <span>DEV_HUB</span>
              </div>
            )}
            <button
              type="button"
              onClick={() => setIsDesktopSidebarOpen((prev) => !prev)}
              className="hidden rounded p-1 transition hover:bg-white/10 md:inline-flex"
              aria-label="Toggle desktop sidebar"
            >
              {isDesktopSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded p-1 transition hover:bg-white/10 md:hidden"
              aria-label="Close mobile sidebar"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-2 px-3 py-4 md:py-6">
            {tools.map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => {
                  onToolSelect(tool.id);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-lg p-3 text-left transition",
                  activeTool === tool.id
                    ? "bg-[var(--bg)] text-[var(--ink)]"
                    : "text-white/65 hover:bg-white/10 hover:text-white",
                )}
              >
                <tool.icon size={20} className="transition group-hover:scale-105" />
                {(isDesktopSidebarOpen || isMobileMenuOpen) && <span className="truncate text-sm font-medium">{tool.name}</span>}
              </button>
            ))}
          </nav>

          <div className="border-t border-white/10 p-4">
            {(isDesktopSidebarOpen || isMobileMenuOpen) ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <UserIcon size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm">{user?.username}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">authenticated</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded p-2 text-red-300 transition hover:bg-red-500/20"
                  aria-label="Log out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={logout}
                className="flex w-full justify-center rounded p-3 text-red-300 transition hover:bg-red-500/20"
                aria-label="Log out"
              >
                <LogOut size={20} />
              </button>
            )}
          </div>
        </div>
      </aside>

      <main className={cn("min-h-screen transition-all duration-300", isDesktopSidebarOpen ? "md:pl-64" : "md:pl-20")}>
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--bg)] px-4 py-3 backdrop-blur md:h-20 md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex rounded-md border border-[var(--border)] p-2 md:hidden"
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>
            <h1 className="font-serif text-xl italic md:text-2xl">{currentTool}</h1>
            <span className="hidden font-mono text-xs uppercase tracking-widest text-[var(--muted)] sm:inline">v2 secure</span>
          </div>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-center font-mono text-[10px] uppercase tracking-widest text-emerald-700">
            system online
          </span>
        </header>

        <div className="mx-auto max-w-6xl p-4 sm:p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
