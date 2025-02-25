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
        bool unstaked;
        uint256 unstakeTime;
    }

    struct Claim {
        uint256 amount;
        uint256 claimedAt;
    }

    mapping(address => Stake[]) public stakes;
    mapping(address => Claim[]) public claimHistory;

    event RewardTransferred(address indexed user, uint256 amount);
    event TokenRedeemed(address indexed user, uint256 amountBurned, uint256 feePaid);
    event TokensStaked(address indexed user, uint256 amount, uint256 duration);
    event StakeClaimed(address indexed user, uint256 reward, uint256 amount, uint256 claimedAt);
    event TokensUnstaked(address indexed user, uint256 amount, uint256 penalty, uint256 unstakeTime);

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

    function stakeTokens(uint256 amount, uint256 duration) external {
        require(amount > 0, "Amount must be greater than zero");
        require(duration == 30 days || duration == 90 days || duration == 180 days, "Invalid staking duration");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        _transfer(msg.sender, address(this), amount);
        stakes[msg.sender].push(Stake(amount, block.timestamp, duration, false, false, 0));

        emit TokensStaked(msg.sender, amount, duration);
    }

    function claimStake(uint256 index) external {
        require(index < stakes[msg.sender].length, "Invalid stake index");
        Stake storage userStake = stakes[msg.sender][index];

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
        require(balanceOf(address(this)) >= rewardAmount, "Contract lacks funds for rewards");

        _transfer(address(this), msg.sender, rewardAmount);
        userStake.claimed = true;

        // Store claim history
        claimHistory[msg.sender].push(Claim(rewardAmount, block.timestamp));

        emit StakeClaimed(msg.sender, rewardAmount, userStake.amount, block.timestamp);
    }

    function unstakeTokens(uint256 index) external {
        require(index < stakes[msg.sender].length, "Invalid stake index");
        Stake storage userStake = stakes[msg.sender][index];

        require(userStake.amount > 0, "No active stake");
        require(!userStake.claimed, "Already claimed");
        require(!userStake.unstaked, "Already unstaked");

        uint256 elapsedTime = block.timestamp - userStake.startTime;
        uint256 penaltyPercent;

        if (elapsedTime < 30 days) {
            penaltyPercent = 30; // 30% penalty if unstaked before 30 days
        } else if (elapsedTime < 90 days) {
            penaltyPercent = 20; // 20% penalty if unstaked before 90 days
        } else if (elapsedTime < 180 days) {
            penaltyPercent = 10; // 10% penalty if unstaked before 180 days
        } else {
            penaltyPercent = 0; // No penalty if fully staked
        }

        uint256 penalty = (userStake.amount * penaltyPercent) / 100;
        uint256 refundAmount = userStake.amount - penalty;

        require(balanceOf(address(this)) >= refundAmount, "Insufficient contract balance");

        _transfer(address(this), msg.sender, refundAmount);
        _transfer(address(this), feeCollector, penalty);

        userStake.unstaked = true;
        userStake.unstakeTime = block.timestamp;

        emit TokensUnstaked(msg.sender, refundAmount, penalty, block.timestamp);
    }

    function getClaimHistory(address user) external view returns (Claim[] memory) {
        return claimHistory[user];
    }

    function getStakingHistory(address user) external view returns (Stake[] memory) {
        return stakes[user];
    }

    function setBaseRedemptionFee(uint256 newFee) external onlyOwner {
        require(newFee <= 100, "Fee too high");
        baseRedemptionFee = newFee;
    }

    function setMinRedemptionFee(uint256 newMinFee) external onlyOwner {
        minRedemptionFee = newMinFee;
    }

    function setFeeCollector(address newCollector) external onlyOwner {
        require(newCollector != address(0), "Invalid address");
        feeCollector = newCollector;
    }

    function mint(uint256 amount) external onlyOwner {
        _mint(address(this), amount);
    }
}
