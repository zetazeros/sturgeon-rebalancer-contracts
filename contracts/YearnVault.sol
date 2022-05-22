// SPDX-License-Identifier: BSL-1.1
pragma solidity 0.8.9;

import "../interfaces/external/yearn/IYearnProtocolVault.sol";
import "../interfaces/vaults/IYearnVaultGovernance.sol";
import "../interfaces/vaults/IYearnVault.sol";
import "./IntegrationVault.sol";

contract YearnVault is IYearnVault, IntegrationVault {
    
    using SafeERC20 for IERC20;
    uint256 public constant DEFAULT_MAX_LOSS = 10000; // 10000%%

    address[] private _yTokens;

    /// @notice Yearn protocol vaults used by this contract
    function yTokens() external view returns (address[] memory) {
        return _yTokens;
    }