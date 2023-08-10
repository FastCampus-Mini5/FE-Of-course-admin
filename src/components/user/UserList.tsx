import styled from 'styled-components'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userListApi } from '@/api/api'
import { UserContext } from '@/contexts/index'
import { AlignType } from 'rc-table/lib/interface'
import { StyledBaseTable, StyledBaseSection } from 'styles/index'
import { commonTexts, userTexts } from '@/constants/index'

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

  // table 생성
  const tableItemSource = userLists.map((item, index) => ({
    key: index + 1,
    username: item.username,
    email: item.email,
    hireDate: item.hireDate.split('T')[0],
    remainVacation: item.remainVacation
  }))

  const itemColumns = [
    {
      title: commonTexts.key,
      dataIndex: 'key',
      key: 'key',
      align: 'center' as AlignType
    },
    {
      title: commonTexts.name,
      dataIndex: 'username',
      key: 'username',
      align: 'center' as AlignType
    },
    {
      title: commonTexts.email,
      dataIndex: 'email',
      key: 'email',
      align: 'center' as AlignType
    },
    {
      title: userTexts.hireDate,
      dataIndex: 'hireDate',
      key: 'hireDate',
      align: 'center' as AlignType
    },
    {
      title: userTexts.remainVacation,
      dataIndex: 'remainVacation',
      key: 'remainVacation',
      align: 'center' as AlignType
    }
  ]

  return (
    <StyledBaseSection>
      <Styledspan>{userTexts.userList}</Styledspan>
      <StyledBaseTable
        dataSource={tableItemSource}
        columns={itemColumns}
        pagination={{ simple: true, pageSize: 5 }}
      />
    </StyledBaseSection>
  )
}
const Styledspan = styled.span`
  text-align: center;
  font-size: 30px;
  margin-top: 40px;
`
