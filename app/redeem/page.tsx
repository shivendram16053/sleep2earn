"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Sidebar } from "@/components/dashboard-ui/Sidebar";
import { Header } from "@/components/dashboard-ui/Header";
import { MobileNav } from "@/components/dashboard-ui/MobieNav";
import { Button } from "@/components/ui/button";
import { getContract } from "@/utils/contract";
import axios from "axios";



const Redeem = () => {
  const [selectedVoucher, setSelectedVoucher] = useState<{
    id: number;
    value: string;
    sleepAmount: string;
  } | null>(null);
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fitbitID, setFitbitID] = useState<string>("Hello");

  useEffect(() => {
    const fitbitID = localStorage.getItem("user_id");

    if (!fitbitID) throw new Error("No ID found");
    setFitbitID(fitbitID);
  });

  const handleRedeem = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!selectedVoucher) {
      setErrorMessage("No voucher selected.");
      return;
    }

    if (!email || !email.includes("@")) {
      setErrorMessage("Enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const contract = await getContract();
      if (!contract) {
        setErrorMessage("Contract not found.");
        return;
      }

      const userAddress = localStorage.getItem("address");
      if (!userAddress) {
        setErrorMessage("Please connect your wallet.");
        return;
      }

      // Calculate the fee
      const amount = ethers.parseEther(selectedVoucher.sleepAmount);
      const feeAmount = (amount * BigInt(10)) / BigInt(100); // 10% fee
      const minFee = ethers.parseEther("0.01"); // Minimum fee of 0.01 ETH

      const finalFee = feeAmount < minFee ? minFee : feeAmount;

      // Send the transaction
      const tx = await contract.redeemTokens(amount, { value: finalFee });
      await tx.wait();

      // Send email to backend (optional)
      const emailResponse = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          voucher: selectedVoucher.value,
          sleepAmount: selectedVoucher.sleepAmount,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to send email.");
      }

      setSuccessMessage(
        `Successfully redeemed ${selectedVoucher.sleepAmount} SLEEP for a ${selectedVoucher.value} voucher.`
      );
      setSelectedVoucher(null); // Close the popup
    } catch (error: any) {
      if (error.data && error.data.message) {
        setErrorMessage(error.data.message); // Extract error message from contract
      } else {
        setErrorMessage("Failed to redeem tokens.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row  text-white">
      <Sidebar />
      <main className="flex flex-col pb-20 lg:pb-0 w-full ">
        <Header userid={fitbitID} />
        <MobileNav />

        <h1 className="text-3xl font-bold pt-4 px-12 my-4 md:my-0 md:pt-8 text-left"> Redeem your gift cards</h1>
        <div className="md:p-12 p-6 flex  flex-wrap gap-6  justify-between">
          {/* Voucher Categories */}
          <div className=" border-2 border-purple-400 p-6 rounded-lg shadow-md bg-purple-950 w-full md:w-1/5">
            <div className="flex items-center justify-center rounded-xl">
              <img src="amazon.png" alt="amazon" className="w-36 h-36" />
            </div>
            <h2 className="text-2xl font-bold my-4">Amazon</h2>
            <div className="grid grid-cols-1 gap-4">
              <div
                className="bg-purple-500 bg-opacity-40 text-gray-400 hover:text-slate-50 p-4 rounded-lg cursor-pointer hover:bg-purple-400 hover:bg-opacity-100"
                onClick={() =>
                  setSelectedVoucher({
                    id: 1,
                    value: "$5",
                    sleepAmount: "500",
                  })
                }
              >
                <h3 className="text-xl font-semibold text-white">$5</h3>
                <p className="">500 SLEEP</p>
              </div>
              <div
                className="bg-purple-500 bg-opacity-40 text-gray-400 hover:text-slate-50 p-4 rounded-lg cursor-pointer hover:bg-purple-400 hover:bg-opacity-100"
                onClick={() =>
                  setSelectedVoucher({
                    id: 2,
                    value: "$10",
                    sleepAmount: "1000",
                  })
                }
              >
                <h3 className="text-xl font-semibold text-white">$10</h3>
                <p className=" ">1000 SLEEP</p>
              </div>
              <div
                className="bg-purple-500 bg-opacity-40 text-gray-400 hover:text-slate-50 p-4 rounded-lg cursor-pointer hover:bg-purple-400 hover:bg-opacity-100"
                onClick={() =>
                  setSelectedVoucher({
                    id: 3,
                    value: "$20",
                    sleepAmount: "2000",
                  })
                }
              >
                <h3 className="text-xl font-semibold text-white">$20</h3>
                <p className="">2000 SLEEP</p>
              </div>
            </div>
          </div>
          <div className=" border-2 border-purple-400 p-6 rounded-lg shadow-md bg-purple-950 w-full md:w-1/5">
            <div className=" flex items-center justify-center">
              <img src="google.png" alt="amazon" className="w-36 h-36" />
            </div>
            <h2 className="text-2xl font-bold my-4">Google Play</h2>
            <div className="grid grid-cols-1 gap-4">
              <div
                className="bg-purple-500 bg-opacity-40 text-gray-400 hover:text-slate-50 p-4 rounded-lg cursor-pointer hover:bg-purple-400 hover:bg-opacity-100"
                onClick={() =>
                  setSelectedVoucher({
                    id: 1,
                    value: "$5",
                    sleepAmount: "500",
                  })
                }
              >
                <h3 className="text-xl font-semibold text-white">$5</h3>
                <p className="">500 SLEEP</p>
              </div>
              <div
                className="bg-purple-500 bg-opacity-40 text-gray-400 hover:text-slate-50 p-4 rounded-lg cursor-pointer hover:bg-purple-400 hover:bg-opacity-100"
                onClick={() =>
                  setSelectedVoucher({
                    id: 2,
                    value: "$10",
                    sleepAmount: "1000",
                  })
                }
              >
                <h3 className="text-xl font-semibold text-white">$10</h3>
                <p className=" ">1000 SLEEP</p>
              </div>
              <div
                className="bg-purple-500 bg-opacity-40 text-gray-400 hover:text-slate-50 p-4 rounded-lg cursor-pointer hover:bg-purple-400 hover:bg-opacity-100"
                onClick={() =>
                  setSelectedVoucher({
                    id: 3,
                    value: "$20",
                    sleepAmount: "2000",
                  })
                }
              >
                <h3 className="text-xl font-semibold text-white">$20</h3>
                <p className="">2000 SLEEP</p>
              </div>
            </div>
          </div>


          <div className=" border-2 border-purple-400 p-6 rounded-lg shadow-md bg-purple-950 w-full md:w-1/5">
            <div className=" flex items-center justify-center">
              <img src="steam.png" alt="amazon" className="w-36 h-36" />
            </div>
            <h2 className="text-2xl font-bold my-4">Steam</h2>
            <div className="grid grid-cols-1 gap-4">
              <div
                className="bg-purple-500 bg-opacity-40 text-gray-400 hover:text-slate-50 p-4 rounded-lg cursor-pointer hover:bg-purple-400 hover:bg-opacity-100"
                onClick={() =>
                  setSelectedVoucher({
                    id: 1,
                    value: "$5",
                    sleepAmount: "500",
                  })
                }
              >
                <h3 className="text-xl font-semibold text-white">$5</h3>
                <p className="">500 SLEEP</p>
              </div>
              <div
                className="bg-purple-500 bg-opacity-40 text-gray-400 hover:text-slate-50 p-4 rounded-lg cursor-pointer hover:bg-purple-400 hover:bg-opacity-100"
                onClick={() =>
                  setSelectedVoucher({
                    id: 2,
                    value: "$10",
                    sleepAmount: "1000",
                  })
                }
              >
                <h3 className="text-xl font-semibold text-white">$10</h3>
                <p className=" ">1000 SLEEP</p>
              </div>
              <div
                className="bg-purple-500 bg-opacity-40 text-gray-400 hover:text-slate-50 p-4 rounded-lg cursor-pointer hover:bg-purple-400 hover:bg-opacity-100"
                onClick={() =>
                  setSelectedVoucher({
                    id: 3,
                    value: "$20",
                    sleepAmount: "2000",
                  })
                }
              >
                <h3 className="text-xl font-semibold text-white">$20</h3>
                <p className="">2000 SLEEP</p>
              </div>
            </div>
          </div>

          <div className=" border-2 border-purple-400 p-6 rounded-lg shadow-md bg-purple-950 w-full md:w-1/5">
            <div className=" flex items-center justify-center">
              <img src="microsoft.png" alt="amazon" className="w-36 h-36" />
            </div>
            <h2 className="text-2xl font-bold my-4">Microsoft</h2>
            <div className="grid grid-cols-1 gap-4">
              <div
                className="bg-purple-500 bg-opacity-40 text-gray-400 hover:text-slate-50 p-4 rounded-lg cursor-pointer hover:bg-purple-400 hover:bg-opacity-100"
                onClick={() =>
                  setSelectedVoucher({
                    id: 1,
                    value: "$5",
                    sleepAmount: "500",
                  })
                }
              >
                <h3 className="text-xl font-semibold text-white">$5</h3>
                <p className="">500 SLEEP</p>
              </div>
              <div
                className="bg-purple-500 bg-opacity-40 text-gray-400 hover:text-slate-50 p-4 rounded-lg cursor-pointer hover:bg-purple-400 hover:bg-opacity-100"
                onClick={() =>
                  setSelectedVoucher({
                    id: 2,
                    value: "$10",
                    sleepAmount: "1000",
                  })
                }
              >
                <h3 className="text-xl font-semibold text-white">$10</h3>
                <p className=" ">1000 SLEEP</p>
              </div>
              <div
                className="bg-purple-500 bg-opacity-40 text-gray-400 hover:text-slate-50 p-4 rounded-lg cursor-pointer hover:bg-purple-400 hover:bg-opacity-100"
                onClick={() =>
                  setSelectedVoucher({
                    id: 3,
                    value: "$20",
                    sleepAmount: "2000",
                  })
                }
              >
                <h3 className="text-xl font-semibold text-white">$20</h3>
                <p className="">2000 SLEEP</p>
              </div>
            </div>
          </div>

        </div>

        {/* Email Popup */}
        {selectedVoucher && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
              <h2 className="text-2xl font-bold mb-4">
                Redeem {selectedVoucher.value} Voucher
              </h2>
              <input
                type="email"
                className="w-full p-2 mb-4 text-black rounded-md"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex gap-4">
                <Button
                  className="w-full bg-red-500 hover:bg-red-600"
                  onClick={() => setSelectedVoucher(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600"
                  onClick={handleRedeem}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Redeem"}
                </Button>
              </div>
            </div>
          </div>
        )}

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
      </main>
    </div>
  );
};

export default Redeem;
