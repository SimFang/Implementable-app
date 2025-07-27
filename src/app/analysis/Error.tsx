'use client';

import { useRouter } from 'next/navigation';
import './analysis.css';

interface ErrorProps {
  url: string;
}

export default function Error({ url }: ErrorProps) {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="analysis-step-container">
      <div className="analysis-error">
        <div className="analysis-error-icon">
          ⚠️
        </div>
        <h2 className="analysis-title">Website Not Accessible</h2>
        <p className="analysis-subtitle">
          We were unable to access the following website:<br />
          <strong>{url}</strong>
        </p>
        
        <div className="analysis-error-details">
          <p>This could be due to:</p>
          <ul>
            <li>The website is currently offline</li>
            <li>The URL is incorrect</li>
            <li>The website blocks automated access</li>
            <li>Network connectivity issues</li>
          </ul>
        </div>

        <button 
          onClick={handleGoHome}
          className="analysis-button analysis-button-primary"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}