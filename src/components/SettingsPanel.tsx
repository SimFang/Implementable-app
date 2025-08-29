import React, { useState, useEffect} from 'react';
import './settings-panel.css';
import Profile from './settingsPanel/Profile';
import Projects from './settingsPanel/Projects';
import Payment from './settingsPanel/Invoices';
import Credits from './settingsPanel/Credits';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Briefcase, Users, Info, Lock, CreditCard, FileText, LogOut
} from 'lucide-react';

interface SettingsPanelProps {
  onClose: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState('Projects');
  const router = useRouter()

    useEffect(() => {
      if (activeTab == 'SignOut') {
        router.push('/auth/logout');
      }
    }, [activeTab, router]);

  const navItems = [
    {
      section: 'PROJECTS',
      items: [
        { name: 'My projects', icon: <Briefcase size={16} />, tab: 'Projects' },
      ],
    },
    {
      section: 'PROFILE',
      items: [
        { name: 'Informations', icon: <Info size={16} />, tab: 'Profile' },
      ],
    },
    {
      section: 'PAYMENT & BILLING',
      items: [
        { name: 'Credits', icon: <CreditCard size={16} />, tab: 'Credits' },
        { name: 'Invoices', icon: <FileText size={16} />, tab: 'Invoices' },
      ],
    },
    {
      section: 'OTHER',
      items: [
        { name: 'Sign out', icon: <LogOut size={16} />, tab: 'SignOut' },
      ],
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="settings-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="settings-panel"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <nav className="settings-sidebar">
            {navItems.map((section) => (
              <div key={section.section} className="settings-section">
                <div className="settings-section-title">{section.section}</div>
                <ul>
                  {section.items.map(item => (
                    <li
                      key={item.name}
                      className={activeTab === item.tab ? 'active' : ''}
                      onClick={() => setActiveTab(item.tab)}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="settings-content">
            <button className="settings-close" onClick={onClose}>
              &times;
            </button>
            {activeTab === 'Profile' && <Profile />}
            {activeTab === 'Projects' && <Projects />}
            {activeTab === 'Invoices' && <Payment />}
            {activeTab === 'Credits' && <Credits />}
            {/* Add others as needed */}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}