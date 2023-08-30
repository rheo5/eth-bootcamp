// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    address public owner;

    constructor() payable {
        require(msg.value >= 1 ether, "need at least 1 ether deposit");
        owner = msg.sender;
    }

    function withdraw() public {
        require(msg.sender == owner, "not owner");
        payable(owner).transfer(address(this).balance);
    }
}
