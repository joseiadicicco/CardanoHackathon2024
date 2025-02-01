# Lotería en Babilonia: A Lotocracy Protocol

## Overview

Inspired by Jorge Luis Borges’ *The Lottery in Babylon*, this project explores the concept of lotocracy, where randomness determines key societal roles. Our decentralized application (dApp) leverages Cardano's Proof-of-Work randomness and Fortuna, a randomness generator, to select delegates or representatives.

## How It Works

Fortuna mines tokens using a proof-of-work mechanism. The nonce used to mine Fortuna tokens serves as a random beacon for various applications.

### Block Commitments

Users signal their intent to participate by committing to a future Fortuna block. This initiates their involvement in the delegation process.

1. **Minting Phase**

   **Conditions for minting:** 
   - Only one token is minted, the Loto NFT.
   - The Loto NFT is locked into the contract.
   - The block number committed by the user must be higher than the current Fortuna block. The Fortuna UTxO must be used as a reference input.
   - While not strictly enforced, during the minting process, the user is encouraged to register two delegates.

2. **Claiming Phase**

   Once the committed block has occurred, the beacon determines which candidate is chosen. The Fortuna nonce is transformed into an integer, which is then divided by two. If the result is even, the first candidate is elected; if it is odd, the second candidate is elected. The elected party can unlock the Loto token.

   The following conditions must be met:
   - The Fortuna reference input must be used to extract the beacon.
   - The candidate must withdraw the Loto token by signing the transaction. The candidate is evaluated based on whether the beacon is odd or even.

   Two types of claims are implemented:

   **Normal Claim**
   - To simplify prototyping, a claim can be made as long as the block number is higher than the committed block. However, this makes the claiming process insecure because an attacker could wait for a beacon that benefits them.

   **Hardcore Claim**
   - The claim must be made using the exact committed block. This ensures the election is fully deterministic. However, if a new block is mined, the datum will change, and the opportunity to claim the Loto token will be lost forever. As contracts cannot read past or consumed datums, the claim must be made within 10 minutes.

## Using the Project

The validator is available in the `on-chain` repository. You can check the compilation with:

```bash
aiken check
aiken build
```

This project uses node `v22.11.0` version and it is an npm project. It includes scripts to build and run the npm project.

```bash
npm run build
npm run start  #THis will execute the index.js file. The actual program.
```