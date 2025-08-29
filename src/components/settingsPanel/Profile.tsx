import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { updateName, updateBio, updateCountry } from '../../../helpers/auth/updateUserInfo';
import { setUser } from '../../store/slices/authSlice';
import countries from '../../../constants/countries.json';
import './profile.css';
import { motion, AnimatePresence } from 'framer-motion';
import { deleteUser } from '../../../helpers/auth/deleteUser';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { user: userInStore } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [name, setName] = useState(userInStore?.name || '');
  const [bio, setBio] = useState(userInStore?.bio || '');
  const [country, setCountry] = useState(userInStore?.country || '');
  const [isModified, setIsModified] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');

  useEffect(() => {
    setIsModified(
      name !== userInStore?.name ||
      bio !== (userInStore?.bio || '') ||
      country !== (userInStore?.country || '')
    );
  }, [name, bio, country, userInStore]);

  const handleConfirm = async () => {
    if (!userInStore) return;

    try {
      if (name !== userInStore.name) await updateName(userInStore.userId, name);
      if (bio !== userInStore.bio) await updateBio(userInStore.userId, bio);
      if (country !== userInStore.country) await updateCountry(userInStore.userId, country);

      dispatch(setUser({ ...userInStore, name, bio, country }));
      setIsModified(false);
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update profile.');
    }
  };

  const handleDelete = async () => {
    try {
      router.replace('/auth/logout');
      await deleteUser();
    } catch (error) {
      console.error('Delete account error:', error);
      alert('Failed to delete account.');
    }
  };

  if (!userInStore) return <p>Loading user info...</p>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Account</h1>

      <label className="profile-label">Email</label>
      <p className="profile-email">{userInStore.email}</p>

      <label className="profile-label">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="profile-input"
      />

      <label className="profile-label">Bio</label>
      <textarea
        placeholder="Your bio..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="profile-input textarea"
      />

      <label className="profile-label">Country</label>
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="profile-input country"
      >
        <option value="">Select a country</option>
        {countries.map((c) => (
          <option key={c.name} value={c.name}>
            {c.emoji} {c.name}
          </option>
        ))}
      </select>

      <AnimatePresence>
        {isModified && (
          <motion.button
            onClick={handleConfirm}
            className="profile-save-button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            Save
          </motion.button>
        )}
      </AnimatePresence>

      <hr className="profile-divider" />

      <div className="deactivate-section">
        <h3 className="profile-label">Deactivate your account</h3>
        <p className="deactivate-description">
          This will remove all information and <a href="#">projects regarding your account</a>
        </p>
        <button className="deactivate-button" onClick={() => setShowPopup(true)}>
          Deactivate account
        </button>
      </div>

      {/* DELETE CONFIRMATION POPUP */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2}}

          >
            <motion.div
              className="popup-box"
              initial={{  y: -10 }}
              animate={{  y: 0 }}
              exit={{  y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="popup-title">Confirm Deletion</h2>
              <p className="popup-text">
                Deleting your account is <strong>permanent and irreversible</strong>. Please read carefully:
              </p>
              <ul className="popup-warning-list">
                <li>All personal information linked to your account will be deleted from all databases.</li>
                <li>All projects and their associated rights will be removed.</li>
                <li>However, any public analysis links you've shared will still work (if you kept the link).</li>
              </ul>
              <p className="popup-text" style={{ marginTop: '1.5rem' }}>
                To confirm, please type <strong>DELETE ACCOUNT</strong> below.
              </p>
              <input
                type="text"
                className="popup-input"
                placeholder="Type DELETE ACCOUNT"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
              />
              <div className="popup-buttons">
                <button
                  className="popup-cancel"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="popup-confirm"
                  onClick={handleDelete}
                  disabled={confirmationText !== 'DELETE ACCOUNT'}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}