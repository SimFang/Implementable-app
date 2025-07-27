'use client';

import { useEffect, useState } from 'react';
import './analysis.css';

interface AnalysisLoadingProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  processId: string | null;
}

const loadingMessages = [
  'Analyzing website structure...',
  'Evaluating user experience patterns...',
  'Checking performance metrics...',
  'Generating AI-powered recommendations...',
  'Preparing your detailed report...',
];

export default function Analysis_Loading({ currentStep, onStepChange, processId }: AnalysisLoadingProps) {
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    // Update progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          setTimeout(() => onStepChange(currentStep + 1), 1000); // Move to next step after completion
          return 100;
        }
        return next;
      });
    }, 150);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [currentStep, onStepChange]);

  return (
    <div className="analysis-step-container">
      <div className="analysis-loading">
        <div className="analysis-spinner" />
        <div>
          <h2 className="analysis-title">Analyzing Your Website</h2>
          <p className="analysis-subtitle">{loadingMessages[messageIndex]}</p>
        </div>
        <div style={{ width: '100%' }}>
          <div
            style={{
              width: '100%',
              height: '4px',
              backgroundColor: '#e5e7eb',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: '#4f46e5',
                transition: 'width 0.3s ease-in-out',
              }}
            />
          </div>
          <p style={{ marginTop: '0.5rem' }}>{progress}% Complete</p>
        </div>
      </div>
    </div>
  );
}