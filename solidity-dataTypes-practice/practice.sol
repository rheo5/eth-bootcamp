// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    // boolean
    bool public a = true;
    bool public b = false;

    // unsigned int
    uint8 public ua = 29;
    uint16 public ub = 60000;
    uint256 public sum = ua + ub;

    // signed int
    int8 public ia = 15;
    int8 public ib = -27;
    int16 public difference = ia - ib;

    // string
    bytes32 public msg1 = "Hello World";
    string public msg2 = "Hello everyone, my name is Rachel.";

    // enum (actually stored as unsigned ints)
    enum Foods { Apple, Pizza, Bagel, Banana }

	Foods public food1 = Foods.Apple;
	Foods public food2 = Foods.Pizza;
	Foods public food3 = Foods.Bagel;
	Foods public food4 = Foods.Banana;
}