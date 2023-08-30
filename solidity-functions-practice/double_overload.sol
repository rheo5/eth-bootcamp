// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    function double(uint num) public pure returns(uint) {
        return 2 * num;
    }

    function double(uint num1, uint num2) public pure returns(uint, uint) {
        return (num1 * 2, num2 * 2);
    }
}