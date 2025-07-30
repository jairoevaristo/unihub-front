import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { LoadingSpinner } from '@/components/spinner-loading'

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  const router = useRouter()
  const { isLoaded } = useAuth()

  useEffect(() => {
    if (isLoaded) {
      router.navigate({ to: '/home' })
    }
  }, [isLoaded, router])

  return (
    <div className="flex h-screen items-center justify-center">
      <LoadingSpinner size="xl" />
    </div>
  )
}
