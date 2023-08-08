import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { VacationPendingApi, VacationProceedApi } from '@/api/api'
import { StyledBaseSection, StyledBaseTable } from 'styles/index'
import { AlignType } from 'rc-table/lib/interface';

interface VacationPendin {
  username: string,
  email: string,
  reason: string,
  createdDate: string,
  createdAt: string,
  startDate: string,
  endDate: string,
  id: number
}

export const VacationPendingForm = () => {
  const [vacationPendingLists, setVacationPendingLists] = useState<VacationPendin[]>([])

  const vacationPendingList = async () => {
    try {
      const res = await VacationPendingApi()
      setVacationPendingLists(res.data.response.content)
      console.log(res)
    } catch (error) {
      console.error('error : ' + error) 
    }
  }

  useEffect(() => {
    vacationPendingList()
  }, [])

console.log(vacationPendingLists)

  // table
  const tableItemSource = vacationPendingLists.map((item, index) => ({
    key: index+1,
    username: item.username,
    email: item.email,
    createdAt: item.createdAt.split('T')[0],
    startDate: item.startDate.split('T')[0],
    endDate: item.endDate.split('T')[0],
    approveButton: (
      <StyledButton>
        <button onClick = {() => handleApprove(item.id)}>
          승인
        </button>
        <button onClick = {() => handleReject(item.id)}>
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
      dataIndex: 'createdAt',
      key: 'createdAt',
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
  const handleApprove = async (id: number) => {
    try {
      await VacationProceedApi(id, 'APPROVE')
      await vacationPendingList()
      alert('승인되었습니다.')
    } catch(error) {
      console.log('error : ' + error)
    }
  }

  const  handleReject = async(id: number) => {
    try {
      await VacationProceedApi(id, 'REJECT')
      await vacationPendingList()
      alert('거절되었습니다.')
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
