"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Wallet2 } from "lucide-react";

declare global {
    interface Window {
        keplr?: any;
        ethereum?: any;
    }
}

interface HeaderProps {
    userid: string;
}

export function Header({ userid }: HeaderProps) {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState<string | null>(null);

    // Forma Testnet Configuration
    const FORMA_CHAIN_ID = "984123";
    const FORMA_RPC_URL = "https://rpc.sketchpad-1.forma.art";

    // 🔄 Restore connection on page refresh
    useEffect(() => {
        const storedAccount = localStorage.getItem("address");
        if (storedAccount) {
            setAccount(storedAccount);
            setIsConnected(true);
        }
    }, []);

    // 🔵 Connect to MetaMask (Forma Testnet)
    const connectMetaMask = async () => {
        if (typeof window !== "undefined" && window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                const chainId = await window.ethereum.request({ method: "eth_chainId" });

                // Convert chain ID to decimal & check if it's Forma Testnet
                if (parseInt(chainId, 16) !== Number(FORMA_CHAIN_ID)) {
                    try {
                        await window.ethereum.request({
                            method: "wallet_addEthereumChain",
                            params: [
                                {
                                    chainId: "0x" + Number(FORMA_CHAIN_ID).toString(16), // Convert to hex
                                    chainName: "Forma Testnet (Sketchpad-1)",
                                    nativeCurrency: {
                                        name: "TIA",
                                        symbol: "TIA",
                                        decimals: 18,
                                    },
                                    rpcUrls: [FORMA_RPC_URL],
                                    blockExplorerUrls: ["https://explorer.sketchpad-1.forma.art/"],
                                },
                            ],
                        });
                    } catch (error) {
                        console.error("Error adding Forma Testnet:", error);
                        return;
                    }
                }

                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    localStorage.setItem("address", accounts[0]);
                    setIsConnected(true);
                }
            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
            }
        } else {
            alert("Please install MetaMask.");
        }
    };

    // ❌ Disconnect Wallet
    const disconnectWallet = () => {
        setAccount(null);
        localStorage.removeItem("address");
        setIsConnected(false);
    };

    return (
        <div className="border-b border-white/10  backdrop-blur-md">
            <div className="flex items-center justify-between px-4 md:px-12 py-6">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="font-bold text-xl text-white/90">Hello {userid}</p>
                </div>
                <div className="flex items-center gap-4">
                    {isConnected ? (
                        <div className="flex items-center gap-3">
                            <p className="text-white/80 text-sm hidden md:block">
                                {account?.slice(0, 6)}...{account?.slice(-4)}
                            </p>
                            <Button
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-all"
                                onClick={disconnectWallet}
                            >
                                Disconnect
                            </Button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-all"
                                onClick={connectMetaMask}
                            >
                                Connect MetaMask (Forma)
                            </Button>
                        </div>
                    )}
                    <div>
                        <Wallet2 className="h-6 w-6 text-white/70" />
                    </div>


                </div>
            </div>
        </div>
    );
}
