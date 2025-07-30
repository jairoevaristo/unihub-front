import { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate, useRouterState } from '@tanstack/react-router'

export function useCheckOnboarding() {
  const navigate = useNavigate()
  const { user } = useUser()
  const router = useRouterState()

  useEffect(() => {
    const hasCompleted = user?.unsafeMetadata.hasCompletedOnboarding
    const currentPath = router.location.pathname

    if (!user) return

    if (!hasCompleted && currentPath !== '/onboarding') {
      navigate({ to: '/onboarding' })
    }

    if (hasCompleted && currentPath === '/onboarding') {
      navigate({ to: '/home' })
    }
  }, [user, router.location.pathname, navigate])
}
