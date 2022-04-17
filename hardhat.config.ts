import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "solidity-coverage";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import "./plugins/contracts";
import { config as dotenv } from "dotenv";
import "./tasks/verify";

dotenv();

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            forking: process.env["MAINNET_RPC"]
                ? {
                      url: process.env["MAINNET_RPC"],
                      blockNumber: 13268999,
                  }
                : undefined,

            accounts: process.env["MAINNET_DEPLOYER_PK"]
                ? [
                      {
                          privateKey: process.env["MAINNET_DEPLOYER_PK"],
                          balance: (10 ** 20).toString(),
                      },
                  ]
                : undefined,
        },
        localhost: {
            url: "http://localhost:8545",
        },
        kovan: {
            url:
                process.env["KOVAN_RPC"] ||
                "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
            accounts: process.env["KOVAN_DEPLOYER_PK"]
                ? [process.env["KOVAN_DEPLOYER_PK"]]
                : undefined,
        },
        mainnet: {
            url: process.env["MAINNET_RPC"],
            accounts: process.env["MAINNET_DEPLOYER_PK"]
                ? [process.env["MAINNET_DEPLOYER_PK"]]
                : undefined,
        },
        avalanche: {
            url:
                process.env["AVALANCHE_RPC"] ||
                "https://api.avax.network/ext/bc/C/rpc",
            accounts: process.env["AVALANCHE_DEPLOYER_PK"]
                ? [process.env["AVALANCHE_DEPLOYER_PK"]]
                : undefined,
            chainId: 43114,
        },
        polygon: {
            url: process.env["POLYGON_RPC"] || "https://polygon-rpc.com",
            accounts: process.env["POLYGON_DEPLOYER_PK"]
                ? [process.env["POLYGON_DEPLOYER_PK"]]
                : undefined,
            chainId: 137,
        },

        bsc: {
            url: process.env["BSC_RPC"] || "https://bsc-dataseed.binance.org",
            accounts: process.env["BSC_DEPLOYER_PK"]
                ? [process.env["BSC_DEPLOYER_PK"]]
                : undefined,
            chainId: 56,
        },
        fantom: {
            url: process.env["FANTOM_RPC"] || "https://rpc.ftm.tools",
            accounts: process.env["FANTOM_DEPLOYER_PK"]
                ? [process.env["FANTOM_DEPLOYER_PK"]]
                : undefined,
            chainId: 250,
        },

        arbitrum: {
            url: process.env["ARBITRUM_RPC"] || "https://arb1.arbitrum.io/rpc",
            accounts: process.env["ARBITRUM_DEPLOYER_PK"]
                ? [process.env["ARBITRUM_DEPLOYER_PK"]]
                : undefined,
            chainId: 42161,
        },
        optimism: {
            url: process.env["OPTIMISM_RPC"] || "https://mainnet.optimism.io",
            accounts: process.env["OPTIMISM_DEPLOYER_PK"]
                ? [process.env["OPTIMISM_DEPLOYER_PK"]]
                : undefined,
            chainId: 10,
        },
        xdai: {
            url: process.env["XDAI_RPC"] || "https://rpc.xdaichain.com",
            accounts: process.env["XDAI_DEPLOYER_PK"]
                ? [process.env["XDAI_DEPLOYER_PK"]]
                : undefined,
            chainId: 100,
        },
    },
  

    solidity: {
        compilers: [
            {
                version: "0.8.9",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                    evmVersion: "istanbul",
                },
            },
            {
                version: "0.7.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                    evmVersion: "istanbul",
                },
            },
        ],
    },
    etherscan: {
        apiKey: process.env["ETHERSCAN_API_KEY"],
    },
};

export default config;