'use client';

import './analysis.css';

interface DoneProps {
  url: string;
  currentStep: number;
  processId: string | null;
}

export default function Done({ url, currentStep, processId }: DoneProps) {
  return (
    <div className="analysis-step-container">
      <div className="analysis-done">
        <div className="analysis-success-icon">
          ✓
        </div>
        <h2 className="analysis-title">Analysis Complete!</h2>
        <p className="analysis-subtitle">
          We've successfully analyzed your website and prepared a comprehensive report.
        </p>
        
        <div style={{ textAlign: 'left', width: '100%' }}>
          <h3 style={{ marginBottom: '1rem' }}>Analysis Summary:</h3>
          <ul style={{ marginBottom: '2rem' }}>
            <li>Website URL: <strong>{url}</strong></li>
            <li>Analysis Date: {new Date().toLocaleDateString()}</li>
            <li>Report Status: Ready for viewing</li>
          </ul>
        </div>

        <a 
          href="/dashboard" 
          className="analysis-button analysis-button-primary"
          style={{ textDecoration: 'none' }}
        >
          View Full Report
        </a>

        <a 
          href="/" 
          className="analysis-button analysis-button-secondary"
          style={{ textDecoration: 'none', marginTop: '1rem' }}
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}