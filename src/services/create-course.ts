import { api } from '@/lib/axios'

export const createCourse = async (UserIdentifier: string, Name: string) => {
  const response = await api.post('/course/createCourse', {
    UserIdentifier,
    Name,
  })
  return response.data
}
