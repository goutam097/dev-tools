"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { getAnalyticsConfig, trackPageVisit, trackToolUsage, trackUserLocation } from "@/lib/analytics";
import { toolCatalogBySlug } from "@/lib/toolCatalog";

type LocationApiResponse = {
  country?: string | null;
  region?: string | null;
  city?: string | null;
};

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPathRef = useRef<string | null>(null);
  const hasTrackedLocationRef = useRef(false);
  const { gaMeasurementId, clarityProjectId } = getAnalyticsConfig();

  useEffect(() => {
    const query = searchParams.toString();
    const fullPath = query ? `${pathname}?${query}` : pathname;

    if (!fullPath || lastTrackedPathRef.current === fullPath) {
      return;
    }

    trackPageVisit(fullPath, document.title);
    lastTrackedPathRef.current = fullPath;

    const toolSlug = pathname.startsWith("/tools/") ? pathname.replace("/tools/", "") : "";
    const tool = toolCatalogBySlug[toolSlug];
    if (tool) {
      trackToolUsage(tool.slug, tool.title, "seo-page");
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    if (hasTrackedLocationRef.current) {
      return;
    }

    hasTrackedLocationRef.current = true;

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || null;
    const locale = navigator.language || null;

    const track = async () => {
      try {
        const response = await fetch("/api/analytics/location", { cache: "no-store" });
        if (!response.ok) {
          trackUserLocation({ timezone, locale });
          return;
        }

        const data = (await response.json()) as LocationApiResponse;
        trackUserLocation({
          country: data.country,
          region: data.region,
          city: data.city,
          timezone,
          locale,
        });
      } catch {
        trackUserLocation({ timezone, locale });
      }
    };

    void track();
  }, []);

  return (
    <>
      {gaMeasurementId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', { send_page_view: false });
            `}
          </Script>
        </>
      ) : null}

      {clarityProjectId ? (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityProjectId}");
          `}
        </Script>
      ) : null}
    </>
  );
}
