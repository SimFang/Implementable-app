'use client';

import './pricing.css';
import payments from '../../../constants/payments.json';
import Link from 'next/link';
import { usePopup } from '@/context/PopUpContext';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export default function PricingPage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { open: openPopup } = usePopup();
  const router = useRouter();

  const handleGetStarted = (slug: string) => {
    if (!isAuthenticated) {
      openPopup({
        title: 'Login Required',
        description: 'You need to be logged in to subscribe.',
        imageUrl: 'https://img.freepik.com/free-vector/access-control-system-abstract-concept-illustration_335657-3180.jpg',
        linkUrl: '/signin',
        buttonText: 'Go to Login',
      });
      return;
    }

    router.push(`/pricing/${slug}`);
  };

  return (
    <div className="pricing-container">
      <div className="pricing-content">
        <h1 className="pricing-title">Pricing</h1>
        <p className="pricing-subtitle">Explore our pricing designed to enhance your experience</p>
        <div className="pricing-plans">
          {payments.paymentInformations.map((plan) => (
            <div key={plan.slug} className="pricing-plan">
              <span className="pricing-plan-label">{plan.name} — {plan.proCredits} Pro Credit{plan.proCredits > 1 ? 's' : ''}</span>
              <span className="pricing-plan-price">{plan.displayPrice}</span>
              <ul className="pricing-plan-features">
                <li className="pricing-plan-feature"><span className="feature-icon">✨</span> Full AI analysis tailored to your business</li>
                <li className="pricing-plan-feature"><span className="feature-icon">✨</span> Streamlined AI strategy report</li>
                <li className="pricing-plan-feature"><span className="feature-icon">✨</span> Practical AI implementation insights</li>
              </ul>
              <button
                className="pricing-plan-button"
                onClick={() => handleGetStarted(plan.slug)}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}