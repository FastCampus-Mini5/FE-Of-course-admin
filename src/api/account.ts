import { baseInstance, authInstance } from '@/api/index'

//회원가입 -- base
export const signUp = async ({ password, email, hireDate, username }) => {
  const res = await baseInstance.post('/signup', {
    password: password,
    email: email,
    hireDate: hireDate,
    username: username
  })
  return res.data
}

//로그인 -- base
export const signIn = async (email: string, password: string) => {
  const res = await baseInstance.post('/user/signIn', {
    email: email,
    password: password
  })
  return res
}

//이메일 중복체크 -- base
export const checkEmailAvailable = async (email: string) => {
  const res = await baseInstance.get(`/emailCheck?email=${email}`)
  return res.data
}

//정보 수정(update) -- auth
export const updateProfile = async (profile: string, password: string) => {
  const res = await authInstance.post('/update', {
    profile: profile,
    password: password
  })
  return res.data
}

//비밀번호 재설정(이메일 전송) -- base
export const resetPassword = async (email: string) => {
  const res = await baseInstance.post('/findPassword', { email: email })
  return res.data
}
