'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getAnalysis } from '../../../../helpers/analysis/getAnalysis';
import { fetchUserCredits } from '../../../../helpers/payment/fetchUserCredits';
import { AnalysisData } from '../../../../types/analysisType';
import HasCredits from './components/HasCredits';
import NoCredits from './components/NoCredits';
import './unlocking.css';


export default function UnlockingPage() {
  const searchParams = useSearchParams();
  const analysisId = searchParams.get('analysisId');
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
const [unlockMessage, setUnlockMessage] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!analysisId) return;
        const result = await getAnalysis(analysisId);
        if (result.success && result.data) {
          setAnalysisData(result.data);
        }

        const userCredits = await fetchUserCredits();
        setCredits(userCredits);
      } catch (err: any) {
        console.error(err);
        setError('Failed to load data');
      }
    };
    fetchData();
  }, [analysisId]);

  if (error) return <p className="unlocking-error">{error}</p>;
  if (credits === null || !analysisData) return <p className="unlocking-loading">Loading...</p>;

  return (
    <div className="unlocking-container">
      {credits > 0 ? (
        <HasCredits analysisId={analysisId!} analysisData={analysisData} credits={credits} />
      ) : (
        <NoCredits credits={credits} />
      )}
    </div>
  );
}