import { useState, useEffect } from 'react'
import { Table } from 'antd'
import styled from 'styled-components'
import { DutyPeindingListsApi } from '@/api/api'
import { AlignType } from 'rc-table/lib/interface';

interface DutyPending {
  username : string
  email: string
  createdDate: string
  dutyDate: string
}

export const DutyPendingForm = () => {
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
  function handleApprove(e) {
    console.log(e)
  }

  function handleReject(e) {
    console.log(e)
  }

  return (
    <StyledSection>
      <span>당직 요청 리스트</span>
      <StyledTable
        dataSource={tableItemSource}
        columns={tableColumns}
      />
    </StyledSection>
  )
}
const StyledSection = styled.section`
  font-size: 30px;
  text-align: center;
  margin-top: 40px;
  min-width: 1200px;
  max-width: 1200px;
`


const StyleButton = styled.div`
  display: flex;
  gap: 10px;
  width: 100px;
`

const StyledTable = styled(Table)`
  margin-left: 50px;
  margin-top: 30px;
`