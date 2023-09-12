// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract StackClub {
    address[] public members;

    constructor() {
        members.push(msg.sender);
    }

    function addMember(address newMember) external {
        require(isMember(msg.sender), "only members can add");
        members.push(newMember);
    }

    function isMember(address member) public view returns(bool){
        for (uint i=0; i<members.length; i++) {
            if (member == members[i]) {
                return true;
            }
        }
        return false;
    }

    function removeLastMember() external {
        require(isMember(msg.sender), "only members can remove");
        members.pop();
    }
}