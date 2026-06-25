import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MessageState {
  text: string | null
  error: boolean
  visible: boolean
}

const initialState: MessageState = {
  text: null,
  error: false,
  visible: false,
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<{ text: string; error?: boolean }>) => {
      state.text = action.payload.text
      state.error = action.payload.error || false
      state.visible = true
    },
    clearMessage: (state) => {
      state.text = null
      state.error = false
      state.visible = false
    },
  },
})

export const { setMessage, clearMessage } = messageSlice.actions
export default messageSlice.reducer