'use client';

import { Fragment, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useFirebase } from '@/context/FirebaseContext';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import UserDropdown from './UserDropdown';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import './navigation.css';
import GetStartedButton from './style/GetStartedButton';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useFirebase();
  const { logout } = useFirebaseAuth();
  const { user: userInStore } = useSelector((state: RootState) => state.auth);
  
  // Check if we're on the result page with analysisId
  const isResultPage = pathname === '/result' && searchParams.get('analysisId');

  useEffect(() => {
    console.log(userInStore);
  }, []);

  const menuVariants: Variants = {
    closed: {
      x: '100%', // Slide off-screen to the right
      transition: {
        duration: 0.3,
        ease: 'easeInOut' as const,
      },
    },
    open: {
      x: 0, // Slide to visible position
      transition: {
        duration: 0.3,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <Disclosure as="nav" className={`nav-container ${pathname === '/about' ? 'dark-nav' : ''} ${isResultPage ? 'result-nav' : ''}`}>
      {({ open, close }) => (
        <>
          <div className="nav-content">
            {!isResultPage && (
              <div className="nav-logo">
                <Link href="/">IMPLEMENTABLE</Link>
              </div>
            )}

            <div className="nav-links">
              <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''} ${isResultPage ? 'result-link' : ''}`}>
                About
              </Link>
              <Link href="/pricing" className={`nav-link ${pathname === '/pricing' ? 'active' : ''} ${isResultPage ? 'result-link' : ''}`}>
                Pricing
              </Link>
              <Link href="/blog" className={`nav-link ${pathname === '/blog' ? 'active' : ''} ${isResultPage ? 'result-link' : ''}`}>
                Blog
              </Link>
            </div>

            <Disclosure.Button className="nav-menu-button">
              {open ? (
                <XMarkIcon className="nav-menu-icon" />
              ) : (
                <Bars3Icon className="nav-menu-icon" />
              )}
            </Disclosure.Button>

            {!isResultPage && (
              user ? (
                <UserDropdown userInStore={userInStore} />
              ) : (
                <Link href="/signin" className="nav-link">
                  <GetStartedButton />
                </Link>
              )
            )}
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                className="mobile-menu-panel"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
              >
                <Link
                  href="/about"
                  className={`nav-link ${pathname === '/about' ? 'active' : ''} ${isResultPage ? 'result-link' : ''}`}
                  onClick={() => close()}
                >
                  About
                </Link>
                <Link
                  href="/pricing"
                  className={`nav-link ${pathname === '/pricing' ? 'active' : ''} ${isResultPage ? 'result-link' : ''}`}
                  onClick={() => close()}
                >
                  Pricing
                </Link>
                <Link
                  href="/blog"
                  className={`nav-link ${pathname === '/blog' ? 'active' : ''} ${isResultPage ? 'result-link' : ''}`}
                  onClick={() => close()}
                >
                  Blog
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
}
