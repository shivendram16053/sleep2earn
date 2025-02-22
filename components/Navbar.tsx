"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
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
    // Simply clear local state to "disconnect"
    setAccount(null);
    setIsConnected(false);
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem",
      border: "1px solid #000"
    }}>
      <Link href="/">
        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>sleep2earn</p>
      </Link>

      <div>
        <Link href="/"><p style={{ margin: "0 1rem" }}>Home</p></Link>
        <Link href="/gallery"><p style={{ margin: "0 1rem" }}>Gallery</p></Link>
        <Link href="/trade"><p style={{ margin: "0 1rem" }}>Trade</p></Link>
      </div>

      <div>
        {!isConnected ? (
          <button onClick={connectKeplr}>Connect Wallet</button>
        ) : (
          <>
            <span style={{ marginRight: "1rem" }}>
              {account?.slice(0, 6)}...{account?.slice(-4)}
            </span>
            <button onClick={disconnectKeplr}>Disconnect</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
