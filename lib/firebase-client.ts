'use client'

import { useEffect, useState } from 'react'
import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: 'pollsy.firebaseapp.com',
  databaseURL: 'https://pollsy.firebaseio.com',
  projectId: 'pollsy',
  storageBucket: 'pollsy.appspot.com',
  messagingSenderId: '502515687106',
}

let appInstance: FirebaseApp | null = null
let authInstance: Auth | null = null
let dbInstance: Firestore | null = null
let storageInstance: FirebaseStorage | null = null
let initialized = false

export function initializeFirebase() {
  if (initialized || typeof window === 'undefined') {
    return { app: appInstance, auth: authInstance, db: dbInstance, storage: storageInstance }
  }

  if (firebaseConfig.apiKey) {
    try {
      appInstance = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
      authInstance = getAuth(appInstance)
      dbInstance = getFirestore(appInstance)
      storageInstance = getStorage(appInstance)
      initialized = true
    } catch (error) {
      console.error('Firebase initialization error:', error)
    }
  }

  return { app: appInstance, auth: authInstance, db: dbInstance, storage: storageInstance }
}

export function useFirebase() {
  const [firebase, setFirebase] = useState(() => initializeFirebase())

  useEffect(() => {
    const initializedFirebase = initializeFirebase()
    setFirebase(initializedFirebase)
  }, [])

  return firebase
}

export default {
  initializeFirebase,
  useFirebase,
}