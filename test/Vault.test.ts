// import { expect } from "chai";
// import { ethers, deployments } from "hardhat";
// import { BigNumber, Signer, utils } from "ethers";
// import {
//     ERC20,
//     ERC20Vault,
//     ProtocolGovernance,
//     VaultRegistry,
//     VaultFactory,
//     ERC20VaultGovernance,
//     AaveVault,
//     GatewayVault,
//     GatewayVaultGovernance,
//     VaultGovernance,
// } from "./library/Types";
// import {
//     deployERC20Tokens,
//     deploySubVaultsXGatewayVaultSystem,
//     deploySubVaultSystem,
// } from "./library/Deployments";
// import Exceptions from "./library/Exceptions";
// import { sleep } from "./library/Helpers";

// xdescribe("Vault", () => {
//     let deployer: Signer;
//     let user: Signer;
//     let stranger: Signer;
//     let treasury: Signer;
//     let protocolGovernanceAdmin: Signer;
//     let strategy: Signer;

//     let token: ERC20;
//     let ERC20Vault: ERC20Vault;
//     let AnotherERC20Vault: ERC20Vault;
//     let anotherERC20Token: ERC20;
//     let AaveVault: ERC20Vault;
//     let nftERC20: number;
//     let nftAave: number;
//     let gatewayVault: GatewayVault;
//     let vaultRegistry: VaultRegistry;
//     let gatewayNft: number;
//     let gatewayVaultGovernance: GatewayVaultGovernance;
//     let protocolGovernance: ProtocolGovernance;
//     let differentERC20Vault: ERC20Vault;
//     let ERC20VaultGovernance: VaultGovernance;
//     let testEncodingContract: any;
//     let testVault: any;
//     let deployment: Function;
