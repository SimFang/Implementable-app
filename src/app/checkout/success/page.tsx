'use client';

import React, { useEffect, useState } from 'react';
import { getUserAnalyses } from '../../../../helpers/analysis/getUserAnalyses';
import { Lock, Globe } from 'lucide-react';
import './payment-success.css';

interface CompanyProfile {
  companyName?: string;
  websiteURL?: string;
  companyType?: string;
}

interface Analysis {
  analysisId: string;
  unlocked: boolean;
  createdAt: string;
  illustration?: string;
  companyProfile?: CompanyProfile;
}

export default function PaymentSuccess() {
  const [lockedAnalyses, setLockedAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyses = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before fetching
  
      try {
        const data: Analysis[] = await getUserAnalyses();
        console.log(data);
        setError(null);
        const locked = data.filter((a: Analysis) => !a.unlocked);
        setLockedAnalyses(locked);
        console.log("set");
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analyses');
      } finally {
        setLoading(false);
      }
    };
  
    fetchAnalyses();
  }, []);

  const handleClick = (analysisId: string) => {
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/result/unlocking?analysisId=${encodeURIComponent(analysisId)}`;
  };

  const formatDate = (isoDate: string) => {
    try {
      return new Date(isoDate).toLocaleDateString();
    } catch {
      return isoDate;
    }
  };

  if (loading) return <div className="ps-loading">Loading...</div>;
  
  if (lockedAnalyses.length === 0) {
    return (
      <div className="ps-container">
        <h1>🎉 Payment Successful!</h1>
        <p>You have no locked projects at the moment.</p>
        <p>Start by generating a new analysis to unlock strategic insights.</p>
        <button className="ps-button" onClick={() => window.location.href = '/landing'}>
          Create New Analysis
        </button>
      </div>
    );
  }

  return (
    <div className="ps-container">
      <h1>🎉 Payment Successful!</h1>
      <p>Unlock your projects below using your new tokens:</p>
      <div className="ps-projects-grid">
        {lockedAnalyses.map((analysis: Analysis) => {
          const cp = analysis.companyProfile || {};
          return (
            <div
              key={analysis.analysisId}
              className="ps-project-card"
              onClick={() => handleClick(analysis.analysisId)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => { if (e.key === 'Enter') handleClick(analysis.analysisId); }}
            >
              {analysis.illustration && (
                <img
                  src={analysis.illustration}
                  alt={`${cp.companyName || 'Company'} illustration`}
                  className="ps-image"
                />
              )}
              <div className="ps-info">
                <h3>{cp.companyName || 'Unnamed Company'}</h3>
                <p><strong>Type:</strong> {cp.companyType || 'N/A'}</p>
                <p>
                  {cp.websiteURL ? (
                    <a href={cp.websiteURL} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                      <Globe size={16} />
                    </a>
                  ) : 'N/A'}
                </p>
                <p><strong>Date:</strong> {formatDate(analysis.createdAt)}</p>
                <div className="ps-lock-icon"><Lock size={16} /></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}