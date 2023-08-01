import axios from 'axios'
import { useState, useEffect } from 'react'
import { Table } from 'antd'
interface UserApprove {
  username: string
  email: string
  hireDate: string
}



function UserApprove() {
  const [userApproveItems, setUserApproveItems] = useState<UserApprove[]>([])

  const userApproveApi = async () => {
    try {
      const { data } = await axios.get('http://localhost:8001/api/admin/signup/list')
      setUserApproveItems(data.response)
    } catch (error) {
      console.error('error : ' + error)
    }
  }

  useEffect(() => {
    userApproveApi()
  }, [])

  console.log(userApproveItems)

  // table
  const tableItemSources = userApproveItems.map((item, index) => ({
    key: index,
    username: item.username,
    email: item.email,
    hireDate: item.hireDate,
    approveButton: (
      <button onClick={() => handleApprove(item.username)}>
        승인
      </button>
    )
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

  // 승인여부 버튼
  function handleApprove(e: string){
    console.log(e)
  }

  return (
    <>
      <span>userApprove</span>
      <Table
        dataSource={tableItemSources}
        columns={tableColumns}
        pagination = {{pageSize: 5, simple: true}}
        size='large'
      />
    </>
  )
}

export default UserApprove