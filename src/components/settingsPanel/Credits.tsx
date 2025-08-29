import React, { useEffect, useState } from 'react';
import { fetchUserPayments } from '../../../helpers/payment/getUserPayment';
import './credits.css';

export default function Credits() {
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCredits = async () => {
      try {
        const data = await fetchUserPayments();
        setCredits(data.creditsPurchased);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch credit data");
        }
      } finally {
        setLoading(false);
      }
    };

    loadCredits();
  }, []);

  return (
    <div className="payment-wrapper">
      <h2 className="payment-heading">Credits</h2>
      <p className="payment-subheading">Your current amount of tokens</p>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <div className="credits-error">
          <p>Error loading credits.</p>
          <p>{error}</p>
        </div>
      ) : (
        <div className="credits-circle">
          <div className="credits-value">{credits}</div>
          <div className="credits-label">CREDITS</div>
        </div>

        
      )}
    </div>
  );
}