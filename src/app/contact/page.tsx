'use client';

import { useState, FormEvent } from 'react';
import './contact.css';
import { sendContactMessage } from '../../../helpers/corporate/sendContactMessage';
import { motion, AnimatePresence } from 'framer-motion';

type ComplaintType = {
  value: string;
  label: string;
};

const complaintTypes: ComplaintType[] = [
  { value: 'implementation', label: 'AI Implementation Challenges' },
  { value: 'integration', label: 'System Int egration Issues' },
  { value: 'strategy', label: 'AI Strategy Consultation' },
  { value: 'pricing', label: 'Pricing & Billing' },
  { value: 'report', label: 'Report Quality Feedback' },
  { value: 'technical', label: 'Technical Support' },
  { value: 'other', label: 'Other' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    complaintType: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.complaintType || !formData.message) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await sendContactMessage({
        name: formData.name,
        email: formData.email,
        category: formData.complaintType,
        message: formData.message,
      });

      if (result.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          complaintType: '',
          message: '',
        });
      } else {
        setError(result.error || 'Something went wrong');
      }
    } catch {
      setError('Failed to submit the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-box">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-description">
          Have questions about our AI consulting service? We're here to help.
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-form-group">
            <label htmlFor="name" className="contact-label">Name</label>
            <input
              type="text"
              id="name"
              className="contact-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your full name"
            />
          </div>

          <div className="contact-form-group">
            <label htmlFor="email" className="contact-label">Email</label>
            <input
              type="email"
              id="email"
              className="contact-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@company.com"
            />
          </div>

          <div className="contact-form-group">
            <label htmlFor="complaintType" className="contact-label">Inquiry Type</label>
            <select
              id="complaintType"
              className="contact-select"
              value={formData.complaintType}
              onChange={(e) => setFormData({ ...formData, complaintType: e.target.value })}
            >
              <option value="">Select an inquiry type</option>
              {complaintTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="contact-form-group">
            <label htmlFor="message" className="contact-label">Message</label>
            <textarea
              id="message"
              className="contact-input contact-textarea"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us how we can help..."
            />
          </div>

          {error && <p className="contact-error">{error}</p>}

          <AnimatePresence>
            {success && (
              <motion.p
                className="contact-success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                ✅ Your message has been successfully sent!
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="contact-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="spinner" />
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}