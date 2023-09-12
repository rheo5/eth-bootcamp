// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {
    address[] public owners;
    uint256 public required;
    mapping(uint => mapping(address => bool)) public confirmations;

    struct Transaction {
        address destination;
        uint256 value;
        bool executed;
        bytes data;
    }

    Transaction[] public transactions;

    constructor(address[] memory _owners, uint256 _required) {
        require(_owners.length > 0, "At least one owner address is required");
        require(_required > 0 && _required <= _owners.length, "Invalid number of required confirmations");
        
        owners = _owners;
        required = _required;
    }

    function transactionCount() public view returns(uint256) {
        return transactions.length;
    }

    function addTransaction(address _destination, uint256 _value, bytes memory _data) internal returns(uint256) {
        transactions.push(Transaction(_destination, _value, false, _data));

        return transactions.length-1;
    }

    function confirmTransaction(uint256 _transactionId) public {
        bool owner = false;
        for (uint i=0; i<owners.length; i++) {
            if (msg.sender == owners[i]) {
                owner = true;
            }
        }
        require(owner, "only owners can confirm");
        require(_transactionId < transactions.length, "Invalid transaction ID");
        require(!confirmations[_transactionId][msg.sender], "Transaction already confirmed by this owner");

        confirmations[_transactionId][msg.sender] = true;

        if (isConfirmed(_transactionId)) {
            executeTransaction(_transactionId);
        }
    }

    function getConfirmationsCount(uint transactionId) public view returns(uint256) {
        uint count =0;
        for (uint i=0; i<owners.length; i++) {
            if (confirmations[transactionId][owners[i]] == true) {
                count++;
            }
        }

        return count;
    }

    function submitTransaction(address _destination, uint _value, bytes memory _data) public {
        uint id = addTransaction(_destination, _value, _data);
        confirmTransaction(id);
    }

    function isConfirmed(uint transactionId) public view returns(bool) {
        if (getConfirmationsCount(transactionId) >= required) {
            return true;
        }
        return false;
    }

    function executeTransaction(uint transactionId) public {
        require(isConfirmed(transactionId), "not confirmed");

        Transaction storage _tx = transactions[transactionId];
        (bool success, ) = _tx.destination.call{ value: _tx.value }(_tx.data);
        require(success, "Failed to execute transaction");

        _tx.executed = true;
    }

    receive() external payable {
        
    }
}
