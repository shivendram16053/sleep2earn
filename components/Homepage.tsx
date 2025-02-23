import React from "react";
import SignInButton from "./SignInButton";

export default function Homepage() {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-8 text-center">
            {/* Headline */}
            <h1 className="text-6xl font-instrument-serif  sm:text-8xl font-medium flex flex-wrap justify-center gap-4 sm:gap-8">
                <span>Sleep</span>
                <span className="italic font-semibold">Earn</span>
                <span>Repeat</span>
            </h1>

            {/* Subheading */}
            <p className=" max-w-6xl text-lg font-instrument-sans sm:text-xl text-muted-foreground tracking-tight leading-relaxed">
                Get rewarded for your good sleep! <strong>Sleep2Earn</strong> is a Web3-powered health app that turns quality rest into real rewards.
                Track your sleep, improve your well-being, and earn exclusive sloth-themed NFTs & tokens while you snooze.
            </p>
            {/*Button */}

            <SignInButton />

        </div>
    );
}
