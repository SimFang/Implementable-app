import React, { useState } from 'react';
import './settings-panel.css';
import Profile from './settingsPanel/Profile';
import Projects from './settingsPanel/Projects';
import Payment from './settingsPanel/Payment';

interface SettingsPanelProps {
  onClose: () => void;  // NEW prop
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState('Profile');

  return (
    <div className="settings-overlay">
      <div className="settings-panel">
        {/* Sidebar Navigation */}
        <nav className="settings-sidebar">
          <h3 className="settings-sidebar-title">Account</h3>
          <ul>
            <li
              className={activeTab === 'Profile' ? 'active' : ''}
              onClick={() => setActiveTab('Profile')}
            >
              Profile
            </li>
            <li
              className={activeTab === 'Plans & Billing' ? 'active' : ''}
              onClick={() => setActiveTab('Plans & Billing')}
            >
              Plans & Billing
            </li>
            <li
              className={activeTab === 'Projects' ? 'active' : ''}
              onClick={() => setActiveTab('Projects')}
            >
              Projects
            </li>
          </ul>
        </nav>

        {/* Content Panel */}
        <div className="settings-content">
          <button className="settings-close" onClick={onClose}>
            &times;
          </button>
          <h2>{activeTab}</h2>
          {activeTab === 'Profile' && (
           <Profile/>
          )}
          {activeTab === 'Plans & Billing' && (
           <Payment/>
          )}
          {activeTab === 'Projects' && (
           <Projects/>
          )}
        </div>
      </div>
    </div>
  );
}