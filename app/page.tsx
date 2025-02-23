"use client";

import Homepage from "@/components/Homepage";
import Navbar from "@/components/Navbar";
import SignInButton from "@/components/SignInButton";
import { Particles } from "@/components/magicui/particles";

declare global {
  interface Window {
    keplr?: any;
  }
}

export default function Home() {
  return (
    <div className="relative flex flex-col items-center min-h-screen p-8 pb-20 sm:p-20 font-instrument-sans ">
      <Particles className="absolute inset-0 z-0" quantity={100} ease={80} color={"#ffffff"} refresh />

      {/* Navbar */}
      <div className="w-full z-10 ">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center w-full z-10">
        <Homepage />
      </div>
    </div>
  );
}
