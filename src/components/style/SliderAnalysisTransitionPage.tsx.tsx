'use client';

import { motion, AnimatePresence } from 'framer-motion';
import './slider-analysis-transition-page.css'
import Logo from './Logo';

interface SliderTransitionProps {
    step: number;
  }
  
  export default function SliderAnalysisTransitionPage({ step }: SliderTransitionProps) {
    return (
      <AnimatePresence>
        <motion.div
          key={step} // triggers on each step change
          initial={{ opacity: 1, x: 0}}
          animate={{ opacity: 0, x:0 }}
          exit={{ opacity: 0 ,x: 0}}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="slider-transition-overlay"
        />
      </AnimatePresence>
    );
  }