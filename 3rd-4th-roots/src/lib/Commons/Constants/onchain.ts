// import { SpendingValidator, MintingPolicy } from 'lucid-cardano';

// export const mintingPolicyID_TN = 'EntityPolicyID';

// export const marketPlaceVersion = 1

// export const lovelaceToAda = BigInt(1_000_000);

// export const validatorScript: SpendingValidator = {
//     type: 'PlutusV2',
//     script: 'xxx',
// };

// export const mintingPolicyIDPreScriptCBORHEX =
//     'xxx';

// export const mintingPolicyIDPreScript: MintingPolicy = {
//     type: 'PlutusV2',
//     script: mintingPolicyIDPreScriptCBORHEX,
// };// Leer y parsear el archivo JSON
export const jsonDataExtended = {
  committee: {
    members: {
      "scriptHash-2f4a6c6f098e20ee4bfd5b39942c164575f8ceb348e754df5d0ec04f": 229,
      "scriptHash-5098dfd0deba725fadd692198fc33ee959fbe7e6edf1b5a695e06e61": 229,
      "scriptHash-5a71f17f4ce4c1c0be053575d717ade6ad8a1d5453d02a65ce40d4b1": 229,
      "scriptHash-6095e643ea6f1cccb6e463ec34349026b3a48621aac5d512655ab1bf": 229,
      "scriptHash-94c0de47e7ae32e3f7234ada5cf976506b68e3bb88c54dc53b4ba984": 229,
      "scriptHash-94f51c795a6c11adb9c1e30f0b6def4230cbd0b8bc800098e2d2307b": 229,
      "scriptHash-a6a5e006fd4e8f51062dc431362369b2a43140abced8aa2ff2256d7b": 229,
    },
    threshold: {
      denominator: 3,
      numerator: 2,
    },
  },
  constitution: {
    anchor: {
      dataHash:
        "ca41a91f399259bcefe57f9858e91f6d00e1a38d6d9c63d4052914ea7bd70cb2",
      url: "ipfs://bafkreifnwj6zpu3ixa4siz2lndqybyc5wnnt3jkwyutci4e2tmbnj3xrdm",
    },
    script: "fa24fb305126805cf2164c161d852a0e7330cf988f1fe558cf7d4a64",
  },
  currentPParams: {},
  futurePParams: {},
  nextRatifyState: {
    enactedGovActions: [],
    expiredGovActions: [],
    nextEnactState: {
      committee: {
        members: {
          "scriptHash-2f4a6c6f098e20ee4bfd5b39942c164575f8ceb348e754df5d0ec04f": 229,
          "scriptHash-5098dfd0deba725fadd692198fc33ee959fbe7e6edf1b5a695e06e61": 229,
          "scriptHash-5a71f17f4ce4c1c0be053575d717ade6ad8a1d5453d02a65ce40d4b1": 229,
          "scriptHash-6095e643ea6f1cccb6e463ec34349026b3a48621aac5d512655ab1bf": 229,
          "scriptHash-94c0de47e7ae32e3f7234ada5cf976506b68e3bb88c54dc53b4ba984": 229,
          "scriptHash-94f51c795a6c11adb9c1e30f0b6def4230cbd0b8bc800098e2d2307b": 229,
          "scriptHash-a6a5e006fd4e8f51062dc431362369b2a43140abced8aa2ff2256d7b": 229,
        },
        threshold: {
          denominator: 3,
          numerator: 2,
        },
      },
      constitution: {
        anchor: {
          dataHash:
            "ca41a91f399259bcefe57f9858e91f6d00e1a38d6d9c63d4052914ea7bd70cb2",
          url: "ipfs://bafkreifnwj6zpu3ixa4siz2lndqybyc5wnnt3jkwyutci4e2tmbnj3xrdm",
        },
        script: "fa24fb305126805cf2164c161d852a0e7330cf988f1fe558cf7d4a64",
      },
      curPParams: {},
      prevGovActionIds: {
        Committee: null,
        Constitution: null,
        HardFork: {
          govActionIx: 0,
          txId: "ccb27f6b0d58c25ae33fd821b62c387f5230dae930afd07489fa3df56ae56522",
        },
        PParamUpdate: {
          govActionIx: 0,
          txId: "b52f02288e3ce8c7e57455522f4edd09c12797749e2db32098ecbe980b645d45",
        },
      },
      prevPParams: {},
    },
    ratificationDelayed: false,
  },
  previousPParams: {},
  proposals: [
    {
      actionId: {
        govActionIx: 0,
        txId: "8338efe8106db60822fef974b9914cbd012205232b39d151c1720ec36e71fe9f",
      },
      committeeVotes: {
        "scriptHash-94c0de47e7ae32e3f7234ada5cf976506b68e3bb88c54dc53b4ba984": {
          anchor: {
            dataHash:
              "ca41a91f399259bcefe57f9858e91f6d00e1a38d6d9c63d4052914ea7bd70cb2",
            url: "ipfs://bafkreifnwj6zpu3ixa4siz2lndqybyc5wnnt3jkwyutci4e2tmbnj3xrdm",
          },
          decision: "VoteYes",
        },
        "scriptHash-94f51c795a6c11adb9c1e30f0b6def4230cbd0b8bc800098e2d2307b": {
          decision: "VoteNo",
        },
      },
      dRepVotes: {
        "keyHash-11ee7ea43198d7265e6e46ad56caff515b974dd2af4ff1c2562a4f43": {
          decision: "VoteYes",
        },
        "keyHash-d1bffcf5008a05f9103c36904f5a68d362aead7b4399c5a1ce420e50": {
          anchor: {
            dataHash:
              "abc12391f399259bcefe57f9858e91f6d00e1a38d6d9c63d4052914ea7anchor",
            url: "ipfs://example.com/dRepVoteData",
          },
          decision: "VoteYes",
        },
      },
      expiresAfter: 183,
      proposalProcedure: {
        anchor: {
          dataHash:
            "179df93f3456f540d773c5802786ac08a92260e241d1b7109416891d849521fa",
          url: "https://my-ip.at/test/CIP108-example-signer.json",
        },
        deposit: 100000000000,
        govAction: {
          tag: "InfoAction",
        },
        returnAddr: {
          credential: {
            keyHash: "c13582aec9a44fcc6d984be003c5058c660e1d2ff1370fd8b49ba73f",
          },
          network: "Testnet",
        },
      },
      proposedIn: 177,
      stakePoolVotes: {
        f9c8e7275348d3b1a3596c94095f43307990cc5f800bbbb256298658: {
          decision: "VoteYes",
        },
      },
    },
    {
      actionId: {
        govActionIx: 1,
        txId: "a338efe8106db60822fef974b9914cbd012205232b39d151c1720ec36e72fe9f",
      },
      committeeVotes: {
        "scriptHash-5098dfd0deba725fadd692198fc33ee959fbe7e6edf1b5a695e06e61": {
          anchor: {
            dataHash:
              "ba81a91f399259bcefe57f9858e91f6d00e1a38d6d9c63d4052914ea7bd60cb1",
            url: "ipfs://bafkreifnwj6zpu3ixa4siz2lndqybyc5wnnt3jkwyutci4e2tmbnj3xexample",
          },
          decision: "VoteNo",
        },
        "scriptHash-94c0de47e7ae32e3f7234ada5cf976506b68e3bb88c54dc53b4ba984": {
          anchor: {
            dataHash:
              "def45691f399259bcefe57f9858e91f6d00e1a38d6d9c63d4052914ea7anchor",
            url: "ipfs://example.com/committeeVoteAnchor",
          },
          decision: "VoteYes",
        },
      },
      dRepVotes: {
        "keyHash-11ee7ea43198d7265e6e46ad56caff515b974dd2af4ff1c2562a4f43": {
          decision: "VoteNo",
        },
        "keyHash-d1bffcf5008a05f9103c36904f5a68d362aead7b4399c5a1ce420e50": {
          decision: "VoteYes",
        },
      },
      expiresAfter: 200,
      proposalProcedure: {
        anchor: {
          dataHash:
            "279df93f3456f540d773c5802786ac08a92260e241d1b7109416891d849521fa",
          url: "https://future.example.com/CIP203-example-signer.json",
        },
        deposit: 150000000000,
        govAction: {
          tag: "UpdateAction",
          details: "Increase block size for network scalability.",
        },
        returnAddr: {
          credential: {
            keyHash: "d34582aec9a44fcc6d984be003c5058c660e1d2ff1370fd8b49ba73f",
          },
          network: "Mainnet",
        },
      },
      proposedIn: 190,
      stakePoolVotes: {
        f9c8e7275348d3b1a3596c94095f43307990cc5f800bbbb256298658: {
          anchor: {
            dataHash:
              "ghi78991f399259bcefe57f9858e91f6d00e1a38d6d9c63d4052914ea7anchor",
            url: "ipfs://example.com/stakePoolVoteData",
          },
          decision: "VoteYes",
        },
      },
    },
    {
      actionId: {
        govActionIx: 2,
        txId: "b338efe8106db60822fef974b9914cbd012205232b39d151c1720ec36e73fe9f",
      },
      committeeVotes: {
        "scriptHash-94c0de47e7ae32e3f7234ada5cf976506b68e3bb88c54dc53b4ba984": {
          decision: "Abstain",
          anchor: {
            dataHash:
              "jkl01291f399259bcefe57f9858e91f6d00e1a38d6d9c63d4052914ea7anchor",
            url: "ipfs://example.com/committeeVoteAnchor1",
          },
        },
      },
      dRepVotes: {
        "keyHash-11ee7ea43198d7265e6e46ad56caff515b974dd2af4ff1c2562a4f43": {
          decision: "VoteYes",
        },
        "keyHash-d1bffcf5008a05f9103c36904f5a68d362aead7b4399c5a1ce420e50": {
          decision: "VoteNo",
        },
      },
      expiresAfter: 250,
      proposalProcedure: {
        anchor: {
          dataHash:
            "abced93f3456f540d773c5802786ac08a92260e241d1b7109416891d849521fa",
          url: "https://future.example.com/CIP301-example-signer.json",
        },
        deposit: 200000000000,
        govAction: {
          tag: "HardForkInitiation",
          details: "New feature for security.",
        },
        returnAddr: {
          credential: {
            keyHash: "g34582aec9a44fcc6d984be003c5058c660e1d2ff1370fd8b49ba73f",
          },
          network: "Mainnet",
        },
      },
      proposedIn: 210,
      stakePoolVotes: {
        f9c8e7275348d3b1a3596c94095f43307990cc5f800bbbb256298658: {
          decision: "VoteYes",
        },
      },
    },
    {
      actionId: {
        govActionIx: 3,
        txId: "c338efe8106db60822fef974b9914cbd012205232b39d151c1720ec36e74fe9f",
      },
      committeeVotes: {
        "scriptHash-94c0de47e7ae32e3f7234ada5cf976506b68e3bb88c54dc53b4ba984": {
          decision: "VoteNo",
          anchor: {
            dataHash:
              "lmn03491f399259bcefe57f9858e91f6d00e1a38d6d9c63d4052914ea7anchor",
            url: "ipfs://example.com/committeeVoteAnchor2",
          },
        },
      },
      dRepVotes: {
        "keyHash-11ee7ea43198d7265e6e46ad56caff515b974dd2af4ff1c2562a4f43": {
          decision: "VoteNo",
        },
        "keyHash-d1bffcf5008a05f9103c36904f5a68d362aead7b4399c5a1ce420e50": {
          decision: "VoteYes",
        },
      },
      expiresAfter: 300,
      proposalProcedure: {
        anchor: {
          dataHash:
            "bcdef93f3456f540d773c5802786ac08a92260e241d1b7109416891d849521fa",
          url: "https://future.example.com/CIP302-example-signer.json",
        },
        deposit: 250000000000,
        govAction: {
          tag: "UpdateAction",
          details: "Increase transaction throughput.",
        },
        returnAddr: {
          credential: {
            keyHash: "h34582aec9a44fcc6d984be003c5058c660e1d2ff1370fd8b49ba73f",
          },
          network: "Mainnet",
        },
      },
      proposedIn: 220,
      stakePoolVotes: {
        f9c8e7275348d3b1a3596c94095f43307990cc5f800bbbb256298658: {
          decision: "VoteYes",
        },
      },
    },
    {
      actionId: {
        govActionIx: 4,
        txId: "d338efe8106db60822fef974b9914cbd012205232b39d151c1720ec36e75fe9f",
      },
      committeeVotes: {
        "scriptHash-94c0de47e7ae32e3f7234ada5cf976506b68e3bb88c54dc53b4ba984": {
          decision: "VoteYes",
          anchor: {
            dataHash:
              "opq04591f399259bcefe57f9858e91f6d00e1a38d6d9c63d4052914ea7anchor",
            url: "ipfs://example.com/committeeVoteAnchor3",
          },
        },
      },
      dRepVotes: {
        "keyHash-11ee7ea43198d7265e6e46ad56caff515b974dd2af4ff1c2562a4f43": {
          decision: "VoteYes",
        },
        "keyHash-d1bffcf5008a05f9103c36904f5a68d362aead7b4399c5a1ce420e50": {
          decision: "VoteNo",
        },
      },
      expiresAfter: 400,
      proposalProcedure: {
        anchor: {
          dataHash:
            "cdef93f3456f540d773c5802786ac08a92260e241d1b7109416891d849521fa",
          url: "https://future.example.com/CIP303-example-signer.json",
        },
        deposit: 300000000000,
        govAction: {
          tag: "TreasuryWithdrawal",
          details: "Funding for community projects.",
        },
        returnAddr: {
          credential: {
            keyHash: "i34582aec9a44fcc6d984be003c5058c660e1d2ff1370fd8b49ba73f",
          },
          network: "Mainnet",
        },
      },
      proposedIn: 230,
      stakePoolVotes: {
        f9c8e7275348d3b1a3596c94095f43307990cc5f800bbbb256298658: {
          decision: "VoteNo",
        },
      },
    },
    {
      actionId: {
        govActionIx: 5,
        txId: "e338efe8106db60822fef974b9914cbd012205232b39d151c1720ec36e76fe9f",
      },
      committeeVotes: {
        "scriptHash-94c0de47e7ae32e3f7234ada5cf976506b68e3bb88c54dc53b4ba984": {
          decision: "VoteNo",
          anchor: {
            dataHash:
              "rst05691f399259bcefe57f9858e91f6d00e1a38d6d9c63d4052914ea7anchor",
            url: "ipfs://example.com/committeeVoteAnchor4",
          },
        },
      },
      dRepVotes: {
        "keyHash-11ee7ea43198d7265e6e46ad56caff515b974dd2af4ff1c2562a4f43": {
          decision: "VoteYes",
        },
        "keyHash-d1bffcf5008a05f9103c36904f5a68d362aead7b4399c5a1ce420e50": {
          decision: "Abstain",
        },
      },
      expiresAfter: 500,
      proposalProcedure: {
        anchor: {
          dataHash:
            "defg93f3456f540d773c5802786ac08a92260e241d1b7109416891d849521fa",
          url: "https://future.example.com/CIP304-example-signer.json",
        },
        deposit: 350000000000,
        govAction: {
          tag: "ConstitutionUpdate",
          details: "Amendment to decentralized governance structure.",
        },
        returnAddr: {
          credential: {
            keyHash: "j34582aec9a44fcc6d984be003c5058c660e1d2ff1370fd8b49ba73f",
          },
          network: "Mainnet",
        },
      },
      proposedIn: 240,
      stakePoolVotes: {
        f9c8e7275348d3b1a3596c94095f43307990cc5f800bbbb256298658: {
          decision: "VoteYes",
        },
      },
    },
  ],
};

