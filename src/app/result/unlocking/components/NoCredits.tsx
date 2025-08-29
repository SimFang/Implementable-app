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
    <div className="unlock-container">
      <h1 className="unlock-title">Not Enough Tokens</h1>

      <div className="unlock-summary">
        <p><span className="label">Your Balance:</span> <span className="value">{credits} tokens</span></p>
        <p><span className="label">Required:</span> <span className="value">1 token</span></p>
      </div>

      <p className="unlock-description">
        You need at least 1 token to unlock this AI Strategy Report. 
        Please purchase more tokens to continue.
      </p>

      <button
        onClick={handlePricingRedirect}
        className="unlock-button-pay"
      >
        Get More Tokens
      </button>
    </div>
  );
}