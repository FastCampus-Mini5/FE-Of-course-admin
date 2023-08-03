import { useState, useEffect } from 'react'
import { Table } from 'antd'
import {SelectPeriod} from "./SelectPeriod"
import { DutyListApi } from '@/api/api'
import { AlignType } from 'rc-table/lib/interface';
interface DutyList {
  username: string
  email: string
  createdDate: string
  dutyDate: string
}

export const DutyForm = () => {
  const [dutyLists, setDutyLists] = useState<DutyList[]>([])

  const DutyList = async() => {
    try {
      const res = await DutyListApi()
      setDutyLists(res.data.response)
    } catch (error) {
      console.error('error : ' + error)
    }
  }

  useEffect(() => {
    DutyList()
  }, [])

  // table
  const tableItemSource = dutyLists.map((item, index) => ({
    key: index+1,
    username: item.username,
    email: item.email,
    createdDate: item.createdDate,
    dutyDate: item.dutyDate
  }))

  const tableColumns = [
    {
      title: '번호',
      dataIndex: 'key',
      key: 'key',
      align: 'center' as AlignType,
      style: {width: 50}
    },
    {
      title: '성명',
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
      title: '신청일',
      dataIndex: 'createdDate',
      key: 'createdDate',
      align: 'center' as AlignType
    },
    {
      title: '당직일',
      dataIndex: 'dutyDate',
      key: 'dutyDate',
      align: 'center' as AlignType
    },
  ]

  return (
    <>
      <h1> 당직 리스트</h1>
      <SelectPeriod />
      <Table
        dataSource={tableItemSource}
        columns={tableColumns}
      />
    </>
  )
}
