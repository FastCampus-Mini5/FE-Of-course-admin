import styled from 'styled-components'
import { useContext, useEffect } from 'react'
import { userListApi } from '@/api/api'
import { UserContext } from '@/contexts/index'
import { AlignType } from 'rc-table/lib/interface'
import { User } from '@/pages'
import { StyledBaseTable, StyledBaseSection } from 'styles/index'

export const UserList = () => {
  const { userLists, setUserLists } = useContext(UserContext)
  const userList = async () => {
    try {
      const res = await userListApi()
      if (res) {
        setUserLists(
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
    userList()
  }, [])

  // table
  const tableItemSource = userLists.map((item, index) => ({
    key: index + 1,
    username: item.username,
    email: item.email,
    hireDate: item.hireDate.split('T')[0],
    remainVacation: item.remainVacation
  }))

  const itemColumns = [
    {
      title: '번호',
      dataIndex: 'key',
      key: 'key',
      align: 'center' as AlignType
    },
    {
      title: '사원명',
      dataIndex: 'username',
      key: 'username',
      align: 'center' as AlignType
    },
    {
      title: '아이디',
      dataIndex: 'email',
      key: 'email',
      align: 'center' as AlignType
    },
    {
      title: '입사일',
      dataIndex: 'hireDate',
      key: 'hireDate',
      align: 'center' as AlignType
    },
    {
      title: '잔여연차',
      dataIndex: 'remainVacation',
      key: 'remainVacation',
      align: 'center' as AlignType
    }
  ]

  return (
    <StyledBaseSection>
      <Styledspan>유저 리스트</Styledspan>
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
