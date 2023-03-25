// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "../../utlils/permission.sol";

contract StandardERC20 is ERC20, ERC20Burnable, Permission {

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {}

    function mint(address _to, uint256 _amount) public _onlyOperator {
        _mint(_to, _amount);
    }

}
