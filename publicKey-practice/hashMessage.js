// hashMessage.js
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

function hashMessage(message) {
    let messageBytes = utf8ToBytes(message);
    let hash = keccak256(messageBytes);
    return hash;
}

module.exports = hashMessage;