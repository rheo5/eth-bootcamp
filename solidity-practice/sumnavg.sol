pragma solidity ^0.8.4;

contract Contract {
    function sumAndAverage(uint x, uint y, uint j, uint k) external pure returns(uint, uint){
        uint sum = x + y + j + k;
        uint avg = sum / 4;

        return (sum, avg);
    }
}