// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Party {
    uint256 public deposit;   
    mapping(address => bool) public rsvped;
    address[] public partyMembers;
    mapping(address => uint) public memberShares;

    constructor(uint256 _deposit) {
        deposit = _deposit;
    }

    function rsvp() external payable {
        require(!rsvped[msg.sender], "You have already RSVP'd to the party.");
        require(msg.value == deposit, "Deposit amount is not correct.");
        
        rsvped[msg.sender] = true;
        partyMembers.push(msg.sender);
    }

    function payBill(address venue, uint cost) external {
        require(address(this).balance >= cost, "Not enough funds to pay the bill.");

        (bool sent, ) = payable(venue).call{ value: cost }("");
        require(sent, "failed");

        uint balance = address(this).balance;
        uint share = balance / partyMembers.length;

        for (uint i=0; i<partyMembers.length; i++) {
            memberShares[partyMembers[i]] = share;
        }
        
    }
}