import axios from "axios"
import { API_URL } from './Base';
import { authInstance } from '@/api/axios'

// 관리자 로그인
export const AdminSignIn = async() => {
  try {
    const data = await axios.post(`${API_URL}/user/signIn`)
    if(data.status > 300) {
      throw new Error('기록 작성에 실패하셨습니다.')
    }
    return data
  } catch (error) {
    throw error
  }

}

// 전체 유저 정보리스트
export const userListApi = async() => {
  try {
    const data = await authInstance.get(`${API_URL}/user/list?page=0&size=100`)
    if(data.status > 300) {
      throw new Error('기록 작성에 실패하셨습니다.')
    }
    return data
  } catch (error) {
    throw error
  }
}

// 회원가입 요청 리스트
export const userApproveApi = async() => {
  try {
    const data = await authInstance.get(`${API_URL}/signup/list?page=0&size=100`)
    if(data.status > 300) {
      throw new Error('기록 작성에 실패하셨습니다.')
    }
    return data
  } catch (error) {
    throw error
  }
}

// 회원가입 승인
export const ApproveSignUpApi = async(email : string) => {
  try {
    const data = await authInstance.post(`${API_URL}/signup/approve`, 
    { email },
    )
    if(data.status > 300) {
      throw new Error('기록 작성에 실패하셨습니다.')
    }
    return data
  } catch (error) {
    throw error
  }
}

// 연차 승인 리스트
export const VacationApi = async() => {
  try {
    const data = await authInstance.get(`${API_URL}/vacation/approve/list?page=0&size=100`)
    if(data.status > 300) {
      throw new Error('기록 작성에 실패하셨습니다.')
    }
    return data
  } catch (error) {
    throw error
  }
}

// 연차 신청 리스트
export const VacationPendingApi = async() => {
  try {
    const data = await authInstance.get(`${API_URL}/vacation/pending/list?page=0&size=100`)
    if(data.status > 300) {
      throw new Error('기록 작성에 실패하셨습니다.')
    }
    return data
  } catch (error) {
    throw error
  }
}

// 연차 승인
export const VacationProceedApi = async(index: number, status: string) => {
  try {
    const data = await authInstance.post(`${API_URL}/vacation/proceed`, 
    { 
      id: index,
      status
    })
    if(data.status > 300) {
      throw new Error('기록 작성에 실패하셨습니다.')
    }
    return data
  } catch (error) {
    throw error
  }
}

// 당직 승인 리스트
export const DutyListApi = async() => {
  try {
    const data = await authInstance.get(`${API_URL}/duty/approve/list?page=0&size=100`)
    if(data.status > 300) {
      throw new Error('기록 작성에 실패하셨습니다.')
    }
    return data
  } catch (error) {
    throw error
  }
}

// 당직 요청 리스트
export const DutyPeindingListsApi = async() => {
  try {
    const data = await authInstance.get(`${API_URL}/duty/pending/list?page=0&size=100`)
    if(data.status > 300) {
      throw new Error('기록 작성에 실패하셨습니다.')
    }
    return data
  } catch (error) {
    throw error
  }
}

// 당직 승인
export const DutyProceedApi = async(index: number, status: string) => {
  try {
    const data = await authInstance.post(`${API_URL}/duty/proceed`, 
    {
      id: index,
      status
    })
    if(data.status > 300) {
      throw new Error('기록 작성에 실패하셨습니다.')
    }
    return data
  }
  catch(error) {
    throw error
  }
}