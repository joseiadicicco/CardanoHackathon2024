import Head from "next/head";
import styles from "./candidature.module.scss";
import { CandidateApi } from "@example/src/lib/SmartDB/FrontEnd";
import { useEffect, useState } from "react";
import { CandidateEntity } from "@example/src/lib/SmartDB/Entities";
import { formatAddressUI } from "@example/src/utils/formats";

export default function index() {
  const [candidates, setCandidates] = useState<CandidateEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const result: CandidateEntity[] = await CandidateApi.getAllApi_();
        setCandidates(result);
      } catch (error) {
        console.error("Error fetching dreps:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  if (loading) {
    return <div className={styles.page}>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Candidates | dExpo</title>
        <meta name="description" content="dExpo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>Candidate Proposals</h1>

        {candidates.length > 0 ? (
          <>
            <h2 className={styles.subtitle}>Active Proposals</h2>
            <div className={styles.candidateList}>
              {candidates.map((candidate) => {
                return (
                  <div key={candidate._DB_id} className={styles.candidateItem}>
                    <p className={styles.text}>
                      {formatAddressUI(candidate.address)}
                    </p>
                    <div className={styles.proposal}>
                      <p className={styles.text}>Proposal</p>
                      <p className={styles.text}>{candidate.propursal}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <h2 className={styles.subtitle}>No proposals yet</h2>
        )}
      </div>
    </>
  );
}
