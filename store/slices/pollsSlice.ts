import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { db, auth } from '@/lib/firebase'
import { collection, addDoc, query, where, orderBy, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { createId } from '@paralleldrive/cuid2'

interface PollOption {
  text: string
  count: number
}

interface Poll {
  uid: string
  question: string
  createdBy: {
    uid: string
    name: string
  }
  createdOn: any
  options: PollOption[]
}

interface PollsState {
  polls: Poll[]
  myPolls: Poll[]
  currentPoll: Poll | null
  loading: boolean
  error: string | null
  pollForm: {
    question: string
    options: string[]
    error: Record<string, string>
  }
}

const initialState: PollsState = {
  polls: [],
  myPolls: [],
  currentPoll: null,
  loading: false,
  error: null,
  pollForm: {
    question: '',
    options: ['', ''],
    error: {},
  },
}

export const createPoll = createAsyncThunk(
  'polls/create',
  async ({ question, options }: { question: string; options: string[] }) => {
    if (!auth || !db) throw new Error('Firebase is not initialized')
    const uid = createId()
    const user = auth.currentUser

    if (!user) {
      throw new Error('User not authenticated')
    }

    const pollOptions = options
      .filter((opt) => opt.trim() !== '')
      .map((opt) => ({
        text: opt,
        count: 0,
      }))

    const data = {
      uid,
      question,
      createdBy: {
        uid: user.uid,
        name: user.displayName || 'Anonymous',
      },
      createdOn: new Date(),
      options: pollOptions,
    }
    return data as Poll
  }
)

export const fetchMyPolls = createAsyncThunk('polls/fetchMy', async () => {
  if (!auth || !db) throw new Error('Firebase is not initialized')
  const user = auth.currentUser
  if (!user) {
    throw new Error('User not authenticated')
  }

  const q = query(
    collection(db, 'polls'),
    where('createdBy.uid', '==', user.uid),
    orderBy('createdOn', 'desc')
  )

  const snapshot = await getDocs(q)
  const polls: Poll[] = []
  snapshot.forEach((doc) => {
    polls.push(doc.data() as Poll)
  })
  return polls
})

export const deletePoll = createAsyncThunk('polls/delete', async (pollId: string) => {
  if (!db) throw new Error('Firebase is not initialized')
  await deleteDoc(doc(db, 'polls', pollId))
  return pollId
})

export const voteOnPoll = createAsyncThunk(
  'polls/vote',
  async ({ pollId, optionIndex }: { pollId: string; optionIndex: number }) => {
    if (!auth || !db) throw new Error('Firebase is not initialized')
    const user = auth.currentUser
    if (!user) {
      throw new Error('User not authenticated')
    }

    const pollRef = doc(db, 'polls', pollId)
    const pollDoc = await getDocs(query(collection(db, 'polls'), where('uid', '==', pollId)))

    if (pollDoc.empty) {
      throw new Error('Poll not found')
    }

    const pollData = pollDoc.docs[0].data() as Poll

    // Update vote count
    const updatedOptions = [...pollData.options]
    updatedOptions[optionIndex].count += 1

    await updateDoc(pollRef, {
      options: updatedOptions,
    })

    return { pollId, options: updatedOptions }
  }
)

const pollsSlice = createSlice({
  name: 'polls',
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state.pollForm.question = action.payload
    },
    addOption: (state) => {
      state.pollForm.options.push('')
    },
    removeOption: (state, action) => {
      state.pollForm.options.splice(action.payload, 1)
    },
    updateOption: (state, action) => {
      const { index, value } = action.payload
      state.pollForm.options[index] = value
    },
    setPollFormError: (state, action) => {
      state.pollForm.error = action.payload
    },
    resetPollForm: (state) => {
      state.pollForm = {
        question: '',
        options: ['', ''],
        error: {},
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPoll.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createPoll.fulfilled, (state, action) => {
        state.loading = false
        state.myPolls.unshift(action.payload)
      })
      .addCase(createPoll.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to create poll'
      })
      .addCase(fetchMyPolls.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMyPolls.fulfilled, (state, action) => {
        state.loading = false
        state.myPolls = action.payload
      })
      .addCase(fetchMyPolls.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch polls'
      })
      .addCase(deletePoll.fulfilled, (state, action) => {
        state.myPolls = state.myPolls.filter((poll) => poll.uid !== action.payload)
      })
      .addCase(voteOnPoll.fulfilled, (state, action) => {
        const { pollId, options } = action.payload
        const poll = state.polls.find((p) => p.uid === pollId)
        if (poll) {
          poll.options = options
        }
      })
  },
})

export const {
  setQuestion,
  addOption,
  removeOption,
  updateOption,
  setPollFormError,
  resetPollForm,
} = pollsSlice.actions

export default pollsSlice.reducer