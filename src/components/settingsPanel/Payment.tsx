import React, { useEffect, useState } from 'react';
import { fetchUserPayments } from '../../../helpers/payment/getUserPayment';
import './payment.css';

type Transaction = {
  time: string;
  amount: number;
  productName: string;
  receiptUrl: string | null;
};

export default function Payment() {
  const [credits, setCredits] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const data = await fetchUserPayments();
        setCredits(data.creditsPurchased);
        setTransactions(data.transactions);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch payment data");
        }
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  if (loading) return <div className="payment-loading">Loading payment data...</div>;
  if (error) return (
    <div className="payment-error">
      <p>Error loading payment data.</p>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="payment-container">
      <h2 className="payment-title">Your Payment Summary</h2>
      <p className="payment-credits"><strong>Credits Purchased:</strong> {credits}</p>

      <h3 className="payment-subtitle">Transactions</h3>
      {transactions.length === 0 ? (
        <p className="payment-empty">No transactions found.</p>
      ) : (
        <table className="payment-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td>{new Date(tx.time).toLocaleString()}</td>
                <td>{tx.productName}</td>
                <td>${tx.amount.toFixed(2)}</td>
                <td>
                  {tx.receiptUrl ? (
                    <a href={tx.receiptUrl} target="_blank" rel="noopener noreferrer">
                      View Receipt
                    </a>
                  ) : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}