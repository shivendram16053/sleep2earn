"use client";

import { Search } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-12 left-0 z-50 w-full bg-transparent">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
