require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const fs = require('fs');
require("dotenv").config();
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc", // Fuji C-Chain RPC URL
      accounts: [process.env.PRIVATE_KEY], // Use your wallet's private key
      chainId: 43113, // Chain ID for Fuji testnet
       // Optional: Set gas price
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};