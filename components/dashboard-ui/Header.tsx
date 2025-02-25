"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Header() {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState<string | null>(null);

    const connectKeplr = async () => {
        if (typeof window !== "undefined" && window.keplr) {
            try {
                const chainId = "cosmoshub-4"; // Replace with your desired chain ID
                await window.keplr.enable(chainId);
                const key = await window.keplr.getKey(chainId);
                if (key && key.bech32Address) {
                    setAccount(key.bech32Address);
                    setIsConnected(true);
                }
            } catch (error) {
                console.error("Error enabling Keplr:", error);
            }
        } else {
            alert("Please install the Keplr extension.");
        }
    };

    const disconnectKeplr = () => {
        setAccount(null);
        setIsConnected(false);
    };

    return (
        <div className="border-b border-white/10 bg-gray-900/50 backdrop-blur-md">
            <div className="flex items-center justify-between p-4">
                <p className="font-bold text-xl text-white/90">Hello Rajesh</p>
                <div className="flex items-center gap-4">
                    {isConnected ? (
                        <div className="flex items-center gap-3">
                            <p className="text-white/80 text-sm">{account?.slice(0, 6)}...{account?.slice(-4)}</p>
                            <Button
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-all"
                                onClick={disconnectKeplr}
                            >
                                Disconnect
                            </Button>
                        </div>
                    ) : (
                        <Button
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-all"
                            onClick={connectKeplr}
                        >
                            Connect Wallet
                        </Button>
                    )}
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    );
}
