'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import './unlocking-loading.css';

export default function UnlockingLoadingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const analysisId = searchParams.get('analysisId');
  const pageDurationInSeconds = 4

  useEffect(() => {
    if (!analysisId) return;

    const timer = setTimeout(() => {
      router.push(`/result?analysisId=${encodeURIComponent(analysisId)}`);
    }, pageDurationInSeconds*1000); 

    return () => clearTimeout(timer); // cleanup
  }, [analysisId, router]);

  return (
    <div className="unlocking-loading-container">
      <div className="locker-animation">
        <div className="locker-body">
          <div className="locker-door" />
        </div>
        <p className="unlocking-message">Unlocking your analysis...</p>
      </div>
    </div>
  );
}