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