# Ethereum Bootcamp notes

- [Week 1](#week-1)
  - [Cryptographic hash function](#cryptographic-hash-function)
  - [Public key cryptography](#public-key-cryptography)
  - [Proof of work \& mining](#proof-of-work--mining)
  - [Blockchain structure](#blockchain-structure)
- [Week 2](#week-2)
  - [UTXO \& Account Models](#utxo--account-models)
  - [Tree data structures](#tree-data-structures)
  - [Merkle Trees](#merkle-trees)
  - [Merkle trees in Bitcoin](#merkle-trees-in-bitcoin)
  - [Patricia Merkle Tries](#patricia-merkle-tries)
- [Week 3](#week-3)
  - [Ethereum](#ethereuem)
  - [Ethereum vs Bitcoin](#ethereum-vs-bitcoin)
  - [Forks](#forks)
  - [Proof of Stake](#proof-of-stake)
  - [Gas on Ethereum](#gas-on-ethereum)
  - [Accounts on Ethereum](#accounts-on-ethereum)
  - [Reading data from Ethereum](#reading-data-from-ethereum)
  - [Ethereum nodes](#ethereum-nodes)
  - [Ethereum transactions](#ethereum-transactions)
- [Week 4](#week-4)
  - [Solidity basic syntax](#solidity-basic-syntax)
  - [Solidity Bytecode](#solidity-bytecode)
  - [Glance at Solidity](#glance-at-solidity)
  - [Solidity Functions](#solidity-functions)
  - [Smart Contract Compilation](#smart-contract-compilation)
  - [Hardhat](#hardhat)
  - [Calling EOAs](#calling-eoas)
  - [Reverting Transactions](#reverting-transactions)
  - [Calling Contract Addresses](#calling-contract-addresses)
- [Week 5](#week-5) 
  - [Mappings](#mappings) 
  - [Events](#events)
  - [Escorw](#escrow)
  - [Array & Structs](#array--structs) 
- [Week 6](#week-6)
  - [Multi-signature Contracts](#multi-signature-contracts)
  - [Smart Contract Inheritance](#smart-contract-inheritance) 
  - [ERC-20 Tokens](#erc-20-tokens) 
  - [Send ERC20s to Contracts](#send-erc20s-to-contracts)
  - [NFTs](#nfts)
- [Week 7](#week-7)
  - [Storage Slots](#storage-slots)
  - [Delgatecall](#delegatecall)
  - [Libraries](#libraries)
  - [Upgradeable Smart Contracts](#upgradeable-smart-contracts)
  - [The state of Governance](#the-state-of-governance)

# Week 1

## Cryptographic hash function

- sha256
- one way function
- input -> output
- hard to find input with output
- can either brute force guess or rainbow table (precomputated table)

## Public key cryptography

- if two parties meet before, can agree upon key + function
- symmetric key cryptography - when keys on both sides
- how can two parties communicate securely without meeting prior for key exchange?
- asymmetric encryption - only one party has access to the private key
- public and private key
- anyone can encrypt w public key and only holder of? private key can decrypt; vice versa w private to public

## Proof of work & mining

- blockchain networks are distributed and decentralized databases consisting of nodes (computers?)
- consensus mechanisms
- 51% nodes are in agreement over the current global state of the network

consensus of proof of work :
1. you cannot double spend
2. longest chain will be the one the rest of the nodes accept as the one "true" chain

- PoW consensus mechanism allows decentralized networks to agree on things like account balnaces, order of transactions, etc.
- resistant to attack
- mining : process of creating a block of transactions to be added to a blockchain (work in PoW)
- require miners to produce an output in a very difficult to get target range
- miners take data and hash it
- PoW networks have target_difficulty
- for miner to add a new block, must find a PoW lower than the network target difficulty
  - "If you want to add a new block, you must provide a proof-of-work with 12 leading zeroes."

PoW mining algorithm :
1. Take current block’s block header, add mempool transactions
2. Append a nonce, starting at nonce = 0
3. Hash data from #1 and #2
4. Check hash versus target difficulty (provided by protocol)
5. If hash < target, puzzle is solved! Get rewarded.
6. Else, restart process from step #2, but increment nonce

- as long as majority of nodes on the network follow the consensus rules -> blockchain remains secure and resistant to attacks, ensuring that only valid and verified transactions are added to the distributed ledger = maintaining integrity and trustworthiness
- miners rewarded with currency
- use PoW to prevent scamming since computationally expensive
- to overpower this network and force your own version of truth, need to come up with more computing power than all the noes in the system
- 51% attack : need 51% of total hashing power in network

## Blockchain structure

- list of validated blocks
- each block is tied to its predecessor --> chain
- Each block stores the following information:
  Index
  Timestamp
  Hash
  Previous Hash
  Data
  Nonce
- blockchain starts with single block -- genesis block (first block in blockchain w index 0)
- **nonce** : number used to find a valid hash
- hash change will cause a mutation in the previous hash of subsequent blocks. Since previous hash is used to calculate the hash, subsequent hashes will also change.
- will lead to a cascading invalidation of blocks.
- hacker would need to compute multiple blocks to actually affect the history of a blockchain
- when one node, or peer, proposes a new block, every other peer will verify it to make sure it meets the consensus requirements
- longest chain rule
- number of confirmations of genesis block = number of blocks since genesis block = block height of blockchain

# Week 2

## UTXO & Account Models

- Ethereum and EVM chains use account model to keep track of user balances
- Bitcoin uses UTXO model to keep track of user balances
- Transactions need : amount, payer, payee, payer authorization (usually digital signature)
- Account based model : tracks the balances of users based on their overall account state, without any tracking on what constitutes the actual balance itself
- **UTXO (Unspent Transaction Outputs)** : breaks down to its exact change? (change like cash)
- Owning 3 bitcoins = Owning UTXOs that allows me to spend? is worth? 3 bitcoins
- UTXOs are non fungible
- To spend UTXO, must refer back to that specific UTXO (User's UTXO is scattered across many blocks)
- Once UTXO is consumed? aka spent? leftover change from that transaction creates new UTXO of that amount
- UTXO can only be spent once
- Each UTXO has script associated to it

## Tree data structures

- nodes! parent nodes! children nodes!
- binary tree each parent has at most two children
- **leaves :** last level nodes with no children
- linked list is also a tree -- one child per parent
- leaf -> parent when they have children
- **key :** data inside the node
- **root :** parentest node? highest level node?
- **siblings :** nodes in same parent same level
- **subtree :** isolate from a broader tree
- file system could be a tree
- tree usage
  1. data can be stored hierarchically
  2. good for searching and sorting
- binary search tree : binary; left subtree contains nodes with key lesser than node's key, vice versa for right subtree with greater than node's key

## Merkle Trees

- allows us to make efficient verifications that data belongs in a larger set of data
- Merkle tree is collection of hashes reduced to single hash:
<pre><code>
ex: 
      ABCDEFGH <-- Merkle Root
       /    \
    ABCD     EFGH
    / \      / \
   AB  CD   EF  GH
  / \  / \  / \ / \
  A B  C D  E F G H
</code></pre>
- allows us to verify a single piece of data belongs in the tree without having all of the data
- for blockchain -- allows us to look at a block and verify that a transaction was part of it by only having part of the data set

## Merkle trees in Bitcoin

- design of merkle trees makes them extremely efficient for data verification
- merkle trees are used to store every transaction mined on the bitcoing network
- **architecture of bitcoin block:**
  ![bitcoin block](https://www.researchgate.net/publication/343236094/figure/fig1/AS:917904996462593@1595857013751/Bitcoin-block-structure.ppm)
- all of the transactions per block are arranged into big merkle tree
- merkle tree's root hash gets committed into the block
- transaction data can be stored off-chain
- more efficient storage on blockchain -- only need to commit one piece of data than thousands of transactions
- design purposed: **keep size of blockchain small**; must account for efficient data storage
- benefit of merkle tree design : **allows for efficient proof that some data exists / merkle proofs**
- merkle proof confirms specific transactions represented by a leaf or branch hash within merkle hash root
  merkle tree is:
  1. space and computationally efficient : reduce memory needed to verify that data has maintained its integrity
  2. good for scalability and decentralization : require less data to be broadcast across the blockchain network to verify data and transactions
  3. no need to pack a block full of transactions, just use merkle root hash : allow Simple Payment Verification (SPV) which helps verify a transaction without downloading entire block -- allows to send and receive transactions using a light client node (crypto wallet)
- for data verification with merkle tree, there is prover and verifier
- **prover:** does calculation to create merkle root (just a hash)
- **verifier:** does not need to know all the values to know for certain one value is in the tree
- **merkle tree :** structure to validate data
- **merkle root :** hash contained in block header -- derived from hashes of all other transactions
- **merkle path :** path for merkle proof; the info the user needs to calculate expected value for the merkle root from their own transaction hash
- **merkle proof :** proves existence of specific transaction

## Patricia Merkle Tries

- **ethereum block architecutre:**
  ![ethereum block](https://i.stack.imgur.com/eOwjD.png)
- ethereum keeps track of larger amount of state data
- ethereum makes use of radix trie/tree aka Patricia trie and combines this data structure with merkle tree --> **Patricia Merkle Trie**
- radix trie is tree-like data structure used to retrieve a string value by traversing down a branch of nodes that store associated references (keys) that together lead to the end value that can be returned
- Merkle Patricia trie is data structure that stores key-value pairs like hash table + allows us to verify data integrity and inclusion of key-value pair
- PMTs group similar-value nodes together; ex) searching for HELP leads you in same path as searching for HELLO
- PATRICIA (practical algorithm to retrieve information coded in alphanumeric)
  two different types of data:
  1. **permanent :** transaction occurs, record is sealed forever --> once you locate transaction in a block's transaction trie, can return to same path over and over to retrieve same result
  2. **ephemeral :** account states change all the time (receiving ether, interacting with contracts, etc) --> nonce, balance, storageRoot, codeHash
- permanent and ephemeral data should be stored separately. **Merkle tree is good for permanent, PMT is good for ephemeral data**
- ethereum account state needs to be frequently updated
- **block header :** hash result of all data elements contained in a block
- **state root :** root hash of state trie
- **transactions root** : root has of block's transactions
- **receipts root :** root hash of receipts trie
- **ethereum : state trie**
  ![state trie](https://res.cloudinary.com/divzjiip8/image/upload/v1669868801/guides/Screen_Shot_2022-11-30_at_8.26.05_PM.png)
- state trie acts as mapping between addresses and account states
- can be seen as a global state that is constantly updated by transaction executions. all the information about accounts are stored in the world state trie and you can retrieve information by querying it
- from javascript request to ethereum world date, you will get object containing some data: ex) balance = , nonce = , root = , codeHash =
- **ethereum : transaction trie**
- ![transaction trie](https://res.cloudinary.com/divzjiip8/image/upload/v1669869222/guides/Screen_Shot_2022-11-30_at_8.33.27_PM.png)
- transaction trie records transactions in ethereum; once block is mined, transaction trie is never updated
- each transaction in ethereum records multiple pieces specific to each transaction such as gasPrice, value, from, etc
- Etherscan - query the Ethereum blockchain for transaction data then index into organized transaction viewer
- **ethereum: transaction receipt trie**
- transaction receipt trie records receipts (outcomes) of transactions; ex( gasUsed, logs, etc
- once block is mined, transaction receipt trie is never updated
  ![block](https://res.cloudinary.com/divzjiip8/image/upload/v1669869958/guides/Screen_Shot_2022-11-30_at_8.45.47_PM.png)

# Week 3

## Ethereuem

- Ethereum (technical def.) : unbounded state machine, consisting of globally accessible singleton state and a virtual machine that applies changes to that state
- Ethereum : open source, globally decentralized computing infrastructure that executes smart contracts
- uses blockchain to synchronize and store the system's state changes
- uses cryptocurrency called ether to meter and constrain execution resource costs
- Ethereum = computer (thousands of computers aka nodes)

1. truly global singleton : not located in any one single location
2. censorship resistance : noone owns it
3. ubiquitous & accessible
4. natively multi-user : infinite range possible for account creation
5. verifiable & auditable : cotract will live on ethereum computer forever

- ethereum enables developers to build powerful decentralized applications with built-in-economic functions, while providing high availaility, transparency, and neutrality

### Ethereum vs Bitcoin

- ethereum has virtual machine built into it that supports turing complete languages -> developers can build apps and prgrams on top of it
- bitcoin's script language is purposefully restricted to simple true/false evaluations of conditions correlating wheter utxo can be spent or not; does not allow for loops

| Diff                    | Ethereum                                                          | Bitcoin                     |
| ----------------------- | ----------------------------------------------------------------- | --------------------------- |
| Consensus Mechanism     | Proof of Stake                                                    | Proof of Work               |
| Accounting System       | Account Model                                                     | UTXO Model                  |
| Public Key Cryptography | secp256k1 elliptic curve                                          | secp256k1 elliptic curve    |
| Stale/Orphan Blocks     | Rewarded (Ommer Blocks)                                           | Not Rewarded                |
| Block Time              | Approx every 12 seconds                                           | Approx every 10 minutes     |
| Network Difficulty      | Adjusted every block                                              | Every 2016 blocks           |
| Language Support        | Turing Complete smart contracts, custom VMVM operations cost gas. | non-Turing Complete scripts |

- Gas is measurement of cost to each operation that relates to computational cost that operation incurs on the network
- Ethereum Virtual Machine : has a list of operation codes with a corresponding gas cost
  ![table](https://res.cloudinary.com/divzjiip8/image/upload/v1670438352/alchemyu/op-codes-costs.png)
- the actual price of gas is ever changing
  \*EVM operations :

1. arithmetic (add, div, etc)
2. info about current context of transaction (timestamp, callvalue, etc)
3. operations that manipulate/retrieve from **temporary memory** (mstore, push32, etc)
4. operations that manipulate/retrieve from **persistent memory** (sstore, create, etc)
5. control flow operations that provide us with loops (jump, jumpi, etc)

- different operations have different gas costs
- temporary memory only exists for the extent of the transaction whereas persistent memory lives on after the function call
- you can read the state of the persistent variable at any block by querying an ethereum node
- denial of service attacks : slow the network to a crawl and deny users of the service

### Forks

- Ethereum has the ability to conduct upgrades and built in a process for suggesting improvements to the system
- EIP - Ethereum Improvement Proposal
- anyone can suggest standards for smart contracts or changes to VM
- updates to VM require forks
- EVM is a specification : outlined on The Yellow Paper
- can implement EVM differently : **Ethereum Client**
- ex) Geth and Erigon (written in Go)
- when upgrades and changes are to be adopted a fork occurs
- active nodes need to update their client with latest changes on EIP
- some nodes may choose to update their client version while others may choose not to
- soft fork : backwards compatible (older version can still be used)
- hard fork : not backwards compatible
- many upgrades were planned far in advance for objectively good upgrades

## Proof of Stake

- proof of stake enables ethereum to be more secure, less energy intensive, greater scalability
- energy requirement to become a validator is much lower and can be done by individuals without a high overhead energy cost
- encourages more users to become validators --> decreasing centralization risk --> increasing security of the network
- instead of mass amount of electricity, validators are required to stake 32ETH by depositing it into a contract to have the ability to validate blocks
- staked ETH is used as collateral against bad actors in network
- rather than competing against validators for the next block, the network randomly selects a validator to propose a block every 12 seconds, all the other validators verify that the proposed block is corrects and cycle repeats
- **finality** : how confident you are that the given block will not change or get forked away
- 2 new levels of finality that developers should consider when requesting data from the network : safe and finalized

block tags :

1. earliest : lowest numbered block the client has available; first block created?
2. finalized : most recent crypto-economically secure block that has been accepted by >2/3 of validators (cannot be re-orged outside of manual intervention driven by community coordination)
3. safe : most recent crypto-economically secure block (cannot be re-orged outside of manual intervention driven by community coordination)
4. latest : most recent block in canonical chain observed by the client (may be reorged out of the canonical chain even under healthy/normal conditions)
5. pending : sample next block built by the client on top of latest and containing the set of transactions usually taken from local mempool; basically not mined yet

- there are several methods that take in block number or block tag as parameter when requesting data on-chain

## Gas on Ethereum

- EIP-1559 : EIP proposed to improve the calculation of gas prices on ethereum
- price of gas is measured in Gwei

| Denomination | Value in Ether | Common usage              |
| ------------ | -------------- | ------------------------- |
| Wei          | 10^-18         | technical implementations |
| Gwei         | 10^-9          | human-readable gas fees   |

- every block has a maximum amount of gas that can be used within it --> how number of transactions included within a block are determined
- every block has capacity to use 30 mill gas but target of 15 mill gas total
- price of gas is determined by amount of demand for transactions / block space (demand is measured by how filled the previous block was relative to target gas)
- network sets base fee (ideally result in 15 mill gas no more no less)
- when blocks are above target, gas price / base fee increases
- fee increases --> increase cost and barrier to entry for sending transactions --> reducing demand
- opposite for when block is below target
- base fee doesnt go to miners pocket but gets burned
- gets burned to prevent miner from circumventing the payment of the base fee since they have to pay at least base fee \* # of transactions for the block that they mine
- burning ether also creates deflationary pressure on ether as an asset since supply being taken out of the market
- when sending transaction, not setting base fee but setting max fee willling to pay
- transaction will use base fee \* amount of execution and remainder will be returned
- miners get tips
- tip is set as 1 gwei but fluctuates
- when setting gas for transaction, you set maxPriorityFee (max fee + miner tip)

## Accounts on Ethereum

- there are two types of accounts in Ethereum : externally owned accounts and contract accounts

### Externally Owned Accounts
- similar to bitcoin -- private/public key pairs, eliptic curve digital signature
- method to get from a private key to an address in Ethereum is different than Bitcoin
- resulting address in Ethereum = 40 character hexadecimal string
- address in Bitcoin = 26-35 alphanumeric string
- Bitcoin addresses also end in checksum
- EOS have a balance -- global state of blockchain actively tracks how much ether every active address on the network holds

### Accounts vs UTXOs
- theres no UTXOs in ethereum
- at end of transaction, transferred amount is subtracted from the sender's address balance and added to recipient's address balance in the global state tree
- EVM has operation BALANCE that allows to look up an addresses balance inside code running on EVM
- Ethereum address also contains a nonce --> keeps a count of all transactions sent from that particular address
- nonce = number we're using once
- keep count of transactions to be used once per transaction
- TLDR difference : balance and nonce vs UTXOs

### Contract Accounts
- **Smart Contract** : program that runs in the blockchain execution environment
- generally written in high-level language : Solidity or Vyper
- once code is completed -> can deploy the contract to the Ethereum blockchain
- do so by running a transaction from EOA with bytecode of the compiled smart contract
- contract has its own account; also has a balance and address
- contract can not be controlled by a private key like EOA
- EOAs make transactions to call functions on the contract
- contracts can also make calls to other contracts synchronously 
- once contract is deployed -> on the chain -> thus can not be changed
- storage (persistent memory) of a contract can be updated through transactions
- **smart contract upgradeability** : possible to upgrade a system by deploying new contracts and running a transaction to update references to point to the new addresses 

## Reading Data from Ethereum
- how do we actually communicate with Ethereum computer : **JSON-RPC**

![diagram](https://res.cloudinary.com/divzjiip8/image/upload/v1670367843/alchemyu/Screen_Shot_2022-12-06_at_3.03.59_PM.png)
- JSON-RPC is the bridge we use to connect any dApp we use/build to an Ethereum node
- to run Ethereum node, must run one of Ethereum client implementations
- ex : geth (written in go), erigon (written in go) , nethermind (written in .net)
- in order to run a node, must download install and run ethereum client implementation
- JSON-RPC is **remote procedure call** protocol that uses JSON to encode messages
- aka another API standard; similar to REST, typically consideredt useful for CRUD
- deals with transporting data in syntax form of JSON
- all ethereum nodes contain a JSON-RPC interface --> some of the following methods are directly queryable to an Ethereume node (eth_blockNumber, eth_getBalance, eth_getBlockByNumber, eth_sendRaw_Transaction)
- https://docs.alchemy.com/reference/ethereum-api-endpoints
- similar to REST API : but we are sending Requests and getting back Responses to a server - in our case, an Ethereum node acting as a listening server

![diagram](https://res.cloudinary.com/divzjiip8/image/upload/v1670369945/alchemyu/Untitled_1.png)

JSON-RPC flow:
1. client side : formulate JSON-RPC request (ex: make eth_blockNumber request)
2. web3 wallet will route the Request to the Ethereum node it is connected to
3. Ethereum node will receive the Request, run the eth_blockNumber method in request and send back a Response containing the latest block number on Ethereum

### Request
![jsonrpc-request](https://res.cloudinary.com/divzjiip8/image/upload/v1670370933/alchemyu/Screen_Shot_2022-12-06_at_3.55.15_PM.png)
- params dependant on method called
- id is any arbitrary number you choose. only relevant when batching requests

### Response
![jsonrpc-response](https://res.cloudinary.com/divzjiip8/image/upload/v1670371227/alchemyu/Screen_Shot_2022-12-06_at_4.00.23_PM.png)
- result of eth_getBalance query

## Ethereum Nodes
- full nodes store and validate all blocks and transactions over entire blockchain locally
- when smart contract transaction is executed, ethereum full nodes execute all instructions in smart contract
- full nodes determine if smart contract execution is producing desired result
- running full ethereum nodes is expensive and can consume greate deal of energy

### Nodes
- problem 1 scalability : when nodes go down, users can no longer make requests, product becomes unusable
- problem 2 reliability : downtime, time spent on debugging
- logical scaling solution : load balancer
- problem 3 data consistency : every node can have different latest blocks
-  load balancing returns inconsistent data

## Ethereum Transactions
- ethereum = transaction based state machine
- ethereum transaction refers to action initiated by EOA (account managed by human not contract)

![state machine](https://res.cloudinary.com/divzjiip8/image/upload/v1670379535/alchemyu/Screen_Shot_2022-12-06_at_6.18.51_PM.png)
- transactions are collected into blocks -> block is package of data
- ethereum : chain of states -> blockchain

![ethereum views](https://res.cloudinary.com/divzjiip8/image/upload/v1670441831/alchemyu/Screen_Shot_2022-12-07_at_11.37.01_AM.png)

**Two types of accounts**
1. EOA
- controlled by private key
- cannot contain EVM code
2. contract account
- does not have private key
- contains storage hash : root hash of merkle patricia trie that holds any state relevant to this smart contract account
- contains code hash : bytecode representation of skeleton code

![diff accs](https://res.cloudinary.com/divzjiip8/image/upload/v1670442521/alchemyu/Screen_Shot_2022-12-07_at_11.48.30_AM.png)
- if EOA, ethereum public address is derived from private key
- if contract, public address is derived from deployer address and deployer nonce value
- output is 160 bits representing ethereum public address
- anyone can read data from ethereum but to write need private key and some eth for gas

### Two types of transactions in Ethereum

![transactions](https://res.cloudinary.com/divzjiip8/image/upload/v1670445489/alchemyu/Screen_Shot_2022-12-07_at_12.37.57_PM.png)

1. Contract creation : special type of transaction that deploys a brand new smart contract; creates brand new entry in ethereum world state

![contract creation](https://res.cloudinary.com/divzjiip8/image/upload/v1670445748/alchemyu/Screen_Shot_2022-12-07_at_12.42.15_PM.png)
2. Message call : transaction initiated by EOA that interacts with another EOA or smart contract; does not create new entry but updates existing entry in ethereum world state

![message call](https://res.cloudinary.com/divzjiip8/image/upload/v1670446309/alchemyu/Screen_Shot_2022-12-07_at_12.51.37_PM.png)

**ethereum transaction architecture**

![architecture](https://res.cloudinary.com/divzjiip8/image/upload/v1670450744/alchemyu/Untitled_4.png)

- blockchain = globally shared transaction decentralized databases
- "signed JSON-RPC request" is fancy term for transaction

![interaction](https://res.cloudinary.com/divzjiip8/image/upload/v1670455249/alchemyu/Screen_Shot_2022-12-07_at_3.20.37_PM.png)

**3 routes to interact with Ethereum computer via node**
1. contract creation
2. message call
3. inspection : any user can make read queries to ethereum notes, no account needed

## Ethereum Front-end Libraries
- web3.js
- ethers.js
- ethereum javascript libraries that allow developers to interact with ethereum or EVM using JSON-RPC
- allow you to do things fundamental to every dapp : deploy smart contract, create wallets, sign transactions, query the blockchain, etc

**ether.js**

pros:
- can do everything that web3.js + more
- broader license
- smaller size
- ens compatible
- large number of test cases

cons:
- new library so difficult to find foundational projects and companies

ethers.js class abstractions
- provider : represents any connection to an ethereum node
- wallet : EOA with ability to signa nd send messages to network
- contract : represents a smart contract executable  deployed on the network 

# Week 4

## Solidity basic syntax
- solidity is an object-oriented, high-level language for implementing smart contracts

**properties of solidity**
- statically typed
- supports inheritance
- libraries
- complex user-defined types

### smart contracts
- program that runs on ethereum computer
- collection of code (functions) and data (state) that resides on specific address on ethereum blockchain
- must be compiled into bytecode first in order to be evm compatible
- smart contracts are permissionless : anyone can deploy, just need eth for gas
- smart contracts are composable : globally available via ethereum; like api for anyone to use
- like vending machine : logic is programmed

### solidity 

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4; // version of solidity

// state variable exs
// declared and initialized w 0x0 and false
address owner;
bool isHappy;

contract MyContract {
    // constructor : called once on contract deployment
    constructor(address _owner, bool _isHappy){
      owner = _owner;
      isHappy = _isHappy;
      // variables declared receive the value passed by deployer
    }
}
```

script deployment in javascript example

```
const myContractInstance = await contract.deploy('0x38cE03CF394C349508fBcECf8e2c04c7c66D58CB', true)
```

add visibility
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

address public owner;
bool public isHappy;

contract MyContract {
    constructor(address _owner, bool _isHappy) {
        owner = _owner;
        isHappy = _isHappy;
    }
}
```
- public : automatic getter function is created -> variable is publicly accessible via get call
- state variables can be declared : private, public, internal but NOT external

numbers
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

address public owner;
bool public isHappy;
uint public x = 10;
int public y = -50;

contract MyContract {
    constructor(address _owner, bool _isHappy) {
        owner = _owner;
        isHappy = _isHappy;
    }
}
```
- uint : unsigned int
- uint is default 256 bits 
- uint == uint256

data types:
- boolean
- string
- integers
- bytes
- enums
- arrays
- mappings
- structs

solidity : address and address payable
- address : holds 20 byte value (size of ethereum address)
- address payable : same as address but with members transfer and send
- payable just means this can accept money 
- address and address payable are first-class types. not just string. have number of attributes and methods directly accessible on it
- address.balance = returns address balance in wei
- address.transfer = sends ether to address payable type
```
address(this).balance // to find contract's own balance
```

message context (msg)
- msg.sender : returns current transaction sender address; who is sending this transaction
- msg.value : returns value of current transaction; how much value does this transaction carry

transaction context (tx)
- tx.gasLimit : returns gasLimit of current tx

block context (block)
- block.number : returns current block number
- block.timestamp : returns current block timestamp

## Solidity Bytecode
- EVM deal with bytecode
- where code for the operations (opcodes) are stored in byte
- when we send a smart contract to EVM we send only the bytecode
- bytecode some of it is opcodes and some of it is operands (optional arguments)
- opcode and operands combined = instruction
- can replace opcode with its name aka mnemonic

solidity compiler assembly output?:
```
tag 7               while(i < 5) ...
  JUMPDEST          while(i < 5) ...
  PUSH 5            5
  DUP3              i
  LT                i < 5
  ISZERO            while(i < 5) ...
  PUSH [tag] 8      while(i < 5) ...
```
- left : evm instructions
- right : where in solidity code the instruction is being generated from
- tags / labels : used to mark locations in the code
- at lowest level of computer instruction, there are no loops
- instead of loops there are operations allow you to change what line of code runs next; manipulate program counter
- two operations that manipulate programming counter are JUMP and JUMPI
- tags are locations in code that you can jump to 
```
  PUSH 5            5 //pushed to stack
  DUP3              i
  LT                i < 5 // less than operator
  ISZERO            while(i < 5) ... // condition for JUMPI will jump to tag8

// if 1
  PUSH [tag] 8      while(i < 5) ... 
  JUMPI             while(i < 5) ...
//if 0
  DUP2              i
  DUP2              sum += i
  ADD               sum += i
  SWAP1             sum += i
  POP               sum += i
  PUSH [tag] 7      while(i < 5) ...
  JUMP              while(i < 5) ...
```

## Glance at Solidity
example
```
/* Here we specify the solidity versions
 * Any version greater than or equal to 0.6.2
 * or less than 0.7.0 will compile this contract */
pragma solidity ^0.6.2;

contract OnOffSwitch {
    // the switch is on if true
    bool private isOn;

    constructor() public {
        // we'll default to being on
        isOn = true;
    }

    // a publicly accessible function to "flip" the switch
    function toggle() public returns(bool) {
        // flip isOn from true->false or false->true
        isOn = !isOn;
        // return the new value
        return isOn;
    }
}
```

versions
- pragma version updates: major (x.0.0), minor (0.x.0), patch (0.0.x)
- major : no gurantee of backwards compatibility; many breaking changes
- minor : add functionality in backwards compatible way
- patch : bugfixes; should not break code's expected vehaviour

contract
- when we make change to state variable on deployed smart contract -> modifying permanent storage on blockchain

control structures
- multiple values can be returned as tuple
```
function getValues() public pure returns (int, bool) {
    return (49, true);
}
```
- tuples can be used to destructure assignments
```
(bool x, bool y) = (true, false);
```
```
(uint x, uint y) = addTwo(4, 8);
```

visibility 
- public : can be accessed from anywhere; getter function is generated
- private : can not be; does not protect data; disallow other contract from reading or modifying information

static typing
- declare types

## Solidity Functions
example
```
contract MyContract {
    function myFunction() external pure {
        uint x = 5;
    }
}
```
- declare new variable in local memory then execution will end and local memory wiped; nothing happens

script call in Javascript
```
const myTx = await contract.myFunction();
```
- transaction is mined and any effects are indexed in tx's own receipt

example
```
function changeOwner(address _newOwner) public {
    owner = _newOwner;
} 
```
- owner state variable
- contract will overwrite current contract owner with _newOwner

### declarations
view : function promises that NO state will be changed, only read

ex:
```
pragma solidity 0.8.4;
contract MyContract {
    uint x = 5;
    uint y = 10;
    
    function sum() external view returns(uint) {
        return x + y;
    }
}
```
- sum only reading from state to produce new value but not changing any state
- view cannot write to storage

pure : function promises that NO state will be changed NOR read

ex:
```
contract MyContract {
    function myFunction() external pure {
        uint x = 5;
    }
}
```
- function does not read or write storage
- function completely independent form contract state
- function above is not really useful

### returns
```
contract MyContract {
    function add(uint x, uint y) external pure returns(uint) {
        return x + y;
    }
}
```
- pure functions like this typically used in libraries or for functionality not specific to a smart contract's state but needed for independent operations
- must indicate return type in returns(data_type) block

**implicit return**
```
contract MyContract {
    function add(uint x, uint y) external pure returns(uint z) {
        z = x + y;
    }
}
```
- z is implicitly returned

**return multiple values**
```
contract MyContract {
    function mathTime(uint sum, uint product) external pure returns(uint sum, uint product) {
        sum = x + y;
        product = x * y;
    }
}
```
```
contract MyContract {
    function mathTime(uint sum, uint product) external pure returns(uint, uint) {
        uint sum = x + y;
        uint product = x * y;
        
        return (sum, product);
    }
}
```
- returned value is referred to as a tuple

### writing to storage
- can not be pure or view
```
contract MyContract {
    uint x = 5;
    uint y = 10;
    uint z;
    
    function storeSum() external {
        z = x + y;
    }
}
```
- writing to storage via assigning value to z state variable
- will cost gas to execute on ethereum
- as developer, must optimize for least friction possible 

### visibility
- how accessible do you want this function to be
- public : any contract or eoa can call into this function
- external : only other contracts and eos can call, no internal calling
- interal : only contract along with its inheritance chain can call
- private - only this contract can call

**function overload**
- can declare two functions with same name if they have different parameters
- solidity will call function signatures that matches the arguments provided

## Smart Contract Compilation
- contract compilation produces two artifacts : ABI & Bytecode
- keep the ABI for front end libraries to be able to communciate with the contract
- deploy bytecode to blockchain; which is stored directly in the contract account's state trie

### abi
- abi is typically interface between two program modules
  - operating system must communicate with user program somehow
- **abi: application binary interface**
- abi defines how data structures and functions are accessed in the machine code
  - primary way of encoding/decoding data in and out of machine code

**in ethereum**
- contract's abi is standard way to interact with a contract
- abi needs to communicate with smart contracts whether you are
  - attemppting to interact with contract from outside the blockchain (via dApp)
- attempting a contract to contract interaction 
- abi is used to encode contract alls for EVM  and to read data out of transactions
- purpose of ABI in ethereum 
  - define the functions in the contract that can be invoked
  - describe how each function will accept arguments and return its result

contract.sol and abi example:
```
// SPDX-Licence-Identifier: MIT
pragma solidity 0.8.4;

contract Counter {
    uint public count;

    // Function to get the current count
    function get() public view returns (uint) {
        return count;
    }

    // Function to increment count by 1
    function inc() public {
        count += 1;
    }

    // Function to decrement count by 1
    function dec() public {
        // This function will fail if count = 0
        count -= 1;
    }
}
```
```                     
[
	{
		"inputs": [],
		"name": "count",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dec",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "inc",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
```
- abi is just one big JSON object
- abi indicates to caller of a contract function how to encode needed information (such as function signatures, variable declarations, etc) in a way that EVM knows how to communicate that call to deployed contract's bytecode
- if web application wants to interact with a smart contract on Ethereum, needs contract's address and abi
- we provide abi to front-end library which then translates and delivers any request we make using that ABI

**etheres.js example**
```
require('dotenv').config();
const ethers = require('ethers');

const contractABI = [
  {
    inputs: [],
    name: 'count',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'dec',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'get',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'inc',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const provider = new ethers.providers.AlchemyProvider(
  'goerli',
  process.env.TESTNET_ALCHEMY_KEY
);

const wallet = new ethers.Wallet(process.env.TESTNET_PRIVATE_KEY, provider);

async function main() {
  const counterContract = new ethers.Contract(
    '0x5F91eCd82b662D645b15Fd7D2e20E5e5701CCB7A',
    contractABI,
    wallet
  );

  await counterContract.inc();
}

main();
```
![diagram](https://res.cloudinary.com/divzjiip8/image/upload/v1671079099/alchemyu/Screen_Shot_2022-12-14_at_8.37.41_PM.png)
- provide abi to ethers -> make call to counter smart contract's inc() function -> frontend library translates and delivers requests using ABI
                             
### bytecode
- contract bytecode is translation of smart contract that machines can understand
- two types of bytecode
  - creation time bytecode : executed only once at deployment; contains the constructor
  - run time bytecode : stores on the blockchain as permanent executable

### transaction receipt
- once transaction is successfully sent and validated on ethereum network, receipt is generated containing logs and gas used   
- receipt is stored in receipt trie of that block
- receipt contains 4 informations : post-transaction state, cumulative gas used, set of logs created during execution (ex, did any events fire), bloom filter composed from the logs

![diagram](https://res.cloudinary.com/divzjiip8/image/upload/v1671078706/alchemyu/Screen_Shot_2022-12-14_at_8.31.19_PM.png)      

## Hardhat
- Hardhat : development environment to compile, deploy, test, and debug Ethereum smart contracts
- helps manage and automate recurring tasks that are inherent to the process of building smart contracts and dApps
- introduce more functionality around this workflow

**Hardhat features**
- local testing, including local Hardhat network
- solidity compilation and error-checking
- flexible combination with other tooling/plugins (ex: ethers.js)
- easy deployment of and interaction with smart contracts

### Hardhat project structure
when you initialize a hardhat project in your local environment, structure includes:
1. /contracts: all .sol files
2. /scripts: .js files for running scripts
3. /artifacts: artifacts produced out of contract compilation
4. /test: .js files for using testing libraries
5. hardhat.config.js: file with project configurations (SUPER IMPORTANT)

## Calling EOAs

### EOAs in smart contract
ex:
two authos of a smart contract (EOAs)
```
contract SpecialNumber {
    address author1;
    address author2;
}
```
as EOAs, we can pay them
any time this contract receieves ether, send half to author1 and author2
```
contract SpecialNumber {
    address author1;
    address author2;

    receive() external payable {
        // msg.value is passed to this contract
        uint totalValue = msg.value;

        // make a call to author1 sending half of the ether
        (bool success1, ) = author1.call{ value: totalValue / 2 }("");
        require(success1);

        // make a call to author2 sending half of the ether
        (bool success2, ) = author2.call{ value: totalValue / 2 }("");
        require(success2);
    }
}
```
- payable function : one that can receive ether
- receive function : special function that will be invoked when a smart contract received ether
  - must be external payable; can not receive arguments and return anything
- call method
  - something you'll find on every address type when you want to send input data or ether to an address --> **message call**
  - curly braces
    - {} provies opportunity to override the value and gas parameters on the message call
    - value, gasLimit, gasPrice, nonce, chainId
- ("") : where calldata would go
  - call data will specify the function you're trying to call as well as arguments
- call method returns multiple values
- fallback function : invoked when contract does not know how to respond to the data sent to it 
  - special function like receive -- can not receive arguments and return anything
  - external and can be payable
  - if external payable, replaces receive function

## Reverting Transactions
- REVERT is opcode in VM
- can be used through solidity keywords: revert, require, assert
- reverting a transaction : halt the execution of the transaction and remove all state changes
  - transaction can still be included in a block and sender will have to pay for gas
- message calls can be reverted and caught in contract making the message call (the msg.sender)
- revert : falt the execution of current transaction revert state changes that occured prior to point of execution
- require : validate a condition and revert the transaction if the condition is not met
- assert : check for conditions that should never be false under any circumstance; 
  - for logical errors or unexpected situations

example: https://etherscan.io/tx/0x6def53bf56c2eb9dc08c6b87eeaadf90c46c0f4a57aab5ce9ca1481e7ff690d5
- interacting with decentralized exchange like Uniswap, possible that when EOA signed the transaction, conditions of the market allowed the transaction to happen but at time when it was included in the block it failed one of Uniswap's checks

## Calling Contract Addresses
```
import "hardhat/console.sol";

contract A {
    function setValueOnB(address b) external {
        (bool s, ) = b.call(abi.encodeWithSignature("storeValue(uint256)", 22));
        require(s);
    }
}

contract B {
    uint x;

    function storeValue(uint256 _x) external {
        x = _x;
        console.log(x); // 22
    }
}
```
- abi.encodeWithSignature : calldata manually encoded
```
import "hardhat/console.sol";

contract A {
    function setValueOnB(address b) external {
        B(b).storeValue(22);
    }
}

contract B {
    uint x;

    function storeValue(uint256 _x) external {
        x = _x;
        console.log(x); // 22
    }
}
```
- do the same thing

if dont have access to contract B (use interface): 
```
interface B {
    function storeValue(uint256) external;
}

contract A {
    function setValueOnB(address b) external {
        B(b).storeValue(22);
    }
}
```
- only need to give solidity enough information to figure out how to encode calldata
- contract A's perspective, do not need full method deinition of storeValue

# Week 5

## Mappings

- hash table : data structure that implements associative array (dictionary)
- key value pairs
![hash diagram](https://static.javatpoint.com/ds/images/hash-table.png)
- hashtable searching O(1)
- in solidity hashtables are called mapping
- mapping act as hash tables, consisting of key types and corresponding value type pairs
``` 
mapping(_KeyType => _ValueType) public mappingName;
```
- **useful for address association**
- can associate ethereum addres to specific value

example: keep track of how many sodas a user has purchased
```
mapping(address => uint) public sodasPurchased;
```

### Accessing value types form a mapping
```
function numSodasPerUser(address _userAddress) public returns (uint) {
    return sodasPurchased[_userAddress];
}
```
```
function purchaseSoda() public {
    // we can't dispense a soda if there are none left!
    require(numSodas > 1, "Sodas must be in stock!");
    // update the mapping to reflect this msg.sender has purchased another soda
    sodasPurchased[msg.sender] += 1;
    // update the numSodas state variable to reflect there is one less soda in the vending machine smart contract
    numSodas--;
}
```

**use cases**
- ERC-20 tokens use balanceOf mapping to keep track of user balances in ERC-20 smart contract
```
mapping(address => uint) public balanceOf; // ERC-20s
mapping(address => bool) public hasVoted; // DAOs
mapping(uint => bool) public isMember; // DAOs
mapping(string => uint) public userZipCode; // general info tracking
```

### Nested mappings
ex : maps an address (the DAO voter) type to a mapping that itself maps a uint (the proposal id #) to a bool (whether the DAO voter supports that specific proposal).
```
mapping(address => mapping(uint => bool)) public votesPerProposal;
```

## Events
- events : way solidity and evm provide developers with logging functionality used to write information to data structure on blockchain that lives outside of smart contracts' storage variables
- abstraction on top of evm's low level logging functionality 
- specific opcode will depend on number of topics of event declares using indexed keyword
- low-level logs are stored in transaction receipt of transation under transaction receipts trie
- logs are written by the smart contract when the contract emits events, but these logs cannot be ready by the smart contract
- inaccessability of logs allows developers to store data on chain

### defining events
- event keyword
```
interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
}
```
- event's name : Transfer
- event's topics : from, to, value
- if variable in event is not marked as indexed it will be included when the event is emitted
  - code listening on the event will not be able to filter on non indexed variables
- whenever transfer event is emitted the from, to, and value data will be contained in the event

### emiting events
- once event has been defined, can emit event from smart contract

```
function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
    // perform various checks, such as the `from` address has `amount` of tokens
    
    // do the transfer of tokens
    unchecked {
        _balances[from] = fromBalance - amount;
        _balances[to] += amount;
    }

    // the Transfer event is emitted here
    emit Transfer(from, to, amount);

    // perform various cleanup
}
```

### Listening to events
- use ethers provider to connect to a contract and listen to transfer events and do something with event data
```
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new Contract(erc20TokenAddress, ERC20_ABI, provider);

  contract.on('Transfer', async (from, to, amount, data) => {
    console.log('Transfer event emitted. {from, to, amount, data}');
  });
```

## Escrow

- Escrow : contractual arrangement in which third party receives and disburses money or property for the primary transacting parties, with disbursement dependent on conditions agreed to by the transacting parties
- buyer seller relationship
- insert escrow agent between buyer and seller
- escrow agent is like trusted third party between buyer and seller
1) buyer sends funds to escrow agent, 
2) seller gives purchase, 

after verification: 

3) releases fund to seller if verified, and if not releases back to buyer

## Array & Structs

### Solidity Reference Types
- primitive data types / value types : stores its data directly in the variable (uint, boolean, address, etc)
- reference based data types : arrays, strings, structs, mappings
- reference type : does not store values directly in a variable; instead holds a pointer to the address of the data's location

### Arrays
- array is data structure consisting of collection of elements (values or variables) each identified by at least one array index or key
- can be both fixed or dynamic size
  - dynamic arrays : size is not predefined when they are declared; as elements are systematically added, size of array changes and during runtime, actual size of array will be determined
  - fixed arrays : have predefined size; quanitity of elements present in array should not exceed size

**Storage Arrays** - declared as state variables and can be either fixed or dynamic in size
```
contract MyContract {
    // Several ways to initialize an array

    // Dynamic sized array
    uint[] public arr;

    // Fixed sized arrays
    uint[] public arr2 = [1, 2, 3]; 
    // all elements initialize to 0
    uint[10] public myFixedSizeArr;
}
```
- .length : returns how many values an array holds per index

dynamic storage array have access to 
- .push() : used to add element to last position
- .pop() : used to remove element at last position

*iterating arrays is costly

### Structs

- struct types are used to represent a record, or grouping of common data

```
struct structName {
   type1 typeName1;
   type2 typeName2;
   type3 typeName3;
}
```

- can make array of structs

ex:
```
contract Library {

    struct Book {
        string title;
        string author;
        uint bookId;
        address registrant;
    }

    Book[] public books;

    function addBook(string memory _title, string memory _author) public {
        // whoever adds a book, that is the registrant on this book
        books.push(Book(_title, _author, books.length, msg.sender));
    }
    
    function get(uint _bookId) public view returns (string memory _title, string memory _author) {
        return(books[_bookId].title, books[_bookId].author);
    }
    
    function update(uint _bookId, string memory _newTitle, string memory _newAuthor) public {
        // protect our book record by only making
        // this function available to the original registrant
        require(msg.sender == books[_bookId].registrant, 'You must have been the one to add the book to change the record!');
        
        books[_bookId].title = _newTitle;
        books[_bookId].author = _newAuthor;
    }
}
```

- string parameters use memory; requirement of solidity when you use reference types as parameter, must precede the parameter with either memory of calldata
  - tells solidity compiler where the data being passed in lives
- calldata : read-only reference to the argument data
- memory : temporary data location to keep local variables in; only exist in memory for length of transaction
  - can read/write to this data location relatively cheaply when compared to storage
- storage : data taht gets stored on the blockchain; where state variables are stored

# Week 6

## Multi-signature Contracts

- **multi-signature contract** : smart contract designed so that multiple signatures from different addresses are needed for transaction to be executed
- used as wallets

### multi-sig utility
- acts as wallet as it can hold and transfer funds
- needs greater than one signatures to approve wallet activity such as transferring funds out 
- since multi-sigs are powered by multiple keys, they avoid a single point of failure, which makes it significantly harder for funds to be compromised
  - higher degree of security against lost or compromised keys

### no single point of failure
- EOA directly controls an address and any funds associated to it because external actor has direct ownership over private key needed to sign and authorize transactions
  - called single point of failure
    - if private key is compromised or lost, the direct control over address's balance no longer exists

![multi-sig-wallet](https://res.cloudinary.com/divzjiip8/image/upload/v1672906425/alchemyu/Untitled_17.png)

- multiple keys are required to approve in multi-sig wallet setup
- doesn't matter whether one individual loses their key as there will be other individuals that can approve 
- kick out the compromised key and re-add the compromised user under a new address
- splitting responsibility of ownership is secure even if there is malicious party in multi sig contract since they would need to corrupt a majority of the holders to compromise wallet entirely

### multi-sig contract wallet use cases
1. families : inheritance, wills, approved expenditures of house expenses,
2. businesses/startups : business expenses, trasury management, embezzlement protection
3. teams/organization : team jerseys, travel expenses

## Smart Contract Inheritance

- inheritance allows programmers to create classes that are built upon existing classes

![inheritance](https://res.cloudinary.com/divzjiip8/image/upload/v1672806772/alchemyu/Untitled_7.png)

- parent class (base classes) : animal is parent of dog
- overriden method : move is a method that Dog inherits but overwrites
- inherited method: eat
- child class (subclass)

### inheritance in solidity

- contracts can inherit other contracts by using is keyword

```
contract A {
    
}

contract B is A {
    
}
```
- contract A is base contract (parent), contract B is derived contract (child)
- single inheritance

### multi level inheritance

- instead of single parent-child there are multiple levels of parent child relationships
- aka smart contract inheritance chain

### Hierarchical inheritance

- single contract acts as a base contract for multiple derived contracts

### solidity inheritance - function syntax

- virtual : function that is going to be overriden by a child contract
- override : function that is going to override a parent function 

## ERC-20 Tokens

- ERC-20 Token is representation of some sort of asset on ethereum network
  - shares in company
  - reward system points
  - voting rights
  - cryptocurrency
  - lottery tickets
  - etc
- is technical standard
- at base level ERC-20 token smart contract uses mapping to keep track of fungible tokens : any one token is exactly equal to any other token
- ERC-20 defines common interface so that any application can use them in a standard way
- An ERC-20-compliant token contract must provide at least the following:
  - name, symbol, and decimals are all optional fields
  - totalSupply defines the current circulating supply of the tokens
  - balanceOf will return the balance for a particular user
  - transfer which is the bread and butter, transfer from one account to another
  - approve, transferFrom and allowance are methods for other contracts moving your funds

```
pragma solidity 0.8.4;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

- in solidity can inherit an interface into your own smart contract
  - must define all the methods declare on the interface

### ERC-20 Data Structures
- balances : mapping of token balances, by owner
- allowances : mapping of allowances/delegate spending

### ERC-20 transfer
- transfer : call to the transfer method
- approve-transferFrom : 

## Send ERC20s to Contracts
1. first transaction we interact with ERC20 contract using approve method:
```
contract ERC20 {
    mapping (address => mapping (address => uint256)) allowed;

    // ...

    function approve(address spender, uint256 value) public returns (bool success) {
        allowed[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
}
```
- allows spender to spend tokens behalf of msg.sender

2. second transaction we call the Spender smart contract to spend to pull our tokens
```
contract Spender {
    mapping(address => uint) pooled;
    address erc20;

    // ...

    function poolTokens(uint256 amount) public returns (bool success) {
        // pull the tokens from the msg.sender using transferFrom
        bool success = ERC20(erc20).transferFrom(msg.sender, address(this), amount);
        require(success);
        
        // account for this balance update 
        pooled[msg.sender] += amount;
    }
}

contract ERC20 {
    mapping (address => uint256) balances;
    mapping (address => mapping (address => uint256)) allowed;
    
    // ...

    function transferFrom(address from, address to, uint256 value) public returns (bool success) {
        balances[to] += value;
        balances[from] -= value;
        allowed[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }
}
```
- call poolTokens on Spender and the contract would pull tokens from ERC20 contract. then Spender contract can account for balance change

## NFTs

- NFT stands for Non Fundible Token
  - token that has unique characteristics
- could be items that unlock digital experiences like app privileges, tickets to digital shows, video game items, etc
- Unlike ERC20s, NFTs will often store some of their data off-chain
- uint is expensive so 5mb image must be costly
- data stored off chain is referred to as metadata
- where is it stored off-chain?
  - most NFT collections use decentralized file networks like IPFS and Areweave
- IPFS uses "content addressing" to store data on a peer-to-peer network
- data is stored as a hash of the contents


# Week 7 

## Storage Slots
- spot where some storage value is stored
- ex: 
  - uint256 x = 97 // 0x0
  - uint256 y = 56 // 0x1
  - mapping(uint=>uint) // 0x2

  - solidity will store this between 0x0 -> 0xffff...
  - takes storage variable and stores to 0x0...000
- all storage spots is available in public database the ethereum creates -> can use json to access and look up 
- mapping storage : take keccak256 hash of key + base slot
  - mapping(uint=>uint) testing // 0x2
  - 0x2 is base
  - keccak256(0x1 + 0x2)
  - testing[1] = 5;
  - keccak256(0x2 + 0x2)
  - testing[2] = 6;
- storage slot 32 bytes : 256 bits
- keccak256 also creates 32 bytes output

## Delegatecall
- ex: 
  - function signature : add(uint256, uint256) 0xf3af3849
  - arguments : 0x0{63}1, 0x0{63}b
  - = 0xf3af3849
  00000000000000000000000000000...1
  00000000000000000000000000000...b
- calldata: function signature + padded arguments
- EOA -> contract A (msg.sender: EOA) -> contract B (msg.sender : A)
- proxy to an implementation: 
  - EOA -> proxy -> implementation
  use cases : upgrades, gas savings
- save on Gas by deploying one implementation and delegating to it

## Libraries
- like contracts but cannot store storage variables and cant send ether to them
- often pulled into smart contract bytecode directly by compiler 
- most of libraries used by Uniswap v3 core contain utility functions

two ways to use libraries:
1. deployed inline
- when all functions from a library function are marked as internal, will be pulled directly into smart contract bytecode by solidity compiler
- pulled inline with contract and deployed together
2. deployed separately 
- can be helpful in that it can keep smart contract below 24kb limit
- can potentially share an on-chain library with other contracts -> can help ease deployment burden 
- library can run code on behalf of contract
  - when call external function on library, delegatecall will be made
- when library is deployed separately, compiler requires that you link the contract to the library you intend to deploy it with 

**OpenZeppelin provides many great Solidity libraries that have been audited by leading security firms in the field 

- if contract uses a library function marked as internal -> code will be copied into the contract itself and compiled WITH contract
- if contract uses a library function marked as external or public -> library must be deployed to its own address. contract is then linked to the library address
  - at runtime contract will create a message using DELGATECALL (EVM opcode) to access library function 
- function marked as private has no access to it

## Upgradeable Smart Contracts
- smart contracts can be written to be upgradeable 
- by design, smart contracts are immutable 

### How do upgradeable smart contracts work?
- composed of 3 contracts:
1. Proxy contract : smart contract the user interacts with directly
  - contract holds the contract state
  - EIP1967 standard proxy contract
  - in charge of forwarding transactions to the implementation contract 
2. Implementation contract : contract that provides skeleton logic and data
  - where you instantiate your variables
  - proxy contract via delegatecalls into this one, will give them value
3. ProxyAdmin contract : contract links Proxy and Implementation
  - holds authority over Proxy to upgrade the Proxy contract and thus link that proxy to a new implementation contract 

![diagram](https://res.cloudinary.com/divzjiip8/image/upload/v1673520308/alchemyu/Untitled_20.png)

**steps:**
1. The user performs a call into the Proxy contract
2. That call hits the fallback function of the Proxy contract which is directly rigged to delegatecall into the Implementation contract address
3. In performing a delegatecall, the context of the Proxy contract is forwarded. This means that the storage of 0x1234.1111 will be directly affected by the logic of 0x1234.4444 (that's the whole point of delegatecall!)
4. The logic from Implementation is performed on the state of Proxy and if the logic does not revert, the state is returned to Proxy which then returns a receipt to the original user
5. Transaction over! 

## The state of Governance
![governance-system](https://res.cloudinary.com/divzjiip8/image/upload/c_scale,w_750/v1647399476/gov_diagram_q4jeam.png)

- executable proposal can be created which could be anything
- proposal is voted upon by token holders
- if minimum voting thresholds are reached, vote will be queued for eventual execution 

