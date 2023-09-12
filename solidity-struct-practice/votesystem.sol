// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
	enum Choices { Yes, No }
	
	struct Vote {
		Choices choice;
		address voter;
	}
	
	Vote[] public votes;

	function createVote(Choices choice) external {
		require(!hasVoted(msg.sender), "address can only vote once");
		votes.push(Vote(choice, msg.sender));
	}

	function hasVoted(address someone) public view returns(bool) {
		for (uint i=0; i<votes.length; i++) {
			if (votes[i].voter == someone) {
				return true;
			}
		}
		return false;
	}

	function findChoice(address someone) external view returns(Choices) {
		for (uint i=0; i<votes.length; i++) {
			if (votes[i].voter == someone) {
				return votes[i].choice;
			}
		}
	}

	function changeVote(Choices newChoice) external {
		require(hasVoted(msg.sender), "can not change vote if never voted");

		for (uint i=0; i<votes.length; i++) {
			if (votes[i].voter == msg.sender) {
				votes[i].choice = newChoice;
			}
		}
	}
}