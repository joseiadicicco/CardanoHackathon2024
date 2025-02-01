import React from "react";
import Modal from "react-modal";
import styles from "./ModalCandidate.module.scss";
import { useModalCandidate } from "./useModalCandidate";
import Link from "next/link";

// Define the interface for the component's props
interface ModalCandidateProps {
  isOpen: boolean; // Controls modal visibility
  onRequestClose: () => void; // Function to close the modal
  closeButtonText?: string; // Optional text for the close button, defaults to 'Close'
}

// ModalCandidate component definition
const ModalCandidate: React.FC<ModalCandidateProps> = ({
  isOpen,
  onRequestClose,
  closeButtonText = "Close",
}) => {
  // Import custom hooks for clipboard copy state and handler function
  const {
    proposalText,
    userWalletAddress,
    isTermsChecked,
    handleInputChange,
    handleCheckChange,
    handleSubmitProposal,
    connected,
  } = useModalCandidate();

  return (
    // Render the modal with various transaction details
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Be a Candidate"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      {/* Modal title */}
      <h2 className={styles.title}>Be a Candidate</h2>

      {/* Proposal input field */}
      <div>
        <textarea
          value={proposalText}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter your proposal for candidature:"
          className={styles.textarea}
        ></textarea>
      </div>

      {/* Terms and Conditions checkbox */}
      <div className={styles.checkboxDiv}>
        <input
          type="checkbox"
          id="termsCheckbox"
          checked={isTermsChecked}
          onChange={(e) => handleCheckChange(e)}
        />
        <label htmlFor="termsCheckbox" className={styles.text}>
          I agree to the{" "}
          <a href="/code-conduct" target="_blank" rel="noopener noreferrer">
            Terms and Conditions
          </a>
        </label>
      </div>
      {!isTermsChecked ? (
        <>
          <br />
          <p className={styles.text}>
            Please agree to the{" "}
            <a href="/code-conduct" target="_blank" rel="noopener noreferrer">
              Terms and Conditions
            </a>
          </p>
        </>
      ) : (
        <>
          {" "}
          {/* Proposal button */}
          <button
            onClick={() => handleSubmitProposal(onRequestClose)}
            disabled={
              !connected || !isTermsChecked || proposalText.trim() === ""
            }
            className={styles.proposalButton}
          >
            Submit Candidature
          </button>
        </>
      )}

      {/* Close button for the modal */}
      <button onClick={onRequestClose} className={styles.closeButton}>
        {closeButtonText}
      </button>
    </Modal>
  );
};

export default ModalCandidate;
