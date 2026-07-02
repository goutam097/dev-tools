"use client";

import { useEffect } from "react";

type AdSenseSlotProps = {
  slot: string;
  format?: string;
  responsive?: string;
};

export default function AdSenseSlot({ slot, format = "auto", responsive = "true" }: AdSenseSlotProps) {
  useEffect(() => {
    try {
      const adsWindow = window as Window & { adsbygoogle?: Array<Record<string, unknown>> };
      if (adsWindow.adsbygoogle) {
        adsWindow.adsbygoogle.push({});
      }
    } catch {
      // Ignore ad initialization issues during prerendering or blocked environments.
    }
  }, []);

  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-(--border) bg-white p-4 shadow-sm">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-(--muted)">Advertisement</p>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client="ca-pub-4344677734190475"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </section>
  );
}
