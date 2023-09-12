// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;


// fixed array sum
contract Fixed {
    function sum(uint[5] memory array) pure external returns(uint) {
        uint total = 0;
        for (uint i=0; i<5; i++) {
            total += array[i];
        }

        return total;
    }
}

// dynamic array sum
contract Dynamic {
    function sum(uint[] memory array) pure external returns(uint) {
        uint total = 0;
        for (uint i=0; i<array.length; i++) {
            total += array[i];
        }

        return total;
    }
}