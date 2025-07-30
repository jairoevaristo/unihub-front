import { api } from '@/lib/axios'

type CreateUser = {
  externalIdentifier: string
  name: string
  role: 'ADMIN' | 'MEMBER'
}

export const createUser = async (data: CreateUser) => {
  const response = await api.post('/user/createUser', {
    ...data,
    role: data.role === 'ADMIN' ? 0 : 1,
  })
  return response.data
}
