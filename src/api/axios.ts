// import { baseInstance } from "api/index";
import axios, { AxiosError, AxiosInstance } from 'axios'

const authInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(
    config => {
      // 로컬스토리지에 저장 되어 있는 AccessToken을 가져온다.
      const accessToken = localStorage.getItem(
        'token'
      )
      if (config.headers && accessToken) {
        // AccessToken이 정상적으로 저장되어 있으면 headers에 Authorization에 값을 추가해준다.
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      // authorization을 추가한 config 반환
      return config
    },
    (error: AxiosError): Promise<AxiosError> => {
      return Promise.reject(error)
    }
  )

  return instance
}

// Authorization 설정이 없는 일반 사용자 API용 Instance
export const baseInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

// Authorization 설정이 추가된 로그인한 사용자 API용 Instance
export const authInstance: AxiosInstance = authInterceptors(baseInstance)
