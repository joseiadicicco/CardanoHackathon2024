import { CandidateApi } from "@example/src/lib/SmartDB/FrontEnd";
import { CandidateEntity } from "@example/src/lib/SmartDB/Entities/index";
import { useState } from "react";
import { useWallet } from "@meshsdk/react";
import { BrowserWallet } from "@meshsdk/core";

// Define the return type for the useModalCandidate hook
interface UseModalCandidateReturn {
  isModalOpen: boolean; // State indicating whether the modal is open
  setIsModalOpen: (open: boolean) => void; // Function to set modal open/closed
  proposalText: string;
  userWalletAddress: string;
  isTermsChecked: boolean;
  handleInputChange: any;
  handleCheckChange: any;
  handleSubmitProposal: any;
  connected: boolean;
}

// Custom hook for managing modal transaction state and clipboard functionality
export function useModalCandidate(): UseModalCandidateReturn {
  const { connected, wallet } = useWallet();
  // State for tracking modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for tracking if text was successfully copied
  const [proposalText, setProposalText] = useState("");
  const [userWalletAddress, setUserWalletAddress] = useState("");
  const [isTermsChecked, setTermChecked] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProposalText(e.target.value);
  };
  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermChecked(e.target.checked);
  };
  // Function to handle copying text to clipboard
  const handleSubmitProposal = async (onRequestClose: () => void) => {
    if (!connected) {
      alert("Please connect your wallet.");
      return;
    }

    if (!isTermsChecked) {
      alert("Please agree to the Terms and Conditions.");
      return;
    }

    if (proposalText.trim() === "") {
      alert("Please enter a proposal.");
      return;
    }
    const address = await wallet.getUsedAddress();
    console.log(address);

    const candidate = new CandidateEntity();
    candidate.propursal = proposalText;
    candidate.address = address.toBech32() as string;
    candidate.conditionTerm = isTermsChecked;
    // Enviar la propuesta a la base de datos Candidate
    try {
      // Lógica para agregar la propuesta a la base de datos (ej. Candidate)
      await CandidateApi.createApi(candidate);
      alert("Your proposal has been submitted successfully.");
      onRequestClose();
    } catch (error) {
      console.error("Error submitting proposal:", error);
      alert("There was an error submitting your proposal.");
    }
  };

  // Return the modal and clipboard states and their handlers
  return {
    isModalOpen,
    setIsModalOpen,
    proposalText,
    userWalletAddress,
    isTermsChecked,
    handleInputChange,
    handleCheckChange,
    handleSubmitProposal,
    connected,
  };
}
