"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { Sidebar } from "@/components/dashboard-ui/Sidebar";
import { Header } from "@/components/dashboard-ui/Header";
import { MobileNav } from "@/components/dashboard-ui/MobieNav";
import { Button } from "@/components/ui/button";
import { getContract } from "@/utils/contract";
import Loader from "@/components/Loading";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

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
  const [fitbitID, setFitbitID] = useState<string>("Sloth");


  useEffect(() => {
    const fetchTotalRewards = async () => {
      const fitbitID = localStorage.getItem("user_id");

      if (!fitbitID) throw new Error("No ID found")
      setFitbitID(fitbitID);
      setLoading(true);
      setErrorMessage(null);

      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        alert("Access Token not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `/api/getTotalRewards?accessToken=${accessToken}`
        );
        setTotalRewards(response.data.totalReward);
      } catch (error) {
        alert("Error fetching total rewards.");
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
      alert("Please connect your wallet to claim rewards.");
      return;
    }

    setClaimingRewards(true);

    try {
      const contract = await getContract();
      if (!contract) return;
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        alert("Access Token not found. Please log in.");
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
        alert(error.data.message); // Extract error message from contract
      } else {
        alert("Failed to claim rewards.");
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
      alert("Please connect your wallet to stake.");
      return;
    }

    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      alert("Enter a valid staking amount.");
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
        alert(error.data.message); // Extract error message from contract
      } else {
        alert("Failed to stake tokens.");
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
        alert("Staking period not over.");
      } else if (eventData.includes("No active staking")) {
        alert("No active staking found.");
      } else {
        setSuccessMessage("Staking rewards claimed successfully!");
      }
    } catch (error: any) {
      if (error.data && error.data.message) {
        alert(error.data.message); // Extract error message from contract
      } else {
        alert("Error claiming staking rewards.");
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
        alert(error.data.message); // Extract error message from contract
      } else {
        alert("Error unstaking tokens.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row  text-white">
      <Sidebar />
      <main className=" flex flex-col pb-20 lg:pb-0 w-full">

        <Header userid={fitbitID} />
        <MobileNav />
        {loading ? (<div className="flex items-center justify-center min-h-screen w-2/5 mx-auto ">
          <Loader />
        </div>
        ) :

          (
            <div className="md:px-12 px-6">
              <h1 className="text-3xl font-bold pt-4 md:pt-8 text-left">Rewards &amp; Staking</h1>
              <div className="flex flex-col lg:flex-row gap-6 mt-6 ">
                {/* Rewards Section */}
                <div className="flex flex-col justify-between md:flex  md:flex-col md:gap-5 sm:w-1/3 border-purple-950  border-[1px]  bg-slate-50 bg-opacity-5  p-6 rounded-lg shadow-md">
                  <div className="">
                    <h2 className="  text-2xl font-bold">Total Rewards</h2>
                    <p className="my-2 md:text-base text-[13px]">This the total rewards that will be updated every 24hrs</p>
                  </div>
                  <p className=" text-5xl font-bold">
                    {totalRewards}
                    <span className="text-xl font-semibold">&nbsp;SLEEP</span>
                  </p>
                  <Button
                    className="mt-4 py-6 bg-purple-400 hover:bg-purple-500 "
                    onClick={claimRewards}
                    disabled={claimingRewards || totalRewards === 0}
                  >
                    {claimingRewards ? "Claiming..." : "Claim Rewards"}
                  </Button>

                </div>

                {/* Staking Section */}
                <div className="flex flex-col justify-between border-2 gap-4 md:gap-5 sm:w-1/3 bg-slate-50 bg-opacity-10 p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold">Stake Tokens</h2>
                  <input
                    type="number"
                    className="w-full px-4 py-4 rounded-[5px] mt-2 text-black "
                    placeholder="Amount to stake"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                  />
                  <select
                    className="w-full px-4 py-4 bg-purple-200 rounded-xl mt-2 text-black appearance-none cursor-pointer"
                    value={stakeDuration}
                    onChange={(e) => setStakeDuration(Number(e.target.value))}
                    style={{ paddingRight: '2.5rem', backgroundPosition: 'right 1rem center' }}
                  >
                    <option value={30 * 24 * 60 * 60}>30 Days</option>
                    <option value={90 * 24 * 60 * 60}>90 Days</option>
                    <option value={180 * 24 * 60 * 60}>180 Days</option>
                  </select>
                  <Button
                    className="mt-4  py-6   bg-purple-400 hover:bg-purple-500"
                    onClick={stakeTokens}
                    disabled={staking}
                  >
                    {staking ? "Staking..." : "Stake Tokens"}
                  </Button>
                </div>

                {/* Claim Staking Rewards */}
                <div className="flex flex-col border-2 justify-between sm:w-1/3  bg-slate-50 bg-opacity-10 p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold">Claim Staking Rewards</h2>
                  <p className=" text-xl font-bold text-purple-400">
                    <AnimatedGradientText>

                      No staking founded. Stake your SLEEP to earn more and be a key role empowering the ecosystem.
                    </AnimatedGradientText>
                  </p>

                  <Button
                    className="mt-4  py-6   bg-purple-400 hover:bg-purple-500"
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
              <div className="mt-6 bg-purple-300 bg-opacity-40 p-6 rounded-lg shadow-md">
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
                          className="flex justify-between items-center p-2 rounded-md"
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
            </div>)}

      </main>
    </div>
  );
};

export default Rewards;