export const jsonDataActual = {
  committee: {
    members: {
      "scriptHash-2f4a6c6f098e20ee4bfd5b39942c164575f8ceb348e754df5d0ec04f": 229,
      "scriptHash-5098dfd0deba725fadd692198fc33ee959fbe7e6edf1b5a695e06e61": 229,
      "scriptHash-5a71f17f4ce4c1c0be053575d717ade6ad8a1d5453d02a65ce40d4b1": 229,
      "scriptHash-6095e643ea6f1cccb6e463ec34349026b3a48621aac5d512655ab1bf": 229,
      "scriptHash-94c0de47e7ae32e3f7234ada5cf976506b68e3bb88c54dc53b4ba984": 229,
      "scriptHash-94f51c795a6c11adb9c1e30f0b6def4230cbd0b8bc800098e2d2307b": 229,
      "scriptHash-a6a5e006fd4e8f51062dc431362369b2a43140abced8aa2ff2256d7b": 229,
    },
    threshold: {
      denominator: 3,
      numerator: 2,
    },
  },
  constitution: {
    anchor: {
      dataHash:
        "ca41a91f399259bcefe57f9858e91f6d00e1a38d6d9c63d4052914ea7bd70cb2",
      url: "ipfs://bafkreifnwj6zpu3ixa4siz2lndqybyc5wnnt3jkwyutci4e2tmbnj3xrdm",
    },
    script: "fa24fb305126805cf2164c161d852a0e7330cf988f1fe558cf7d4a64",
  },
  futurePParams: {
    tag: "NoPParamsUpdate",
  },
  nextRatifyState: {
    enactedGovActions: [],
    expiredGovActions: [],
    nextEnactState: {
      committee: {
        members: {
          "scriptHash-2f4a6c6f098e20ee4bfd5b39942c164575f8ceb348e754df5d0ec04f": 229,
          "scriptHash-5098dfd0deba725fadd692198fc33ee959fbe7e6edf1b5a695e06e61": 229,
          "scriptHash-5a71f17f4ce4c1c0be053575d717ade6ad8a1d5453d02a65ce40d4b1": 229,
          "scriptHash-6095e643ea6f1cccb6e463ec34349026b3a48621aac5d512655ab1bf": 229,
          "scriptHash-94c0de47e7ae32e3f7234ada5cf976506b68e3bb88c54dc53b4ba984": 229,
          "scriptHash-94f51c795a6c11adb9c1e30f0b6def4230cbd0b8bc800098e2d2307b": 229,
          "scriptHash-a6a5e006fd4e8f51062dc431362369b2a43140abced8aa2ff2256d7b": 229,
        },
        threshold: {
          denominator: 3,
          numerator: 2,
        },
      },
      constitution: {
        anchor: {
          dataHash:
            "ca41a91f399259bcefe57f9858e91f6d00e1a38d6d9c63d4052914ea7bd70cb2",
          url: "ipfs://bafkreifnwj6zpu3ixa4siz2lndqybyc5wnnt3jkwyutci4e2tmbnj3xrdm",
        },
        script: "fa24fb305126805cf2164c161d852a0e7330cf988f1fe558cf7d4a64",
      },
      prevGovActionIds: {
        Committee: null,
        Constitution: null,
        HardFork: {
          govActionIx: 0,
          txId: "ccb27f6b0d58c25ae33fd821b62c387f5230dae930afd07489fa3df56ae56522",
        },
        PParamUpdate: {
          govActionIx: 0,
          txId: "b52f02288e3ce8c7e57455522f4edd09c12797749e2db32098ecbe980b645d45",
        },
      },
    },
    ratificationDelayed: false,
  },
  proposals: [
    {
      actionId: {
        govActionIx: 0,
        txId: "8338efe8106db60822fef974b9914cbd012205232b39d151c1720ec36e71fe9f",
      },
      committeeVotes: {},
      dRepVotes: {
        "keyHash-11ee7ea43198d7265e6e46ad56caff515b974dd2af4ff1c2562a4f43": {
          decision: "VoteYes",
        },
        "keyHash-d1bffcf5008a05f9103c36904f5a68d362aead7b4399c5a1ce420e50": {
          decision: "VoteYes",
        },
        "scriptHash-d04d39c4e4b42e9edddbb741bb6636683b6822ae2c68df704b65ce4a": {
          decision: "Abstain",
        },
      },
      expiresAfter: 183,
      proposalProcedure: {
        anchor: {
          dataHash:
            "179df93f3456f540d773c5802786ac08a92260e241d1b7109416891d849521fa",
          url: "https://my-ip.at/test/CIP108-example-signer.json",
        },
        deposit: 100000000000,
        govAction: {
          tag: "InfoAction",
        },
        returnAddr: {
          credential: {
            keyHash: "c13582aec9a44fcc6d984be003c5058c660e1d2ff1370fd8b49ba73f",
          },
          network: "Testnet",
        },
      },
      proposedIn: 177,
      stakePoolVotes: {
        f9c8e7275348d3b1a3596c94095f43307990cc5f800bbbb256298658: "VoteYes",
      },
    },
  ],
};
