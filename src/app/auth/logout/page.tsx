'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'

export default function LogoutPage() {
  const router = useRouter()
  const { logout } = useFirebaseAuth()

  useEffect(() => {
    async function doLogout() {
      try {
        await logout()
      } catch (e) {
        console.error('Logout failed:', e)
      }
      router.replace('/landing')  // redirect after logout
    }

    doLogout()
  }, [logout, router])

  return <div>Logging out...</div>
}