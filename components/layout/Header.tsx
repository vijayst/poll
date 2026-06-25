'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux'
import { logoutUser } from '@/store/slices/authSlice'
import { useRouter } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { currentUser, loggedIn } = useAppSelector((state) => state.auth)

  const handleLogout = async () => {
    await dispatch(logoutUser())
    router.push('/login')
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
            Pollsy.co
          </Link>

          <nav className="flex items-center gap-6">
            {loggedIn ? (
              <>
                <Link
                  href="/"
                  className={`hover:text-blue-200 transition-colors ${
                    isActive('/') ? 'text-blue-200 font-semibold' : ''
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/polls/my"
                  className={`hover:text-blue-200 transition-colors ${
                    isActive('/polls/my') ? 'text-blue-200 font-semibold' : ''
                  }`}
                >
                  My Polls
                </Link>
                <Link
                  href="/polls/create"
                  className={`hover:text-blue-200 transition-colors ${
                    isActive('/polls/create') ? 'text-blue-200 font-semibold' : ''
                  }`}
                >
                  Create Poll
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 hover:text-blue-200 transition-colors">
                    <span>{currentUser?.displayName || 'User'}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className={`hover:text-blue-200 transition-colors ${
                    isActive('/') ? 'text-blue-200 font-semibold' : ''
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/login"
                  className={`hover:text-blue-200 transition-colors ${
                    isActive('/login') ? 'text-blue-200 font-semibold' : ''
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}