const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

function firstTopic() {
    const eventSignature = "Transfer(address,address,uint256)"; 
    const bytes = utf8ToBytes(eventSignature);
    const digest = keccak256(bytes);
    return toHex(digest);
}

function secondTopic() {
    const addressWith0x = "0x28c6c06298d514db089934071355e5743bf21d60";
    const addressWithout0x = addressWith0x.slice(2);

    const paddedAddress = addressWithout0x.padStart(64, "0");
    return paddedAddress;
}

module.exports = { firstTopic, secondTopic }