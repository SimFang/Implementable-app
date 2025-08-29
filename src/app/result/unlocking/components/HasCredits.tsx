'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AnalysisData } from '../../../../../types/analysisType';
import { unlockAnalysis } from '../../../../../helpers/payment/unlockAnalysis';
import { CheckCircle } from 'lucide-react';

interface HasCreditsProps {
  analysisId: string;
  analysisData: AnalysisData;
  credits: number;
}

function generateCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for(let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function HasCredits({ analysisId, analysisData, credits }: HasCreditsProps) {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [typedCode, setTypedCode] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [unlockMessage, setUnlockMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setConfirmationCode(generateCode());
  }, []);

  const handleUnlock = async () => {
    if (!analysisId) return;
  
    setLoading(true);
    const result = await unlockAnalysis(analysisId);
  
    if (result.success) {
      setTimeout(()=>{
        setSuccess(true);
        setUnlockMessage('Analysis successfully unlocked!');
        setLoading(false);
      },3000)
  
      setTimeout(() => {
        router.push(`/result/unlocking/loading?analysisId=${encodeURIComponent(analysisId)}`);
      }, 3500); // redirect after 500ms with analysisId as param
    } else {
      setUnlockMessage(result.error);
      setLoading(false);
    }
  };

  const price = 1;
  const newBalance = credits - price;

  const isUnlockEnabled = typedCode === confirmationCode && agreed && !loading && !success;

  return (
    <div className="unlock-container">
    <h1 className="unlock-title">Unlock Your Analysis</h1>
  
    <div className="unlock-summary">
      <p><span className="label">Price:</span> <span className="value">1 token</span></p>
      <p><span className="label">Your Balance:</span> <span className="value">{credits} tokens</span></p>
      <p><span className="label">Balance After Unlock:</span> <span className="value">{credits - 1} tokens</span></p>
    </div>
  
    <p className="unlock-description">
      Access detailed AI strategy recommendations and business impact insights by unlocking this report.
    </p>
  
    <label className="confirmation-label">
      <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
      I agree that 1 token will be deducted from my balance.
    </label>
  
    <button
      onClick={handleUnlock}
      className={`unlock-button-pay ${loading ? 'loading' : ''} ${success ? 'success' : ''}`}
      disabled={!agreed || loading || success}
    >
      {loading ? 'Unlocking...' : success ? 'Unlocked ✓' : 'Unlock'}
    </button>
  
    {unlockMessage && <p className="unlock-message">{unlockMessage}</p>}
  </div>
  );
}