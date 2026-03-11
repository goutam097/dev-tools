import { NextResponse } from "next/server";
import { getCurrentUserFromCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUserFromCookie();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json(user);
}