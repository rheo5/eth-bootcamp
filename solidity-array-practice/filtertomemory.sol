// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    function filterEven(uint[] memory ints) pure external returns(uint[] memory){
        uint count;
        for(uint i=0; i<ints.length; i++) {
            if (ints[i] %2 ==0) {
                count++;
            }
        }

        uint[] memory filtered = new uint[](count);

        uint index = 0;

        for(uint i=0; i<ints.length; i++) {
            if (ints[i] %2 ==0) {
                filtered[index] = ints[i];
                index++;
            }
        }
        return filtered;
    }
}