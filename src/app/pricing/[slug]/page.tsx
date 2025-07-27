import payments from '../../../../constants/payments.json';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface ProductDetailPageProps {
    params: { slug: string };
  }

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = params;
  const product = payments.paymentInformations.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="product-detail-container">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>Price:</strong> {product.displayPrice}</p>
      <p><strong>Credits:</strong> {product.proCredits}</p>

      <Link href={`/checkout/${product.slug}`}>
        <button className="checkout-button">Proceed to Checkout</button>
      </Link>
    </div>
  );
}