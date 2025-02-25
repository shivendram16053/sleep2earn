import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/lib/db";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  console.log("Received code:", code);
  const cookies = req.cookies;
  const codeVerifier = cookies.get("code_verifier")?.value;
  console.log("Received code_verifier:", codeVerifier);

  if (!code || !codeVerifier) {
    console.error("Missing code or code_verifier");
    return NextResponse.json(
      { error: "Missing code or code_verifier" },
      { status: 400 }
    );
  }

  try {
    console.log("Requesting token from Fitbit API...");
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
    console.log("Token response received:", tokenResponse.data);

    const { access_token, refresh_token, user_id } = tokenResponse.data;

    try {
      console.log("Upserting user in the database...");
      const user = await prisma.user.upsert({
        where: { fitbitId: user_id },
        create: { fitbitId: user_id, refreshToken: refresh_token, accessToken: access_token },
        update: { accessToken: access_token },
      });
      console.log("User upserted:", user);

      const response = NextResponse.redirect(
        new URL(
          `http://localhost:3000/dashboard?access_token=${access_token}&refresh_token=${refresh_token}&user_id=${user_id}`
        )
      );

      response.cookies.set("code_verifier", "", { maxAge: -1 });
      console.log("Redirecting to dashboard...");

      return response;
    } catch (dbError: any) {
      console.error("Error upserting user in the database:", dbError.message);
      return NextResponse.json(
        {
          error: "Database operation failed",
          details: dbError.message,
        },
        { status: 500 }
      );
    }
  } catch (apiError: any) {
    console.error(
      "Error exchanging code for tokens:",
      apiError.response?.data || apiError.message
    );
    return NextResponse.json(
      {
        error: "Authentication failed",
        details: apiError.response?.data || apiError.message,
      },
      { status: 500 }
    );
  }
}
