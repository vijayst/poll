'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { createPoll, resetPollForm, setQuestion, addOption, removeOption, updateOption } from '@/store/slices/pollsSlice'

export default function CreatePoll() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { loading, error, pollForm } = useAppSelector((state) => state.polls)
  const { question, options } = pollForm
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!question.trim()) {
      newErrors.question = 'Question is required'
    }

    options.forEach((option, index) => {
      if (!option.trim()) {
        newErrors[`option${index + 1}`] = `Option ${index + 1} is required`
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      await dispatch(createPoll({ question, options })).unwrap()
      dispatch(resetPollForm())
      router.push('/polls/my')
    } catch (err) {
      console.error('Failed to create poll:', err)
    }
  }

  const handleAddOption = () => {
    dispatch(addOption())
  }

  const handleRemoveOption = (index: number) => {
    dispatch(removeOption(index))
    delete errors[`option${index + 1}`]
  }

  const handleUpdateOption = (index: number, value: string) => {
    dispatch(updateOption({ index, value }))
  }

  const handleQuestionChange = (value: string) => {
    dispatch(setQuestion(value))
    delete errors.question
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8">Create Poll</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <input
              id="question"
              type="text"
              placeholder="Enter your poll question"
              value={question}
              onChange={(e) => handleQuestionChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            {errors.question && <p className="mt-1 text-sm text-red-600">{errors.question}</p>}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Options</h3>
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1">
                  <label htmlFor={`option-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                    Option {index + 1}
                  </label>
                  <input
                    id={`option-${index}`}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleUpdateOption(index, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  {errors[`option${index + 1}`] && (
                    <p className="mt-1 text-sm text-red-600">{errors[`option${index + 1}`]}</p>
                  )}
                </div>
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="mt-7 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddOption}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Add Option
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                dispatch(resetPollForm())
                router.back()
              }}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating poll...' : 'Create Poll'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}