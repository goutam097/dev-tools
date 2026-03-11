const USERNAME_REGEX = /^[a-zA-Z0-9@_\-.]{3,64}$/;

export function validateUsername(username: unknown) {
  if (typeof username !== "string") return false;
  return USERNAME_REGEX.test(username.trim());
}

export function validatePassword(password: unknown) {
  if (typeof password !== "string") return false;
  return password.length >= 8 && password.length <= 128;
}

export function sanitizeHistoryField(value: unknown, maxLength = 20_000) {
  if (typeof value !== "string") return "";
  return value.slice(0, maxLength);
}

export function sanitizeToolType(value: unknown) {
  if (typeof value !== "string") return "unknown";
  const safe = value.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40);
  return safe || "unknown";
}
