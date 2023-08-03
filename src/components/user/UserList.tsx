import styled  from 'styled-components'
import {useState, useEffect} from 'react'
import {Table} from 'antd'
import { userListApi } from "@/api/api";

interface User {
  username: string,
  email: string,
  hireDate: string
  reaminVacation: number
}

function UserList() {
  const [userLists, setUserLists] = useState<User[]>([])

  const userList = async () => {
    try {
      const res = await userListApi()
      if(res) {
        setUserLists(res.data.response)        
      }
    } catch (error) {
      console.error('error : ' + error);
    }
  }
  
  useEffect(() => {
    userList()
  }, [])


  // table 
  const tableItemSource = userLists.map((item, index) => ({
    key: index+1,
    username: item.username,
    email: item.email,
    hireDate: item.hireDate,
    remainVacation: item.reaminVacation,
  })) 

  const itemColumns = [
    {
      title: '번호',
      dataIndex: 'key',
      key: 'key',
      align: 'center' as 'center'
    },
    {
      title: '사원명',
      dataIndex: 'username',
      key: 'username',
      align: 'center' as 'center'
    },
    {
      title: '아이디',
      dataIndex: 'email',
      key: 'email',
      align: 'center' as 'center'
    },
    {
      title: '입사일',
      dataIndex: 'hireDate',
      key: 'hireDate',
      align: 'center' as 'center'
    },
    {
      title: '전체연차',
      dataIndex: '',
      key: '',
      align: 'center' as 'center'
    },
    {
      title: '잔여연차',
      dataIndex: 'remainVacation',
      key: 'remainVacation',
      align: 'center' as 'center'
    },
  ]

  return (
    <>
      <div>
        <span>
          유저 리스트
        </span>
        <StyleTable
          dataSource={tableItemSource}
          columns={itemColumns}
          pagination = {{simple: true}}
          size="small"
        />
      </div>

    </>
  )
}

export default UserList

const StyleTable = styled(Table)`
  margin-top: 30px;
  margin-left: 50px;
  .ant-table-cell {
    padding-bottom: 10px;
  }
  .userListTable {
    text-align: center;
  }
  .ant-table-content {
    text-align: center;

  }
  min-width: 1000px;
`