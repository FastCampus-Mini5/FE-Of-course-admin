import { useState, useEffect } from 'react'
import { Table } from 'antd'
import { vacationApi } from '@/api/api';

interface Annual {
  username: string;
  email: string;
  reason: string;
  createdAt: string;
  startDate: string;
  endDate: string
}

function VacationList() {
  const [vacationLists, setVacationLists] = useState<Annual[]>([])

  const vacationList = async () =>{
    try{
      const res = await vacationApi()
      setVacationLists(res.data.response)
    } catch(error) {
      console.error('error :' + error)
    }
  }

  useEffect(() => {
    vacationList()
  }, [])

  // table
  const tableItemSource = vacationLists.map((item, index) => ({
    key: index+1,
    username: item.username,
    email: item.email,
    reason: item.reason,
    createAt: item.createdAt,
    startDate: item.startDate,
    endDate: item.endDate
  }))

  const tableColumns = [
    {
      title: '번호',
      dataIndex: 'key',
      key: 'key'
    },
    {
      title: '성명',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '아이디',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '사유',
      dataIndex: 'reason',
      key: 'reason'
    },
    {
      title: '신청일',
      dataIndex: 'createAt',
      key: 'createAt'
    },
    {
      title: '시작일',
      dataIndex: 'startDate',
      key: 'startDate'
    },
    {
      title: '종료일',
      dataIndex: 'endDate',
      key: 'endDate'
    },
  ]


  return (
    <>
      <Table
        dataSource={tableItemSource}
        columns={tableColumns}
      />
    </>
  )
}

export default VacationList