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
    hireDate: item.hireDate.replace(/T *$/, ''),
    remainVacation: item.reaminVacation,
    updatePassword: (
      <button onClick={() => handleUpdatePassword(index)}>
        비밀번호수정
      </button>
    ),
    leave: (
      <button onClick={() => handleLeave(index)}>
        퇴사
      </button>
    )
  })) 

  const itemColumns = [
    {
      title: '번호',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '사원명',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '아이디',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '입사일',
      dataIndex: 'hireDate',
      key: 'hireDate',
    },
    {
      title: '전체연차',
      dataIndex: '',
      key: '',
    },
    {
      title: '잔여연차',
      dataIndex: 'remainVacation',
      key: 'remainVacation',
    },
    {
      title: '비밀번호 수정',
      dataIndex: 'updatePassword',
      key: 'updatePassword',
    },
    {
      title: '퇴사여부',
      dataIndex: 'leave',
      key: 'leave',
    },
  ]

  //비밀번호 수정 버튼
  function handleUpdatePassword(index: number) {
    console.log(index)
  }

  // 퇴사버튼 
  // 리스트에서 삭제를 할것인지
  // 퇴사, 재직중으로 표시할 것인지
  function handleLeave(index: number) {
    setUserLists(userLists => userLists.filter((_,i) => i !== index))

  }

  return (
    <>
      <div>UserList</div>
      <StyleTable
        dataSource={tableItemSource}
        columns={itemColumns}
        pagination = {{pageSize: 5, simple: true}}
        size="small"
      />
    </>

  )
}

export default UserList

const StyleTable = styled(Table)`
  margin-top: 30px;
  .ant-table-cell {
    padding-bottom: 10px;
  }
  .userListTable {
    text-align: center;
  }
  min-width: 1000px;
`