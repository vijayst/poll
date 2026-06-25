'use client'

import Link from 'next/link'
import { useAppSelector } from '@/hooks/useRedux'

export default function Home() {
  const { currentUser, loggedIn } = useAppSelector((state) => state.auth)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-16">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Pollsy.co
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          Create and Share Polls Easily
        </p>
        <div className="flex gap-4 justify-center">
          {loggedIn ? (
            <>
              <Link
                href="/polls/create"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Create a Poll
              </Link>
              <Link
                href="/polls/my"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                My Polls
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-semibold mb-2">Create Polls</h3>
          <p className="text-gray-600">
            Easily create polls with multiple options and share them with your audience.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">🔗</div>
          <h3 className="text-xl font-semibold mb-2">Share Anywhere</h3>
          <p className="text-gray-600">
            Share your polls via link or embed them on your website or social media.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">📈</div>
          <h3 className="text-xl font-semibold mb-2">Real-time Results</h3>
          <p className="text-gray-600">
            See results in real-time as people vote on your polls.
          </p>
        </div>
      </div>
    </div>
  )
}