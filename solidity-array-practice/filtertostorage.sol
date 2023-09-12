// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    uint[] public evenNumbers;

    function filterEven(uint[] memory ints) external {
        for (uint i=0; i<ints.length; i++) {
            if (ints[i] %2 == 0) {
                evenNumbers.push(ints[i]);
            }
        }
    }
}