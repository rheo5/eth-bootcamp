// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Ownable {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
}

contract Transferable is Ownable{

    function transfer(address to) external onlyOwner() {
        owner = to;
    }
}