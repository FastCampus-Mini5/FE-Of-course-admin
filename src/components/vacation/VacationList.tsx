import { useState, useEffect } from 'react'
import axios from 'axios';
import { Table } from 'antd'

interface Annual {
  username: string;
  email: string;
  reason: string;
  createdAt: string;
  startDate: string;
  endDate: string
}

function VacationList() {
  const [annualLists, setAnnualLists] = useState<Annual[]>([])

  const annualListApi = async () =>{
    try{
      const { data } = await axios.get('http://localhost:8001/api/admin/vacation/approve/list')
      setAnnualLists(data.response)
    } catch(error) {
      console.error('error :' + error)
    }
  }

  useEffect(() => {
    annualListApi()
  }, [])

  // table
  const tableItemSource = annualLists.map((item, index) => ({
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