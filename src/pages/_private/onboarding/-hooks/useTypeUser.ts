import { useEffect, useState } from 'react'
import { Clerk } from '@clerk/clerk-js'
import { useRoleStore } from '@/stores/useRoleStore'

const clerk = new Clerk(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY)

export function useOnboarding() {
  const { setRole } = useRoleStore()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadClerk = async () => {
      await clerk.load()
    }

    loadClerk()
  }, [])

  const handleCompletedOnboarding = async (type: 'ADMIN' | 'MEMBER') => {
    setIsLoading(true)

    await clerk.user?.update({
      unsafeMetadata: {
        ...clerk.user.unsafeMetadata,
        hasCompletedOnboarding: true,
        role: type,
      },
    })

    setIsLoading(false)
    setRole(type)
    window.location.href = '/home'
  }

  return {
    isLoading,
    handleCompletedOnboarding,
  }
}
