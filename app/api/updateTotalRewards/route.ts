import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const accessToken = searchParams.get("accessToken");

    if (!accessToken) {
      return NextResponse.json(
        { message: "Access Token is required" },
        { status: 400 }
      );
    }

    // Find user by accessToken
    const user = await prisma.user.findFirst({
      where: { accessToken },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid access token" },
        { status: 401 }
      );
    }

    // Find total rewards using userId

    // Reset the total rewards to 0
    await prisma.user.updateMany({
      where: { id: user.id },
      data: { totalRewards: 0 },
    });

    return NextResponse.json({ totalReward: 0 }, { status: 200 });
  } catch (error) {
    console.error("Error fetching total rewards:", error);
    return NextResponse.json(
      { message: "Internal server error", error: String(error) },
      { status: 500 }
    );
  }
}
