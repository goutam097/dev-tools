export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.webcodeveloper.co.in";

export const SITE_NAME = "DevTools Hub";
export const SITE_BRAND = "WebCodeveloper";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.svg`;
