import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { VacationPendingApi, VacationProceedApi } from '@/api/api'
import { StyledBaseSection, StyledBaseTable } from 'styles/index'
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
      const res = await VacationPendingApi()
      setVacationPendingLists(res.data.response.content)
    } catch (error) {
      console.error('error : ' + error)
    }
  }

  useEffect(() => {
    vacationPendingList()
  }, [])

  // table
  const tableItemSource = vacationPendingLists.map((item, index) => ({
    key: index+1,
    username: item.username,
    email: item.email,
    createdDate: item.createdDate,
    startDate: item.startDate,
    endDate: item.endDate,
    approveButton: (
      <StyledButton>
        <button onClick = {() => handleApprove(item.email)}>
          승인
        </button>
        <button onClick = {() => handleReject(item.email)}>
          거절
        </button>
      </StyledButton>
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
      width: 100
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
  const handleApprove = async (email: string) => {
    try {
      await VacationProceedApi(email, 'APPROVE')
    } catch(error) {
      console.log('error : ' + error)
    }
  }

  const  handleReject = async(email: string) => {
    try {
      await VacationProceedApi(email, 'REJECT')
    } catch(error) {
      console.error('error : ' + error)
    }
  }

  return (
    <StyledBaseSection>
      <span>연차 요청 리스트</span>
      <StyledBaseTable
        dataSource={tableItemSource}
        columns={tableColumns}
      />
    </StyledBaseSection>
  )
}

const StyledButton = styled.div`
  display: flex;
  gap: 10px;
  width: 100px;
`
