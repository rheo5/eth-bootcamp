// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
    address public owner;
    uint public askingPrice;
    bool public isForSale;
    
    event Deployed(address indexed owner);
    event Transfer(address indexed from, address indexed to);
    event ForSale(uint indexed price, uint indexed timestamp);
    event Purchase(uint indexed amount, address indexed buyer);

    constructor() {
        owner = msg.sender;
        emit Deployed(owner);
    }

    function transfer(address recipient) external {
        require(msg.sender == owner, "only owner can transfer");

        address previousOwner = owner;
        owner = recipient;

        emit Transfer(previousOwner, recipient);
    }

    function markPrice(uint _askingPrice) external {
        require(msg.sender == owner, "only owner can transfer");
        
        askingPrice = _askingPrice;
        isForSale = true;
        emit ForSale(askingPrice, block.timestamp);
    }

    function purchase() external payable {
        require(isForSale, "collectible not for sale");
        require(askingPrice <= msg.value, "not enough amount");

        address seller = owner;
        address buyer = msg.sender;

        (bool success,) = payable(seller).call{value: msg.value}("");
        require(success, "Transfer to seller failed");

        owner = buyer;

        isForSale = false;
        
        emit Purchase(msg.value, buyer);
    }

}