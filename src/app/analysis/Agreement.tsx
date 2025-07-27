'use client';

import { useState } from 'react';
import './analysis.css';
import {acceptAgreement} from "../../../helpers/analysis/acceptAgreement";

interface AgreementProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  processId: string | null;
  onQuestionsFetched: (questions: any[]) => void;
}

export default function Agreement({ currentStep, onStepChange, processId, onQuestionsFetched }: AgreementProps) {
  const [agreed, setAgreed] = useState(false);

  const handleContinue = async () => {
    if (agreed && processId) {
      onStepChange(currentStep + 1); // Step 1 ➝ Step 2 (Loading) immediately
  
      try {
        const response = await acceptAgreement(processId); // Fetch questions
  
        if (response.success) {
          onQuestionsFetched(response.data?.questions); // Save to parent
          onStepChange(currentStep + 2); // Step 2 ➝ Step 3
        } else {
          console.error(response.error);
          // Optional: go back to step 1 or show error
          onStepChange(currentStep); 
        }
      } catch (err) {
        console.error('Failed to accept agreement:', err);
        onStepChange(currentStep); // Optional rollback
      }
    }
  };

  return (
    <div className="analysis-step-container">
      <h2 className="analysis-title">Terms of Service</h2>
      <p className="analysis-subtitle">
        Please read and agree to our terms before proceeding with the analysis
      </p>

      <div className="analysis-agreement">
        <h3>Analysis Terms and Conditions</h3>
        <p>By using our AI analysis service, you agree to the following terms:</p>
        <ul>
          <li>We will analyze the provided website URL using our AI algorithms</li>
          <li>The analysis results are for informational purposes only</li>
          <li>We do not guarantee specific outcomes or recommendations</li>
          <li>Your website data will be processed according to our privacy policy</li>
          <li>The analysis may take several minutes to complete</li>
        </ul>
      </div>

      <div className="analysis-checkbox-wrapper">
        <input
          type="checkbox"
          id="agreement"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <label htmlFor="agreement">I agree to the terms and conditions</label>
      </div>

      <button
        className={`analysis-button ${agreed ? 'analysis-button-primary' : 'analysis-button-secondary'}`}
        onClick={handleContinue}
        disabled={!agreed}
      >
        Continue
      </button>
    </div>
  );
}