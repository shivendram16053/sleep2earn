"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  const chainId = "984123"; // Forma Testnet Chain ID

  const connectKeplr = async () => {
    if (typeof window !== "undefined" && window.keplr) {
      try {
        // Suggest the Forma Testnet chain to Keplr
        await window.keplr.experimentalSuggestChain({
          chainId: chainId,
          chainName: "Forma Testnet (Sketchpad-1)",
          rpc: "https://rpc.sketchpad-1.forma.art",
          rest: "https://explorer.sketchpad-1.forma.art",
          stakeCurrency: {
            coinDenom: "TIA",
            coinMinimalDenom: "utia",
            coinDecimals: 6,
            coinGeckoId: "celestia",
          },
          bip44: { coinType: 118 },
          bech32Config: {
            bech32PrefixAccAddr: "forma",
            bech32PrefixAccPub: "formapub",
            bech32PrefixValAddr: "formavaloper",
            bech32PrefixValPub: "formavaloperpub",
            bech32PrefixConsAddr: "formavalcons",
            bech32PrefixConsPub: "formavalconspub",
          },
          currencies: [
            {
              coinDenom: "TIA",
              coinMinimalDenom: "utia",
              coinDecimals: 6,
              coinGeckoId: "celestia",
            },
          ],
          feeCurrencies: [
            {
              coinDenom: "TIA",
              coinMinimalDenom: "utia",
              coinDecimals: 6,
              coinGeckoId: "celestia",
              gasPriceStep: {
                low: 18,
                average: 20,
                high: 25,
              },
            },
          ],
          features: ["stargate", "ibc-transfer", "cosmwasm"],
        });

        // Enable Forma Testnet on Keplr
        await window.keplr.enable(chainId);
        const key = await window.keplr.getKey(chainId);

        if (key && key.bech32Address) {
          setAccount(key.bech32Address);
          setIsConnected(true);
        }
      } catch (error) {
        console.error("Error connecting to Forma Testnet:", error);
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
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem",
      borderBottom: "2px solid #000"
    }}>
      <Link href="/">
        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Sleep2Earn</p>
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
