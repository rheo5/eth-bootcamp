// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    uint count = 0;

    function tick() external {
        count++;

        if (count == 10) {
            selfdestruct(payable(msg.sender));
        }
    }
}
