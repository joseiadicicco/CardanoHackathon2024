// Home.tsx
import { useHome } from "./useHome";
import Head from "next/head";
import styles from "./Home.module.scss";
import {
  CommitteeEntity,
  ProposalEntity,
  DRepVoteEntity,
  StakePoolVoteEntity,
  ConstitutionEntity,
  CommitteeVoteEntity,
  CurrentParametersEntity,
} from "@/lib/SmartDB/Entities/index";
import { useEffect, useState } from "react";
import { BaseEntity, BaseSmartDBFrontEndApiCalls } from "smart-db";
import {
  CommitteeApi,
  CommitteeVoteApi,
  ConstitutionApi,
  CurrentParametersApi,
  DRepVoteApi,
  ProposalApi,
  StakePoolVoteApi,
} from "@example/src/lib/SmartDB/FrontEnd";
import {
  convertHashToBech32Committee,
  formatAddressUI,
} from "@example/src/utils/formats";
import { useRouter } from "next/router";
import { jsonDataExtended, jsonDataActual } from "../../../lib/Commons/Constants/onchain";

// Función principal para leer y guardar los datos
async function processAndSaveQueryData() {
  // Llamar a la función de extracción y guardado
  await extractAndSaveData(jsonDataExtended);
}

// Función que extrae y guarda la información del JSON (reutilizada)
async function extractAndSaveData(jsonData: any) {
  const { committee, constitution, proposals, currentPParams } = jsonData;

  // Guardar Comité
  const committeeMembers = Object.entries(committee.members);
  for (const [scriptHash, relevance] of committeeMembers) {
    const exists = await CommitteeApi.checkIfExistsApi_({
      scriptHash: scriptHash,
    });
    if (!exists) {
      const committeeEntity = new CommitteeEntity();
      committeeEntity.scriptHash = scriptHash;
      committeeEntity.revelance = relevance as number;
      CommitteeApi.createApi(committeeEntity);
    }
  }

  // Guardar Constitución
  const constitutionExists = await ConstitutionApi.checkIfExistsApi_({
    dataHash: constitution.anchor.dataHash,
  });
  if (!constitutionExists) {
    const constitutionEntity = new ConstitutionEntity();
    constitutionEntity.dataHash = constitution.anchor.dataHash;
    constitutionEntity.url = constitution.anchor.url;
    constitutionEntity.script = constitution.script;
    ConstitutionApi.createApi(constitutionEntity);
  }

  // Guardar Propuestas
  for (const proposal of proposals) {
    const proposalExists = await ProposalApi.checkIfExistsApi_({
      actionId: proposal.actionId.govActionIx,
    });
    if (!proposalExists) {
      const proposalEntity = new ProposalEntity();
      proposalEntity.actionId = proposal.actionId.govActionIx;
      proposalEntity.txId = proposal.actionId.txId;
      proposalEntity.proposedIn = proposal.proposedIn;
      proposalEntity.expiresAfter = proposal.expiresAfter;
      proposalEntity.dataHash = proposal.proposalProcedure.anchor.dataHash;
      proposalEntity.url = proposal.proposalProcedure.anchor.url;
      proposalEntity.deposit = proposal.proposalProcedure.deposit;
      ProposalApi.createApi(proposalEntity);
    }

    // Guardar Votos del Comité
    const committeeVotes = Object.entries(proposal.committeeVotes);
    for (const [scriptHash, voteData] of committeeVotes) {
      const decision = typeof voteData === 'string' ? voteData : (voteData as any).decision;
      const dataHash = typeof voteData === 'object' && (voteData as any).anchor ? (voteData as any).anchor.dataHash : null;
      const url = typeof voteData === 'object' && (voteData as any).anchor ? (voteData as any).anchor.url : null;

      const committeeVoteExists = await CommitteeVoteApi.checkIfExistsApi_({
        proposalActionId: proposal.actionId.govActionIx,
        scriptHash,
      });
      if (!committeeVoteExists) {
        const committeeVoteEntity = new CommitteeVoteEntity();
        committeeVoteEntity.proposalActionId = proposal.actionId.govActionIx;
        committeeVoteEntity.scriptHash = scriptHash;
        committeeVoteEntity.vote = decision;
        committeeVoteEntity.dataHash = dataHash;
        committeeVoteEntity.url = url;
        CommitteeVoteApi.createApi(committeeVoteEntity);
      }
    }

    // Guardar Votos de DRep
    const dRepVotes = Object.entries(proposal.dRepVotes);
    for (const [keyHash, voteData] of dRepVotes) {
      const decision = typeof voteData === 'string' ? voteData : (voteData as any).decision;
      const dataHash = typeof voteData === 'object' && (voteData as any).anchor ? (voteData as any).anchor.dataHash : null;
      const url = typeof voteData === 'object' && (voteData as any).anchor ? (voteData as any).anchor.url : null;

      const dRepVoteExists = await DRepVoteApi.checkIfExistsApi_({
        proposalActionId: proposal.actionId.govActionIx,
        keyHash,
      });
      if (!dRepVoteExists) {
        const dRepVoteEntity = new DRepVoteEntity();
        dRepVoteEntity.proposalActionId = proposal.actionId.govActionIx;
        dRepVoteEntity.keyHash = keyHash;
        dRepVoteEntity.vote = decision;
        dRepVoteEntity.dataHash = dataHash;
        dRepVoteEntity.url = url;
        DRepVoteApi.createApi(dRepVoteEntity);
      }
    }

    // Guardar Votos de Stake Pools
    const stakePoolVotes = Object.entries(proposal.stakePoolVotes);
    for (const [poolId, voteData] of stakePoolVotes) {
      const decision = typeof voteData === 'string' ? voteData : (voteData as any).decision;
      const dataHash = typeof voteData === 'object' && (voteData as any).anchor ? (voteData as any).anchor.dataHash : null;
      const url = typeof voteData === 'object' && (voteData as any).anchor ? (voteData as any).anchor.url : null;

      const stakePoolVoteExists = await StakePoolVoteApi.checkIfExistsApi_({
        proposalActionId: proposal.actionId.govActionIx,
        poolId,
      });
      if (!stakePoolVoteExists) {
        const stakePoolVoteEntity = new StakePoolVoteEntity();
        stakePoolVoteEntity.proposalActionId = proposal.actionId.govActionIx;
        stakePoolVoteEntity.poolId = poolId;
        stakePoolVoteEntity.vote = decision;
        stakePoolVoteEntity.dataHash = dataHash;
        stakePoolVoteEntity.url = url;
        StakePoolVoteApi.createApi(stakePoolVoteEntity);
      }
    }
  }

  // Guardar Parámetros Actuales
  const parametersExists = await CurrentParametersApi.checkIfExistsApi_({
    maxTxSize: currentPParams.maxTxSize,
  });
  if (!parametersExists) {
    const parametersEntity = new CurrentParametersEntity();
    parametersEntity.collateralPercentage = currentPParams.collateralPercentage;
    parametersEntity.committeeMaxTermLength =
      currentPParams.committeeMaxTermLength;
    parametersEntity.committeeminSize = currentPParams.committeeMinSize;
    parametersEntity.monetaryExpansion = currentPParams.monetaryExpansion;
    parametersEntity.treasuryCut = currentPParams.treasuryCut;
    parametersEntity.maxTxSize = currentPParams.maxTxSize;
    parametersEntity.txFeePerByte = currentPParams.txFeePerByte;
    CurrentParametersApi.createApi(parametersEntity);
  }
}

