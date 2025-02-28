
"use client"
import { Particles } from '@/components/magicui/particles';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';

const Sleep2EarnBlogPage = () => {
    const [showMoreFeatures, setShowMoreFeatures] = useState(false);
    const [showMoreTokenInfo, setShowMoreTokenInfo] = useState(false);
    const [showRewardDetails, setShowRewardDetails] = useState(false);

    return (
        <div className="min-h-screen bg-transparent text-white font-sans">
            <Particles
                className="absolute inset-0 z-0 w-full min-h-screen"
                quantity={100}
                ease={80}
                color={"#ffffff"}
                refresh
            /> 
             <div className='mt-12'>
                <Navbar />
            </div>

            <div className="w-full  bg-opacity-80 py-16">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="flex items-center space-x-3 mb-4">

                        <h1 className="text-4xl font-bold text-purple-400">Sleep2Earn - How to earn ?</h1>
                    </div>
                    <p className="text-xl text-white">
                        Revolutionizing sleep habits through blockchain incentives
                    </p>
                </div>
            </div>

            {/* Main Content */}

            <main className="max-w-3xl mx-auto px-6 py-8">

                <article className="prose lg:prose-xl max-w-none">
                    {/* Project Overview Section */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-purple-500 mb-6">Project Overview</h2>
                        <div className="bg-purple-900 bg-opacity-30 backdrop-blur-sm rounded-lg shadow-md p-6 mb-6">
                            <p className="text-lg mb-4 text-white">
                                Sleep2Earn tackles the growing epidemic of sleep deprivation in our fast-paced world.
                                By transforming healthy sleep habits into tangible rewards, we're revolutionizing how
                                people prioritize rest and recovery.
                            </p>
                            <p className="text-lg mb-4 text-white">
                                Poor sleep quality and insufficient rest have become alarming public health concerns,
                                negatively impacting daily productivity, mental health, physical wellbeing, and overall
                                quality of life.
                            </p>
                            <p className="text-lg text-white">
                                Our platform creates a positive feedback loop by rewarding users with cryptocurrency
                                tokens for achieving their personalized sleep goals. What sets us apart is our commitment
                                to data privacy - all sleep verification is handled through secure zkTLS protocols.
                            </p>
                        </div>

                        <h3 className="text-2xl font-bold text-purple-600 mb-4">Key Features</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-purple-900 bg-opacity-20 backdrop-blur-sm rounded-lg shadow p-4 border-l-4 border-purple-500">
                                <h4 className="font-bold text-xl mb-2 text-purple-400">Goal Setting</h4>
                                <p className="text-white">Define personalized sleep targets based on duration, consistency, and quality</p>
                            </div>
                            <div className="bg-purple-900 bg-opacity-20 backdrop-blur-sm rounded-lg shadow p-4 border-l-4 border-purple-500">
                                <h4 className="font-bold text-xl mb-2 text-purple-400">Secure Verification</h4>
                                <p className="text-white">Zero-knowledge proofs verify sleep metrics without exposing raw data</p>
                            </div>
                        </div>

                        {showMoreFeatures && (
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-purple-900 bg-opacity-20 backdrop-blur-sm rounded-lg shadow p-4 border-l-4 border-purple-500">
                                    <h4 className="font-bold text-xl mb-2 text-purple-400">Token Rewards</h4>
                                    <p className="text-white">Earn tokens for successful sleep goal completion with transparent reward structure</p>
                                </div>
                                <div className="bg-purple-900 bg-opacity-20 backdrop-blur-sm rounded-lg shadow p-4 border-l-4 border-purple-500">
                                    <h4 className="font-bold text-xl mb-2 text-purple-400">Progress Tracking</h4>
                                    <p className="text-white">Monitor sleep improvement over time with detailed analytics and insights</p>
                                </div>
                                <div className="bg-purple-900 bg-opacity-20 backdrop-blur-sm rounded-lg shadow p-4 border-l-4 border-purple-500">
                                    <h4 className="font-bold text-xl mb-2 text-purple-400">Community Challenges</h4>
                                    <p className="text-white">Participate in group sleep improvement initiatives with friends and family</p>
                                </div>
                                <div className="bg-purple-900 bg-opacity-20 backdrop-blur-sm rounded-lg shadow p-4 border-l-4 border-purple-500">
                                    <h4 className="font-bold text-xl mb-2 text-purple-400">Device Integration</h4>
                                    <p className="text-white">Currently supports Google Fitbit devices with more integrations coming soon</p>
                                </div>
                            </div>
                        )}

                        <div className="text-center mb-8">
                            <button
                                onClick={() => setShowMoreFeatures(!showMoreFeatures)}
                                className="text-purple-400 hover:text-purple-300 font-medium"
                            >
                                {showMoreFeatures ? "Show Less Features" : "Show More Features"}
                            </button>
                        </div>

                        {/* Reward System Section */}
                        <div className="bg-purple-900 bg-opacity-30 backdrop-blur-sm rounded-lg shadow-md p-6 mb-6">
                            <h3 className="text-2xl font-bold text-purple-600 mb-4">Reward System</h3>
                            <p className="text-lg mb-4 text-white">
                                Our innovative reward system encourages consistent, quality sleep habits by converting your rest into
                                valuable SLEEP tokens. The reward amount depends on two key factors: sleep duration and sleep efficiency.
                            </p>

                            <div className="overflow-hidden bg-purple-900 bg-opacity-50 backdrop-blur-sm rounded-lg shadow mb-6">
                                <table className="min-w-full">
                                    <thead className="bg-purple-800">
                                        <tr>
                                            <th className="py-3 px-4 text-left text-purple-200">Sleep Duration</th>
                                            <th className="py-3 px-4 text-left text-purple-200">Base Reward</th>
                                            <th className="py-3 px-4 text-left text-purple-200">Quality Level</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-purple-700">
                                        <tr>
                                            <td className="py-3 px-4 text-white">8.5+ hours</td>
                                            <td className="py-3 px-4 text-green-300 font-medium">90 tokens</td>
                                            <td className="py-3 px-4 text-white">Very High</td>
                                        </tr>
                                        <tr className="bg-purple-900 bg-opacity-50">
                                            <td className="py-3 px-4 text-white">8+ hours</td>
                                            <td className="py-3 px-4 text-green-300 font-medium">70 tokens</td>
                                            <td className="py-3 px-4 text-white">High</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4 text-white">7.5+ hours</td>
                                            <td className="py-3 px-4 text-green-300 font-medium">60 tokens</td>
                                            <td className="py-3 px-4 text-white">Very Good</td>
                                        </tr>
                                        <tr className="bg-purple-900 bg-opacity-50">
                                            <td className="py-3 px-4 text-white">7+ hours</td>
                                            <td className="py-3 px-4 text-green-300 font-medium">50 tokens</td>
                                            <td className="py-3 px-4 text-white">Good</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4 text-white">6.5+ hours</td>
                                            <td className="py-3 px-4 text-green-300 font-medium">40 tokens</td>
                                            <td className="py-3 px-4 text-white">Average</td>
                                        </tr>
                                        <tr className="bg-purple-900 bg-opacity-50">
                                            <td className="py-3 px-4 text-white">6+ hours</td>
                                            <td className="py-3 px-4 text-green-300 font-medium">30 tokens</td>
                                            <td className="py-3 px-4 text-white">Low</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4 text-white">Below 6 hours</td>
                                            <td className="py-3 px-4 text-red-300 font-medium">0 tokens</td>
                                            <td className="py-3 px-4 text-white">No Reward</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {showRewardDetails && (
                                <>
                                    <h4 className="text-xl font-bold text-purple-400 mb-2">Sleep Efficiency Bonuses</h4>
                                    <p className="mb-4 text-white">
                                        Sleep efficiency measures how much time in bed is actually spent sleeping. Higher efficiency
                                        earns additional bonuses on top of your base rewards.
                                    </p>

                                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                                        <div className="bg-purple-900 bg-opacity-20 backdrop-blur-sm rounded-lg shadow p-4 border-l-4 border-purple-500">
                                            <h5 className="font-bold text-lg mb-1 text-purple-400">High Efficiency</h5>
                                            <p className="text-white">95%+ efficiency</p>
                                            <p className="text-green-300 font-medium">+20 tokens</p>
                                        </div>
                                        <div className="bg-purple-900 bg-opacity-20 backdrop-blur-sm rounded-lg shadow p-4 border-l-4 border-purple-500">
                                            <h5 className="font-bold text-lg mb-1 text-purple-400">Medium Efficiency</h5>
                                            <p className="text-white">90-94% efficiency</p>
                                            <p className="text-green-300 font-medium">+10 tokens</p>
                                        </div>
                                        <div className="bg-purple-900 bg-opacity-20 backdrop-blur-sm rounded-lg shadow p-4 border-l-4 border-purple-500">
                                            <h5 className="font-bold text-lg mb-1 text-purple-400">Basic Efficiency</h5>
                                            <p className="text-white">Below 90% efficiency</p>
                                            <p className="text-white">No bonus</p>
                                        </div>
                                    </div>

                                    <div className="bg-purple-800 bg-opacity-30 rounded-lg p-5 border border-purple-600">
                                        <h4 className="text-xl font-bold text-purple-400 mb-2">Example Scenarios</h4>
                                        <ul className="space-y-2">
                                            <li className="text-white">
                                                <span className="font-medium">Premium Sleeper:</span> 8.5 hours with 95% efficiency = 90 + 20 = 110 tokens
                                            </li>
                                            <li className="text-white">
                                                <span className="font-medium">Quality Sleeper:</span> 8 hours with 92% efficiency = 70 + 10 = 80 tokens
                                            </li>
                                            <li className="text-white">
                                                <span className="font-medium">Average Sleeper:</span> 7 hours with 88% efficiency = 50 tokens (no bonus)
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            )}

                            <div className="text-center mt-4">
                                <button
                                    onClick={() => setShowRewardDetails(!showRewardDetails)}
                                    className="text-purple-400 hover:text-purple-300 font-medium"
                                >
                                    {showRewardDetails ? "Hide Reward Details" : "Show Reward Details"}
                                </button>
                            </div>
                        </div>

                        <div className="bg-purple-900 bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-purple-800">
                            <h3 className="text-2xl font-bold text-purple-500 mb-4">Getting Started</h3>
                            <div className="bg-purple-900 bg-opacity-30 backdrop-blur-sm rounded p-4 font-mono text-sm mb-4 overflow-x-auto">
                                <p className="mb-2 text-purple-300"># Clone the repository</p>
                                <p className="text-white mb-2">git clone https://github.com/shivendram16053/sleep2earn.git</p>
                                <p className="mb-2 text-purple-300"># Navigate to project directory</p>
                                <p className="text-white mb-2">cd sleep2earn</p>
                                <p className="mb-2 text-purple-300"># Install dependencies</p>
                                <p className="text-white mb-2">npm install</p>
                                <p className="mb-2 text-purple-300"># Start the development server</p>
                                <p className="text-white mb-2">npm run dev</p>
                            </div>
                            <p className="text-sm text-purple-200">
                                For testing purposes, you'll need access to our development environment variables.
                                Please contact us via email at shivendramishra.sm93@gmail.com
                                to request the necessary .env file.
                            </p>
                        </div>
                    </section>

                    {/* Token Section */}
                    <section>
                        <h2 className="text-3xl font-bold text-purple-500 mb-6">SLEEP Token Ecosystem</h2>
                        <div className="bg-purple-900 bg-opacity-30 backdrop-blur-sm rounded-lg shadow-md p-6 mb-6">
                            <p className="text-lg mb-4 text-white">
                                The Sleep2Earn Token (SLEEP) is an ERC-20 token built on the Ethereum blockchain
                                that powers the Sleep2Earn ecosystem. SLEEP tokens serve as the primary reward
                                mechanism for users who achieve their sleep goals while enabling a sustainable
                                economic model.
                            </p>
                        </div>

                        <h3 className="text-2xl font-bold text-purple-600 mb-4">Staking Rewards</h3>
                        <div className="overflow-hidden bg-purple-900 bg-opacity-30 backdrop-blur-sm rounded-lg shadow mb-6">
                            <table className="min-w-full">
                                <thead className="bg-purple-800">
                                    <tr>
                                        <th className="py-3 px-4 text-left text-purple-200">Staking Period</th>
                                        <th className="py-3 px-4 text-left text-purple-200">Reward Rate</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-purple-700">
                                    <tr>
                                        <td className="py-3 px-4 text-white">30 days</td>
                                        <td className="py-3 px-4 text-green-300 font-medium">5%</td>
                                    </tr>
                                    <tr className="bg-purple-900 bg-opacity-50">
                                        <td className="py-3 px-4 text-white">90 days</td>
                                        <td className="py-3 px-4 text-green-300 font-medium">15%</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4 text-white">180 days</td>
                                        <td className="py-3 px-4 text-green-300 font-medium">35%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {showMoreTokenInfo && (
                            <>
                                <h3 className="text-2xl font-bold text-purple-600 mb-4">Early Unstaking Penalties</h3>
                                <div className="overflow-hidden bg-purple-900 bg-opacity-30 backdrop-blur-sm rounded-lg shadow mb-6">
                                    <table className="min-w-full">
                                        <thead className="bg-purple-800">
                                            <tr>
                                                <th className="py-3 px-4 text-left text-purple-200">Unstaking Timeframe</th>
                                                <th className="py-3 px-4 text-left text-purple-200">Penalty Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-purple-700">
                                            <tr>
                                                <td className="py-3 px-4 text-white">Before 30 days</td>
                                                <td className="py-3 px-4 text-red-300 font-medium">30%</td>
                                            </tr>
                                            <tr className="bg-purple-900 bg-opacity-50">
                                                <td className="py-3 px-4 text-white">Before 90 days</td>
                                                <td className="py-3 px-4 text-red-300 font-medium">20%</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 px-4 text-white">Before 180 days</td>
                                                <td className="py-3 px-4 text-red-300 font-medium">10%</td>
                                            </tr>
                                            <tr className="bg-purple-900 bg-opacity-50">
                                                <td className="py-3 px-4 text-white">After 180 days</td>
                                                <td className="py-3 px-4 text-green-300 font-medium">No penalty</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <h3 className="text-2xl font-bold text-purple-600 mb-4">Token Functions</h3>
                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-purple-900 bg-opacity-20 backdrop-blur-sm rounded-lg shadow p-4">
                                        <h4 className="font-bold text-lg mb-2 text-purple-400">Claim Rewards</h4>
                                        <p className="text-white">After the staking period ends, claim staked tokens plus earned rewards</p>
                                    </div>
                                    <div className="bg-purple-900 bg-opacity-20 backdrop-blur-sm rounded-lg shadow p-4">
                                        <h4 className="font-bold text-lg mb-2 text-purple-400">Redeem Tokens</h4>
                                        <p className="text-white">Burn SLEEP tokens with 10% ETH fee (minimum 0.01 ETH)</p>
                                    </div>
                                    <div className="bg-purple-900 bg-opacity-20 backdrop-blur-sm rounded-lg shadow p-4">
                                        <h4 className="font-bold text-lg mb-2 text-purple-400">Track Activity</h4>
                                        <p className="text-white">View complete staking and claim history for transparency</p>
                                    </div>
                                    <div className="bg-purple-900 bg-opacity-20 backdrop-blur-sm rounded-lg shadow p-4">
                                        <h4 className="font-bold text-lg mb-2 text-purple-400">Smart Contract</h4>
                                        <p className="text-white">Built with best security practices and thoroughly audited</p>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="text-center mb-8">
                            <button
                                onClick={() => setShowMoreTokenInfo(!showMoreTokenInfo)}
                                className="text-purple-400 hover:text-purple-300 font-medium"
                            >
                                {showMoreTokenInfo ? "Show Less Token Info" : "Show More Token Info"}
                            </button>
                        </div>
                    </section>
                </article>

                {/* Contact Footer */}
                <footer className="mt-12 pt-6 border-t border-purple-800 text-center text-purple-200">
                    <p className="mb-2">For support or inquiries: shivendramishra.sm93@gmail.com
                    </p>
                    <p className="text-sm">© 2025 Sleep2Earn. All rights reserved.</p>
                </footer>
            </main>
        </div>
    );
};

export default Sleep2EarnBlogPage;