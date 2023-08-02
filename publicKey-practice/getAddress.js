// getAddress.js
// getting ethereum address
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    let slicedKey = publicKey.slice(1);
    let keyHash = keccak256(slicedKey);
    let address = keyHash.slice(-20);
    return address;
}

module.exports = getAddress;