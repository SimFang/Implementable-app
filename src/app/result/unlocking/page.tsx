'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getAnalysis } from '../../../../helpers/analysis/getAnalysis';
import { fetchUserCredits } from '../../../../helpers/payment/fetchUserCredits';
import { AnalysisData } from '../../../../types/analysisType';
import HasCredits from './components/HasCredits';
import NoCredits from './components/NoCredits';
import Logo from '@/components/style/Logo';
import { Sparkles } from 'lucide-react';
import './unlocking.css';

export default function UnlockingPage() {
  const searchParams = useSearchParams();
  const analysisId = searchParams.get('analysisId');
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [analysisId]);

  return (
    <div className="unlocking-page">

      {/* gradient panel on right */}

      <div className="unlocking-container">
        <div className="unlocking-box">
          <Logo />

          {loading && <p className="unlocking-loading">Loading...</p>}
          {error && <p className="unlocking-error">{error}</p>}

          {!loading && !error && analysisData && credits !== null && (
            <>
              {credits > 0 ? (
                <HasCredits
                  analysisId={analysisId!}
                  analysisData={analysisData}
                  credits={credits}
                />
              ) : (
                <NoCredits credits={credits} />
              )}
            </>
          )}
        </div>
      </div>


      <div className="unlocking-gradient"></div>

    </div>
  );
}