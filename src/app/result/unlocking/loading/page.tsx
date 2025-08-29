'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './unlocking-loading.css';

export default function UnlockingLoadingPage() {
  const lockBodyColor = '#1d4ed8';
  const lockShackleColor = '#2563eb';
  const lockKeyholeColor = '#f3f4f6';
  const router = useRouter();
  const searchParams = useSearchParams();
  const analysisId = searchParams.get('analysisId');
  const pageDurationInSeconds = 3;

  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!analysisId) return;

    // Start fade out a bit before redirect
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, (pageDurationInSeconds - 0.5) * 1000); // start fading 0.5s before route change

    const timer = setTimeout(() => {
      router.push(`/result?analysisId=${encodeURIComponent(analysisId)}`);
    }, pageDurationInSeconds * 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, [analysisId, router]);

  return (
    <div className="unlocking-loading-container">
      <motion.div
        className="lock-animation"
        style={{
          '--lock-body-color': lockBodyColor,
          '--lock-shackle-color': lockShackleColor,
          '--lock-keyhole-color': lockKeyholeColor,
        } as React.CSSProperties}
        initial={{ opacity: 1 }}
        animate={{ opacity: fadeOut ? 0 : 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div className="lock-3d">
          <div className="lock-body">
            <div className="lock-keyhole" />
          </div>
          <div className="lock-shackle" />
        </div>
      </motion.div>
    </div>
  );
}
