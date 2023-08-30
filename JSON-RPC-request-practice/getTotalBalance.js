require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`;

async function getTotalBalance(addresses) {
    const batch = addresses.map((address, index) => {
        return {
            jsonrpc: '2.0',
            id: index + 1, 
            method: 'eth_getBalance',
            params: [address, 'latest'],
        };
    });

    const response = await axios.post(url, batch);

    let totalBalance = 0;
    for (const result of response.data) {
        if (result.result) {
            const balanceWei = parseInt(result.result, 16); 
            totalBalance += balanceWei;
        }
    }

    return totalBalance;
}

module.exports = getTotalBalance;
