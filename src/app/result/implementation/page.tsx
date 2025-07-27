'use client';

import { useSearchParams } from 'next/navigation';
import '../result.css'; // Reuse result.css for consistency

export default function ImplementationPage() {
  const searchParams = useSearchParams();
  const analysisId = searchParams.get('analysisId');
  const title = searchParams.get('title');
  const description = searchParams.get('description');
  const impactLevel = searchParams.get('impactLevel');
  const businessFunction = searchParams.get('businessFunction');
  const outcomes = searchParams.get('outcomes');
  const roi = searchParams.get('roi');
  const implementationConditions = searchParams.get('implementationConditions');
  const businessValue = searchParams.get('businessValue');
  const maturityFit = searchParams.get('maturityFit');

  return (
    <div className="result-container">
      <h1 className="result-title">Recommendation Details</h1>
      {analysisId ? (
        <p className="result-analysis-id">
          Analysis ID: <strong>{analysisId}</strong>
        </p>
      ) : (
        <p className="result-error">Error: No analysis ID provided.</p>
      )}
      {title ? (
        <div className="result-recommendation">
          <h2 className="result-recommendation-title">{title}</h2>
          <p className="result-recommendation-field">
            <strong>Description:</strong> {description}
          </p>
          <p className="result-recommendation-field">
            <strong>Impact Level:</strong> {impactLevel}
          </p>
          <p className="result-recommendation-field">
            <strong>Business Function:</strong> {businessFunction}
          </p>
          <p className="result-recommendation-field">
            <strong>Outcomes:</strong> {outcomes}
          </p>
          <p className="result-recommendation-field">
            <strong>ROI:</strong> {roi}
          </p>
          <p className="result-recommendation-field">
            <strong>Implementation Conditions:</strong> {implementationConditions}
          </p>
          <p className="result-recommendation-field">
            <strong>Business Value:</strong> {businessValue}
          </p>
          <p className="result-recommendation-field">
            <strong>Maturity Fit:</strong> {maturityFit}
          </p>
        </div>
      ) : (
        <p className="result-error">Error: No recommendation data provided.</p>
      )}
    </div>
  );
}