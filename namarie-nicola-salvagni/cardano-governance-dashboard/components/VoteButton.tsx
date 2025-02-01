import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useGovernance } from '@/contexts/GovernanceContext';

export function VoteButton({ proposalId, voteType }: { proposalId: string, voteType: 'for' | 'against' | 'abstain' }) {
  const [isVoting, setIsVoting] = useState(false);
  const { votingStatus } = useGovernance();

  const handleVote = async () => {
    setIsVoting(true);
    try {
      // Here you would interact with the wallet and submit the vote
      await submitVote(proposalId, voteType);
      // Update local state or refetch data as needed
    } catch (error) {
      console.error('Voting failed:', error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <Button 
      onClick={handleVote} 
      disabled={isVoting || votingStatus !== 'delegated'}
    >
      {isVoting ? 'Voting...' : `Vote ${voteType}`}
    </Button>
  );
}

