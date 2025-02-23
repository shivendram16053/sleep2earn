"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

        {/* Navigation Links - Hidden on Small Screens */}
        <div className="hidden md:flex">
          <ul className="flex items-center gap-4">
            {["Directory", "Resources", "Solutions"].map((item) => (
              <li key={item}>
                <button className="group cursor-pointer inline-flex h-10 items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  {item}
                </button>
              </li>
            ))}
            {[
              { name: "Blog", href: "/blog" },
              { name: "Careers", href: "/careers" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="group inline-flex h-10 cursor-pointer  items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>


      </nav>
    </header>
  );
}
