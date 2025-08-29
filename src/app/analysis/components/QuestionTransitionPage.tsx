'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import './question-transition-page.css';

interface QuestionTransitionPageProps {
  show: boolean;
  progress: number;
  onFinish: () => void;
}

export default function QuestionTransitionPage({ show, progress, onFinish }: QuestionTransitionPageProps) {
  // Automatically trigger onFinish after the transition completes
  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        onFinish();
      }, 2200); // 1.5s bar + 0.6s fadeOut + buffer

      return () => clearTimeout(timeout);
    }
  }, [show, onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="transition"
          className="question-transition-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut', delay: 1.6 }}
        >
          <div className="question-transition-inner">
            <motion.div
              className="analysis-progress-bar"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
              <div className="analysis-progress-fill" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}