"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { Sidebar } from "@/components/dashboard-ui/Sidebar";
import { Header } from "@/components/dashboard-ui/Header";
import { MobileNav } from "@/components/dashboard-ui/MobieNav";
import { Button } from "@/components/ui/button";
import { getContract } from "@/utils/contract";

const Rewards = () => {
  const [totalRewards, setTotalRewards] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [claimingRewards, setClaimingRewards] = useState<boolean>(false);
  const [claimingStake, setClaimingStake] = useState<boolean>(false);
  const [staking, setStaking] = useState<boolean>(false);
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [stakeDuration, setStakeDuration] = useState<number>(30 * 24 * 60 * 60); // Default 30 days
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [stakingHistory, setStakingHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchTotalRewards = async () => {
      setLoading(true);
      setErrorMessage(null);

      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        setErrorMessage("Access Token not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `/api/getTotalRewards?accessToken=${accessToken}`
        );
        setTotalRewards(response.data.totalReward);
      } catch (error) {
        setErrorMessage("Error fetching total rewards.");
      } finally {
        setLoading(false);
      }
    };

    const fetchStakingHistory = async () => {
      const userAddress = localStorage.getItem("address");
      if (!userAddress) return;

      const contract = await getContract();
      if (!contract) return;

      const history = await contract.getStakingHistory(userAddress);
      setStakingHistory(history);
    };

    fetchTotalRewards();
    fetchStakingHistory();
  }, []);

  const claimRewards = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const userAddress = localStorage.getItem("address");
  
    if (!userAddress) {
      setErrorMessage("Please connect your wallet to claim rewards.");
      return;
    }
  
    setClaimingRewards(true);
  
    try {
      const contract = await getContract();
      if (!contract) return;
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        setErrorMessage("Access Token not found. Please log in.");
        setLoading(false);
        return;
      }
  
      const amount = totalRewards.toString();
      const tx = await contract.rewardUser(userAddress, ethers.parseEther(amount));
      await tx.wait();
  
      setSuccessMessage(`Successfully rewarded ${amount} SLEEP.`);
      const response = await axios.get(
        `/api/updateTotalRewards?accessToken=${accessToken}`
      );
      setTotalRewards(response.data.totalReward);
    } catch (error: any) {
      if (error.data && error.data.message) {
        setErrorMessage(error.data.message); // Extract error message from contract
      } else {
        setErrorMessage("Failed to claim rewards.");
      }
    } finally {
      setClaimingRewards(false);
    }
  };
  
  const stakeTokens = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const userAddress = localStorage.getItem("address");
  
    if (!userAddress) {
      setErrorMessage("Please connect your wallet to stake.");
      return;
    }
  
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      setErrorMessage("Enter a valid staking amount.");
      return;
    }
  
    setStaking(true);
  
    try {
      const contract = await getContract();
      if (!contract) return;
  
      const amount = ethers.parseEther(stakeAmount);
      const tx = await contract.stakeTokens(amount, stakeDuration);
      await tx.wait();
  
      setSuccessMessage(`Successfully staked ${stakeAmount} SLEEP.`);
    } catch (error: any) {
      if (error.data && error.data.message) {
        setErrorMessage(error.data.message); // Extract error message from contract
      } else {
        setErrorMessage("Failed to stake tokens.");
      }
    } finally {
      setStaking(false);
    }
  };
  
  const claimStake = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setClaimingStake(true);
  
    try {
      const contract = await getContract();
      if (!contract) return;
  
      const tx = await contract.claimStake();
      const receipt = await tx.wait();
  
      const event = receipt.logs?.[0]; // Check logs for SC message
      const eventData = event?.data || "";
      if (eventData.includes("Staking period not over")) {
        setErrorMessage("Staking period not over.");
      } else if (eventData.includes("No active staking")) {
        setErrorMessage("No active staking found.");
      } else {
        setSuccessMessage("Staking rewards claimed successfully!");
      }
    } catch (error: any) {
      if (error.data && error.data.message) {
        setErrorMessage(error.data.message); // Extract error message from contract
      } else {
        setErrorMessage("Error claiming staking rewards.");
      }
    } finally {
      setClaimingStake(false);
    }
  };
  
  const unstakeTokens = async (index: number) => {
    setErrorMessage(null);
    setSuccessMessage(null);
  
    try {
      const contract = await getContract();
      if (!contract) return;
  
      const tx = await contract.unstakeTokens(index);
      await tx.wait();
  
      setSuccessMessage("Tokens unstaked successfully!");
    } catch (error: any) {
      if (error.data && error.data.message) {
        setErrorMessage(error.data.message); // Extract error message from contract
      } else {
        setErrorMessage("Error unstaking tokens.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-900 text-white">
      <Sidebar />
      <main className="flex flex-col w-full px-6 py-6 lg:px-12">
        <Header />
        <MobileNav />

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Rewards Section */}
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Total Rewards</h2>
            <p className="mt-2 text-xl font-semibold">
              {loading ? "Loading..." : `${totalRewards} SLEEP`}
            </p>
            <Button
              className="mt-4 w-full bg-green-500 hover:bg-green-600"
              onClick={claimRewards}
              disabled={claimingRewards || totalRewards === 0}
            >
              {claimingRewards ? "Claiming..." : "Claim Rewards"}
            </Button>
            {totalRewards === 0 && (
              <p className="mt-2 text-red-500">No rewards to claim.</p>
            )}
          </div>

          {/* Staking Section */}
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Stake Tokens</h2>
            <input
              type="number"
              className="w-full p-2 mt-2 text-black rounded-md"
              placeholder="Amount to stake"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
            />
            <select
              className="w-full p-2 mt-2 text-black rounded-md"
              value={stakeDuration}
              onChange={(e) => setStakeDuration(Number(e.target.value))}
            >
              <option value={30 * 24 * 60 * 60}>30 Days</option>
              <option value={90 * 24 * 60 * 60}>90 Days</option>
              <option value={180 * 24 * 60 * 60}>180 Days</option>
            </select>
            <Button
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600"
              onClick={stakeTokens}
              disabled={staking}
            >
              {staking ? "Staking..." : "Stake Tokens"}
            </Button>
          </div>

          {/* Claim Staking Rewards */}
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Claim Staking Rewards</h2>
            <Button
              className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600"
              onClick={claimStake}
              disabled={claimingStake}
            >
              {claimingStake ? "Claiming..." : "Claim Staking Rewards"}
            </Button>
          </div>
        </div>

        {/* Error / Success Messages */}
        {errorMessage && (
          <div className="mt-6 p-4 bg-red-600 text-white rounded-lg text-center">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mt-6 p-4 bg-green-600 text-white rounded-lg text-center">
            {successMessage}
          </div>
        )}

        {/* Staking History */}
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Staking History</h2>
          {stakingHistory.length === 0 ? (
            <p className="mt-2 text-gray-400">No staking history found.</p>
          ) : (
            <div className="mt-4 space-y-2">
              {stakingHistory.map((stake, index) => {
                if (!stake || typeof stake.startTime !== "bigint") {
                  return null; // Skip invalid entries
                }
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-gray-700 rounded-md"
                  >
                    <div>
                      <p>{ethers.formatEther(stake.amount)} SLEEP</p>
                      <p className="text-sm text-gray-400">
                        {new Date(
                          Number(stake.startTime) * 1000
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    {!stake.claimed && !stake.unstaked && (
                      <Button
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => unstakeTokens(index)}
                      >
                        Unstake
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Rewards;
