import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  console.log("code", code);
  const cookies = req.cookies;
  const codeVerifier = cookies.get("code_verifier")?.value;

  if (!code || !codeVerifier) {
    return NextResponse.json(
      { error: "Missing code or code_verifier" },
      { status: 400 }
    );
  }
  try {
    const tokenResponse = await axios.post(
      "https://api.fitbit.com/oauth2/token",
      `client_id=${process.env.FITBIT_CLIENT_ID}&` +
        `grant_type=authorization_code&` +
        `code=${code}&` +
        `redirect_uri=${encodeURIComponent(
          process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/callback/fitbit"
        )}&` +
        `code_verifier=${codeVerifier}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(tokenResponse);

    const { access_token, refresh_token, user_id } = tokenResponse.data;

    const response = NextResponse.redirect(
      new URL(
        `http://localhost:3000/dashboard?access_token=${access_token}&refresh_token=${refresh_token}&user_id=${user_id}`
      )
    );

    response.cookies.set("code_verifier", "", { maxAge: -1 });

    return response;
  } catch (error: any) {
    console.error(
      "Error exchanging code for tokens:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      {
        error: "Authentication failed",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
