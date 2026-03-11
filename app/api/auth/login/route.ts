import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookieOptions, signSession } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { checkRateLimit } from "@/lib/rateLimit";
import { validatePassword, validateUsername } from "@/lib/validation";

export const runtime = "nodejs";

type DbUser = {
  _id: { toString: () => string };
  username: string;
  passwordHash: string;
};

export async function POST(req: NextRequest) {
  const rl = checkRateLimit(req, "login", 20, 60_000);
  if (!rl.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { username, password } = (body as { username?: unknown; password?: unknown }) || {};

  if (!validateUsername(username) || !validatePassword(password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  try {
    const normalizedUsername = String(username).trim();
    const db = await getDb();
    const user = (await db
      .collection<DbUser>("users")
      .findOne({ username: normalizedUsername })) as DbUser | null;

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(String(password), user.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const userId = user._id.toString();
    const sessionToken = signSession({ id: userId, username: user.username });
    const response = NextResponse.json({ id: userId, username: user.username });
    const cookieOptions = getSessionCookieOptions();

    response.cookies.set(cookieOptions.name, sessionToken, {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
      maxAge: cookieOptions.maxAge,
    });

    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes("MONGODB_URI is not set")) {
      return NextResponse.json(
        { error: "Database is not configured. Set MONGODB_URI in your environment." },
        { status: 503 },
      );
    }

    return NextResponse.json({ error: "Login service unavailable" }, { status: 500 });
  }
}
