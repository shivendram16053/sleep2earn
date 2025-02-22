"use client"

import { ArrowUpRight, RefreshCcw } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const data = [
    { date: "27 Jan", value: 1700 },
    { date: "28 Jan", value: 2000 },
    { date: "29 Jan", value: 2100 },
    { date: "30 Jan", value: 2100 },
    { date: "31 Jan", value: 2200 },
    { date: "1 Feb", value: 3200 },
    { date: "2 Feb", value: 2200 },
    { date: "3 Feb", value: 2100 },
    { date: "4 Feb", value: 1400 },
    { date: "5 Feb", value: 2700 },
    { date: "6 Feb", value: 1500 },
    { date: "7 Feb", value: 1900 },
    { date: "8 Feb", value: 1700 },
    { date: "9 Feb", value: 2300 },
    { date: "10 Feb", value: 1500 },
    { date: "11 Feb", value: 344 },
    { date: "12 Feb", value: 274 },
    { date: "13 Feb", value: 664 },
    { date: "14 Feb", value: 570 },
    { date: "15 Feb", value: 1000 },
    { date: "16 Feb", value: 1800 },
    { date: "17 Feb", value: 2000 },
    { date: "18 Feb", value: 2400 },
    { date: "19 Feb", value: 2700 },
    { date: "20 Feb", value: 2000 },
]

export function EarningsChart() {
    return (
        <Card className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-2">
                    <ArrowUpRight className="h-5 w-5 text-gray-500" />
                    <h2 className="text-lg md:text-xl text-gray-500 font-semibold">Earnings Statistics</h2>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                    <RefreshCcw className="h-4 w-4" />
                    Refresh
                </Button>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 0, right: 0, left: -15, bottom: 0 }}>
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12 }}
                            tickMargin={8}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => `${value >= 1000 ? (value / 1000).toFixed(1) + "K" : value}`}
                        />
                        <Bar dataKey="value" fill="#1E3A8A" radius={[4, 4, 4, 4]} maxBarSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#1E3A8A]" />
                    <span className="text-sm text-muted-foreground">Lazy Earnings</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border border-[#1E3A8A]" />
                    <span className="text-sm text-muted-foreground">Referrals</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#1E3A8A]" />
                    <span className="text-sm text-muted-foreground">Rank Achievements</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border border-[#1E3A8A]" />
                    <span className="text-sm text-muted-foreground">Referral Bonus</span>
                </div>
            </div>
        </Card>
    )
}

