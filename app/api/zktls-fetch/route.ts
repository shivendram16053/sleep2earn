import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import dayjs from "dayjs";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const currentDate = dayjs().format("YYYY-MM-DD");

  try {
    // 1️⃣ Fetch all users with Fitbit access tokens
    const users = await prisma.user.findMany({
      where: {
        accessToken: { not: undefined },
        fitbitId: { not: "" },
      },
      select: { id: true, fitbitId: true, accessToken: true },
    });

    if (!users.length) {
      console.log("⚠️ No users found.");
      return NextResponse.json({ success: false, message: "No users found" });
    }

    // 2️⃣ Process each user
    for (const user of users) {
      console.log(`📊 Fetching sleep data for user: ${user.fitbitId}`);

      try {
        // 3️⃣ Fetch sleep data from Fitbit API
        const fitbitResponse = await axios.get(
          `https://api.fitbit.com/1.2/user/-/sleep/date/${currentDate}.json`,
          {
            headers: {
              accept: "application/json",
              authorization: `Bearer ${user.accessToken}`,
            },
          }
        );

        const sleepData = fitbitResponse.data;
        const sleepDuration = sleepData?.summary?.totalMinutesAsleep || 0;

        // 4️⃣ Generate ZKP & reward
        const { proof, reward, isValid } = generateZKP(sleepDuration);

        // 5️⃣ Store proof & reward in Sleep model
        await prisma.sleep.create({
          data: {
            userId: user.id,
            date: currentDate,
            zkProof: proof,
            reward: reward,
            isValid: isValid,
          },
        });

        // 6️⃣ Update Total Reward
        await updateTotalReward(user.id, reward);

        console.log(`✅ Processed user ${user.fitbitId}: ${reward} tokens`);
      } catch (error) {
        console.error(
          `❌ Error processing user ${user.fitbitId}:`,
          error.message
        );
      }
    }

    console.log("✅ Sleep Data Processing Completed.");
    return NextResponse.json({
      success: true,
      message: "Sleep data processed!",
    });
  } catch (error) {
    console.error("❌ Processing Failed:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// 🔹 Function to Update Total Rewards
async function updateTotalReward(userId: string, reward: number) {
  // Find existing total rewards
  const totalRewardEntry = await prisma.totalReward.findUnique({
    where: { id: userId },
  });

  if (totalRewardEntry) {
    // If entry exists, update it
    await prisma.totalReward.update({
      where: { id: userId },
      data: { totalReward: totalRewardEntry.totalReward + reward },
    });
  } else {
    // If no entry, create a new one
    await prisma.totalReward.create({
      data: { userId, totalReward: reward },
    });
  }
}

// 🔹 Mock zkTLS-like verification function
function generateZKP(sleepDuration: number) {
  let proof = "";
  let reward = 0;
  let isValid = false;

  if (sleepDuration >= 510) {
    proof = "Proof: User slept ≥ 8.5 hrs";
    reward = 90;
    isValid = true;
  } else if (sleepDuration >= 480) {
    proof = "Proof: User slept ≥ 8 hrs";
    reward = 70;
    isValid = true;
  } else if (sleepDuration >= 450) {
    proof = "Proof: User slept ≥ 7.5 hrs";
    reward = 60;
    isValid = true;
  } else if (sleepDuration >= 420) {
    proof = "Proof: User slept ≥ 7 hrs";
    reward = 50;
    isValid = true;
  } else if (sleepDuration >= 390) {
    proof = "Proof: User slept ≥ 6.5 hrs";
    reward = 40;
    isValid = true;
  } else if (sleepDuration >= 360) {
    proof = "Proof: User slept ≥ 6 hrs";
    reward = 30;
    isValid = true;
  } else {
    proof = "Proof: Sleep duration < 6 hrs (No reward)";
    reward = 0;
    isValid = false;
  }

  return { proof, reward, isValid };
}
