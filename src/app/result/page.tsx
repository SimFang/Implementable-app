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
  const [showCover, setShowCover] = useState(true);


  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!analysisId) {
        setError('No analysis ID provided in the URL');
        return;
      }

      setLoading(true);
      const result = await getAnalysis(analysisId);
      console.log(result)
      setLoading(false);

      if (result.success && result.data) {
        setAnalysisData(result.data);
      } else {
        setError(result.error || 'Failed to fetch analysis data');
      }
    };

    fetchAnalysis();
  }, [analysisId]);

  useEffect(() => {
    if (!loading && !error) {
      // Wait a short moment then fade out
      const timeout = setTimeout(() => {
        const cover = document.getElementById('white-screen-cover');
        if (cover) {
          cover.style.transition = 'opacity 1s ease';
          cover.style.opacity = '0';
          // Remove from DOM after fade out
          setTimeout(() => setShowCover(false), 1000);
        }
      }, 300); // small delay so overlay is visible briefly
      return () => clearTimeout(timeout);
    }
  }, [loading, error]);

  return (
    <div className="result-container">
      {showCover && <div id="white-screen-cover"></div>}
      {loading && <p className="result-loading">Loading analysis data...</p>}
      {error && <p className="result-error">Error: {error}</p>}
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