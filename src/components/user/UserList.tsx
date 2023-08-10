import styled from 'styled-components'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userListApi } from '@/api/api'
import { UserContext } from '@/contexts/index'
import { StyledBaseSection } from 'styles/index'
import { commonTexts, userTexts } from '@/constants/index'
import { UserListTable } from '@/components/user/index'

export const UserList = () => {
  const { userLists, setUserLists } = useContext(UserContext)
  const navigate = useNavigate()

  // 유저 리스트 호출
  const userList = async () => {
    try {
      const res = await userListApi()
      if (res) {
        setUserLists(
          // 입사일 기준으로 내림차순 정렬
          res.data.response.content.sort(
            (a: User, b: User) =>
              Number(b.hireDate.split('T')[0].replace(/-/g, '')) -
              Number(a.hireDate.split('T')[0].replace(/-/g, ''))
          )
        )
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
    userList()
  }, [])



  return (
    <StyledBaseSection>
      <Styledspan>{userTexts.userList}</Styledspan>
      <UserListTable userLists = {userLists}/>
    </StyledBaseSection>
  )
}
const Styledspan = styled.span`
  text-align: center;
  font-size: 30px;
  margin-top: 40px;
`
