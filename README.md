# Sleep2Earn
![Sleep2Earn](/logo.png)


<div align="center">
  <a href="https://www.youtube.com/watch?v=wT-9Bira1IA">
    <img src="https://img.youtube.com/vi/wT-9Bira1IA/maxresdefault.jpg" width="100%" alt="Sleep2Earn Demo">
  </a>
</div>

## 🌙 Overview

Sleep2Earn is an innovative blockchain-based application that addresses the growing epidemic of sleep deprivation in our fast-paced world. By transforming healthy sleep habits into tangible rewards, we're revolutionizing how people prioritize rest and recovery.

Poor sleep quality and insufficient rest have become alarming public health concerns, negatively impacting:
- Daily productivity and cognitive performance
- Long-term mental health and emotional wellbeing
- Physical health outcomes and immune function
- Overall quality of life

Sleep2Earn creates a positive feedback loop by rewarding users with cryptocurrency tokens for achieving their personalized sleep goals. What sets us apart is our commitment to data privacy - all sleep verification is handled through secure zkTLS protocols, ensuring users maintain complete ownership of their sensitive health information while still benefiting from the reward system.

## ✨ Features

- **Goal Setting**: Define personalized sleep targets based on duration, consistency, and quality
- **Secure Verification**: Zero-knowledge proofs verify sleep metrics without exposing raw data
- **Token Rewards**: Earn tokens for successful sleep goal completion
- **Progress Tracking**: Monitor sleep improvement over time with detailed analytics
- **Community Challenges**: Participate in group sleep improvement initiatives

## 🔧 Prerequisites

Currently, Sleep2Earn only supports integration with **Google Fitbit** devices for sleep tracking. Additional device support coming soon!

Visit our website for compatibility information and setup guides: [Sleep2Earn.io](https://sleep2earn.vercel.app/) 

## 🚀 Getting Started

Follow these steps to set up the project locally:

```bash
# Clone the repository
git clone https://github.com/shivendram16053/sleep2earn.git

# Navigate to project directory
cd sleep2earn

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔐 Environment Configuration

For testing purposes, you'll need access to our development environment variables. Please contact us via email at dev@sleep2earn.io to request the necessary `.env` file with testing credentials.

# Smart Contract and Rewards Instructions

## 📝 Overview

The Sleep2Earn Token (SLEEP) is an ERC-20 token built on the Ethereum blockchain that powers the Sleep2Earn ecosystem. SLEEP tokens serve as the primary reward mechanism for users who achieve their sleep goals while enabling a sustainable economic model through staking, rewards, and redemption features.

## 🔑 Key Features

### Staking Mechanism

Users can lock their SLEEP tokens for predetermined periods to earn rewards:

| Staking Period | Reward Rate |
|----------------|-------------|
| 30 days        | 5%          |
| 90 days        | 15%         |
| 180 days       | 35%         |

During the staking period, tokens are locked and cannot be transferred or used for other purposes.

### Reward System

- **Claim Rewards**: Upon completion of the staking period, users can claim both their initially staked tokens and the earned rewards.
- **Automatic Calculation**: Rewards are automatically calculated based on the staking period and amount.

### Early Unstaking

Users have the flexibility to unstake their tokens before the completion of their chosen period, subject to the following penalty structure:

| Unstaking Timeframe | Penalty Rate |
|---------------------|--------------|
| Before 30 days      | 30%          |
| Before 90 days      | 20%          |
| Before 180 days     | 10%          |
| After 180 days      | No penalty   |

### Token Redemption

- Users can burn SLEEP tokens through our redemption mechanism
- A redemption fee of 10% of the token amount (or minimum 0.01 ETH) is required
- Fees are paid in ETH


## 💡 User Guidelines

- **Maximize Rewards**: For optimal returns, stake tokens for longer periods to earn up to 35% rewards.
- **Plan Carefully**: Consider your financial needs before staking, as early unstaking will result in penalties.
- **ETH Requirements**: Ensure you maintain sufficient ETH in your wallet for redemption fees and gas costs.
- **Transparency**: All transactions are recorded on the Ethereum blockchain, providing complete transparency and auditability.

## 🔧 Technical Implementation

The SLEEP token smart contract is implemented according to best security practices and has undergone thorough auditing. The contract includes:

- Standard ERC-20 functions
- Custom staking and reward mechanisms
- Secure penalty enforcement
- Transparent history tracking


## 📜 Legal Disclaimer

The SLEEP token is a utility token designed for use within the Sleep2Earn ecosystem. It is not designed as an investment vehicle and does not represent any equity in Sleep2Earn or affiliated entities. Users should consult with financial and legal advisors before participating in the token economy.
