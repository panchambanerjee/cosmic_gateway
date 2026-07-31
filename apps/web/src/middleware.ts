import { NextResponse, type NextRequest } from "next/server";

const COOKIE_NAME = "cg_admin_session";

function bytesToBase64Url(bytes: ArrayBuffer): string {
  const view = new Uint8Array(bytes);
  let str = "";
  for (const b of view) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeBase64Url(value: string): string {
  const padded = value + "=".repeat((4 - (value.length % 4)) % 4);
  return atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
}

async function sign(body: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  return bytesToBase64Url(sig);
}

async function verifyToken(token: string | undefined, secret: string) {
  if (!token) return false;
  const [body, signature] = token.split(".");
  if (!body || !signature) return false;
  const expected = await sign(body, secret);
  if (expected.length !== signature.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  if (mismatch !== 0) return false;
  try {
    const json = JSON.parse(decodeBase64Url(body)) as { exp?: number };
    return typeof json.exp === "number" && json.exp >= Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

function isOpenAdminMode() {
  if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") {
    return false;
  }
  const configured =
    Boolean(process.env.AUTH_SECRET?.trim()) &&
    Boolean(
      process.env.ADMIN_PASSWORD_HASH?.trim() || process.env.ADMIN_PASSWORD?.trim(),
    );
  return !configured && !process.env.ADMIN_PASSWORD?.trim();
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminApi =
    pathname.startsWith("/api/v1/admin/") && pathname !== "/api/v1/admin/login";
  const isLoginPage = pathname === "/admin/login";

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  if (isLoginPage || pathname === "/api/v1/admin/login") {
    return NextResponse.next();
  }

  if (isOpenAdminMode()) {
    return NextResponse.next();
  }

  const secret = process.env.AUTH_SECRET?.trim();
  if (!secret) {
    if (isAdminApi) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "Admin authentication required." } },
        { status: 401 },
      );
    }
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("error", "not_configured");
    return NextResponse.redirect(url);
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const ok = await verifyToken(token, secret);
  if (ok) return NextResponse.next();

  if (isAdminApi) {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Admin authentication required." } },
      { status: 401 },
    );
  }

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/v1/admin/:path*"],
};
