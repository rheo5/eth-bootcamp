// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Switch {
    address public recipient;
    address public owner;
    uint public lastPing;

    constructor(address _recipient) payable {
        recipient = _recipient;
        owner = msg.sender;
        lastPing = block.timestamp;
    }

    function withdraw() external {
        require(
            block.timestamp - lastPing >= 52 weeks,
            "Withdraw not allowed before 52 weeks of inactivity"
        );

        (bool sent, ) = payable(recipient).call{ value: address(this).balance }("");
        require(sent, "failed");
    }

    function ping() external {
        require(owner == msg.sender, "only owner can ping");
        lastPing = block.timestamp;
    }
}