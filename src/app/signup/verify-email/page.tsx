'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { sendVerificationCode } from '../../../../helpers/auth/sendVerificationCode';
import { updateUserField } from '../../../../helpers/auth/updateuserfield';
import './verify-email.css';
import Logo from '@/components/style/Logo';

export default function VerifyEmail() {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState('');
  const [expectedCode, setExpectedCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeSinceSent, setTimeSinceSent] = useState(0);
  const [resendCountdown, setResendCountdown] = useState(0);

  const { user } = useSelector((state: RootState) => state.auth);
  const userEmail = user?.email;
  const userId = user?.userId;  

  const sendCode = async () => {
    try {
      const {code} = await sendVerificationCode(userEmail);
      setExpectedCode("000000"); // override for Mailgun test
      setTimeSinceSent(0);
      setResendCountdown(60);
    } catch {
      setError('Failed to send verification code');
    }
  };

  useEffect(() => {
    if (!userEmail) return;
    sendCode();
  }, [userEmail]);

  // Increment the "sent X seconds ago" timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSinceSent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Decrease the resend countdown
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const countdownTimer = setTimeout(() => {
      setResendCountdown(resendCountdown - 1);
    }, 1000);

    return () => clearTimeout(countdownTimer);
  }, [resendCountdown]);

  const handleResendCode = async () => {
    await sendCode();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (timeSinceSent > 120) {
        setError('The code has expired. Please request a new one.');
        return;
      }

      if (verificationCode === expectedCode) {
        if (!userId) {
          setError('User ID not found');
          return;
        }

        await updateUserField(userId, 'verifiedEmail', true);
        router.push('/signup/complete-profile');
      } else {
        setError('Invalid verification code');
      }
    } catch {
      setError('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-email-container">
      <div className='verify-email-box'>
      <div className="verify-email-header">
        <Logo/>
        <h2 className="verify-email-title">
          Check your inbox
        </h2>
        <p className="verify-email-subtitle">
          We've sent a verification code to {userEmail}
        </p>
        <p className="verify-email-timer">
          Sent {timeSinceSent}s ago — expires after 120s
        </p>
      </div>

      <div className="verify-email-form-container">
        <div className="verify-email-form-box">
          <form className="verify-email-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="code" className="verify-email-label">
                Verification Code
              </label>
              <div className="verify-email-input-wrapper">
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="verify-email-input"
                  placeholder="Enter 6-digit code"
                />
              </div>
            </div>

            {error && <p className="verify-email-error">{error}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="verify-email-submit"
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </div>

            <div className="verify-email-resend-wrapper">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={resendCountdown > 0}
                className="verify-email-resend"
              >
                {resendCountdown > 0
                  ? `Resend code in ${resendCountdown}s`
                  : "Didn't receive the code? Resend"}
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}