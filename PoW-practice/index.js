const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
    let blockHeight = blocks.length > 0 ? blocks.length : 0;
    let block = {id : blockHeight, transactions : [] };

    // adding transactions from mempool to block
    for (let i = 0; i < MAX_TRANSACTIONS; i++ ) {
        if (mempool.length > 0) {
            let transaction = mempool.shift();
            block.transactions.push(transaction);
        }
    }

    // proof of work
    block.nonce = 0;
    let blockJSON, blockHash, hashInt;

    do {
        blockJSON = JSON.stringify(block);
        blockHash = SHA256(blockJSON);
        hashInt = BigInt(`0x${blockHash}`);
        block.nonce++;
    } while (hashInt >= TARGET_DIFFICULTY);
    
    block.hash = blockHash;
    blocks.push(block);
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};