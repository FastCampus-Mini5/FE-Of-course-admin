import axios from "axios";
import styled  from 'styled-components'
import {useState, useEffect} from 'react'
// import UserListTable from './UserListTable'
import {Table} from 'antd'

interface User {
  username: string,
  email: string,
  hireDate: string
  reaminVacation: number
}

// const headers = [
//   {
//     text: '사원명',
//     value: 'username'
//   },
//   {
//     text: 'E-mail',
//     value: 'email'
//   },
//   {
//     text: '입사일',
//     value: 'hireDate'
//   },
//   {
//     text: '승인여부',
//     value: 'pending'
//   }
// ]

function UserList() {
  const [userLists, setUserLists] = useState<User[]>([])

  const userListsApi = async () => {
    try {
      const { data } = await axios.get('http://localhost:8001/api/admin/user/list')
      setUserLists(data.response)
    } catch (error) {
      console.error('error : ' + error);
    }
  }
  
  useEffect(() => {
    userListsApi()
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
      {/* <UserListTable 
        headers = { headers }
        items = { userLists }
        selectable = {true}
        updateSelection={setSelection}
      /> */}
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
`