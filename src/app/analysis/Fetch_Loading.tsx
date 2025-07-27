'use client';

import { useEffect } from 'react';
import './analysis.css';

interface FetchLoadingProps {
  url: string;
  currentStep: number;
  onStepChange: (step: number) => void;
  processId: string | null;
}

export default function Fetch_Loading({ url, currentStep, onStepChange, processId }: FetchLoadingProps) {
  useEffect(() => {
    // Simulate fetching process with a delay
    const timer = setTimeout(() => {
      onStepChange(currentStep + 1);
    }, 3000); // 3 seconds delay for demonstration

    return () => clearTimeout(timer);
  }, [currentStep, onStepChange]);

  return (
    <div className="analysis-step-container">
      <div className="analysis-loading">
        <div className="analysis-spinner" />
        <div>
          <h2 className="analysis-title">Fetching Website Data</h2>
          <p className="analysis-subtitle">
            We are currently accessing and analyzing:<br />
            <strong>{url}</strong>
          </p>
        </div>
        <p>
          This process typically takes 1-2 minutes.<br />
          Please don't close this window.
        </p>
      </div>
    </div>
  );
}