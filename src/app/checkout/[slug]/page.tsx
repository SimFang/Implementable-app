'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import payments from '../../../../constants/payments.json';
import { createCheckoutSession } from '../../../../helpers/payment/createCheckoutSession';
import { PaymentProduct } from '../../../../types/paymentTypes';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export default function Checkout() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<PaymentProduct | null>(null);

  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/checkout/session-error');
      return;
    }

    const matchedProduct = payments.paymentInformations.find((p: PaymentProduct) => p.slug === slug);
    if (!matchedProduct) {
      router.replace('/pricing');
      return;
    }

    setProduct(matchedProduct);

    const startCheckout = async () => {
      try {
        await createCheckoutSession(user?.email, matchedProduct.productId, user?.userId);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    startCheckout();
  }, [slug, user, router]);

  if (!product) {
    return (
      <div className="checkout-container">
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      {loading ? (
        <div className="checkout-loading">
          <h2>Preparing your checkout...</h2>
          <p>Redirecting to payment for <strong>{product.name}</strong> ({product.displayPrice})</p>
          <div className="spinner" />
        </div>
      ) : (
        <div>
          <p>Something went wrong. Please try again.</p>
        </div>
      )}
    </div>
  );
}