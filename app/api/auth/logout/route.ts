import { NextResponse } from "next/server";
import { getSessionCookieOptions } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });
  const cookieOptions = getSessionCookieOptions();

  response.cookies.set(cookieOptions.name, "", {
    httpOnly: true,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    path: cookieOptions.path,
    expires: new Date(0),
  });

  return response;
}