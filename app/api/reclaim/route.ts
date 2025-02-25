import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { ReclaimClient } = await import("@reclaimprotocol/zk-fetch");

    const client = new ReclaimClient(
      "0x17B09Ae615bA6c57036131aD2E52a3BecF37667d",
      "0x8f00accd0eced969da84c5bfd9a213bc27d9c7833d526b7ed165b168df82ca40"
    );

    const date = "2024-02-02";
    if (!date)
      return NextResponse.json(
        { error: "Missing date in headers" },
        { status: 400 }
      );

    const fitbitUrl = `https://api.fitbit.com/1.2/user/-/sleep/date/${date}.json`;

    const publicOptions = {
      method: "GET",
      headers: { accept: "application/json" },
    };
    const privateOptions = {
      headers: {
        authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1E3RjkiLCJzdWIiOiJDSDU3NE4iLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyYWN0IHJwcm8gcnNsZSIsImV4cCI6MTc0MDQzMzYyMSwiaWF0IjoxNzQwNDA0ODIxfQ.ALue7iIXo4ZIQzpFbBCv5O_FdSrlLcM0dfmo5ebQi2s`,
      },
      responseMatches: [
        {
          type: "regex" as "regex",
          value: '"totalMinutesAsleep":(?<totalMinutesAsleep>.*?)',
        },
      ],
      responseRedactions: [{ jsonPath: "$.summary.totalMinutesAsleep" }],
    };

    const proof = await client.zkFetch(
      fitbitUrl,
      publicOptions,
      privateOptions
    );
    return NextResponse.json({ proof });
  } catch (error) {
    console.error("Error fetching proof:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
