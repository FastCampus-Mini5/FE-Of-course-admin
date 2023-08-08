import axios from "axios"
import { API_URL } from './Base';

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
    const data = await axios.get(`${API_URL}/user/list?page=0&size=100`,  {
      headers: {
        'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0ZTc2M01wVXhFaDgrOTFINjlFblJ3PT0iLCJyb2xlIjoiQURNSU4iLCJpZCI6NywiZXhwIjoxNjkxNTU4MjE5LCJ1c2VybmFtZSI6IjRlNzYzTXBVeEVoOCs5MUg2OUVuUnc9PSJ9.Cq7hmF07lt9rLBeV_TyXOmMf20oUE3P8nh9MvedqGodvKZhyHmAMS0DF03GUzaTy1tZ1l9inULtF2VuiiaXgCQ' 
      }
    })
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
    const data = await axios.get(`${API_URL}/signup/list`, {
      headers: {
        'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0ZTc2M01wVXhFaDgrOTFINjlFblJ3PT0iLCJyb2xlIjoiQURNSU4iLCJpZCI6NywiZXhwIjoxNjkxNTU4MjE5LCJ1c2VybmFtZSI6IjRlNzYzTXBVeEVoOCs5MUg2OUVuUnc9PSJ9.Cq7hmF07lt9rLBeV_TyXOmMf20oUE3P8nh9MvedqGodvKZhyHmAMS0DF03GUzaTy1tZ1l9inULtF2VuiiaXgCQ' 
      }
    })
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
    const data = await axios.post(`${API_URL}/signup/approve`, 
    { email },
    {
      headers: {
        'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0ZTc2M01wVXhFaDgrOTFINjlFblJ3PT0iLCJyb2xlIjoiQURNSU4iLCJpZCI6NywiZXhwIjoxNjkxNTU4MjE5LCJ1c2VybmFtZSI6IjRlNzYzTXBVeEVoOCs5MUg2OUVuUnc9PSJ9.Cq7hmF07lt9rLBeV_TyXOmMf20oUE3P8nh9MvedqGodvKZhyHmAMS0DF03GUzaTy1tZ1l9inULtF2VuiiaXgCQ'
      }
    }
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
    const data = await axios.get(`${API_URL}/vacation/approve/list`, {
      headers: {
        'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0ZTc2M01wVXhFaDgrOTFINjlFblJ3PT0iLCJyb2xlIjoiQURNSU4iLCJpZCI6NywiZXhwIjoxNjkxNTU4MjE5LCJ1c2VybmFtZSI6IjRlNzYzTXBVeEVoOCs5MUg2OUVuUnc9PSJ9.Cq7hmF07lt9rLBeV_TyXOmMf20oUE3P8nh9MvedqGodvKZhyHmAMS0DF03GUzaTy1tZ1l9inULtF2VuiiaXgCQ' 
      }
    })
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
    const data = await axios.get(`${API_URL}/vacation/pending/list`, {
      headers: {
        'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0ZTc2M01wVXhFaDgrOTFINjlFblJ3PT0iLCJyb2xlIjoiQURNSU4iLCJpZCI6NywiZXhwIjoxNjkxNTU4MjE5LCJ1c2VybmFtZSI6IjRlNzYzTXBVeEVoOCs5MUg2OUVuUnc9PSJ9.Cq7hmF07lt9rLBeV_TyXOmMf20oUE3P8nh9MvedqGodvKZhyHmAMS0DF03GUzaTy1tZ1l9inULtF2VuiiaXgCQ' 
      }
    })
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
    const data = await axios.post(`${API_URL}/vacation/proceed`, 
    { 
      id: index,
      status
    }, 
    {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0ZTc2M01wVXhFaDgrOTFINjlFblJ3PT0iLCJyb2xlIjoiQURNSU4iLCJpZCI6NywiZXhwIjoxNjkxNTU4MjE5LCJ1c2VybmFtZSI6IjRlNzYzTXBVeEVoOCs5MUg2OUVuUnc9PSJ9.Cq7hmF07lt9rLBeV_TyXOmMf20oUE3P8nh9MvedqGodvKZhyHmAMS0DF03GUzaTy1tZ1l9inULtF2VuiiaXgCQ'
      }
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
    const data = await axios.get(`${API_URL}/duty/approve/list`,{
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0ZTc2M01wVXhFaDgrOTFINjlFblJ3PT0iLCJyb2xlIjoiQURNSU4iLCJpZCI6NywiZXhwIjoxNjkxNTU4MjE5LCJ1c2VybmFtZSI6IjRlNzYzTXBVeEVoOCs5MUg2OUVuUnc9PSJ9.Cq7hmF07lt9rLBeV_TyXOmMf20oUE3P8nh9MvedqGodvKZhyHmAMS0DF03GUzaTy1tZ1l9inULtF2VuiiaXgCQ'
      }
    }
)
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
    const data = await axios.get(`${API_URL}/duty/pending/list`, {
      headers: {
        'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0ZTc2M01wVXhFaDgrOTFINjlFblJ3PT0iLCJyb2xlIjoiQURNSU4iLCJpZCI6NywiZXhwIjoxNjkxNTU4MjE5LCJ1c2VybmFtZSI6IjRlNzYzTXBVeEVoOCs5MUg2OUVuUnc9PSJ9.Cq7hmF07lt9rLBeV_TyXOmMf20oUE3P8nh9MvedqGodvKZhyHmAMS0DF03GUzaTy1tZ1l9inULtF2VuiiaXgCQ' 
      }
    })
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
    const data = await axios.post(`${API_URL}/duty/proceed`, 
    {
      id: index,
      status
    }, 
    {
      headers: {
        'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0ZTc2M01wVXhFaDgrOTFINjlFblJ3PT0iLCJyb2xlIjoiQURNSU4iLCJpZCI6NywiZXhwIjoxNjkxNTU4MjE5LCJ1c2VybmFtZSI6IjRlNzYzTXBVeEVoOCs5MUg2OUVuUnc9PSJ9.Cq7hmF07lt9rLBeV_TyXOmMf20oUE3P8nh9MvedqGodvKZhyHmAMS0DF03GUzaTy1tZ1l9inULtF2VuiiaXgCQ' 
      }
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