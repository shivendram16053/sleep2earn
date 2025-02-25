const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contract with address:", deployer.address);

    const Sleep2EarnToken = await hre.ethers.getContractFactory("Sleep2EarnToken");
    const sleep2earn = await Sleep2EarnToken.deploy(deployer.address); // Pass feeCollector address

    await sleep2earn.waitForDeployment();

    console.log("✅ Contract deployed at address:", await sleep2earn.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
