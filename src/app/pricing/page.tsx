'use client';

import './pricing.css';
import payments from '../../../constants/payments.json';
import Link from 'next/link';
import { usePopup } from '@/context/PopUpContext';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import AIStar from '@/components/style/AIStar';
import Gradient from '@/components/style/Gradient';
import { useState } from 'react';
import AnimatedLoadingPage from '@/components/style/AnimatedLoadingPage';

export default function PricingPage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { open: openPopup } = usePopup();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = (slug: string) => {
    if (!isAuthenticated) {
      openPopup({
        title: 'Login Required',
        description: 'You need to be logged in to subscribe.',
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xMCAxMUgyLjA0OGMuNTAyLTUuMDUzIDQuNzY1LTkgOS45NS05YzUuNTIzIDAgMTAgNC40NzcgMTAgMTBzLTQuNDc3IDEwLTEwIDEwYy01LjE4NSAwLTkuNDQ4LTMuOTQ3LTkuOTUtOWg3Ljk1djNsNS00bC01LTR6Ii8+PC9zdmc+',
        linkUrl: '/signin',
        buttonText: 'Go to Login',
      });
      return;
    }
    setLoading(true)
    setTimeout(()=>{
      router.push(`/checkout/${slug}`);
    },900)
    
  };

  return (
    <>
    {loading && <AnimatedLoadingPage/>}
    <div className="pricing-container">
          <Gradient
            position='bottom'
            style={{ zIndex: 0, bottom : "-300px" }} 
            size='700px'
          />
      <div className="pricing-content">
        
        <h1 className="pricing-title">Pricing</h1>
        <p className="pricing-subtitle">Explore our pricing designed to enhance your experience</p>
        <div className="pricing-plans">
          {payments.paymentInformations.map((plan) => (
            <div key={plan.slug} className="pricing-plan">
                  <span className="pricing-plan-status" >{plan.name}</span>
                  <span className="pricing-plan-credit" style={{ display: 'block' }}>
                    {plan.proCredits} Pro Credit{plan.proCredits > 1 ? 's' : ''}
                  </span>
              <span className="pricing-plan-price">{plan.displayPrice}</span>
              <ul className="pricing-plan-features">
                <li className="pricing-plan-feature"><span className="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" fillRule="evenodd" d="M15.38 8.65L12 .986L8.62 8.65L.953 12.03l7.667 3.38L12 23.078l3.38-7.668l7.667-3.38z" clipRule="evenodd"/></svg></span> Full AI analysis tailored to your business</li>
                <li className="pricing-plan-feature"><span className="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" fillRule="evenodd" d="M15.38 8.65L12 .986L8.62 8.65L.953 12.03l7.667 3.38L12 23.078l3.38-7.668l7.667-3.38z" clipRule="evenodd"/></svg></span> Streamlined AI strategy report</li>
                <li className="pricing-plan-feature"><span className="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" fillRule="evenodd" d="M15.38 8.65L12 .986L8.62 8.65L.953 12.03l7.667 3.38L12 23.078l3.38-7.668l7.667-3.38z" clipRule="evenodd"/></svg></span> Practical AI implementation insights</li>
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
    </>
  );
}