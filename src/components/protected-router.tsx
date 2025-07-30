import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from '@tanstack/react-router'
import { LoadingSpinner } from './spinner-loading'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate({ to: '/sign-in' })
    }
  }, [isLoaded, isSignedIn, navigate])

  if (!isLoaded)
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    )

  return isSignedIn ? <>{children}</> : null
}
