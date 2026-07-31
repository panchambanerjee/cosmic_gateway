import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const COOKIE_NAME = "cg_admin_session";

const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

type SessionPayload = {
  u: string;
  exp: number;
};

function isProduction() {
  return process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";
}

function getAuthSecret(): string | null {
  return process.env.AUTH_SECRET?.trim() || null;
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(
    getAuthSecret() &&
      (process.env.ADMIN_PASSWORD_HASH?.trim() || process.env.ADMIN_PASSWORD?.trim()),
  );
}

/** Local-only open admin when no credentials configured. */
export function isOpenAdminMode(): boolean {
  if (isProduction()) return false;
  return !isAdminAuthConfigured() && !process.env.ADMIN_PASSWORD?.trim();
}

export function adminWritesAllowed(): boolean {
  if (
    process.env.VERCEL_ENV === "preview" &&
    process.env.ALLOW_ADMIN_WRITES_ON_PREVIEW !== "true"
  ) {
    return false;
  }
  return true;
}

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function createSessionToken(username: string, secret: string): string {
  const payload: SessionPayload = {
    u: username,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${body}.${sign(body, secret)}`;
}

export function verifySessionToken(
  token: string | undefined,
  secret: string,
): SessionPayload | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = sign(body, secret);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as SessionPayload;
    if (!payload.u || !payload.exp) return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Format: scrypt$saltBase64$urlSafeHashBase64 */
export function hashPassword(password: string, salt?: Buffer): string {
  const usedSalt = salt ?? randomBytes(16);
  const hash = scryptSync(password, usedSalt, 64);
  return `scrypt$${usedSalt.toString("base64url")}$${hash.toString("base64url")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  if (stored.startsWith("scrypt$")) {
    const [, saltB64, hashB64] = stored.split("$");
    if (!saltB64 || !hashB64) return false;
    const salt = Buffer.from(saltB64, "base64url");
    const expected = Buffer.from(hashB64, "base64url");
    const actual = scryptSync(password, salt, expected.length);
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  }

  // Legacy plaintext ADMIN_PASSWORD comparison (local only)
  const a = Buffer.from(password);
  const b = Buffer.from(stored);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function verifyAdminCredentials(
  username: string,
  password: string,
): Promise<boolean> {
  const expectedUser = process.env.ADMIN_USERNAME?.trim() || "admin";
  if (username !== expectedUser) return false;

  const hash = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (hash) return verifyPassword(password, hash);

  const legacy = process.env.ADMIN_PASSWORD?.trim();
  if (legacy) return verifyPassword(password, legacy);

  return false;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  if (isOpenAdminMode()) return true;

  const secret = getAuthSecret();
  if (!secret) return false;

  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  return Boolean(verifySessionToken(token, secret));
}

export async function requireAdminAuth(): Promise<
  { ok: true } | { ok: false; response: Response }
> {
  if (!(await isAdminAuthenticated())) {
    return {
      ok: false,
      response: Response.json(
        { error: { code: "UNAUTHORIZED", message: "Admin authentication required." } },
        { status: 401 },
      ),
    };
  }
  return { ok: true };
}

/** Auth + preview write gate for mutating admin APIs. */
export async function requireAdminWrite(): Promise<
  { ok: true } | { ok: false; response: Response }
> {
  const auth = await requireAdminAuth();
  if (!auth.ok) return auth;
  if (!adminWritesAllowed()) {
    return {
      ok: false,
      response: Response.json(
        {
          error: {
            code: "PREVIEW_WRITES_DISABLED",
            message:
              "Admin writes are disabled on preview deployments. Set ALLOW_ADMIN_WRITES_ON_PREVIEW=true to override.",
          },
        },
        { status: 403 },
      ),
    };
  }
  return { ok: true };
}

/** @deprecated Prefer requireAdminAuth / requireAdminWrite */
export async function requireAdmin() {
  return requireAdminWrite();
}

export function sessionCookieOptions() {
  return {
    httpOnly: true as const,
    sameSite: "lax" as const,
    secure: isProduction(),
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}
