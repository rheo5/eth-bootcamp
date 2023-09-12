// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Token {
    uint public totalSupply = 0;
    string public name = 'r';
    string public symbol = "ray";
    uint8 public decimals = 18;

    mapping(address => uint256) public balance;

    event Transfer(address indexed sender, address indexed receiver, uint256 indexed amount);

    constructor() {
        totalSupply = 1000 * (10**18);
        balance[msg.sender] = totalSupply;
    }

    function balanceOf(address holder) external view returns(uint){
        return balance[holder];
    }

    function transfer(address recipient, uint amount) public returns(bool){
        require(balance[msg.sender] >= amount, "insufficient funds");
        balance[msg.sender] -= amount;
        balance[recipient] += amount;

        emit Transfer(msg.sender, recipient, amount);
        
        return true;
    }

}