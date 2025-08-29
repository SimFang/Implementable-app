'use client';

import { useEffect, useState } from 'react';
import './loading2.css';
import Gradient from '@/components/style/Gradient';

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
      <Gradient
        fromColor='#202737'
        midColor='#829CD7'
        position="bottom"
        size="900px"
        style={{ zIndex: 0, bottom: -200, height: "200vh" }}
      />
      <div className="analysis-step-fetchloading-content">
        <div className="analysis-loading">
          <div className="loading-circle"></div>
          <div>
            <h2 className="analysis-title">
              {loadingMessages[messageIndex].split('...')[0]}<strong>...</strong>
            </h2>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}