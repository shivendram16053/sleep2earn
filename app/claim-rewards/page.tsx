"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { Sidebar } from "@/components/dashboard-ui/Sidebar";
import { Header } from "@/components/dashboard-ui/Header";
import { MobileNav } from "@/components/dashboard-ui/MobieNav";
import { Button } from "@/components/ui/button";
import { getContract } from "@/utils/contract";

const Dashboard = () => {
  const [totalRewards, setTotalRewards] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [claiming, setClaiming] = useState<boolean>(false);

  useEffect(() => {
    const fetchTotalRewards = async () => {
      const accessToken = localStorage.getItem("access_token"); // Get accessToken from localStorage
      if (!accessToken) {
        console.error("Access Token not found in local storage.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `/api/getTotalRewards?accessToken=${accessToken}`
        );
        setTotalRewards(response.data.totalReward);
      } catch (error) {
        console.error("Error fetching total rewards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalRewards();
  }, []);
  const claimRewards = async () => {
    const adderss = localStorage.getItem("address");
    if (!adderss) {
      alert("Please connect your wallet to claim rewards.");
      return;
    }

    setClaiming(true);

    try {
      const contract = await getContract();
      if (!contract) return;

      const userAddress = localStorage.getItem("address");
      const amount = totalRewards.toString();
      const tx = await contract.rewardUser(
        userAddress,
        ethers.parseEther(amount)
      );
      await tx.wait();
      alert(`Successfully rewarded ${amount} SLEEP to ${userAddress}`);
    } catch (error) {
      console.error("Error claiming rewards:", error);
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex flex-col pb-20 lg:pb-0 w-full">
        <Header />
        <MobileNav />

        <div className="p-6">
          <h2 className="text-2xl font-bold text-white">Total Rewards</h2>
          <div className="mt-4 bg-gray-800 text-white p-6 rounded-lg shadow-md w-80">
            {loading ? (
              <p>Loading rewards...</p>
            ) : (
              <p className="text-xl font-semibold">{totalRewards} SLEEP</p>
            )}
            <Button
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-all"
              onClick={claimRewards}
              disabled={claiming}
            >
              {claiming ? "Claiming..." : "Claim Rewards"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
