import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DutyPeindingListsApi, DutyProceedApi } from '@/api/api'
import { AlignType } from 'rc-table/lib/interface';
import { StyledBaseSection, StyledBaseTable } from 'styles/index'

interface DutyPending {
  username : string
  email: string
  createdDate: string
  dutyDate: string
  id: number
}

export const DutyPendingForm = () => {
  const [dutyPendingLists, setDutyPendingLists] = useState<DutyPending[]>([])

  const dutyPendingList = async () => {
    try {
      const res = await DutyPeindingListsApi()
      setDutyPendingLists(res.data.response.content)
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
    createdDate: item.createdDate.split('T')[0],
    dutyDate: item.dutyDate.split('T')[0],
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
      align: 'center' as AlignType
    },
    {
      title: '성명',
      dataIndex: 'ueername',
      key: 'ueername',
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
    {
      title: '승인여부',
      dataIndex: 'approveButton',
      key: 'approveButton',
      align: 'center' as AlignType
    }
  ]

  // 승인, 거절 버튼
  const handleApprove = async(id: number) => {
    try {
      await DutyProceedApi(id, 'APPROVE')
      await dutyPendingList()
      alert('승인되었습니다.')
    } catch(error) {
      console.error('error : ' + error)
    }
  }

  const handleReject = async(id: number) => {
    try {
      await DutyProceedApi(id, 'REJECT')
      await dutyPendingList()
      alert('거절되었습니다.')
    } catch(error) {
      console.error('error : ' + error)
    }
  }

  return (
    <StyledBaseSection>
      <span>당직 요청 리스트</span>
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
