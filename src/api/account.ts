import { baseInstance } from '@/api/index'


//로그인 -- base
export const signIn = async (email: string, password: string) => {
  const res = await baseInstance.post('/user/signIn', {
    email: email,
    password: password
  })
  return res
}