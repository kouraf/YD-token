// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract Token is ERC20PresetMinterPauser {
    uint256 public maxTotalSupply;

    constructor(
        string memory name,
        string memory symbol,
        uint256 maxTotalSupply_
    ) ERC20PresetMinterPauser(name, symbol) {
        maxTotalSupply = maxTotalSupply_;
    }

    function _mint(address account, uint256 amount) internal virtual override {
        uint256 totalSupply = totalSupply() + amount;
        require(totalSupply <= maxTotalSupply, "Above maxTotalSupply limit!");

        super._mint(account, amount);
    }
}
