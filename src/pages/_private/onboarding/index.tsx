import { useUser } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'
import { useOnboarding } from './-hooks/useTypeUser'
import { ProtectedRoute } from '@/components/protected-router'
import { LoadingSpinner } from '@/components/spinner-loading'

export const Route = createFileRoute('/_private/onboarding/')({
  component: () => (
    <ProtectedRoute>
      <OnboardingComponent />
    </ProtectedRoute>
  ),
})

function OnboardingComponent() {
  const { user } = useUser()
  const { handleCompletedOnboarding, isLoading } = useOnboarding()

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center">
        Bem vindo, {user?.firstName} 👋
      </h1>
      <p className="text-lg sm:text-xl mt-4 text-center">
        Qual o seu papel na plataforma?
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-20">
        <div
          onClick={() => handleCompletedOnboarding('MEMBER')}
          className="rounded-md shadow-md bg-gray-100 flex flex-col items-center p-6 w-full max-w-xs lg:w-[26vw] transition-transform cursor-pointer hover:border-2 hover:border-blue hover:-translate-y-2"
        >
          <img
            src="/assets/student.png"
            className="w-40 h-40 sm:w-52 sm:h-52"
          />
          <p className="text-base sm:text-lg mt-4 font-medium border-t border-t-gray-200 pt-2">
            Sou um Aluno
          </p>
        </div>

        <div
          onClick={() => handleCompletedOnboarding('ADMIN')}
          className="rounded-md shadow-md bg-gray-100 flex flex-col items-center p-6 w-full max-w-xs lg:w-[26vw] transition-transform cursor-pointer hover:border-2 hover:border-blue hover:-translate-y-2"
        >
          <img
            src="/assets/teacher.png"
            className="w-40 h-40 sm:w-52 sm:h-52"
          />
          <p className="text-base sm:text-lg mt-4 font-medium border-t border-t-gray-200 pt-2">
            Sou um Professor(a)
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="mt-10">
          <LoadingSpinner size="xl" />
        </div>
      )}
    </div>
  )
}
