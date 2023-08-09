import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { VacationPendingApi, VacationProceedApi } from '@/api/api'
import { StyledBaseSection, StyledBaseTable } from 'styles/index'
import { AlignType } from 'rc-table/lib/interface';


export const VacationPendingList = () => {
  const [vacationPendingLists, setVacationPendingLists] = useState<VacationPendingList[]>([])

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
        <StyledApproveButton onClick = {() => handleApprove(item.id)}>
          승인
        </StyledApproveButton>
        <StyledRejectButton onClick = {() => handleReject(item.id)}>
          거절
        </StyledRejectButton>
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
  width: 100px;
  display: inline-block;
  text-align: center;
`

const StyledApproveButton = styled.button`
  width: 40px;
  height: 30px;
  border-radius: 8px;
  background-color: #56c1e9;
  cursor: pointer;

  &:hover {
    background-color: #2656f6;
  }
`

const StyledRejectButton = styled.button`
  margin-left: 10px;
  background: #ff6666;
  width: 40px;
  height: 30px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #e04242;
  }
`