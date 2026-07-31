import { cookies } from "next/headers";

const COOKIE_NAME = "cg_admin";

export async function isAdminAuthenticated(): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    // Empty password means open admin in local development.
    return true;
  }

  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value === password;
}

export { COOKIE_NAME };
