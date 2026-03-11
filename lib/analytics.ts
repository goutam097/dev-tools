export type ToolUsageSource = "app-shell" | "seo-page";

export type LocationPayload = {
  country?: string | null;
  region?: string | null;
  city?: string | null;
  timezone?: string | null;
  locale?: string | null;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
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
      page_path: path,
      page_title: title,
    });
  }

  if (canTrackClarity()) {
    window.clarity?.("set", "page_path", path);
  }
}

export function trackToolUsage(toolId: string, toolName: string, source: ToolUsageSource) {
  if (canTrackGa()) {
    window.gtag?.("event", "tool_usage", {
      tool_id: toolId,
      tool_name: toolName,
      source,
    });
  }

  if (canTrackClarity()) {
    window.clarity?.("event", "tool_usage");
    window.clarity?.("set", "tool_id", toolId);
    window.clarity?.("set", "tool_name", toolName);
    window.clarity?.("set", "tool_source", source);
  }
}

export function trackUserLocation(payload: LocationPayload) {
  const normalizedPayload: LocationPayload = {
    country: payload.country ?? null,
    region: payload.region ?? null,
    city: payload.city ?? null,
    timezone: payload.timezone ?? null,
    locale: payload.locale ?? null,
  };

  if (canTrackGa()) {
    window.gtag?.("set", "user_properties", normalizedPayload);
    window.gtag?.("event", "user_location", normalizedPayload);
  }

  if (canTrackClarity()) {
    Object.entries(normalizedPayload).forEach(([key, value]) => {
      if (!value) return;
      window.clarity?.("set", key, value);
    });
  }
}
