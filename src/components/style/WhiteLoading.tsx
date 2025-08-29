'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type WhiteLoadingProps = {
  color?: string // default is white
  loading?: boolean // optional external loading state
}

export default function WhiteLoading({ color = '#ffffff', loading }: WhiteLoadingProps) {
  const [isVisible, setIsVisible] = useState(true)

  // If `loading` is controlled externally
  useEffect(() => {
    if (typeof loading === 'boolean') {
      setIsVisible(loading)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200)
      return () => clearTimeout(timer)
    }
  }, [loading])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: loading === false ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: color,
            pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
  )
}