import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { DutyPeindingListsApi, DutyProceedApi } from '@/api/api'
import { AlignType } from 'rc-table/lib/interface'
import { StyledBaseSection, StyledBaseTable } from 'styles/index'
import { StyledRejectButton, StyledApproveButton } from '@/components'
import { commonTexts, dutyTexts } from '@/constants/index'

export const DutyPendingList = () => {
  const [dutyPendingLists, setDutyPendingLists] = useState<DutyPendingList[]>([])
  const navigate = useNavigate()

  // 당직 요청 리스트 호출
  const dutyPendingList = async () => {
    try {
      const res = await DutyPeindingListsApi()
      setDutyPendingLists(res.data.response.content)
    } catch (error) {
      console.error('error : ' + error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) {
      alert(commonTexts.signinReject)
      navigate('/')
    }
    dutyPendingList()
  }, [])

  // table 생성
  const tableItemSource = dutyPendingLists.map((item, index) => ({
    key: index + 1,
    ueername: item.username,
    email: item.email,
    createdDate: item.createdDate.split('T')[0],
    dutyDate: item.dutyDate.split('T')[0],
    approveButton: (
      <StyledButton>
        <StyledApproveButton onClick={() => handleApprove(item.id)}>
          {commonTexts.approve}
        </StyledApproveButton>
        <StyledRejectButton onClick={() => handleReject(item.id)}>
          {commonTexts.reject}
        </StyledRejectButton>
      </StyledButton>
    )
  }))

  const tableColumns = [
    {
      title: commonTexts.key,
      dataIndex: 'key',
      key: 'key',
      align: 'center' as AlignType
    },
    {
      title: commonTexts.name,
      dataIndex: 'ueername',
      key: 'ueername',
      align: 'center' as AlignType
    },
    {
      title: commonTexts.email,
      dataIndex: 'email',
      key: 'email',
      align: 'center' as AlignType
    },
    {
      title: dutyTexts.createdDate,
      dataIndex: 'createdDate',
      key: 'createdDate',
      align: 'center' as AlignType
    },
    {
      title: dutyTexts.dutyDate,
      dataIndex: 'dutyDate',
      key: 'dutyDate',
      align: 'center' as AlignType
    },
    {
      title: commonTexts.pending,
      dataIndex: 'approveButton',
      key: 'approveButton',
      align: 'center' as AlignType
    }
  ]

  // 승인, 거절 버튼
  const handleApprove = async (id: number) => {
    try {
      await DutyProceedApi(id, 'APPROVE')
      await dutyPendingList()
      alert(commonTexts.approveText)
    } catch (error) {
      console.error('error : ' + error)
    }
  }

  const handleReject = async (id: number) => {
    try {
      await DutyProceedApi(id, 'REJECT')
      await dutyPendingList()
      alert(commonTexts.rejectText)
    } catch (error) {
      console.error('error : ' + error)
    }
  }

  return (
    <StyledBaseSection>
      <span>{dutyTexts.dutyPendingList}</span>
      <StyledBaseTable
        dataSource={tableItemSource}
        columns={tableColumns}
      />
    </StyledBaseSection>
  )
}

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`
