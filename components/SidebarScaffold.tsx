"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  Binary,
  Braces,
  BookOpen,
  Code2,
  FileText,
  Fingerprint,
  Hash,
  Home,
  Image as ImageIcon,
  Link2,
  Menu,
  Palette,
  Terminal,
  Wrench,
  CalendarClock,
  FileSpreadsheet,
  Grid2X2,
  Tags,
  X,
  ChevronDown,
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
  { href: "/image-pdf-tools", label: "Image & PDF Tools Suite", icon: Wrench },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/tools/json-formatter", label: "JSON Formatter", icon: Code2 },
  { href: "/tools/json-to-typescript", label: "JSON to TypeScript", icon: Braces },
  { href: "/tools/url-encoder-decoder", label: "URL Encoder / Decoder", icon: Link2 },
  { href: "/tools/jwt-decoder", label: "JWT Decoder", icon: Terminal },
  { href: "/tools/base64-converter", label: "Base64 Converter", icon: Binary },
  { href: "/tools/regex-tester", label: "Regex Tester", icon: Hash },
  { href: "/tools/uuid-generator", label: "UUID Generator", icon: Fingerprint },
  { href: "/tools/markdown-preview", label: "Markdown Preview", icon: FileText },
  { href: "/tools/gradient-marker", label: "Gradient Marker", icon: Palette },
  { href: "/tools/image-to-base64", label: "Image to Base64", icon: ImageIcon },
  { href: "/tools/csv-data-cleaner", label: "CSV Data Cleaner", icon: FileSpreadsheet },
  { href: "/tools/cron-expression-builder", label: "Cron Expression Builder", icon: CalendarClock },
  { href: "/tools/json-schema-playground", label: "JSON Schema Playground", icon: Braces },
  { href: "/tools/css-grid-generator", label: "CSS Grid Generator", icon: Grid2X2 },
  { href: "/tools/meta-tag-generator", label: "Meta Tag Generator", icon: Tags },
];

const suiteHeaderLinks = [
  { href: "/image-tools/image-resizer", label: "Image Resizer" },
  { href: "/image-tools/image-compressor", label: "Compressor" },
  { href: "/image-tools/image-converter", label: "Converter" },
];

const suiteMoreGroups = [
  {
    label: "Resize",
    links: [
      { href: "/image-tools/image-resizer-to-kb", label: "Resize Image To KB" },
      { href: "/image-tools/image-resizer-for-social-media", label: "Resize For Social Media" },
      { href: "/image-tools/image-resizer-to-pixels", label: "Resize Image To Pixels" },
    ],
  },
  {
    label: "PDF",
    links: [
      { href: "/pdf-tools/merge-pdf", label: "Merge PDF" },
      { href: "/pdf-tools/split-pdf", label: "Split PDF" },
      { href: "/pdf-tools/rotate-pdf", label: "Rotate PDF" },
      { href: "/pdf-tools/jpg-to-pdf", label: "JPG To PDF" },
    ],
  },
  {
    label: "Compress",
    links: [
      { href: "/image-tools/compress-jpg", label: "Compress JPG" },
      { href: "/image-tools/compress-png", label: "Compress PNG" },
      { href: "/image-tools/compress-webp", label: "Compress WebP" },
      { href: "/image-tools/compress-image-to-100kb", label: "Compress Image To 100KB" },
      { href: "/image-tools/compress-image-to-50kb", label: "Compress Image To 50KB" },
      { href: "/image-tools/resize-image-to-500-kb", label: "Resize Image To 500KB" },
      { href: "/image-tools/bulk-image-compressor", label: "Bulk Image Compressor" },
    ],
  },
  {
    label: "Convert",
    links: [
      { href: "/image-tools/jpg-to-png", label: "JPG To PNG" },
      { href: "/image-tools/png-to-jpg", label: "PNG To JPG" },
      { href: "/image-tools/jpg-to-webp", label: "JPG To WebP" },
      { href: "/image-tools/png-to-webp", label: "PNG To WebP" },
      { href: "/image-tools/webp-to-jpg", label: "WebP To JPG" },
      { href: "/image-tools/webp-to-png", label: "WebP To PNG" },
    ],
  },
];

export default function SidebarScaffold({ title, children }: SidebarScaffoldProps) {
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const pathname = usePathname();
  const isSuitePage =
    pathname === "/image-pdf-tools" ||
    pathname.startsWith("/image-tools") ||
    pathname.startsWith("/pdf-tools");

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
    <div className="min-h-screen bg-(--bg) text-(--ink)">
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
          "fixed left-0 top-0 z-50 h-full overflow-y-auto bg-(--ink) text-(--bg) transition-all duration-300 md:translate-x-0",
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
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b border-(--border) bg-(--bg) px-4 py-3 backdrop-blur md:h-20 md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex rounded-md border border-(--border) p-2 md:hidden"
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>
            <p className="font-serif text-xl italic md:text-2xl">{title}</p>
          </div>
          {isSuitePage && (
            <nav aria-label="Image and PDF tools" className="relative hidden items-center gap-1 md:flex">
              {suiteHeaderLinks.map((item) => {
                const isActive =
                  (item.href === "/image-tools/image-resizer" && pathname.startsWith("/image-tools/image-resizer")) ||
                  (item.href === "/image-tools/image-compressor" && (pathname === "/image-tools/image-compressor" || pathname.startsWith("/image-tools/compress-") || pathname.includes("bulk-image-compressor"))) ||
                  (item.href === "/image-tools/image-converter" && (pathname === "/image-tools/image-converter" || pathname.includes("-to-") || pathname.includes("webp-to-")));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium transition",
                      isActive ? "border-b-2 border-(--ink) text-(--ink)" : "text-(--muted) hover:bg-white hover:text-(--ink)",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={() => setIsMoreOpen((open) => !open)}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-(--muted) transition hover:bg-white hover:text-(--ink)"
                aria-expanded={isMoreOpen}
              >
                More Tools <ChevronDown size={14} className={isMoreOpen ? "rotate-180 transition" : "transition"} />
              </button>
              {isMoreOpen && (
                <div className="absolute right-0 top-full mt-2 max-h-[70vh] w-80 overflow-y-auto rounded-2xl border border-(--border) bg-white p-2 shadow-xl">
                  {suiteMoreGroups.map((group) => (
                    <div key={group.label} className="border-b border-(--border) py-2 last:border-b-0">
                      <p className="px-3 pb-1 font-mono text-[10px] uppercase tracking-widest text-(--muted)">
                        {group.label}
                      </p>
                      {group.links.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMoreOpen(false)}
                          className="block rounded-xl px-3 py-2 text-sm text-(--ink) transition hover:bg-slate-50"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </nav>
          )}
        </header>

        <div className="mx-auto max-w-6xl p-4 sm:p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
