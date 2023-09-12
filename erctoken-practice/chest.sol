// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IERC20.sol";

contract Chest {
    
    function plunder(address[] memory chest) external {
        for(uint i=0; i<chest.length; i++) {
            address tokenAddress = chest[i];
            IERC20 token = IERC20(tokenAddress);
            uint256 tokenBalance = token.balanceOf(address(this));
            require(token.transfer(msg.sender, tokenBalance), "Transfer failed");
        }
    }
}
