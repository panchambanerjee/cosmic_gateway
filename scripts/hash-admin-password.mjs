#!/usr/bin/env node
/**
 * Generate ADMIN_PASSWORD_HASH for .env / Vercel.
 * Usage: node scripts/hash-admin-password.mjs "your-password"
 */
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv.slice(2).find((arg) => arg !== "--");
if (!password) {
  console.error('Usage: pnpm hash-admin-password -- "your-password"');
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);
const stored = `scrypt$${salt.toString("base64url")}$${hash.toString("base64url")}`;

console.log("Add to your environment:\n");
console.log(`ADMIN_PASSWORD_HASH="${stored}"`);
console.log(`AUTH_SECRET="${randomBytes(32).toString("base64url")}"`);
console.log('ADMIN_USERNAME="admin"');
