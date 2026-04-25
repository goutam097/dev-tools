"use client";

import Link from "next/link";
import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  Binary,
  BookOpen,
  Code2,
  FileText,
  Fingerprint,
  Hash,
  Home,
  Image as ImageIcon,
  Menu,
  Palette,
  Terminal,
  Wrench,
  X,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type SidebarScaffoldProps = {
  title: string;
  children: ReactNode;
};

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tools", label: "All Tools", icon: Wrench },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/tools/json-formatter", label: "JSON Formatter", icon: Code2 },
  { href: "/tools/jwt-decoder", label: "JWT Decoder", icon: Terminal },
  { href: "/tools/base64-converter", label: "Base64 Converter", icon: Binary },
  { href: "/tools/regex-tester", label: "Regex Tester", icon: Hash },
  { href: "/tools/uuid-generator", label: "UUID Generator", icon: Fingerprint },
  { href: "/tools/markdown-preview", label: "Markdown Preview", icon: FileText },
  { href: "/tools/gradient-marker", label: "Gradient Marker", icon: Palette },
  { href: "/tools/image-to-base64", label: "Image to Base64", icon: ImageIcon },
];

export default function SidebarScaffold({ title, children }: SidebarScaffoldProps) {
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sidebarWidth = isDesktopSidebarOpen ? "16rem" : "5rem";
    document.documentElement.style.setProperty("--app-left-offset", sidebarWidth);

    return () => {
      document.documentElement.style.removeProperty("--app-left-offset");
    };
  }, [isDesktopSidebarOpen]);

  const sidebarWidthClass = useMemo(
    () => (isDesktopSidebarOpen ? "md:w-64" : "md:w-20"),
    [isDesktopSidebarOpen],
  );

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
          sidebarWidthClass,
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
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex w-full items-center gap-3 rounded-lg p-3 text-left text-white/65 transition hover:bg-white/10 hover:text-white"
              >
                <item.icon size={20} className="transition group-hover:scale-105" />
                {(isDesktopSidebarOpen || isMobileMenuOpen) && (
                  <span className="truncate text-sm font-medium">{item.label}</span>
                )}
              </Link>
            ))}
          </nav>
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
            <h1 className="font-serif text-xl italic md:text-2xl">{title}</h1>
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
