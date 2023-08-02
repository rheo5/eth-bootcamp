// Transaction.js
class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
    }
    execute() {
        let inputTotal = 0;
        let outputTotal = 0;

        for (const utxo of this.inputUTXOs) {
            if (utxo.spent) {
                throw Error("already spent");
            }
            inputTotal += utxo.amount;
        }

        for (const utxo of this.outputUTXOs) {
            outputTotal += utxo.amount;
        }

        if (inputTotal < outputTotal) {
            throw Error("insufficient input");
        }

        for (const utxo of this.inputUTXOs) {
            utxo.spend();
        }

        this.fee = inputTotal - outputTotal;
    }
}

module.exports = Transaction;