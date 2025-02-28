"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "@/components/dashboard-ui/Sidebar"
import { Header } from "@/components/dashboard-ui/Header"
import { WelcomeBanner } from "@/components/dashboard-ui/Welcome"
import { EarningsSection } from "@/components/dashboard-ui/Earning-section"
import { EarningsChart } from "@/components/dashboard-ui/Earning-chart"
import { ConnectionStatus } from "@/components/dashboard-ui/Connection"
import { MobileNav } from "@/components/dashboard-ui/MobieNav"
import { ReferralCard } from "@/components/dashboard-ui/Referal"
import Loader from "@/components/Loading";
import React from 'react';



const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);


    useEffect(() => {
        const updateTokensAndFetchData = async () => {

            let accessToken = localStorage.getItem("access_token");
            let refreshToken = localStorage.getItem("refresh_token");
            let userId = localStorage.getItem("user_id");

            if (!accessToken || !refreshToken || !userId) {
                const urlParams = new URLSearchParams(window.location.search);
                accessToken = urlParams.get("access_token") || accessToken;
                refreshToken = urlParams.get("refresh_token") || refreshToken;
                userId = urlParams.get("user_id") || userId;

                if (accessToken && refreshToken && userId) {
                    localStorage.setItem("access_token", accessToken as string);
                    localStorage.setItem("refresh_token", refreshToken as string);
                    localStorage.setItem("user_id", userId as string);
                } else {
                    console.error("Missing tokens in URL.");
                    setLoading(false);
                    return;
                }
            }

            // Refresh token if access token is missing or expired
            if (!accessToken) {
                try {
                    const response = await axios.post("https://api.fitbit.com/oauth2/token", null, {
                        params: {
                            client_id: process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID,
                            grant_type: "refresh_token",
                            refresh_token: refreshToken,
                        },
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    });

                    accessToken = response.data.access_token;
                    refreshToken = response.data.refresh_token; // Update refresh token as well
                    localStorage.setItem("access_token", accessToken as string);
                    if (refreshToken) {
                        localStorage.setItem("refresh_token", refreshToken);
                    }

                    console.log("Token refreshed successfully.");
                } catch (error) {
                    console.error("Error refreshing token:", error);
                    setLoading(false);
                    return;
                }
            }

            // Fetch user data using the latest accessToken and userId
            try {
                const response = await axios.get(`/api/getInfo?userId=${userId}`);
                setData(response.data);
                localStorage.setItem("fitbitID", data?.fitbitId)
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        };

        updateTokensAndFetchData();
    }, []);

    const todayDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const todayReward = data?.sleepData?.find((entry: { date: string; }) => entry.date === todayDate)?.reward || 0;
    const totalReward = data?.totalRewards || 0; // Get totalReward from the first entry

    if (loading) return <div className="flex items-center justify-center h-screen w-2/5 mx-auto ">
        <Loader />
    </div>;

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <Sidebar />
            <main className="flex flex-col pb-20 lg:pb-0 w-full">

                <Header userid={data?.fitbitId} />


                <div className="p-4 space-y-4 flex-1 overflow-auto   mx-auto w-full   lg:p-6 lg:space-y-6">
                    <WelcomeBanner />

                    <div className="text-3xl font-semibold text-gray-100  px-4">Earnings</div>
                    <div className="flex flex-col lg:flex-row gap-4 ">
                        <EarningsSection todayrewards={todayReward} totalrewards={totalReward} />
                        <ConnectionStatus />
                        <ReferralCard />
                    </div>
                    <div className=" lg:block">
                        <EarningsChart userInfo={data} />
                    </div>
                </div>
                <MobileNav />
            </main>
        </div>
    );
};

export default Dashboard;
