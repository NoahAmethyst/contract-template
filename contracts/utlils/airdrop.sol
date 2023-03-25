// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interface/IERC20.sol";

contract AirDropper {

    constructor() {}

    function airdrop(address _token, address[] memory _receivers, uint256[] memory _amounts) public payable {
        require(_receivers.length == _amounts.length, "Receivers not match amounts");

        if (_token == address(0)) {
            uint256 totalAmount;
        unchecked {
            for (uint i = 0; i < _amounts.length; i++) {
                totalAmount += _amounts[i];
            }
        }//unchecked
            require(totalAmount <= msg.value, "Eth not enough");
            //refund
            if (msg.value - totalAmount > 0) {
                payable(msg.sender).transfer(msg.value - totalAmount);
            }
        }

        for (uint i = 0; i < _receivers.length; i++) {
            if (_amounts[i] == 0) {
                continue;
            }
            if (_token == address(0)) {
                payable(_receivers[i]).transfer(_amounts[i]);
            } else {
                try IERC20(_token).transferFrom(msg.sender, _receivers[i], _amounts[i]) returns (bool success){
                    (success);
                } catch Error(string memory revertReason){
                    revert(revertReason);
                }catch {
                    revert("Not ERC20");
                }
            }
        }
    }


}
