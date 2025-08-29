'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './loading.css';

export default function PaymentLoading() {
  return (
    <motion.div 
      className="pl-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="pl-loading-modal"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <motion.div 
          className="pl-spinner"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        >
          <div className="pl-spinner-inner"></div>
        </motion.div>
        <motion.h1 
          className="pl-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          Processing payment...
        </motion.h1>
        <motion.p 
          className="pl-subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          Please wait while we process your payment
          <br />
          This may take a few moments
        </motion.p>
      </motion.div>
    </motion.div>
  );
}