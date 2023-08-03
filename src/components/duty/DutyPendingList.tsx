import { useState, useEffect } from 'react'
import { Table } from 'antd'
import styled from 'styled-components'
import { DutyPeindingListsApi } from '@/api/api'
interface DutyPending {
  username : string
  email: string
  createdDate: string
  dutyDate: string
}

function DutyPending() {
  const [dutyPendingLists, setDutyPendingLists] = useState<DutyPending[]>([])

  const dutyPendingList = async () => {
    try {
      const res = await DutyPeindingListsApi()
      setDutyPendingLists(res.data.response)
    } catch (error) {
      console.error('error : ' + error)
    }
  }

  useEffect(() => {
    dutyPendingList()
  },[])

  //table

  const tableItemSource = dutyPendingLists.map((item, index) => ({
    key: index+1,
    ueername: item.username,
    email: item.email,
    createdDate: item.createdDate,
    dutyDate: item.dutyDate,
    approveButton: (
      <StyleButton>
        <button onClick = {() => handleApprove(index)}>
          승인
        </button>
        <button onClick = {() => handleReject(index)}>
          거절
        </button>
      </StyleButton>
    )
  }))

  const tableColumns = [
    {
      title: '번호',
      dataIndex: 'key',
      key: 'key'
    },
    {
      title: '성명',
      dataIndex: 'ueername',
      key: 'ueername'
    },
    {
      title: '아이디',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '신청일',
      dataIndex: 'createdDate',
      key: 'createdDate'
    },
    {
      title: '당직일',
      dataIndex: 'dutyDate',
      key: 'dutyDate'
    },
    {
      title: '승인여부',
      dataIndex: 'approveButton',
      key: 'approveButton'
    }
  ]

  // 승인, 거절 버튼
  function handleApprove(e) {
    console.log(e)
  }

  function handleReject(e) {
    console.log(e)
  }

  return (
    <>
      <Table
        dataSource={tableItemSource}
        columns={tableColumns}
      />
    </>
  )
}

export default DutyPending

const StyleButton = styled.div`
  display: flex;
  gap: 10px;
  width: 100px;
`