'use client';

import { useEffect } from 'react';
import './loading1.css';
import Gradient from '@/components/style/Gradient';

interface FetchLoadingProps {
  url: string;
  currentStep: number;
  onStepChange: (step: number) => void;
  processId: string | null;
}

export default function Fetch_Loading({ url, currentStep, onStepChange, processId }: FetchLoadingProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onStepChange(currentStep + 1);
    }, 3000); // 3 seconds delay for demonstration

    return () => clearTimeout(timer);


  }, [currentStep, onStepChange]);

  return (
    <div className="analysis-step-container">
      <Gradient
        fromColor='#202737'
        midColor='#829CD7'
        position="bottom"
        size="900px"
        style={{ zIndex: 0, bottom : -200, height : "200vh" }}
      />
      <div className='analysis-step-fetchloading-content'>
          <div className="analysis-loading">
            <div className="loading-circle"></div>
            <h2 className="analysis-title">{"Gathering"}<strong>informations...</strong></h2>
          </div>
      </div>
    </div>
  );
}