'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAnalysis } from '../../../helpers/analysis/getAnalysis';
import { AnalysisData } from '../../../types/analysisType';
import Locked from './components/Locked';
import Unlocked from './components/Unlocked';
import './result.css';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const analysisId = searchParams.get('analysisId');
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!analysisId) {
        setError('No analysis ID provided in the URL');
        return;
      }

      setLoading(true);
      const result = await getAnalysis(analysisId);
      setLoading(false);

      if (result.success && result.data) {
        setAnalysisData(result.data);
      } else {
        setError(result.error || 'Failed to fetch analysis data');
      }
    };

    fetchAnalysis();
  }, [analysisId]);

  return (
    <div className="result-container">
      <h1 className="result-title">Analysis Summary</h1>
      {loading && <p className="result-loading">Loading analysis data...</p>}
      {error && <p className="result-error">Error: {error}</p>}
      {analysisId && !loading && !error && (
        <p className="result-analysis-id">
          Your analysis ID is: <strong>{analysisId}</strong>
        </p>
      )}
      {!loading && !error && analysisData?.output?.strategicImpactAreas && (
        analysisData.unlocked ? (
          <Unlocked analysisData={analysisData} />
        ) : (
          <Locked analysisData={analysisData} />
        )
      )}
      {!loading && !error && !analysisData?.output?.strategicImpactAreas && (
        <p>No analysis output available.</p>
      )}
    </div>
  );
}