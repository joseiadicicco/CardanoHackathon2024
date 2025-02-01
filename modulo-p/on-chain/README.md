# Lotería en babilonia: A lotocracy protocol.

## Overview

Inspired by Jorge Luis Borges’ The Lottery in Babylon, the project explores the concept of lotocracy, where randomness determines key societal roles. Our decentralized application (dApp) leverages Cardano's Proof of Work randomness and Fortuna, a randomness generator, to select delegates or representatives.

## How It Works

Fortuna mines tokens by using proof of work. The nonce used to mine the Fortuna tokens, can serve as a random beacon for various applications.

### Block Commitments

Users signal their intent to participate by making a commitment to a future Fortuna block. This initiates their involvement in the delegation process.


1. Minting Phase


**Conditions for minting:** 

- Just one token is minted, the Loto NFT.
- The Loto NFT is locked into the contract.
- The block number committed by the user is higher than the current fortuna block. The Fortuna utxo must be used as reference input.
- Although is not strict, while the minting process the user have to register two delegates.

2. Claiming phase

Once the commited block has occured, the beacon will do arbitrage of which candidate is chosen. The Fortuna nonce is transformed into a integer which is divided by two. If its even the first candidate is elected, if it is odd then the second candidate is elected. The elected party can unlock the Loto token. 

The following conditions have to occur:

- The fortuna reference input must be used, which is therefore used to extract the beacon.
- The candidate must withdraw the Loto token by signing the Tx. As mentioned, the candidate will be evaluated according if the beacon is odd or even.


Two types of claiming are implemented:


**Normal Claim**

To ease the flow of the prototyping. One condition is to claim if at least the block is higher than the commited block. This make the claiming insecure because an attacker can wait a beacon that benefits him/her.

**Hardcore claim**

The claim has to be made usin the exact commited block. This make the election fully deterministic, although if a new block is mined, then datum will changed and the opportunity to claim the Loto token will be gone forever. As we know contracts can't read past or consumed datums. The claim has to be within 10 minutes.


## Using the project

The validator is on the `on-chain`repository. The compilation can be check with:

```bash
aiken check
```

The validator can be built with: 

```bash 
aiken build
```


This project uses node `v22.11.0` version and it is an npm project. It includes scripts to build and run the npm project.

```bash
npm run build
npm run start  #THis will execute the index.js file. The actual program.
```