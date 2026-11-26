"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getAnalyticsConfig, trackPageVisit, trackToolEvent } from "@/lib/analytics";

type AnalyticsTrackerProps = {
  trackedContentPaths: string[];
};

const staticPagePaths = new Set([
  "/",
  "/tools",
  "/blog",
  "/about",
  "/author",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
  "/disclaimer",
  "/editorial-policy",
  "/content-update-policy",
  "/code-testing-policy",
]);

export default function AnalyticsTracker({ trackedContentPaths }: AnalyticsTrackerProps) {
  const pathname = usePathname();
  const lastTrackedPathRef = useRef<string | null>(null);
  const { clarityProjectId } = getAnalyticsConfig();

  useEffect(() => {
    if (!pathname || lastTrackedPathRef.current === pathname) {
      return;
    }

    lastTrackedPathRef.current = pathname;

    const isKnownContentPage = trackedContentPaths.includes(pathname);
    const isKnownToolPage = isKnownContentPage && pathname.startsWith("/tools/");

    if (isKnownContentPage || staticPagePaths.has(pathname)) {
      trackPageVisit(pathname, document.title);
    }

    if (isKnownToolPage) {
      trackToolEvent("tool_open", pathname.slice("/tools/".length), "seo-page");
    }
  }, [pathname, trackedContentPaths]);

  return (
    <>
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
