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

const Dashboard = () => {
    const [profile, setProfile] = useState<any>(null);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("access_token");
        const refreshToken = urlParams.get("refresh_token");
        const userId = urlParams.get("user_id");

        if (accessToken && refreshToken && userId) {
            // Store the tokens in localStorage
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
            localStorage.setItem("user_id", userId);

            // Fetch profile data
            axios
                .get("https://api.fitbit.com/1/user/-/profile.json", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                })
                .then((response) => setProfile(response.data.user))
                .catch((error) => console.error("Error fetching profile:", error));

            console.log("Tokens stored in localStorage:");
            console.log("Access Token:", accessToken);
            console.log("Refresh Token:", refreshToken);
            console.log("User ID:", userId);
        } else {
            console.error("Missing tokens in URL.");
        }
    }, []);

    async function handleClick() {
        let accessToken = localStorage.getItem("access_token");

        // If access token is expired, try to refresh it using the refresh token
        if (!accessToken) {
            const refreshToken = localStorage.getItem("refresh_token");
            if (refreshToken) {
                try {
                    const response = await axios.post("https://api.fitbit.com/oauth2/token", null, {
                        params: {
                            client_id: process.env.FITBIT_CLIENT_ID,
                            grant_type: "refresh_token",
                            refresh_token: refreshToken,
                        },
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    });
                    accessToken = response.data.access_token;
                    localStorage.setItem("access_token", accessToken); // Save new access token
                } catch (error) {
                    console.error("Error refreshing token:", error);
                    return;
                }
            } else {
                console.error("No refresh token available.");
                return;
            }
        }

        // Fetch sleep data using the valid access token
        try {
            const response = await axios.get(
                "https://api.fitbit.com/1.2/user/-/sleep/date/2024-12-04.json",
                {
                    headers: {
                        accept: "application/json",
                        authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setData(response.data);
        } catch (error) {
            console.error("Error fetching sleep data:", error);
        }
    }

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <Sidebar />
            <main className=" flex flex-col pb-20 lg:pb-0 w-full">

                <Header />
                <button onClick={handleClick}>Fetch Sleep Data</button>

                <div className="p-4 space-y-4 flex-1 overflow-auto   mx-auto w-full   lg:p-6 lg:space-y-6">
                    <WelcomeBanner />
                    <ReferralCard />
                    <div className="text-3xl font-semibold text-gray-100  px-4">Earnings</div>
                    <div className="flex flex-col lg:flex-row gap-4 ">
                        <EarningsSection />
                        <ConnectionStatus />
                    </div>
                    <div className=" lg:block">
                        <EarningsChart />
                    </div>
                </div>
                <MobileNav />
            </main>
        </div>
    );
};

export default Dashboard;
