import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userApproveApi } from '@/api/api'
import { StyledBaseSection } from 'styles/index'
import { commonTexts, userTexts } from '@/constants'
import { UserApproveListTable } from 'components/user/index'



export const UserApproveList = ( { userList } ) => {
  const [userApproveLists, setUserApproveLists] = useState<UserApproveList[]>([])
  const navigate = useNavigate()

  // 회원가입 요청 리스트 호출
  const userApprove = async () => {
    try {
      const res = await userApproveApi()
      if (res) {
        setUserApproveLists(res.data.response.content)
      }
    } catch (error) {
      console.error('error : ' + error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) {
      alert(commonTexts.signinReject)
      navigate('/')
    }
    userApprove()
  }, [])



  return (
    <StyledBaseSection>
      <span>{userTexts.signupPending}</span>
      <UserApproveListTable userApproveLists = {userApproveLists} userApprove = {userApprove} userList = {userList}/>
    </StyledBaseSection>
  )
}


