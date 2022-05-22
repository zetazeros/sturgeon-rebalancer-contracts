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

    function vaultGovernance() external view returns (IVaultGovernance) {
        return _vaultGovernance;
    }

    function vaultTokens() external view returns (address[] memory) {
        return _vaultTokens;
    }

    function nft() external view returns (uint256) {
        return _nft;
    }

    function tvl() public view virtual returns (uint256[] memory minTokenAmounts, uint256[] memory maxTokenAmounts);

    function pullExistentials() external view returns (uint256[] memory) {
        return _pullExistentials;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(IERC165, ERC165) returns (bool) {
        return super.supportsInterface(interfaceId) || (interfaceId == type(IVault).interfaceId);
    }

                            // ------- Internal, Mutating

    function _initialize(address[] memory vaultTokens_, uint256 nft_) internal virtual {
        require(_nft == 0, ExceptionsLibrary.INIT);