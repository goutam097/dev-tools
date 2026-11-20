"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackRelatedToolClick } from "@/lib/analytics";

type Props = {
  href: string;
  sourceId: string;
  relatedToolId: string;
  source: "tool-page" | "blog-page";
  className: string;
  children: ReactNode;
};

export default function TrackedRelatedToolLink({
  href,
  sourceId,
  relatedToolId,
  source,
  className,
  children,
}: Props) {
  return (
    <Link
      href={href}
      onClick={() => trackRelatedToolClick(sourceId, relatedToolId, source)}
      className={className}
    >
      {children}
    </Link>
  );
}
