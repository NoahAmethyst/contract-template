// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


import "@openzeppelin/contracts/access/Ownable.sol";

contract Permission is Ownable {

    mapping(address => bool) public operators;

    constructor() {
        operators[_msgSender()] = true;
    }


    modifier _onlyOperator(){
        require(operators[_msgSender()], "Permission:access denied");
        _;
    }

    function transferOwnership(address newOwner) public override onlyOwner {
        require(newOwner != address(0), "Permission: new owner is the zero address");
        operators[owner()] = false;
        _transferOwnership(newOwner);
    }

    function addOperator(address _newOperator) public onlyOwner {
        operators[_newOperator] = true;
    }

    function delOperator(address _delOperator) public onlyOwner {
        operators[_delOperator] = false;
    }


}
