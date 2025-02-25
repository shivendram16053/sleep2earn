import prisma from "@/app/lib/db";

export async function GET() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    try {
      const refreshRes = await fetch("https://api.fitbit.com/oauth2/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(
            `${process.env.FITBIT_CLIENT_ID}:${process.env.FITBIT_CLIENT_SECRET}`
          )}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          refresh_token: user.refreshToken,
          grant_type: "refresh_token",
        }),
      });

      const newTokenData = await refreshRes.json();

      await prisma.user.update({
        where: { fitbitId: user.fitbitId },
        data: {
          accessToken: newTokenData.access_token,
          refreshToken: newTokenData.refresh_token,
        },
      });

      console.log(`✅ Token refreshed for user ${user.fitbitId}`);
    } catch (error) {
      console.error(`❌ Error refreshing token for ${user.fitbitId}`, error);
    }
  }

  return Response.json({ success: true, message: "Tokens refreshed" });
}
