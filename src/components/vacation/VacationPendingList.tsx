import { useState, useEffect } from 'react'
import { Table } from 'antd'
import styled from 'styled-components'
import { vacationPendingApi } from '@/api/api'

interface VacationPendin {
  username: string,
  email: string,
  createdDate: string,
  startDate: string,
  endDate: string
}

function VacationPendingList() {
  const [vacationPendingLists, setVacationPendingLists] = useState<VacationPendin[]>([])

  const vacationPendingList = async () => {
    try {
      const { data } = await vacationPendingApi()
      setVacationPendingLists(data.response)
    } catch (error) {
      console.error('error : ' + error)
    }
  }

  useEffect(() => {
    vacationPendingList()
  }, [])

  // table
  const tableItemSource = vacationPendingLists.map((item, index) => ({
    key: index,
    username: item.username,
    email: item.email,
    createdDate: item.createdDate,
    startDate: item.startDate,
    endDate: item.endDate,
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
      dataIndex: 'username',
      key: 'username'
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
      title: '시작일',
      dataIndex: 'startDate',
      key: 'startDate'
    },
    {
      title: '종료일',
      dataIndex: 'endDate',
      key: 'endDate'
    },
    {
      title: '확인',
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

export default VacationPendingList

const StyleButton = styled.div`
  display: flex;
  gap: 10px;
  width: 100px;
`