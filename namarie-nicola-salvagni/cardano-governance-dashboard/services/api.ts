const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.cardano-governance.com';

export const fetchProposals = async () => {
  const response = await fetch(`${API_BASE_URL}/proposals`);
  if (!response.ok) {
    throw new Error('Failed to fetch proposals');
  }
  return response.json();
};

export const fetchDReps = async () => {
  const response = await fetch(`${API_BASE_URL}/dreps`);
  if (!response.ok) {
    throw new Error('Failed to fetch DReps');
  }
  return response.json();
};

// Add more API functions as needed

