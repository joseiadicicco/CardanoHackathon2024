import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchProposalById } from '@/services/api';

export default function ProposalDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [proposal, setProposal] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProposalById(id).then(setProposal);
    }
  }, [id]);

  if (!proposal) return <div>Loading...</div>;

  return (
    <div>
      <h1>{proposal.title}</h1>
      {/* Add more detailed proposal information here */}
    </div>
  );
}

