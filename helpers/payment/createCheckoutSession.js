import { loadStripe } from '@stripe/stripe-js';
import routes from '../../constants/routes.json';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export async function createCheckoutSession(email, productId, customerId) {
  try {
    const response = await fetch(routes.serverUrl + routes.createCheckout, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, productId, customerId }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Checkout session failed');

    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to load');

    await stripe.redirectToCheckout({ sessionId: data.sessionId });
  } catch (err) {
    console.error('❌ Stripe checkout error:', err);
    alert('Checkout failed. Check console.');
  }
}