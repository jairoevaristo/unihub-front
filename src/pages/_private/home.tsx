import { useUser } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import axios from 'axios'
import { ProtectedRoute } from '@/components/protected-router'
import { CardClassrom } from '@/components/card-classrom'
import { ModalCreateClassrom } from '@/components/modal-create-classrom'
import { ModalClassromParticipant } from '@/components/modal-classrom-participant'
import { getAllCourses } from '@/services/get-courses'
import { LoadingSpinner } from '@/components/spinner-loading'
import { api } from '@/lib/axios'

type GetCourses = {
  UserIdentifier: string
  Courses: Array<{
    CourseId: string
    Name: string
    Code: string
  }>
}

export const Route = createFileRoute('/_private/home')({
  component: () => (
    <ProtectedRoute>
      <HomeComponent />
    </ProtectedRoute>
  ),
})

function HomeComponent() {
  const { user } = useUser()

  return (
    <div className="px-4 lg:py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Olá, bem vindo {user?.firstName}
        </h1>
        <div>
          {user?.unsafeMetadata.role === 'ADMIN' ? (
            <ModalCreateClassrom />
          ) : (
            <ModalClassromParticipant />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        <CardClassrom Code={'123'} Name={'Empreendedorismo'} CourseId={'123'} />
      </div>
    </div>
  )
}
