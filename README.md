# Ethereum Bootcamp notes

- [Ethereum Bootcamp notes](#ethereum-bootcamp-notes)
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
  <br>
  consensus of proof of work :
  1. you cannot double spend
  2. longest chain will be the one the rest of the nodes accept as the one "true" chain
     <br>
- PoW consensus mechanism allows decentralized networks to agree on things like account balnaces, order of transactions, etc.
- resistant to attack
- mining : process of creating a block of transactions to be added to a blockchain (work in PoW)
- require miners to produce an output in a very difficult to get target range
- miners take data and hash it
- PoW networks have target_difficulty
- for miner to add a new block, must find a PoW lower than the network target difficulty
- "If you want to add a new block, you must provide a proof-of-work with 12 leading zeroes."
  <br>
- PoW mining algorithm :
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
     <br>
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
  <br>
- **architecture of bitcoin block:**
  ![bitcoin block](https://www.researchgate.net/publication/343236094/figure/fig1/AS:917904996462593@1595857013751/Bitcoin-block-structure.ppm)

- all of the transactions per block are arranged into big merkle tree
- merkle tree's root hash gets committed into the block
- transaction data can be stored off-chain
- more efficient storage on blockchain -- only need to commit one piece of data than thousands of transactions
- design purposed: **keep size of blockchain small**; must account for efficient data storage
- benefit of merkle tree design : **allows for efficient proof that some data exists / merkle proofs**
- merkle proof confirms specific transactions represented by a leaf or branch hash within merkle hash root
  <br>
  merkle tree is:
  1. space and computationally efficient : reduce memory needed to verify that data has maintained its integrity
  2. good for scalability and decentralization : require less data to be broadcast across the blockchain network to verify data and transactions
  3. no need to pack a block full of transactions, just use merkle root hash : allow Simple Payment Verification (SPV) which helps verify a transaction without downloading entire block -- allows to send and receive transactions using a light client node (crypto wallet)
     <br>
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
  <br>
  two different types of data:
  1. **permanent :** transaction occurs, record is sealed forever --> once you locate transaction in a block's transaction trie, can return to same path over and over to retrieve same result
  2. **ephemeral :** account states change all the time (receiving ether, interacting with contracts, etc) --> nonce, balance, storageRoot, codeHash
     <br>
- permanent and ephemeral data should be stored separately. **Merkle tree is good for permanent, PMT is good for ephemeral data**
- ethereum account state needs to be frequently updated
- **block header :** hash result of all data elements contained in a block
- **state root :** root hash of state trie
- **transactions root** : root has of block's transactions
- **receipts root :** root hash of receipts trie  
  <br>
- **ethereum : state trie**
  ![state trie](https://res.cloudinary.com/divzjiip8/image/upload/v1669868801/guides/Screen_Shot_2022-11-30_at_8.26.05_PM.png)

- state trie acts as mapping between addresses and account states
- can be seen as a global state that is constantly updated by transaction executions. all the information about accounts are stored in the world state trie and you can retrieve information by querying it
- from javascript request to ethereum world date, you will get object containing some data: ex) balance = , nonce = , root = , codeHash =
  <br>
- **ethereum : transaction trie**
- ![transaction trie](https://res.cloudinary.com/divzjiip8/image/upload/v1669869222/guides/Screen_Shot_2022-11-30_at_8.33.27_PM.png)

- transaction trie records transactions in ethereum; once block is mined, transaction trie is never updated
- each transaction in ethereum records multiple pieces specific to each transaction such as gasPrice, value, from, etc
- Etherscan - query the Ethereum blockchain for transaction data then index into organized transaction viewer
  <br>
- **ethereum: transaction receipt trie**
- transaction receipt trie records receipts (outcomes) of transactions; ex( gasUsed, logs, etc
- once block is mined, transaction receipt trie is never updated
  ![block](https://res.cloudinary.com/divzjiip8/image/upload/v1669869958/guides/Screen_Shot_2022-11-30_at_8.45.47_PM.png)
