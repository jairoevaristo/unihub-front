import { createFileRoute } from '@tanstack/react-router'
import StudantsTable from './-components/table-student'
import { ProtectedRoute } from '@/components/protected-router'

export const Route = createFileRoute('/_private/$classrom/students')({
  component: () => (
    <ProtectedRoute>
      <StudantsPage />
    </ProtectedRoute>
  ),
})

function StudantsPage() {
  return <StudantsTable />
}
