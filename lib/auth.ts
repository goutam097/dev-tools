import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface JwtPayload {
  id: string;
  username: string;
}

const JWT_COOKIE_NAME = "devtools_session";
const JWT_TTL_SECONDS = 60 * 60 * 24;

function resolveJwtSecret() {
  const envSecret = process.env.JWT_SECRET;
  if (envSecret && envSecret.length >= 32) {
    return envSecret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET must be set to a value with at least 32 characters in production");
  }

  return "dev-only-change-me-super-secret-key-1234567890";
}

const jwtSecret = resolveJwtSecret();

export function signSession(payload: JwtPayload) {
  return jwt.sign(payload, jwtSecret, {
    algorithm: "HS256",
    expiresIn: JWT_TTL_SECONDS,
    issuer: "dev-tools-hub",
    audience: "dev-tools-hub-users",
  });
}

export function verifySession(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, jwtSecret, {
      issuer: "dev-tools-hub",
      audience: "dev-tools-hub-users",
      algorithms: ["HS256"],
    });

    if (typeof decoded === "object" && decoded && "id" in decoded && "username" in decoded) {
      return {
        id: String(decoded.id),
        username: String(decoded.username),
      };
    }

    return null;
  } catch {
    return null;
  }
}

export async function getCurrentUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get(JWT_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export function getSessionCookieOptions() {
  return {
    name: JWT_COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: JWT_TTL_SECONDS,
  };
}

export { JWT_COOKIE_NAME };
