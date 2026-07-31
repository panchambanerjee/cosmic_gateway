import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/admin-auth";
import { apiError } from "@/lib/content";

export async function POST(request: Request) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return Response.json({ data: { ok: true, open: true } });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be JSON.");
  }

  if (body.password !== password) {
    return apiError("UNAUTHORIZED", "Incorrect password.", undefined, 401);
  }

  const jar = await cookies();
  jar.set(COOKIE_NAME, password, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return Response.json({ data: { ok: true } });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
  return NextResponse.json({ data: { ok: true } });
}
