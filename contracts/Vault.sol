// SPDX-License-Identifier: BSL-1.1
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "../libraries/CommonLibrary.sol";
import "../libraries/ExceptionsLibrary.sol";
import "../interfaces/vaults/IVault.sol";
import "./VaultGovernance.sol";

/// @notice Abstract contract that has logic common for every Vault.

abstract contract Vault is IVault, ERC165 {
    using SafeERC20 for IERC20;

    IVaultGovernance internal _vaultGovernance;
    address[] internal _vaultTokens;
    mapping(address => bool) internal _vaultTokensIndex;
    uint256 internal _nft;
    uint256[] internal _pullExistentials;
    
    constructor() {
        // lock initialization and thus all mutations for any deployed Vault
        _nft = type(uint256).max;
    }

    function initialized() external view returns (bool) {
        return _nft != 0;
    }
    
    function isVaultToken(address token) public view returns (bool) {
        return _vaultTokensIndex[token];
    }