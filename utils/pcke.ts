// utils/pkce.ts
import crypto from "crypto";

export function generateCodeVerifier(): string {
  return base64URLEncode(crypto.randomBytes(32));
}

export function generateCodeChallenge(codeVerifier: string): string {
  return base64URLEncode(sha256(codeVerifier));
}

function sha256(buffer: string): Buffer {
  return crypto.createHash("sha256").update(buffer).digest();
}

function base64URLEncode(buffer: Buffer | string): string {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
