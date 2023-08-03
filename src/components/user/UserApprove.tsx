import { useState, useEffect } from 'react'
import { Table } from 'antd'
import { userApproveApi } from '@/api/api'
import styled from 'styled-components'
import UserApproveButton from './UserApproveButton'

interface UserApprove {
  username: string
  email: string
  hireDate: string
}



function UserApprove() {
  const [userApproveLists, setUserApproveLists] = useState<UserApprove[]>([])

  const userApprove = async () => {
    try {
      const res = await userApproveApi()
      if(res) {
        setUserApproveLists(res.data.response)
      }
    } catch (error) {
      console.error('error : ' + error)
    }
  }

  useEffect(() => {
    userApprove()
  }, [])

  console.log(userApproveLists)

  // table
  const tableItemSources = userApproveLists.map((item, index) => ({
    key: index,
    username: item.username,
    email: item.email,
    hireDate: item.hireDate,
    approveButton: <UserApproveButton email = {item.email}/>
  }))

  const tableColumns = [
    {
      title: '사원명',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '아이디',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '입사일',
      dataIndex: 'hireDate',
      key: 'hireDate'
    },
    {
      title: '승인여부',
      dataIndex: 'approveButton',
      key: 'approveButton'
    }

  ]

  return (
    <>
      <div>
        <span>
          승인요청
        </span>
        <StyledTable
          dataSource={tableItemSources}
          columns={tableColumns}
          pagination = {{pageSize: 5, simple: true}}
          size='large'
        />
      </div>
    </>
  )
}

export default UserApprove

const StyledTable = styled(Table)`
  max-width: 800px;
  margin-left: 50px;
  .ant-table-wrapper {
    width: 100%
  }
`