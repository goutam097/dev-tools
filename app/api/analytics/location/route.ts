import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function fromHeader(req: NextRequest, key: string): string | null {
  const value = req.headers.get(key);
  if (!value) {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

export async function GET(req: NextRequest) {
  const country =
    fromHeader(req, "x-vercel-ip-country") ??
    fromHeader(req, "cf-ipcountry") ??
    fromHeader(req, "x-country-code");

  const region = fromHeader(req, "x-vercel-ip-country-region") ?? fromHeader(req, "x-region");
  const city = fromHeader(req, "x-vercel-ip-city") ?? fromHeader(req, "x-city");

  return NextResponse.json({
    country,
    region,
    city,
  });
}
