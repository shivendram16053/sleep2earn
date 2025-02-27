"use client"

import { useEffect, useState } from "react";
import { ArrowUpRight, RefreshCcw } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { Loader } from "lucide-react";

interface UserInfo {
    sleepData?: { date: string; reward: number }[];
}

export function EarningsChart({ userInfo }: { userInfo: UserInfo }) {
    const [chartData, setChartData] = useState<{ date: string; value: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userInfo) {
            setTimeout(() => {
                const sleepData = userInfo.sleepData || [];
                console.log("Sleep Data", sleepData);
                const latestDate = sleepData.length > 0 ? dayjs(sleepData[sleepData.length - 1].date, "YYYY-MM-DD") : dayjs();
                const startDate = latestDate.subtract(12, "day");

                const dateRange = Array.from({ length: 13 }, (_, i) => {
                    const date = startDate.add(i, "day").format("YYYY-MM-DD");
                    return { date, value: 0 };
                });

                sleepData.forEach((entry: { date: string; reward: number }) => {
                    const index = dateRange.findIndex((d) => d.date === entry.date);
                    if (index !== -1) {
                        dateRange[index].value = entry.reward;
                    }
                });

                setChartData(dateRange);



                setLoading(false);
            }, 5000);
        }
    }, [userInfo]);

    if (loading) {
        return <div className="flex items-center justify-center h-[300px] w-full">
            <Loader className="animate-spin" />
        </div>;
    }

    return (
        <div className="bg-black/20 backdrop-blur-sm p-4 md:p-6 rounded-[20px] border border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-2">
                    <ArrowUpRight className="h-5 w-5 text-white/70" />
                    <h2 className="text-lg md:text-xl text-white/90 font-semibold">
                        Earnings Statistics
                    </h2>
                </div>
                {/* <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-purple-600/50 text-white border-white/10 hover:bg-purple-500/50"
                >
                    <RefreshCcw className="h-4 w-4" />
                    Refresh
                </Button> */}
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 0, right: 0, left: -15, bottom: 0 }}>
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "rgba(255,255,255,0.6)" }}
                            tickMargin={8}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "rgba(255,255,255,0.6)" }}
                            tickFormatter={(value) => `${value >= 1000 ? (value / 1000).toFixed(1) + "K" : value}`}
                            domain={[0, 110]}
                            tickCount={9}
                        />
                        <Bar dataKey="value" fill="rgba(168,85,247,0.5)" radius={[4, 4, 4, 4]} maxBarSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span className="text-sm text-white/60">Lazy Earnings</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border border-purple-500" />
                    <span className="text-sm text-white/60">Referrals</span>
                </div>

            </div>
        </div>
    );
}
