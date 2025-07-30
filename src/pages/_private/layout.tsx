import { Outlet, createFileRoute } from '@tanstack/react-router'
import { useCheckOnboarding } from './-hooks/use-check-onboarding'
import { ProtectedRoute } from '@/components/protected-router'
import Header from '@/components/header'
import { useMessageRealtime } from '@/hooks/useMessages'

export const Route = createFileRoute('/_private')({
  component: () => (
    <ProtectedRoute>
      <PrivateLayoutComponent />
    </ProtectedRoute>
  ),
})

function PrivateLayoutComponent() {
  useCheckOnboarding()
  useMessageRealtime()

  return (
    <main className="min-h-screen w-full">
      <Header />
      <div className="container p-4 mx-auto">
        <Outlet />
      </div>
    </main>
  )
}
