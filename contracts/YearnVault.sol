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

    function tvl() public view override returns (uint256[] memory minTokenAmounts, uint256[] memory maxTokenAmounts) {
        address[] memory tokens = _vaultTokens;
        minTokenAmounts = new uint256[](tokens.length);
        for (uint256 i = 0; i < _yTokens.length; ++i) {
            IYearnProtocolVault yToken = IYearnProtocolVault(_yTokens[i]);
            minTokenAmounts[i] = (yToken.balanceOf(address(this)) * yToken.pricePerShare()) / (10**yToken.decimals());
        }
        maxTokenAmounts = minTokenAmounts;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(IERC165, IntegrationVault)
        returns (bool)
    {
        return super.supportsInterface(interfaceId) || type(IYearnVault).interfaceId == interfaceId;
    }