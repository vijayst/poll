/**
 * Legacy Firebase compatibility layer
 * This provides backward compatibility with the old Firebase SDK API
 */

import firebase from './firebase'

// Create a mock FieldValue for serverTimestamp
export const FieldValue = {
  serverTimestamp: () => ({
    _isServerTimestamp: true,
  }),
}

// Re-export firebase for backward compatibility
export default {
  ...firebase,
  firestore: () => firebase.firestore(),
  auth: firebase.auth,
  storage: firebase.storage,
  database: () => firebase.database(),
  FieldValue,
}