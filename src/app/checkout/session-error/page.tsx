'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import './sessionError.css'; // optional, create for custom styling

export default function SessionErrorPage() {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push('/signin');
  };

  const handleGoToLanding = () => {
    router.push('/landing');
  };

  return (
    <div className="session-error-container">
      <h1 className="session-error-title">Session Error</h1>
      <p className="session-error-message">
        Your session has expired or you're not logged in.
      </p>
      <p className="session-error-submessage">
        Please login again to proceed with your checkout or return to the homepage.
      </p>

      <div className="session-error-buttons">
        <button onClick={handleGoToLogin} className="session-error-button login">
          Go to Login
        </button>
        <button onClick={handleGoToLanding} className="session-error-button landing">
          Go to Landing
        </button>
      </div>
    </div>
  );
}