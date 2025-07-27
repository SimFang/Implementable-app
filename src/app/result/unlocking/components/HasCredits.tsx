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
    <div className="has-credits-container">
      <h1>Unlock Your Full AI Strategy Report</h1>
      <div className="analysis-summary">
        <h2>{analysisData.output?.strategicImpactAreas[0]?.impactArea}</h2>
        <p>{analysisData.output?.strategicImpactAreas[0]?.summary}</p>
      </div>
      <div className="unlock-details">
        <p><strong>Price:</strong> {price} token</p>
        <p><strong>Your Balance:</strong> {credits} tokens</p>
        <p><strong>New Balance After Unlock:</strong> {newBalance} tokens</p>
        <p className="unlock-description">
          Unlock this report to access detailed AI strategy recommendations and business impact insights.
        </p>
      </div>

      <p>Please type the following code to confirm:</p>
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '1.5rem',
          letterSpacing: '0.2rem',
          marginBottom: '0.5rem',
          userSelect: 'all',
        }}
      >
        {confirmationCode}
      </div>

        <input
          type="text"
          placeholder="Type the code here"
          value={typedCode}
          onChange={(e) => setTypedCode(e.target.value)}
          className="unlocking-code-input"
          style={{ textTransform: 'none' }}
        />

        {typedCode && typedCode !== confirmationCode && (
          <p style={{ color: 'red', marginTop: '0.25rem' }}>
            The code you typed does not match. Please try again.
          </p>
        )}

      <label style={{ display: 'block', marginTop: '1rem', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          style={{ marginRight: '0.5rem' }}
        />
        I agree that this operation will remove a token from my balance
      </label>

      <button
        onClick={handleUnlock}
        className={`unlocking-button ${loading ? 'loading' : ''} ${success ? 'success' : ''}`}
        disabled={!isUnlockEnabled}
        style={{ marginTop: '1rem' }}
      >
        {loading && !success ? (
          <span className="spinner" />
        ) : success ? (
          <CheckCircle size={20} />
        ) : (
          'Unlock'
        )}
      </button>

      {unlockMessage && <p className="unlock-message">{unlockMessage}</p>}
    </div>
  );
}