// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Sleep2EarnToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10 ** 18;
    address public feeCollector;
    uint256 public baseRedemptionFee = 10; // 10% fee
    uint256 public minRedemptionFee = 10 ** 16; // Minimum 0.01 ETH fee

    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 duration;
        bool claimed;
    }

    mapping(address => Stake) public stakes;

    event RewardTransferred(address indexed user, uint256 amount);
    event TokenRedeemed(address indexed user, uint256 amountBurned, uint256 feePaid);
    event TokensStaked(address indexed user, uint256 amount, uint256 duration);
    event StakeClaimed(address indexed user, uint256 reward, uint256 amount);

    constructor(address _feeCollector) ERC20("Sleep2Earn Token", "SLEEP") Ownable(msg.sender) {
        require(_feeCollector != address(0), "Invalid fee collector");
        feeCollector = _feeCollector;
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function rewardUser(address user, uint256 amount) external onlyOwner {
        require(user != address(0), "Invalid address");
        require(balanceOf(msg.sender) >= amount, "Not enough tokens");

        _transfer(msg.sender, user, amount);
        emit RewardTransferred(user, amount);
    }

    function redeemTokens(uint256 amount) external payable {
        require(amount > 0, "Invalid redemption amount");
        require(balanceOf(msg.sender) >= amount, "Insufficient token balance");

        uint256 feeAmount = (amount * baseRedemptionFee) / 100;
        if (feeAmount < minRedemptionFee) {
            feeAmount = minRedemptionFee;
        }

        require(msg.value >= feeAmount, "Insufficient native token for fee");
        payable(feeCollector).transfer(feeAmount);

        _burn(msg.sender, amount);
        emit TokenRedeemed(msg.sender, amount, feeAmount);
    }

    function setBaseRedemptionFee(uint256 newFee) external onlyOwner {
        require(newFee <= 100, "Fee too high"); // Max 100%
        baseRedemptionFee = newFee;
    }

    function setMinRedemptionFee(uint256 newMinFee) external onlyOwner {
        minRedemptionFee = newMinFee;
    }

    function setFeeCollector(address newCollector) external onlyOwner {
        require(newCollector != address(0), "Invalid address");
        feeCollector = newCollector;
    }

    function stakeTokens(uint256 amount, uint256 duration) external {
        require(amount > 0, "Amount must be greater than zero");
        require(duration == 30 days || duration == 90 days || duration == 180 days, "Invalid staking duration");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        require(stakes[msg.sender].amount == 0, "Already staking");

        _transfer(msg.sender, address(this), amount);
        stakes[msg.sender] = Stake(amount, block.timestamp, duration, false);

        emit TokensStaked(msg.sender, amount, duration);
    }

    function claimStake() external {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No active stake");
        require(block.timestamp >= userStake.startTime + userStake.duration, "Staking period not yet over");
        require(!userStake.claimed, "Stake already claimed");

        uint256 rewardMultiplier;
        if (userStake.duration == 30 days) {
            rewardMultiplier = 105; // 5% reward
        } else if (userStake.duration == 90 days) {
            rewardMultiplier = 115; // 15% reward
        } else if (userStake.duration == 180 days) {
            rewardMultiplier = 135; // 35% reward
        }

        uint256 rewardAmount = (userStake.amount * rewardMultiplier) / 100;

        // Ensure the contract has enough tokens to pay rewards
        require(balanceOf(address(this)) >= rewardAmount, "Contract lacks funds for rewards");

        _transfer(address(this), msg.sender, rewardAmount);

        userStake.claimed = true;
        emit StakeClaimed(msg.sender, rewardAmount, userStake.amount);
    }

    // Mint function to top up contract balance for staking rewards
    function mint(uint256 amount) external onlyOwner {
        _mint(address(this), amount);
    }
}
