import styled  from 'styled-components'
import {useState, useEffect} from 'react'
import {Table} from 'antd'
import { userListApi } from "@/api/api";
import { AlignType } from 'rc-table/lib/interface';

interface User {
  username: string,
  email: string,
  hireDate: string
  reaminVacation: number
}

export const UserForm = () => {
  const [userLists, setUserLists] = useState<User[]>([])

  const userList = async () => {
    try {
      const res = await userListApi()
      if(res) {
        setUserLists(res.data.response.content)        
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
      title: '전체연차',
      dataIndex: '',
      key: '',
      align: 'center' as AlignType
    },
    {
      title: '잔여연차',
      dataIndex: 'remainVacation',
      key: 'remainVacation',
      align: 'center' as AlignType
    },
  ]

  return (
    <>
      <Styledspan>
          유저 리스트
      </Styledspan>
      <StyledTable
        dataSource={tableItemSource}
        columns={itemColumns}
        pagination = {{simple: true}}
        size="small"
      />
    </>
  )
}
const Styledspan = styled.div`
  text-align: center;
  font-size: 30px;
  margin-top: 40px;
`


const StyledTable = styled(Table)`
  min-width: 800px;
  max-width: 800px;
  margin-left: 50px;
  margin-top: 30px;
`