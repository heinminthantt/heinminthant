import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";

const COOKIE_NAME = "hmt_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? "dev-only-insecure-secret";
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  return safeEqual(input, expected);
}

export function createSessionToken(): { value: string; maxAge: number } {
  const exp = Date.now() + SESSION_TTL_MS;
  return { value: `${exp}.${sign(String(exp))}`, maxAge: SESSION_TTL_MS / 1000 };
}

function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot === -1) return false;
  const exp = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^\d+$/.test(exp)) return false;
  if (Number(exp) < Date.now()) return false;
  return safeEqual(sig, sign(exp));
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(COOKIE_NAME)?.value);
}

export async function setSessionCookie(): Promise<void> {
  const store = await cookies();
  const { value, maxAge } = createSessionToken();
  // Only mark Secure when actually served over HTTPS, otherwise browsers
  // silently drop the cookie on http:// (LAN IPs, previews) and login
  // appears to never stick.
  let secure = false;
  try {
    const h = await headers();
    const proto =
      h.get("x-forwarded-proto") ?? (h.get("origin") ?? "").split("://")[0];
    secure = proto === "https";
  } catch {
    secure = process.env.NODE_ENV === "production";
  }
  store.set(COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
