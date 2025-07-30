import { useUser } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'
import { StudentDashboard } from './-components/student-dashboard'
import { TeacherDashboard } from './-components/teacher-dashboard'

export const Route = createFileRoute('/_private/$classrom/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useUser()
  return (
    <div>
      {user?.unsafeMetadata.role === 'MEMBER' ? (
        <StudentDashboard />
      ) : (
        <TeacherDashboard />
      )}
    </div>
  )
}
