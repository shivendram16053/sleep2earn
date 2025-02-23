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
    <header className=" w-full bg-transparent">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Badge */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xl font-bold text-white uppercase">
            sleep2earn
          </Link>
          <span className="rounded border border-white/20 bg-white/10 px-2 py-0.5 text-xs text-white">
            BETA ACCESS
          </span>
        </div>

        {/* Navigation Links - Hidden on Small Screens */}
        <div className="hidden md:flex">
          <ul className="flex items-center gap-4">
            {[
              { name: "Directory", href: "/directory" },
              { name: "Resources", href: "/resources" },
              { name: "Solutions", href: "/solutions" },
              { name: "Blog", href: "/blog" },
              { name: "Careers", href: "/careers" },
            ].map((link) => (
              <li key={link.name} className="block">
                <Link
                  href={link.href}
                  className="w-auto flex items-center justify-center rounded-md bg-transparent px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
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

export default Navbar;