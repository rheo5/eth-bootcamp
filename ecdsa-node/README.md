# Week 1 assignment
cloned from : https://github.com/alchemyplatform/ecdsa-node
used : [ethereum-cryptography library](https://github.com/ethereum/js-ethereum-cryptography)

## Problem:
* only owner should be able to send transactions
* user should not enter their private key due to privacy concerns

## My approach:
* made it so that to view the balance, use public key
* in order to send transaction, owner have to input the signature
  * signature made by using their private key, amount they are sending, and receipient public address
* thus making it possible for only the owner to make transactions without revealing their private key