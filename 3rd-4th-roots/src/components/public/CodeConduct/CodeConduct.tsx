// Home.tsx
import { useCodeConduct } from "./useCodeConduct";
import Head from "next/head";
import styles from "./CodeConduct.module.scss";
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

export default function CodeConduct() {
  const {} = useCodeConduct();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {};
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
              <h2 className={styles.heading}>1. Core Principles</h2>
              <ul className={styles.list}>
                <li>
                  <strong>Transparency:</strong> Openly communicate your
                  actions, motivations, and any potential conflicts of interest
                  to the community.
                </li>
                <li>
                  <strong>Integrity:</strong> Act honestly and ethically in all
                  governance activities.
                </li>
                <li>
                  <strong>Accountability:</strong> Take responsibility for your
                  decisions and actions.
                </li>
                <li>
                  <strong>Community Focus:</strong> Prioritize the long-term
                  well-being of the Cardano blockchain.
                </li>
                <li>
                  <strong>Respectful Engagement:</strong> Engage in constructive
                  and respectful dialogue with stakeholders.
                </li>
              </ul>
            </section>
            <section className={styles.section}>
              <h2 className={styles.heading}>2. Voting Responsibilities</h2>
              <ul className={styles.list}>
                <li>
                  <strong>Informed Participation:</strong> Research and
                  understand the implications of each governance proposal.
                </li>
                <li>
                  <strong>Independent Judgment:</strong> Evaluate proposals and
                  cast votes free from undue influence.
                </li>
                <li>
                  <strong>Active Engagement:</strong> Maintain a consistent
                  voting record and participate actively.
                </li>
                <li>
                  <strong>Transparent Communication:</strong> Explain the
                  rationale behind your votes to the community.
                </li>
                <li>
                  <strong>Recusal in Conflicts:</strong> Recuse yourself when
                  you have a declared conflict of interest.
                </li>
              </ul>
            </section>
            <section className={styles.section}>
              <h2 className={styles.heading}>3. Community Engagement</h2>
              <ul className={styles.list}>
                <li>
                  <strong>Accessibility and Responsiveness:</strong> Be
                  accessible to the community and respond to inquiries.
                </li>
                <li>
                  <strong>Constructive Feedback:</strong> Seek and consider
                  feedback from the community.
                </li>
                <li>
                  <strong>Educational Initiatives:</strong> Promote
                  understanding of the Cardano governance system.
                </li>
              </ul>
            </section>
            <section className={styles.section}>
              <h2 className={styles.heading}>
                4. Conflict of Interest Management
              </h2>
              <ul className={styles.list}>
                <li>
                  <strong>Proactive Disclosure:</strong> Disclose any potential
                  conflicts of interest transparently.
                </li>
                <li>
                  <strong>Conflict Mitigation:</strong> Take steps to mitigate
                  potential conflicts.
                </li>
                <li>
                  <strong>Transparency in Compensation:</strong> Disclose the
                  source and amount of any compensation received.
                </li>
              </ul>
            </section>
            <section className={styles.section}>
              <h2 className={styles.heading}>
                5. Adherence to Governance Processes
              </h2>
              <ul className={styles.list}>
                <li>
                  <strong>Respect for Procedures:</strong> Follow the
                  established procedures in the Cardano Constitution.
                </li>
                <li>
                  <strong>Compliance with Guardrails:</strong> Ensure actions
                  align with guidelines and restrictions.
                </li>
                <li>
                  <strong>Support for Amendments:</strong> Engage in the process
                  of amending and improving the governance system.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.heading}>6. Continuous Improvement</h2>
              <ul className={styles.list}>
                <li>
                  <strong>Self-Reflection:</strong> Regularly reflect on your
                  performance and seek improvement.
                </li>
                <li>
                  <strong>Professional Development:</strong> Stay informed about
                  developments within the ecosystem.
                </li>
                <li>
                  <strong>Community Collaboration:</strong> Collaborate with
                  others to identify areas for improvement.
                </li>
              </ul>
            </section>
            <section className={styles.agreement}>
              <h2 className={styles.heading}>Agreement</h2>
              <p>
                This Code of Conduct draws upon the principles and concepts
                written in the CIP 1694 and Cardano Constitution draft published
                on 20.11.2024. By signing below, I acknowledge that I have read,
                understood, and agree to abide by this Code of Conduct for
                Cardano Governance Participants.
              </p>
            </section>
          </div>


      </div>
    </>
  );
}
