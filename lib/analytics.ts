export type ToolUsageSource = "app-shell" | "seo-page";
export type ToolAnalyticsEvent =
  | "tool_open"
  | "tool_execute"
  | "tool_copy"
  | "tool_download"
  | "tool_error";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

const configuredGaId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || process.env.NEXT_PUBLIC_GA_ID?.trim();
const GA_MEASUREMENT_ID =
  configuredGaId && /^G-[A-Z0-9]+$/i.test(configuredGaId) && !/^G-X+$/i.test(configuredGaId)
    ? configuredGaId
    : undefined;
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();

function isClient() {
  return typeof window !== "undefined";
}

function canTrackGa() {
  return isClient() && Boolean(GA_MEASUREMENT_ID) && typeof window.gtag === "function";
}

function canTrackClarity() {
  return isClient() && Boolean(CLARITY_PROJECT_ID) && typeof window.clarity === "function";
}

export function getAnalyticsConfig() {
  return {
    gaMeasurementId: GA_MEASUREMENT_ID,
    clarityProjectId: CLARITY_PROJECT_ID,
  };
}

export function trackPageVisit(path: string, title?: string) {
  if (canTrackGa()) {
    window.gtag?.("event", "page_view", {
      page_path: path.split(/[?#]/, 1)[0],
      page_title: title,
    });
  }

  if (canTrackClarity()) {
    window.clarity?.("set", "page_path", path);
  }
}

export function trackToolEvent(
  eventName: ToolAnalyticsEvent,
  toolId: string,
  source: ToolUsageSource,
) {
  if (canTrackGa()) {
    window.gtag?.("event", eventName, {
      tool_id: toolId,
      source,
    });
  }

  if (canTrackClarity()) {
    window.clarity?.("event", eventName);
    window.clarity?.("set", "tool_id", toolId);
    window.clarity?.("set", "tool_source", source);
  }
}

export function trackRelatedToolClick(sourceId: string, relatedToolId: string, source: "tool-page" | "blog-page") {
  if (canTrackGa()) {
    window.gtag?.("event", "related_tool_click", {
      source_id: sourceId,
      related_tool_id: relatedToolId,
      source,
    });
  }
}
