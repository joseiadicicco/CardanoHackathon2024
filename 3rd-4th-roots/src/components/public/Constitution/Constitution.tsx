// Home.tsx
import { useConstitution } from "./useConstitution";
import Head from "next/head";
import styles from "./Constitution.module.scss";
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
import { fetchFromIPFS } from "@example/src/utils/ipfs";

export default function Constitution() {
  const {} = useConstitution();

  const [constitutions, setConstitution] = useState<ConstitutionEntity[]>([]);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchConstitution = async () => {
      try {
        const result: ConstitutionEntity | undefined =
          await ConstitutionApi.getOneByParamsApi_();
        if (!result) {
          throw new Error("Failed to fetch constitution");
        }
        setConstitution([result]);

        setError(null);
        setContent(null);
        try {
          const data = await fetchFromIPFS(result.url);
          setContent(data);
        } catch (err) {
          setError(
            "Failed to fetch content from IPFS. Make sure the CID is correct."
          );
        }

        console.error("Error fetching Constitution:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConstitution();
  }, []);

  if (loading) {
    return <div className={styles.page}>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Constitution | dExpo</title>
        <meta name="description" content="dExpo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <h2 className={styles.subtitle}>Active Constitution</h2>
        <div className={styles.constitution}>
          {constitutions.map((constitution) => {
            return (
              <div>
                <div
                  key={constitution.dataHash}
                  className={styles.committeeItem}
                >
                  <p className={styles.text}>{constitution.url}</p>
                </div>

                <div
                  key={constitution.dataHash}
                  className={styles.committeeItem}
                >
                  <p className={styles.text}>{content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
