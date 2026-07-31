import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  COOKIE_NAME,
  createSessionToken,
  isOpenAdminMode,
  isAdminAuthConfigured,
  sessionCookieOptions,
  verifyAdminCredentials,
} from "@/lib/admin-auth";
import { apiError } from "@/lib/content";

export async function POST(request: Request) {
  if (isOpenAdminMode()) {
    return Response.json({ data: { ok: true, open: true } });
  }

  if (!isAdminAuthConfigured()) {
    return apiError(
      "AUTH_NOT_CONFIGURED",
      "Set AUTH_SECRET and ADMIN_PASSWORD_HASH (or ADMIN_PASSWORD) before using admin login.",
      undefined,
      503,
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be JSON.");
  }

  const username = body.username?.trim() || "admin";
  const password = body.password ?? "";
  if (!password || !(await verifyAdminCredentials(username, password))) {
    return apiError("UNAUTHORIZED", "Incorrect username or password.", undefined, 401);
  }

  const secret = process.env.AUTH_SECRET!.trim();
  const token = createSessionToken(username, secret);
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, sessionCookieOptions());

  return Response.json({ data: { ok: true } });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
  return NextResponse.json({ data: { ok: true } });
}
