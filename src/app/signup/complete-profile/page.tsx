'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUserField } from '../../../../helpers/auth/updateuserfield';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import './complete-profile.css';

export default function CompleteProfile() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?.userId;
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    heardFrom: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      if (!userId) {
        throw new Error('User ID is missing');
      }
  
      await updateUserField(userId, 'name', formData.name);
      await updateUserField(userId, 'heardFrom', formData.heardFrom); // optional
  
      router.push('/signin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="complete-profile-container">
      <div className="complete-profile-header">
        <h2 className="complete-profile-title">
          Let's personalize your experience
        </h2>
        <p className="complete-profile-subtitle">
          Tell us a bit more about yourself
        </p>
      </div>

      <div className="complete-profile-form-container">
        <div className="complete-profile-form-box">
          <form className="complete-profile-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="complete-profile-label">
                Full Name
              </label>
              <div className="complete-profile-input-wrapper">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="complete-profile-input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="heardFrom" className="complete-profile-label">
                How did you hear about us?
              </label>
              <div className="complete-profile-input-wrapper">
                <select
                  id="heardFrom"
                  name="heardFrom"
                  required
                  value={formData.heardFrom}
                  onChange={handleChange}
                  className="complete-profile-select"
                >
                  <option value="">Select an option</option>
                  <option value="search">Search Engine</option>
                  <option value="social">Social Media</option>
                  <option value="friend">Friend/Colleague</option>
                  <option value="advertisement">Online Advertisement</option>
                  <option value="blog">Blog or Article</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {error && <p className="complete-profile-error">{error}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="complete-profile-submit"
              >
                {loading ? 'Saving...' : 'Complete Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}