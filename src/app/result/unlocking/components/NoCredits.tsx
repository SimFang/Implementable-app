'use client';

import { useRouter } from 'next/navigation';

interface NoCreditsProps {
  credits: number;
}

export default function NoCredits({ credits }: NoCreditsProps) {
  const router = useRouter();

  const handlePricingRedirect = () => {
    router.push('/pricing');
  };

  return (
    <div className="no-credits-container">
      <h1>Not Enough Tokens</h1>
      <p>Your current balance: <strong>{credits} tokens</strong></p>
      <p>You need at least 1 token to unlock this AI Strategy Report.</p>
      <button onClick={handlePricingRedirect} className="unlocking-button">
        Get More Tokens
      </button>
    </div>
  );
}