export default function Home() {
  const { } = useHome();

  // Effect hook to trigger the script generation when the Lucid instance is available
  useEffect(() => {
    const fetch = async () => {
      await processAndSaveQueryData(); // Generate scripts with Lucid instance
    };

    fetch();
  }, []);

  /*   async function getDataCommittee() {
    const commit = await CommitteeApi.getAllApi_();

    console.log(convertHashToBech32(commit[0].scriptHash));
  } */

  const [commitees, setCommmitees] = useState<CommitteeEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchComittees = async () => {
      try {
        const result: CommitteeEntity[] = await CommitteeApi.getAllApi_();
        setCommmitees(result);
      } catch (error) {
        console.error("Error fetching dreps:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComittees();
  }, []);

  if (loading) {
    return <div className={styles.page}>Loading...</div>;
  }

  const router = useRouter();

  function handleClickCommittee(id: string) {
    router.push(`/committee/${id}`);
  }

  return (
    <>
      <Head>
        <title>Committees | dExpo</title>
        <meta name="description" content="dExpo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>Welcome to dExpo</h1>
        <h2 className={styles.subtitle}>Active Committees</h2>
        <div className={styles.committeeList}>
          {commitees.map((commitee) => {
            return (
              <div key={commitee.scriptHash} className={styles.committeeItem}>
                <p className={styles.text}>
                  {formatAddressUI(
                    convertHashToBech32Committee(commitee.scriptHash)
                  )}
                </p>
                <p className={styles.active}>Active until epoch: {commitee.revelance}</p>
                <div className={styles.btnCommittee} onClick={() => handleClickCommittee(convertHashToBech32Committee(commitee.scriptHash))}>View Committee</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
