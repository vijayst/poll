'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { fetchMyPolls, deletePoll } from '@/store/slices/pollsSlice'
import { requireAuth } from '@/lib/auth-helpers'

interface Poll {
  uid: string
  question: string
  options: Array<{ text: string; count: number }>
  createdOn: any
  createdBy: { uid: string; name: string }
}

export default requireAuth(function MyPolls() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { myPolls, loading } = useAppSelector((state) => state.polls)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [pollToDelete, setPollToDelete] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchMyPolls())
  }, [dispatch])

  const handleDelete = async () => {
    if (pollToDelete) {
      try {
        await dispatch(deletePoll(pollToDelete)).unwrap()
        setDeleteModalOpen(false)
        setPollToDelete(null)
      } catch (err) {
        console.error('Failed to delete poll:', err)
      }
    }
  }

  const openDeleteModal = (pollId: string) => {
    setPollToDelete(pollId)
    setDeleteModalOpen(true)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Polls</h1>
        <button
          onClick={() => router.push('/polls/create')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Poll
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading polls...</p>}

      {!loading && myPolls.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">No polls created by you</h2>
          <button
            onClick={() => router.push('/polls/create')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Poll
          </button>
        </div>
      )}

      <div className="space-y-6">
        {myPolls.map((poll) => (
          <div key={poll.uid} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">{poll.question}</h2>
              <ol className="list-decimal list-inside space-y-2">
                {poll.options.map((option, index) => (
                  <li key={index} className="text-gray-600">
                    {option.text} <span className="text-gray-400">({option.count} votes)</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t flex gap-4">
              <button
                onClick={() => router.push(`/polls/${poll.uid}`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View
              </button>
              <button
                onClick={() => openDeleteModal(poll.uid)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Delete Poll</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this poll? This action cannot be undone.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => {
                  setDeleteModalOpen(false)
                  setPollToDelete(null)
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})