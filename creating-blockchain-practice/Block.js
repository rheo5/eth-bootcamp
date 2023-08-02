const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(data, previousBlockHash) {
        this.data = data;
        this.previousHash = previousBlockHash;
    }
    toHash() {
        return SHA256(this.data + this.previousHash);
    }
}

module.exports = Block;
