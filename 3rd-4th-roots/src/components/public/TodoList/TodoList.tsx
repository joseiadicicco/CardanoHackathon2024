// Home.tsx
import { useTodoList } from "./useTodoList";
import Head from "next/head";
import styles from "./TodoList.module.scss";
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

export default function TodoList() {
  const { } = useTodoList();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => { };
    fetch();
  }, []);

  if (loading) {
    return <div className={styles.page}>Loading...</div>;
  }
  return (
    <>
      <Head>
        <title>Code of Conduct | dExpo</title>
        <meta name="description" content="dExpo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Code of Conduct for Cardano Governance Participants
          </h1>
          <div className={styles.content}>
            <p>
              This Code of Conduct outlines the ethical and operational
              guidelines for Delegated Representatives (DReps) and members of
              the Constitutional Committee (CC) participating in the Cardano
              governance system. By signing this document, you agree to uphold
              the principles of transparency, integrity, and accountability in
              your actions and decisions as a representative of the Cardano
              community.
            </p>
            <section className={styles.section}>
              <h2 className={styles.heading}>Core Principles</h2>
              <ul className={styles.list}>
                <li><strong>Informative Resources:</strong> Provide clear and concise educational materials within the DApp explaining the potential issues arising from dual roles and the importance of conflict mitigation. This could help CC members, DReps, and Ada holders make informed decisions. (ASTRA TEXT)</li>
                <li><strong>Visual Indicators:</strong> Implement visual cues within the DApp to highlight voting situations where a CC member might have a conflict of interest due to their DRep role. For example, a warning icon could appear next to proposals that the CC member, also acting as a DRep, has voted on or is scheduled to vote on.</li>
                <li><strong>Mandatory Disclosure:</strong> Include key information like their mission statement, areas of expertise, voting history, and any potential conflicts of interest. The app should clearly indicate whether a CC member also holds a DRep position. This information should be prominently displayed in their profiles within the DApp, allowing Ada holders and other stakeholders to easily identify potential conflicts of interest.</li>
                <li>Accepting the Code of Conduct before every vote or let’s say once every 3 months. (ASTRA CODE OF CONDUCT)</li>
                <li>Possible in future: interactive tools within the DApp that allow users to explore hypothetical scenarios involving conflicts of interest and understand the potential consequences of different voting choices.</li>
                <li><strong>Performance Metrics:</strong> Consider incorporating metrics to assess the performance of DReps and CC members. This could include their voting participation rate, responsiveness to community inquiries, and alignment of their votes with community sentiment. These metrics could help Ada holders evaluate and select DReps.</li>
                <li><strong>Real-Time Tracking:</strong> Provide real-time updates on the progress of governance actions, including the number of votes cast, current voting percentages, and any relevant deadlines. Visualizations like progress bars or pie charts could enhance user engagement.</li>
              </ul>
            </section>
          </div>

          <br />
        </div>
      </div>
    </>
  );
}
