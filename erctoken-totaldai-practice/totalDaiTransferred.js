require("dotenv").config();
const { Alchemy, Network } = require("alchemy-sdk");
const { firstTopic, secondTopic } = require('./topics');
// prefix both the topics with 0x
const topics = [firstTopic(), secondTopic()].map((x) => '0x' + x);

const config = {
    apiKey: process.env.API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

async function totalDaiTransferred(fromBlock, toBlock) {
    const daiContractAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";

    const logs = await alchemy.core.getLogs({
        address: daiContractAddress,
        fromBlock,
        toBlock,
        topics
    });

    let totalDaiTransferred = BigInt(0);

    for (const log of logs) {
        const data = log.data.substring(2);
        const transferredValue = BigInt("0x" + data);
        totalDaiTransferred += transferredValue;
    }

    return totalDaiTransferred;
}

module.exports = totalDaiTransferred;