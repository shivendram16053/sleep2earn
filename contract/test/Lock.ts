import { expect } from "chai";
import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("Sleep2EarnToken", function () {
  let owner: any, user: any, feeCollector: any, sleep2EarnToken: any;

  beforeEach(async function () {
    [owner, user, feeCollector] = await ethers.getSigners();

    const Sleep2EarnToken = await ethers.getContractFactory("Sleep2EarnToken");
    sleep2EarnToken = await Sleep2EarnToken.deploy(feeCollector.address);
    await sleep2EarnToken.waitForDeployment();
  });

  it("Should deploy with correct initial supply", async function () {
    const totalSupply = await sleep2EarnToken.totalSupply();
    expect(await sleep2EarnToken.balanceOf(owner.address)).to.equal(totalSupply);
  });

  it("Should allow owner to reward users", async function () {
    const rewardAmount = ethers.parseEther("100");

    await sleep2EarnToken.rewardUser(user.address, rewardAmount);

    expect(await sleep2EarnToken.balanceOf(user.address)).to.equal(rewardAmount);
  });

  it("Should allow users to stake tokens", async function () {
    const stakeAmount = ethers.parseEther("100");

    await sleep2EarnToken.rewardUser(user.address, stakeAmount);

    await sleep2EarnToken.connect(user).stakeTokens(stakeAmount, 30 * 24 * 60 * 60);

    const stake = await sleep2EarnToken.stakes(user.address);
    expect(stake.amount).to.equal(stakeAmount);
  });

  it("Should allow users to claim stake after duration", async function () {
    const stakeAmount = ethers.parseEther("100");
    const duration = 30 * 24 * 60 * 60; // 30 days

    await sleep2EarnToken.rewardUser(user.address, stakeAmount);
    await sleep2EarnToken.connect(user).stakeTokens(stakeAmount, duration);

    // Mint extra tokens to the contract for rewards
    await sleep2EarnToken.mint(ethers.parseEther("1000"));

    await time.increase(duration); // Simulate passing 30 days
    await sleep2EarnToken.connect(user).claimStake();

    const balanceAfterClaim = await sleep2EarnToken.balanceOf(user.address);
    expect(balanceAfterClaim).to.be.above(stakeAmount);
  });

  it("Should allow users to redeem tokens with native token fee", async function () {
    const redeemAmount = ethers.parseEther("100");

    await sleep2EarnToken.rewardUser(user.address, redeemAmount);

    const baseRedemptionFee = await sleep2EarnToken.baseRedemptionFee();
    const feeAmount = (redeemAmount * baseRedemptionFee) / BigInt(100);

    await expect(
      sleep2EarnToken.connect(user).redeemTokens(redeemAmount, { value: feeAmount })
    )
      .to.emit(sleep2EarnToken, "TokenRedeemed")
      .withArgs(user.address, redeemAmount, feeAmount);

    expect(await sleep2EarnToken.balanceOf(user.address)).to.equal(0);
    expect(await ethers.provider.getBalance(feeCollector.address)).to.be.above(feeAmount);
  });
});
