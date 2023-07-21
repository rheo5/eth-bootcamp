# Ethereum Bootcamp notes

- [Ethereum Bootcamp notes](#ethereum-bootcamp-notes)
- [Week 1](#week-1)
  - [cryptographic hash function](#cryptographic-hash-function)
  - [public key cryptography](#public-key-cryptography)
  - [proof of work \& mining](#proof-of-work--mining)
  - [blockchain structure](#blockchain-structure)
- [Week 2](#week-2)

# Week 1

https://github.com/ethereum/js-ethereum-cryptography
https://github.com/paulmillr/noble-secp256k1

## cryptographic hash function
* sha256
* one way function
* input -> output
* hard to find input with output
* can either brute force guess or rainbow table (precomputated table)

<b>practice : cryptographic hashes : sha256</b>

<pre><code>
const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

// the possible colors that the hash could represent
const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

// given a hash, return the color that created the hash
function findColor(hash) {
    for (color of COLORS) {
        let colorBytes = utf8ToBytes(color);
        let colorHash = sha256(colorBytes);
        if (toHex(colorHash) === toHex(hash)) {
            return color;
        }
    }
}

module.exports = findColor;
</code></pre>

## public key cryptography
* if two parties meet before, can agree upon key + function
* symmetric key cryptography - when keys on both sides
* how can two parties communicate securely without meeting prior for key exchange?
* asymmetric encryption - only one party has access to the private key
* public and private key 
* anyone can encrypt w public key and only holder of? private key can decrypt; vice versa w private to public

<b>practice : public key exercise </b>

<pre><code>
// hashMessage.js
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

function hashMessage(message) {
    let messageBytes = utf8ToBytes(message);
    let hash = keccak256(messageBytes);
    return hash;
}

module.exports = hashMessage;
</code></pre>
<pre><code>
// signMessage.js 
const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require('./hashMessage');

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

async function signMessage(msg) {
    let msgHash = hashMessage(msg);
    return secp.sign(msgHash, PRIVATE_KEY, { recovered:true });
}

module.exports = signMessage;

</code></pre>
<pre><code>
// recoverKey.js 
const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require("./hashMessage");

async function recoverKey(message, signature, recoveryBit) {
    let messageHash = hashMessage(message);
    return secp.recoverPublicKey(messageHash, signature, recoveryBit);
}

module.exports = recoverKey;

</code></pre>  
<pre><code>
// getAddress.js
// getting ethereum address
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    let slicedKey = publicKey.slice(1);
    let keyHash = keccak256(slicedKey);
    let address = keyHash.slice(-20);
    return address;
}

module.exports = getAddress;
</code></pre>

## proof of work & mining

* blockchain networks are distributed and decentralized databases consisting of nodes (computers?)
*consensus mechanisms
* 51% nodes are in agreement over the current global state of the network 
* consensus of proof of work : 
1. you cannot double spend
2. longest chain will be the one the rest of the nodes accept as the one "true" chain
* PoW consensus mechanism allows decentralized networks to agree on things like account balnaces, order of transactions, etc. 
* resistant to attack
* mining : process of creating a block of transactions to be added to a blockchain (work in PoW)
* require miners to produce an output in a very difficult to get target range 
* miners take data and hash it 
* PoW networks have target_difficulty 
* for miner to add a new block, must find a PoW lower than the network target difficulty
* "If you want to add a new block, you must provide a proof-of-work with 12 leading zeroes."
* PoW mining algorithm :
1. Take current block’s block header, add mempool transactions
2. Append a nonce, starting at nonce = 0
3. Hash data from #1 and #2
4. Check hash versus target difficulty (provided by protocol)
5. If hash < target, puzzle is solved! Get rewarded.
6. Else, restart process from step #2, but increment nonce
* as long as majority of nodes on the network follow the consensus rules -> blockchain remains secure and resistant to attacks, ensuring that only valid and verified transactions are added to the distributed ledger = maintaining integrity and trustworthiness
* miners rewarded with currency
* use PoW to prevent scamming since computationally expensive
* to overpower this network and force your own version of truth, need to come up with more computing power than all the noes in the system 
* 51% attack : need 51% of total hashing power in network

<b>practice : proof of work miner </b>

<pre><code> 
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
</code></pre>

## blockchain structure
* list of validated blocks
* each block is tied to its predecessor ->chain
* Each block stores the following information:
Index
Timestamp
Hash
Previous Hash
Data
Nonce
* blockchain starts with single block -- genesis block (first block in blockchain w index 0)
* nonce : number used to find a valid hash
* hash change will cause a mutation in the previous hash of subsequent blocks. Since previous hash is used to calculate the hash, subsequent hashes will also change.
* will lead to a cascading invalidation of blocks.
* hacker would need to compute multiple blocks to actually affect the history of a blockchain
* when one node, or peer, proposes a new block, every other peer will verify it to make sure it meets the consensus requirements
* longest chain rule
* number of confirmations of genesis block = number of blocks since genesis block = block height of blockchain

<b> practice : creating blockchain </b>

<pre><code>
const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [new Block('Genesis Block')];
    }

    addBlock(block) {
        let previousBlock = this.chain[this.chain.length - 1];
        let previousBlockHash = previousBlock.toHash();
        block.previousHash = previousBlockHash;

        this.chain.push(block);
    }

    isValid() {
        for(let i = 1; i < this.chain.length; i++) {
            let currentBlock = this.chain[i];
            let prevBlock = this.chain[i-1];

            if (currentBlock.previousHash.toString() !== prevBlock.toHash().toString()) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;
</code></pre>

# Week 2

