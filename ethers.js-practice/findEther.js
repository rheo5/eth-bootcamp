const { providers } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

/**
 * Given an ethereum address find all the addresses
 * that were sent ether from that address
 * @param {string} address - The hexadecimal address for the sender
 * @async
 * @returns {Array} all the addresses that received ether
 */
async function findEther(address) {
    const addresses = [];
    for(let i = 0; i < 3; i++){
        const block = await provider.getBlockWithTransactions(i+1);
        addresses.push(...block.transactions.map((trx) => trx.to));
    }

    return addresses;
}

module.exports = findEther;