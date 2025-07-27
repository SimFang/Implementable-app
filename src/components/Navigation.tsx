'use client';

import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useFirebase } from '@/context/FirebaseContext'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import UserDropdown from './UserDropdown'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import './navigation.css'
import GetStartedButton from './style/GetStartedButton';

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useFirebase()
  const { logout } = useFirebaseAuth()
  const { user: userInStore } = useSelector((state: RootState) => state.auth)

  useEffect(()=>{

    // the first times the user logs in : it's an object 
    // when I reload userInStore becomes "null"
    console.log(userInStore)
  },[])

  return (
    <Disclosure as="nav" className="nav-container">
      {({ open }) => (
        <>
          <div className="nav-content">
            <div className="nav-logo">
              <Link href="/">LOGO</Link>
            </div>

            <div className="nav-links">
              <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>
                About
              </Link>
              <Link href="/pricing" className={`nav-link ${pathname === '/pricing' ? 'active' : ''}`}>
                Pricing
              </Link>
              <Link href="/blog" className={`nav-link ${pathname === '/blog' ? 'active' : ''}`}>
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

            {user ? (
              <UserDropdown userInStore={userInStore}/>
            ) : (
              <Link href="/signin" className="nav-link">
                <GetStartedButton/>
              </Link>
            )}
          </div>

          <Disclosure.Panel className="nav-links">
            <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>
              About
            </Link>
            <Link href="/pricing" className={`nav-link ${pathname === '/pricing' ? 'active' : ''}`}>
              Pricing
            </Link>
            <Link href="/blog" className={`nav-link ${pathname === '/blog' ? 'active' : ''}`}>
              Blog
            </Link>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

