'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './agreement.css';
import { acceptAgreement } from "../../../helpers/analysis/acceptAgreement";
import Gradient from '@/components/style/Gradient';
import legal from '../../../constants/legal.json'

interface AgreementProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  processId: string | null;
  onQuestionsFetched: (questions: any[]) => void;
}

export default function Agreement({ currentStep, onStepChange, processId, onQuestionsFetched }: AgreementProps) {
  const [agreed, setAgreed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleContinue = async () => {
    if (agreed && processId) {
      onStepChange(currentStep + 1); 
  
      try {
        const response = await acceptAgreement(processId); 
  
        if (response.success) {

            onQuestionsFetched(response.data?.questions); 
            onStepChange(currentStep + 2); 
            
        } else {
          console.error(response.error);
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
      <Gradient
        fromColor='#202737'
        midColor='#829CD7'
        position="bottom"
        size="900px"
        style={{ zIndex: 0, bottom : -200, height : "200vh" }}
      />
      <div className='analysis-step-content'>

          <h2 className="analysis-title">Website Data <strong>Collection & Analysis</strong></h2>

          <div className="analysis-agreement">
            <motion.div
              className={`agreement-text-wrapper ${expanded ? 'expanded' : ''}`}
              initial={false}
              animate={{ height: expanded ? 'auto' : 100, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => setExpanded(!expanded)}
              style={{ cursor: 'pointer', overflow: 'hidden', position: 'relative' }}
            >
              <p>{legal.analysisTermsFirst}</p>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <p>{legal.analysisTermsSecond}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {!expanded && (
                <div className="fade-overlay" />
              )}
            </motion.div>

            <p className="click-to-expand-text">{expanded ? 'Click to collapse terms' : 'Click to read full terms'}</p>
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
            className={`analysis-button ${agreed ? 'analysis-button-primary' : 'analysis-button-disabled'}`}
            onClick={handleContinue}
            disabled={!agreed}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="analysis-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
      </div>
    </div>
  );
}