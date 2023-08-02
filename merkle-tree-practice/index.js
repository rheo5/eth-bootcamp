// index.js
class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }
    
    getRoot() {
        return this.layerRoot(this.leaves);
    }

    layerRoot(leaves) {

        if (leaves.length == 1) {
            return leaves[0];
        }

        const pairs = Math.floor(leaves.length / 2);

        const combined = [];

        for (let i = 0; i < pairs; i++) {
            const tempPair = this.concat(leaves[2*i], leaves[2*i + 1]);
            combined.push(tempPair);
        }
        if (leaves.length % 2 == 1) {
            const length = leaves.length - 1;
            combined.push(leaves[length]);
        }

        return this.layerRoot(combined);
    }

    getProof(index) {
        if (index < 0 || index >= this.leaves.length) {
            throw Error("Invalid index");
        }

        const proof = [];
        this.generateProof(index, this.leaves, proof);
        return proof;
    }

    generateProof(index, leaves, proof) {
        const pairs = Math.floor(leaves.length / 2);
        const combined = [];
        
        if (leaves.length == 1) {
            return combined;
        }

        for (let i = 0; i < pairs; i++) {
            const tempPair = this.concat(leaves[2*i], leaves[2*i + 1]);
            combined.push(tempPair);

            if (index == 2*i + 1) {
                proof.push({ data: leaves[2*i], left: true });
                index = i; 
            } 
            else if (index == 2*i){
                proof.push({ data: leaves[2*i + 1], left: false });
                index = i;
            }
        }

        if (leaves.length % 2 == 1) {
            const length = leaves.length - 1;
            combined.push(leaves[length]);

            if (index == length) {
                index = pairs;
            }
        }

        return this.generateProof(index, combined, proof);
    }
}

module.exports = MerkleTree;