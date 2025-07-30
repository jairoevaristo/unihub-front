import { api } from '@/lib/axios'

export const getAllCourses = async (data: string) => {
  const response = await api.get(`/course/getCoursesByUser/${data}`, {
    headers: {
      Accept: 'application/json',
    },
  })
  return response.data
}
