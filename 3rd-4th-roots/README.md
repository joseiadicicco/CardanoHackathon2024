[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/gwqsiey-)

# dExpo - Decentralized Exposition

- [dExpo - Decentralized Exposition](#dexpo---decentralized-exposition)
  - [Cardano \& Midnight Hackathon Project](#cardano--midnight-hackathon-project)
  - [Overview](#overview)
  - [Problem Statement](#problem-statement)
  - [Technical Research](#technical-research)
  - [Proposed Solution](#proposed-solution)
    - [Platform Features](#platform-features)
  - [Midnight Integration](#midnight-integration)
    - [Security Features](#security-features)
  - [Repository](#repository)
  - [Resources and Documentation](#resources-and-documentation)
    - [Cardano Improvement Proposals (CIP)](#cardano-improvement-proposals-cip)
    - [Development Resources](#development-resources)
      - [Haddock Documentation](#haddock-documentation)
      - [Aiken \& Cardano CLI](#aiken--cardano-cli)
      - [MeshJS](#meshjs)
    - [Smart Contracts](#smart-contracts)
    - [Explorers \& Tools](#explorers--tools)
    - [Committee Portal](#committee-portal)
    - [Midnight Resources](#midnight-resources)
  - [Repository](#repository-1)
  - [License](#license)
  - [Contributing](#contributing)

## Cardano & Midnight Hackathon Project

**Team:** 3rd & 4th-roots

## Overview

dExpo (Decentralized Exposition) is a project developed for the Cardano Tech Week hackathon, focusing on Governance. The platform addresses the lack of transparency in committee member selection and election processes by providing comprehensive data visualization about committee members and their actions, enabling users to track voting patterns and abstentions. Our goal is to enhance transparency and gather community feedback on committee perceptions while facilitating committee membership applications, action proposals, and voting processes.

## Problem Statement

- Identified significant information gap regarding Cardano's Constitutional Committee
- Limited data availability about functions, election processes, and current members
- Existing governance tools provide incomplete information
- Governance actions for declaring new members not yet implemented

## Technical Research

- Conducted comprehensive testing using Dev Studio across multiple networks
- Performed detailed analysis of https://gov.tools/dashboard and various explorers
- Implemented CLI node queries with limited results:
  ````
  cardano-cli conway query gov-state --socket-path /ipc/node.socket --testnet-magic 2
  cardano-cli conway query gov-state --socket-path /ipc/node.socket --mainnet
  ````
- Developed extended JSON for complete visualization simulation:
  - Maintains original format
  - Includes additional committee member actions and votes

## Proposed Solution

### Platform Features

1. Constitutional Information
   - Current constitution documentation
   - Member code of conduct draft

2. Committee Member Portal
   - Detailed member profiles
   - Comprehensive voting history

3. Election System
   - Candidacy submission platform
   - Voting mechanism

4. Governance Actions
   - Candidate proposal system
   - Information action polling for consensus building

## Midnight Integration

### Security Features

1. KYC Implementation
   - Candidate verification system
   - Identity validation protocols

2. Private Voting System
   - Conflict of interest prevention
   - Anonymous voting capabilities

3. Eligibility Validation
   - Verifiable proof system
   - Credential verification

## Repository

Project repository for the hackathon is available at:
[https://github.com/tech-week-hackathon/hackathon-3rd-4th-roots](https://github.com/tech-week-hackathon/hackathon-3rd-4th-roots)

## Resources and Documentation

### Cardano Improvement Proposals (CIP)
- [CIP-1694 Documentation](https://github.com/cardano-foundation/CIPs/tree/master/CIP-1694#delegated-representatives-dreps)
- [Conway Ledger Specifications](https://intersectmbo.github.io/formal-ledger-specifications/pdfs/conway-ledger.pdf)

### Development Resources
#### Haddock Documentation
- [Script Purposes](https://plutus.cardano.intersectmbo.org/docs/working-with-scripts/script-purposes/#voting)
- [Plutus Ledger API](https://plutus.cardano.intersectmbo.org/haddock/latest/plutus-ledger-api/PlutusLedgerApi-V3-Contexts.html#t:ScriptPurpose)

#### Aiken & Cardano CLI
- [Aiken Governance](https://aiken-lang.github.io/stdlib/cardano/governance.html)
- [Cardano CLI Governance](https://developers.cardano.org/docs/get-started/cardano-cli/governance/)

#### MeshJS
- [Next.js Integration](https://meshjs.dev/guides/nextjs)
- [Governance TX Builder](https://meshjs.dev/apis/txbuilder/governance)

### Smart Contracts
- [Always Yes DRep Example](https://github.com/perturbing/always-yes-drep)
- [Constitution & Guardrails](https://github.com/IntersectMBO/plutus/tree/master/cardano-constitution)
- [DRep Metadata JSON Example](https://raw.githubusercontent.com/cardano-foundation/CIPs/master/CIP-0119/examples/drep.jsonld)

### Explorers & Tools
- [Cardanoscan Governance](https://cardanoscan.io/gov/committee)
- [Governance Tools Dashboard](https://gov.tools/dashboard)
- [GovTool Repository](https://github.com/IntersectMBO/govtool/)
- [Governance Tools Development](https://docs.gov.tools/participate-in-development/governance-tools-open-repositories)

### Committee Portal
- [Constitution Portal](https://constitution.gov.tools/en)
- [CC Portal Repository](https://github.com/IntersectMBO/cc-portal)

### Midnight Resources
- [Main Website](https://midnight.network/)
- [Documentation](https://docs.midnight.network/)
- [Development Prerequisites](https://docs.midnight.network/develop/tutorial/using/prereqs#supported-platforms)
- [Tools & Releases](https://releases.midnight.network/)

## Repository

Project repository for the hackathon is available at:
[https://github.com/tech-week-hackathon/hackathon-3rd-4th-roots](https://github.com/tech-week-hackathon/hackathon-3rd-4th-roots)

## License

[License information to be added]

## Contributing

[Contribution guidelines to be added]

