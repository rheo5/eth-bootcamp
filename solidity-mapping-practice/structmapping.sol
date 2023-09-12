// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
	struct User {
		uint balance;
		bool isActive;
	}

	mapping(address => User) public users;

	function createUser() external {
		require(users[msg.sender].isActive != true);

		User storage user = users[msg.sender];
		user.balance = 100;
		user.isActive = true;
	}

	function transfer(address recipient, uint amount) external {
		require(users[msg.sender].isActive);
		require(users[recipient].isActive);

		require(users[msg.sender].balance >= amount);

		users[msg.sender].balance -= amount;
		users[recipient].balance += amount;
	}
}