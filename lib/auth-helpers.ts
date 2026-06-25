import React from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/hooks/useRedux'
import { ComponentType, ReactElement } from 'react'

export function requireAuth<P extends object>(Component: ComponentType<P>) {
  return function AuthenticatedComponent(props: P): ReactElement | null {
    const router = useRouter()
    const { loggedIn } = useAppSelector((state) => state.auth)

    if (!loggedIn) {
      router.push('/login')
      return null
    }

    return React.createElement(Component, props)
  }
}