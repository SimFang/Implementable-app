'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getUserAnalyses } from '../../../../helpers/analysis/getUserAnalyses';
import { Lock, Globe } from 'lucide-react';
import './payment-success.css';

interface CompanyProfile {
  companyName?: string;
  websiteURL?: string;
  companyType?: string;
}

interface Analysis {
  analysisId: string;
  unlocked: boolean;
  createdAt: string;
  illustration?: string;
  companyProfile?: CompanyProfile;
}

export default function PaymentSuccess() {
  const [lockedAnalyses, setLockedAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyses = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before fetching
  
      try {
        const data: Analysis[] = await getUserAnalyses();
        console.log(data);
        setError(null);
        const locked = data.filter((a: Analysis) => !a.unlocked);
        setLockedAnalyses(locked);
        console.log("set");
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analyses');
      } finally {
        setLoading(false);
      }
    };
  
    fetchAnalyses();
  }, []);

  const handleClick = (analysisId: string) => {
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/result/unlocking?analysisId=${encodeURIComponent(analysisId)}`;
  };

  const formatDate = (isoDate: string) => {
    try {
      return new Date(isoDate).toLocaleDateString();
    } catch {
      return isoDate;
    }
  };

  if (loading) return  <div className="pl-container">
  <div className="pl-loading-modal">
    <div className="pl-spinner">
      <div className="pl-spinner-inner"></div>
    </div>
    <h1 className="pl-title">Processing payment...</h1>
    <p className="pl-subtitle">
      Please wait while we process your payment
      <br />
      This may take a few moments
    </p>
  </div>
</div>;
  
  if (lockedAnalyses.length === 0) {
    return (
      <motion.div 
        className="ps-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="ps-success-modal"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <motion.div 
            className="ps-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          >
            <div className="ps-icon-inner"></div>
          </motion.div>
          <motion.h1 
            className="ps-title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            Thanks for purchasing!
          </motion.h1>
          <motion.p 
            className="ps-subtitle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            You can now unlock analysis with your credits
            <br />
            You'll receive a validation via email
          </motion.p>
          <motion.button 
            className="ps-continue-button" 
            onClick={() => window.location.href = '/landing'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            continue
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="ps-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="ps-projects-container"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <motion.h1 
          className="ps-projects-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          Thanks for purchasing!
        </motion.h1>
        <motion.p 
          className="ps-projects-subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          Unlock your projects below using your new tokens:
        </motion.p>
        <motion.div 
          className="ps-projects-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {lockedAnalyses.map((analysis: Analysis) => {
            const cp = analysis.companyProfile || {};
            return (
              <motion.div
                key={analysis.analysisId}
                className="ps-project-card"
                onClick={() => handleClick(analysis.analysisId)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => { if (e.key === 'Enter') handleClick(analysis.analysisId); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + (lockedAnalyses.indexOf(analysis) * 0.1) }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {analysis.illustration && (
                  <img
                    src={analysis.illustration}
                    alt={`${cp.companyName || 'Company'} illustration`}
                    className="ps-image"
                  />
                )}
                <div className="ps-info">
                  <h3>{cp.companyName || 'Unnamed Company'}</h3>
                  <p><strong>Type:</strong> {cp.companyType || 'N/A'}</p>
                  <p>
                    {cp.websiteURL ? (
                      <a href={cp.websiteURL} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                        <Globe size={16} />
                      </a>
                    ) : 'N/A'}
                  </p>
                  <p><strong>Date:</strong> {formatDate(analysis.createdAt)}</p>
                  <div className="ps-lock-icon"><Lock size={16} /></div>
                </div>
               </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}