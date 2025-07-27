import React from 'react';
import Link from 'next/link';
import './footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-section-title">Company</h3>
            <ul>
              <li><Link href="/blog" className="footer-link">Blog</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-section-title">Legal</h3>
            <ul>
              <li><Link href="/terms-of-service" className="footer-link">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-section-title">Resources</h3>
            <ul>
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/pricing" className="footer-link">Pricing</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-section-title">Contact</h3>
            <ul>
              <li><Link href="/contact" className="footer-link">Contact Us</Link></li>
              <li><Link href="/support" className="footer-link">Support</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}