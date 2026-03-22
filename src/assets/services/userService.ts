import api from './api'
 
export interface User {
  id: number
  name: string
  email: string
}
 
export async function getUsers()
  : Promise<User[]> {
  const res = await api.get('/users')
  return res.data
}
 
export async function createUser(
  data: Omit<User, 'id'>
) {
  const res = await api.post(
    '/users', data)
  return res.data
}
