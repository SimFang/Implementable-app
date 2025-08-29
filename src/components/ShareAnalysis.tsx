import React, { useEffect, useState } from 'react';
import { IoShareSocialOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import Gradient from './style/Gradient';
import './share-analysis.css';

const rotatingWords = [
  'Colleagues',
  'Stakeholders',
  'Collaborators',
  'Advisors',
  'Investors',
  'Executives',
  'Board members',
  'Leadership team',
  'Clients (if relevant)',
  'Managers',
  'Departments',
  'Decision-makers',
  'Business contacts',
  'Co-founders',
  'Consultants',
];

interface ShareAnalysisProps {
  analysisId: string;
}

export default function ShareAnalysis({ analysisId }: ShareAnalysisProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 3000); // 3 seconds between transitions
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="share-container">
      <Gradient
        size="500px"
        fromColor='#829CD7'
        style={{bottom : -200}}
        position="bottom left"
        
      />

      <div className='line'></div>

      <div className="share-content">
        <div className="share-heading">Send this analysis to</div>

        <div className="rotating-text-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={rotatingWords[currentWordIndex]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="rotating-text"
            >
              {rotatingWords[currentWordIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="share-button-wrapper">
          <button
            className="share-button"
            onClick={() => alert(`Sharing analysis ID: ${analysisId}`)}
          >
            <IoShareSocialOutline color="#fff" size={36} />
          </button>
        </div>
      </div>
    </div>
  );
}