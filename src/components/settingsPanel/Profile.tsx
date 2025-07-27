import React, { useState, useEffect } from 'react';
import countries from '../../../constants/countries.json';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { updateName, updateBio, updateCountry } from '../../../helpers/auth/updateUserInfo';
import { setUser } from '../../store/slices/authSlice';
import './profile.css';

export default function Profile() {
  const { user: userInStore } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [name, setName] = useState(userInStore?.name || '');
  const [bio, setBio] = useState(userInStore?.bio || '');
  const [country, setCountry] = useState(userInStore?.country || '');
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (
      name !== userInStore?.name ||
      bio !== (userInStore?.bio || '') ||
      country !== (userInStore?.country || '')
    ) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  }, [name, bio, country, userInStore]);

  const handleConfirm = async () => {
    if (!userInStore) return;

    try {
      if (name !== userInStore.name) {
        await updateName(userInStore.userId, name);
      }
      if (bio !== (userInStore.bio || '')) {
        await updateBio(userInStore.userId, bio);
      }
      if (country !== (userInStore.country || '')) {
        await updateCountry(userInStore.userId, country);
      }

      dispatch(setUser({
        ...userInStore,
        name,
        bio,
        country,
      }));

      setIsModified(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile.');
    }
  };

  if (!userInStore) return <p>Loading user info...</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Profile Settings</h2>

      <div className="profile-field-group">
        <label className="profile-label">Email (read-only)</label>
        <input type="email" value={userInStore.email} readOnly className="profile-input" />
      </div>

      <div className="profile-field-group">
        <label className="profile-label">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="profile-input"
        />
      </div>

      <div className="profile-field-group">
        <label className="profile-label">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="profile-input profile-textarea"
        />
      </div>

      <div className="profile-field-group">
        <label className="profile-label">Country</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="profile-input"
        >
          <option value="">Select a country</option>
          {countries.map((c) => (
            <option key={c.name} value={c.name}>
              {c.emoji} {c.name}
            </option>
          ))}
        </select>
      </div>

      {isModified && (
        <button onClick={handleConfirm} className="profile-confirm-button">
          Confirm Changes
        </button>
      )}
    </div>
  );
}