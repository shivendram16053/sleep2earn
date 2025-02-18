import { NextRequest, NextResponse } from "next/server";
import { generateCodeVerifier, generateCodeChallenge } from "@/utils/pcke";

export async function GET(req: NextRequest) {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const redirectUrl = new URL("https://www.fitbit.com/oauth2/authorize");
  redirectUrl.searchParams.append("client_id", process.env.FITBIT_CLIENT_ID!);
  redirectUrl.searchParams.append("response_type", "code");
  redirectUrl.searchParams.append("code_challenge", codeChallenge);
  redirectUrl.searchParams.append("code_challenge_method", "S256");
  redirectUrl.searchParams.append("scope", "activity profile sleep");

  const response = NextResponse.redirect(redirectUrl.toString());
  response.cookies.set("code_verifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 300, // Expires in 5 minutes
  });

  return response;
}
