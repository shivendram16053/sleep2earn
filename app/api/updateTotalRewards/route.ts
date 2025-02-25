import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const accessToken = searchParams.get("accessToken");

        if (!accessToken) {
            return NextResponse.json({ message: "Access Token is required" }, { status: 400 });
        }

        // Find user by accessToken
        const user = await prisma.user.findFirst({
            where: { accessToken },
            select: { id: true },
        });

        if (!user) {
            return NextResponse.json({ message: "Invalid access token" }, { status: 401 });
        }

        // Find total rewards using userId
        const totalRewards = await prisma.totalReward.findFirst({
            where: { userId: user.id },
            select: { totalReward: true },
        });

        const rewardAmount = totalRewards?.totalReward ?? 0;

        // Reset the total rewards to 0
        await prisma.totalReward.updateMany({
            where: { userId: user.id },
            data: { totalReward: 0 },
        });

        return NextResponse.json({ totalReward: rewardAmount }, { status: 200 });

    } catch (error) {
        console.error("Error fetching total rewards:", error);
        return NextResponse.json({ message: "Internal server error", error: String(error) }, { status: 500 });
    }
}
