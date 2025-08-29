import React, { useEffect, useState } from 'react';
import { fetchUserPayments } from '../../../helpers/payment/getUserPayment';
import './invoices.css';
import { FileText } from 'lucide-react';
import pricings from '../../../constants/payments.json'

type Transaction = {
  time: string;
  amount: number;
  productName: string;
  receiptUrl: string | null;
};

export default function Invoices() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const data = await fetchUserPayments();
        setTransactions(data.transactions || []);
        console.log(data.transactions)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch payment data");
      } finally {
        setLoading(false);
      }
    };
    loadPayments();
  }, []);

  const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const totalTokens = transactions.length;
  const avgPrice = totalTokens > 0 ? (totalAmount / totalTokens) : 0;

  return (
    <div className="payment-container">
      <h2 className="payment-heading">Payment</h2>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <div className="payment-error">{error}</div>
      ) : (
        <>

          <p className="payment-subheading">Those are real-time personal statistics</p>
          <div className="payment-stats">
            <div className="payment-stat-card">
              <p className="stat-label">Total</p>
              <p className="stat-value">${totalAmount.toFixed(2)}</p>
            </div>
            <div className="payment-stat-card">
              <p className="stat-label">Total token</p>
              <p className="stat-value">{totalTokens}</p>
            </div>
            <div className="payment-stat-card">
              <p className="stat-label">Average price per token</p>
              <p className="stat-value">${avgPrice.toFixed(2)}</p>
            </div>
          </div>

          <h3 className="invoice-title">Invoices</h3>
          {transactions.map((tx, i) => {
                const matchedProduct = pricings.paymentInformations.find(p => p.price === tx.amount);
                const productLabel = matchedProduct
                  ? `${matchedProduct.proCredits} Credit${matchedProduct.proCredits > 1 ? 's' : ''} - ${matchedProduct.name} Plan`
                  : tx.productName; // fallback to original if not found

                return (
                  <div key={i} className="invoice-card">
                    <div className="invoice-details">
                      <div className="invoice-name">{productLabel}</div>
                      <div className="invoice-price">{tx.amount}€</div>
                      <div className="invoice-meta">
                        <div className="invoice-status">
                          Status <span className="status-complete">Completed</span>
                        </div>
                        <div className="invoice-date">
                          Payment date<br />
                          {new Date(tx.time).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="invoice-action">
                      {tx.receiptUrl && (
                        <button
                          className="invoice-button"
                          onClick={() => window.open(tx.receiptUrl!, '_blank')}
                        >
                          <FileText size={16} color="white" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
        </>
      )}
    </div>
  );
}