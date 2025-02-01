import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GovernanceContextType {
  votingStatus: 'undelegated' | 'delegated' | 'abstained' | 'drep';
  selectedDRep: any | null;
  setVotingStatus: (status: 'undelegated' | 'delegated' | 'abstained' | 'drep') => void;
  setSelectedDRep: (drep: any | null) => void;
}

const GovernanceContext = createContext<GovernanceContextType | undefined>(undefined);

export const GovernanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [votingStatus, setVotingStatus] = useState<'undelegated' | 'delegated' | 'abstained' | 'drep'>('undelegated');
  const [selectedDRep, setSelectedDRep] = useState<any | null>(null);

  return (
    <GovernanceContext.Provider value={{ votingStatus, selectedDRep, setVotingStatus, setSelectedDRep }}>
      {children}
    </GovernanceContext.Provider>
  );
};

export const useGovernance = () => {
  const context = useContext(GovernanceContext);
  if (context === undefined) {
    throw new Error('useGovernance must be used within a GovernanceProvider');
  }
  return context;
};

