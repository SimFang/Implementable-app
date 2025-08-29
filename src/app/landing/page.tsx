'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePopup } from '@/context/PopUpContext'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import './Landing.css'
import Gradient from '@/components/style/Gradient'

export default function Landing() {
  const [url, setUrl] = useState('')
  const router = useRouter()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { open: openPopup } = usePopup()

  const handleConfirmUrl = () => {
    if (!isAuthenticated) {
      openPopup({
        title: 'Login Required',
        description: 'You need to be logged in to start your AI strategy analysis.',
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xMCAxMUgyLjA0OGMuNTAyLTUuMDUzIDQuNzY1LTkgOS45NS05YzUuNTIzIDAgMTAgNC40NzcgMTAgMTBzLTQuNDc3IDEwLTEwIDEwYy01LjE4NSAwLTkuNDQ4LTMuOTQ3LTkuOTUtOWg3Ljk1djNsNS00bC01LTR6Ii8+PC9zdmc+',
        linkUrl: '/signin',
        buttonText: 'Go to Login'
      })
      return
    }

    if (url.trim()) {
      router.push(`/analysis?url=${encodeURIComponent(url.trim())}`)
    }
  }

  return (
    <div className="landing-container">
      <Gradient
        fromColor='#202737'
        midColor='#829CD7'
        position="bottom"
        size="700px"
        style={{ zIndex: 0 }}
      />

      <h1 className="landing-title">
        <span className="title-medium">AI Strategy in </span>
        <strong className="title-bold">Minutes</strong>
      </h1>

      <p className="landing-subtitle">
        Discover how AI can transform your business
      </p>

      <div className="landing-input-container">
        <input
          type="text"
          placeholder="Type in your website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="landing-input"
        />
        <button
          onClick={handleConfirmUrl}
          disabled={!url.trim()}
          className={`landing-button ${!url.trim() ? 'disabled' : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="landing-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="landing-footer">
        <p className="footer-text">AI can transform your business, and we’ll tell you how</p>
        <svg
          className="footer-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  )
}