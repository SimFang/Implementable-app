'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import Logo from './Logo'
import './animated-loading-page.css'

interface AnimatedLoadingPageProps {
  colorTransition?: [string, string]; // optional background transition
}

export default function AnimatedLoadingPage({ colorTransition = ['#ffffff', '#ffffff'] }: AnimatedLoadingPageProps) {
  const controls = useAnimation()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    async function sequence() {
      await controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: 'easeInOut' },
      })
      await controls.start({
        scale: [1, 1.15, 1],
        transition: { duration: 0.3, ease: 'easeInOut' },
      })
      await controls.start({
        opacity: 0,
        scale: 0.8,
        rotate: 90,
        transition: { duration: 0.2, ease: 'easeInOut' },
      })
      setIsVisible(false)
    }

    sequence()
  }, [controls])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loading-overlay"
          initial={{ opacity: 0, backgroundColor: colorTransition[0] }}
          animate={{
            opacity: 1,
            backgroundColor: colorTransition[1],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.2,
            ease: 'easeInOut',
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={controls}
          >
            <Logo size={3} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}