require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    zetachain_testnet: {
      url: "https://zetachain-athens-evm.blockpi.network/v1/rpc/public",
      chainId: 7001,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 20000000000, // 20 gwei
    },
    zetachain_mainnet: {
      url: "https://zetachain-evm.blockpi.network/v1/rpc/public",
      chainId: 7000,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 20000000000, // 20 gwei
    },
    ethereum: {
      url: process.env.ETHEREUM_RPC || "https://eth.llamarpc.com",
      chainId: 1,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org",
      chainId: 56,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    polygon: {
      url: "https://polygon-rpc.com",
      chainId: 137,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      zetachain_testnet: "your-zetascan-api-key",
      zetachain_mainnet: "your-zetascan-api-key",
    },
    customChains: [
      {
        network: "zetachain_testnet",
        chainId: 7001,
        urls: {
          apiURL: "https://athens.explorer.zetachain.com/api",
          browserURL: "https://athens.explorer.zetachain.com/",
        },
      },
      {
        network: "zetachain_mainnet",
        chainId: 7000,
        urls: {
          apiURL: "https://explorer.zetachain.com/api",
          browserURL: "https://explorer.zetachain.com/",
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};