import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { MongoServerError } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { checkRateLimit } from "@/lib/rateLimit";
import { validatePassword, validateUsername } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const rl = checkRateLimit(req, "register", 10, 60_000);
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
    return NextResponse.json(
      { error: "Username or password does not meet policy requirements" },
      { status: 400 },
    );
  }

  const normalizedUsername = String(username).trim();
  const passwordHash = await bcrypt.hash(String(password), 12);

  try {
    const db = await getDb();
    const result = await db.collection("users").insertOne({
      username: normalizedUsername,
      passwordHash,
      created_at: new Date(),
    });

    return NextResponse.json(
      { id: result.insertedId.toString(), username: normalizedUsername },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return NextResponse.json({ error: "Username is already taken" }, { status: 409 });
    }

    if (error instanceof Error && error.message.includes("MONGODB_URI is not set")) {
      return NextResponse.json(
        { error: "Database is not configured. Set MONGODB_URI in your environment." },
        { status: 503 },
      );
    }

    return NextResponse.json({ error: "Could not create account" }, { status: 500 });
  }
}
