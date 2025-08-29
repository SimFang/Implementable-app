'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import Logo from './Logo'

type AboutAppearAnimationProps = {
  loading?: boolean
}

export default function AboutAppearAnimation({ loading }: AboutAppearAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [bgColor, setBgColor] = useState('#ffffff')
  const logoControls = useAnimation()

  useEffect(() => {
    async function runSequence() {
      // Step 1: Pump animation
      await logoControls.start({
        opacity: [1,1,0],
        scale: [1, 1.4, 1],
        transition: {
          duration: 0.6,
          ease: 'easeInOut',
          times: [0, 0.5, 1],
        },
      })

      // Step 3: Background color change
      await new Promise((resolve) => setTimeout(resolve, 300))
      setBgColor('#0F192F')
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Step 4: Hide component
      setIsVisible(false)
    }

    if (typeof loading === 'boolean') {
      setIsVisible(loading)
    } else {
      runSequence()
    }
  }, [loading, logoControls])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="about-appear-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: bgColor,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
            transition: 'background-color 0.4s ease-in-out',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={logoControls}
          >
            <Logo size={3} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}