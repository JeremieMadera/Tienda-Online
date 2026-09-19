import { randomBytes, createHash } from "node:crypto";

 export function generateSessionToken() {
  const token = randomBytes(32).toString("hex");
  return token;
}

export function hashSessionToken(token: string) {
  const hashed = createHash("sha256").update(token).digest("hex");
  return hashed;
}