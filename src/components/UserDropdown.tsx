'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import SettingsPanel from './SettingsPanel';

import './user-dropdown.css';

type UserDropdownProps = {
  userInStore?: any;
};

export default function UserDropdown({ userInStore: propUser }: UserDropdownProps) {
  const router = useRouter();
  const { logout } = useFirebaseAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);  // NEW state for SettingsPanel

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (!propUser) {
    return <p>Can't retrieve prop user</p>;
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        className="user-dropdown-button"
        onClick={() => setSidebarOpen(true)}
      >
        <img
          src={propUser.image || 'https://www.gravatar.com/avatar/?d=mp'}
          alt="User"
          className="user-dropdown-image"
        />
      </button>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="user-sidebar">
          <div className="user-sidebar-content">
            <img
              src={propUser.image || 'https://www.gravatar.com/avatar/?d=mp'}
              alt="User Avatar"
              className="user-sidebar-avatar"
            />
            <div className="user-sidebar-name">{propUser.name || 'User'}</div>
            <div className="user-sidebar-email">{propUser.email || 'No email'}</div>

            <button onClick={handleLogout} className="user-sidebar-logout">
              Sign out
            </button>

            {/* Settings Button */}
            <button
              onClick={() => {
                setSettingsOpen(true);  // Open SettingsPanel
                setSidebarOpen(false);  // Optionally close sidebar
              }}
              className="user-sidebar-logout"
              style={{ backgroundColor: '#6b7280', marginTop: '1rem' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </button>

            <button
              onClick={() => setSidebarOpen(false)}
              className="user-sidebar-logout"
              style={{ backgroundColor: '#6b7280', marginTop: '0.5rem' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {settingsOpen && (
        <SettingsPanel onClose={() => setSettingsOpen(false)} />
      )}
    </>
  );
}