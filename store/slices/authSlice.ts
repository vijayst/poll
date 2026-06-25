import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { auth } from '@/lib/firebase'
import { User, GoogleAuthProvider } from 'firebase/auth'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, updateProfile as updateProfileAuth } from 'firebase/auth'

interface AuthState {
  currentUser: User | null
  loggedIn: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  currentUser: null,
  loggedIn: false,
  loading: false,
  error: null,
}

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password, displayName }: { email: string; password: string; displayName: string }) => {
    if (!auth) throw new Error('Firebase auth is not initialized')
    const result = await createUserWithEmailAndPassword(auth, email, password)
    if (result.user) {
      await updateProfileAuth(result.user, { displayName })
    }
    return result.user
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    if (!auth) throw new Error('Firebase auth is not initialized')
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  }
)

export const loginWithGoogle = createAsyncThunk('auth/loginGoogle', async () => {
  if (!auth) throw new Error('Firebase auth is not initialized')
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  return result.user
})

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (displayName: string) => {
    if (!auth) throw new Error('Firebase auth is not initialized')
    const user = auth.currentUser
    if (user) {
      await updateProfileAuth(user, { displayName })
    }
    return user
  }
)

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  if (!auth) throw new Error('Firebase auth is not initialized')
  await signOut(auth)
})

export const initializeAuthListener = createAsyncThunk('auth/initialize', async (_, { dispatch }) => {
  return new Promise<void>((resolve) => {
    if (!auth) {
      console.warn('Firebase auth is not initialized')
      resolve()
      return
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setCurrentUser(user))
      resolve()
    })
  })
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload
      state.loggedIn = action.payload !== null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
        state.loggedIn = !!action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Registration failed'
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
        state.loggedIn = !!action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Login failed'
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
        state.loggedIn = !!action.payload
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Google login failed'
      })
      .addCase(updateProfile.fulfilled, (state) => {
        const user = auth?.currentUser || null
        state.currentUser = user
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null
        state.loggedIn = false
      })
  },
})

export const { setCurrentUser, clearError } = authSlice.actions
export default authSlice.reducer