"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  return (
    <header className="w-full bg-transparent">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
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
};

export default Navbar;
