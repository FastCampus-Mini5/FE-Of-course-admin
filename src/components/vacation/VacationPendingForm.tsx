import { useState, useEffect } from 'react'
import { Table } from 'antd'
import styled from 'styled-components'
import { vacationPendingApi } from '@/api/api'
import { AlignType } from 'rc-table/lib/interface';

interface VacationPendin {
  username: string,
  email: string,
  createdDate: string,
  startDate: string,
  endDate: string
}

export const VacationPendingForm = () => {
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
      key: 'key',
      align: 'center' as AlignType,
    },
    {
      title: '성명',
      dataIndex: 'username',
      key: 'username',
      align: 'center' as AlignType,
    },
    {
      title: '아이디',
      dataIndex: 'email',
      key: 'email',
      align: 'center' as AlignType,
    },
    {
      title: '신청일',
      dataIndex: 'createdDate',
      key: 'createdDate',
      align: 'center' as AlignType,
    },
    {
      title: '시작일',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center' as AlignType,
    },
    {
      title: '종료일',
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center' as AlignType,
    },
    {
      title: '확인',
      dataIndex: 'approveButton',
      key: 'approveButton',
      align: 'center' as AlignType,
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

const StyleButton = styled.div`
  display: flex;
  gap: 10px;
  width: 100px;
`