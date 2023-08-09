import { useState, useEffect } from 'react'
import { userApproveApi } from '@/api/api'
import { UserApproveButton } from './UserApproveButton'
import { AlignType } from 'rc-table/lib/interface'
import { StyledBaseTable, StyledBaseSection } from 'styles/index'



export const UserApproveList = ({ userList }) => {
  const [userApproveLists, setUserApproveLists] = useState<UserApproveList[]>([])

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
    userApprove()
  }, [])

  // table
  const tableItemSources = userApproveLists.map((item, index) => ({
    key: index,
    username: item.username,
    email: item.email,
    hireDate: item.hireDate.split('T')[0],
    approveButton: (
      <UserApproveButton
        email={item.email}
        onUserApporve={userApprove}
        userList={userList}
      />
    )
  }))

  const tableColumns = [
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
      title: '승인여부',
      dataIndex: 'approveButton',
      key: 'approveButton',
      align: 'center' as AlignType
    }
  ]

  return (
    <StyledBaseSection>
      <span>승인요청</span>
      <StyledBaseTable
        dataSource={tableItemSources}
        columns={tableColumns}
        pagination={{ pageSize: 3, simple: true }}
        size="large"
      />
    </StyledBaseSection>
  )
}


