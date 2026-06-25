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

// Initialize Firebase (only on client side)
const getFirebaseApp = (): FirebaseApp | null => {
  if (typeof window === 'undefined') return null
  if (!firebaseConfig.apiKey) {
    console.warn('Firebase API key is not configured')
    return null
  }
  try {
    return !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
  } catch (error) {
    console.error('Firebase initialization error:', error)
    return null
  }
}

const app = getFirebaseApp()
export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null
export const storage = app ? getStorage(app) : null

// For backward compatibility with existing code
export default {
  auth,
  firestore: () => db,
  storage,
  database: () => db,
}