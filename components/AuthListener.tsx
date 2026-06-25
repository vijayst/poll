'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/hooks/useRedux'
import { initializeAuthListener } from '@/store/slices/authSlice'
import { initializeFirebase } from '@/lib/firebase-client'

export default function AuthListener() {
  const dispatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize Firebase on client side only
    const { auth } = initializeFirebase()
    if (auth && !isInitialized) {
      dispatch(initializeAuthListener())
      setIsInitialized(true)
    }
  }, [dispatch, isInitialized])

  return null
}