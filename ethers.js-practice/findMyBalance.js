const { Wallet, providers } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

function findMyBalance(privateKey) {
    const wallet = new Wallet(privateKey, provider);
    const balanceWei = wallet.getBalance(); // Get balance in Wei

    return balanceWei;
}

module.exports = findMyBalance;