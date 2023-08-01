# Week 1 assignment
cloned from : https://github.com/alchemyplatform/ecdsa-node
used : [ethereum-cryptography library](https://github.com/ethereum/js-ethereum-cryptography)
refer to : [ECDSA: Elliptic Curve Signatures](https://cryptobook.nakov.com/digital-signatures/ecdsa-sign-verify-messages)

## Problem:
* only owner should be able to send transactions
* user should not enter their private key due to privacy concerns

## My approach:
* made it so that to view the balance, use public key
* in order to send transaction, owner have to input the signature
  * signature made by using their private key, amount they are sending, and receipient public address
* thus making it possible for only the owner to make transactions without revealing their private key

## Testing:
private key : e688c853879be40d46f25e3dcf0899161a75c306a4744bcd930ebdc98f160154
public key : 
024368924464e87fb9388d140a2b60fe7fcef9aa1af62e34c9e17a9320c826bb5d
balance : 100
private key : 909ccd7853c09e23284c56c22e07e39d9c09293ce06431c4710d3570ab49de13
public key : 
02253bdb3c19d58b3785deabc7bd69646400749014ab4e8c0a934bb594b6d66485
balance : 50,
private key : 503ee9bebd22810b380d5b7e48c94989811dc9447fd9f1a8a5828dc11f8db056
public key : 0359c072fa0c220bd718635836b355110ac02b0d5477a25d205276f3b443f3960f
balance : 75 

can retrieve signature from /Tools for testing purposes
