'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './success.css';

export default function SignupSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/signup/complete-profile');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="success-container">
      <div className="success-box">
        <div className="success-content">
          <svg
            className="success-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="success-title">
            Account Created Successfully!
          </h2>
          <p className="success-message">
            Redirecting you to complete your profile...
          </p>
          <div className="success-progress">
            <div className="success-progress-bar">
              <div className="success-progress-value"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}