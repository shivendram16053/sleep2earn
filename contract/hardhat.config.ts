require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables
console.log("Loaded Private Key:", process.env.PRIVATE_KEY);

module.exports = {
  solidity: "0.8.24",
  networks: {
    forma: {
      url: "https://rpc.sketchpad-1.forma.art",
      accounts: [process.env.PRIVATE_KEY], // Securely load private key
      gas: "auto",
    },
  },
};
