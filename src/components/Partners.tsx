import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './partners.css';
import partners from '../../constants/partners.json';

export default function Partners() {
  const [index, setIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const intervalRef:any = useRef(null);

  const next = () => {
    setHasInteracted(true);
    setIndex((prev) => (prev + 1) % partners.length);
  };

  const prev = () => {
    setHasInteracted(true);
    setIndex((prev) => (prev - 1 + partners.length) % partners.length);
  };

  useEffect(() => {
    if (!hasInteracted) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % partners.length);
      }, 2000);
    }

    return () => clearInterval(intervalRef.current);
  }, [hasInteracted]);

  const current = partners[index];

  return (
    <div className="partners-section">
      <p className="partners-subtitle">
        Get connected with certified experts who can turn your AI strategy into action.
      </p>
      <h2 className="partners-title">
        Looking to bring your AI strategy to life? Don’t wait.
      </h2>

      <div className="partners-slider">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            className="partner-card"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <div className="partner-info">
              <h3>{current.name}</h3>
              <p>{current.description}</p>
              <div className="partner-actions">
                <a href={current.url} target="_blank" rel="noopener noreferrer" className="cta-button">
                  <span>→</span>
                </a>
                <a href={current.url} target="_blank" rel="noopener noreferrer" className="globe-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48">
                    <g fill="none" stroke="#000" strokeWidth="3">
                      <path strokeLinejoin="round" d="M3 24a21 21 0 1 0 42 0a21 21 0 1 0-42 0" />
                      <path strokeLinejoin="round" d="M15 24a9 21 0 1 1 18 0a9 21 0 1 1-18 0" />
                      <path strokeLinecap="round" d="M4.5 31h39m-39-14h39" />
                    </g>
                  </svg>
                </a>
              </div>
            </div>
            <img src={current.image} alt={current.name} className="partner-image" />
          </motion.div>
        </AnimatePresence>

        <div className="slider-nav">
          <button onClick={prev}>←</button>
          <button onClick={next}>→</button>
        </div>
      </div>
    </div>
  );
}