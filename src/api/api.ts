import axios from "axios"
import { API_URL } from './Base';

export const userListApi = async() => {
  try {
    const data = await axios.get(`${API_URL}/user/list`)
    if(data) {
      return data
    }
    else {
      throw new Error('기록 작성에 실패하셨습니다.')
    }
  } catch (error) {
    throw error
  }
}

export const userApproveApi = async() => {
  try {
    const data = await axios.get(`${API_URL}/signup/list`)
    if(data) {
      return data
    }
    else {
      throw new Error('기록 작성에 실패하셨습니다.')
    }
  } catch(error) {
    throw error
  }
}

export const vacationApi = async() => {
  try {
    const data = await axios.get(`${API_URL}/vacation/approve/list`)
    if(data) {
      return data
    } else {
      throw new Error('기록 작성에 실패하셨습니다')
    } 
  } catch(error) {
    throw(error)
  }
}

export const vacationPendingApi = async() => {
  try {
    const data = await axios.get(`${API_URL}/vacation/pending`)
    if(data) {
      return data
    } else {
      throw new Error('기록 작성에 실패하셨습니다')
    } 
  } catch(error) {
    throw(error)
  }
}

export const DutyListApi = async() => {
  try {
    const data = await axios.get(`${API_URL}/duty/approve/list`)
    if(data) {
      return data
    } else {
      throw new Error('기록 작성에 실패하셨습니다.')
    }
  } catch(error) {
    throw(error)
  }
}

export const DutyPeindingListsApi = async() => {
  try {
    const data = await axios.get(`${API_URL}/duty/pending`)
    if(data) {
      return data
    } else {
      throw new Error('기록 작성에 실패하셨습니다.')
    }
  }catch (error) {
    throw(error)
  }
}

export const VacationProceedApi = async() => {
  try {
    const data = await axios.post(`${API_URL}/vacation/proceed`, {

    }, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0ZTc2M01wVXhFaDgrOTFINjlFblJ3PT0iLCJyb2xlIjoiQURNSU4iLCJpZCI6NywiZXhwIjoxNjkxNTU4MjE5LCJ1c2VybmFtZSI6IjRlNzYzTXBVeEVoOCs5MUg2OUVuUnc9PSJ9.Cq7hmF07lt9rLBeV_TyXOmMf20oUE3P8nh9MvedqGodvKZhyHmAMS0DF03GUzaTy1tZ1l9inULtF2VuiiaXgCQ'
      }
    })
    
  } catch (error) {
    throw new Error('기록 작성에 실패하셨습니다.')
  }
}