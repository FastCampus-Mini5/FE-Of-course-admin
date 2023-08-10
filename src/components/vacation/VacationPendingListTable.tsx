import { AlignType } from 'rc-table/lib/interface'
import { StyledBaseTable } from 'styles/index'
import styled from 'styled-components'
import { commonTexts, vacationTexts } from '@/constants'
import { VacationProceedApi } from '@/api/api'

export const VacationPendingListTable = ({ vacationPendingLists, vacationPendingList }) => {

  // table 생성
  const tableItemSource = vacationPendingLists.map((item, index) => ({
    key: index + 1,
    username: item.username,
    email: item.email,
    createdAt: item.createdAt.split('T')[0],
    startDate: item.startDate.split('T')[0],
    endDate: item.endDate.split('T')[0],
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
      dataIndex: 'username',
      key: 'username',
      align: 'center' as AlignType,
      width: 100
    },
    {
      title: commonTexts.email,
      dataIndex: 'email',
      key: 'email',
      align: 'center' as AlignType
    },
    {
      title: vacationTexts.createdAt,
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center' as AlignType
    },
    {
      title: vacationTexts.startDate,
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center' as AlignType
    },
    {
      title: vacationTexts.endDate,
      dataIndex: 'endDate',
      key: 'endDate',
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
      await VacationProceedApi(id, 'APPROVE')
      await vacationPendingList()
      alert(commonTexts.approveText)
    } catch (error) {
      console.log('error : ' + error)
    }
  }

  const handleReject = async (id: number) => {
    try {
      await VacationProceedApi(id, 'REJECT')
      await vacationPendingList()
      alert(commonTexts.rejectText)
    } catch (error) {
      console.error('error : ' + error)
    }
  }

  return (
    <div>
      <StyledBaseTable
        dataSource={tableItemSource}
        columns={tableColumns}
      />
    </div>
  )
}

const StyledButton = styled.div`
  display: flex;
  display: inline-block;
  text-align: center;
  flex-wrap: nowrap;
`

export const StyledApproveButton = styled.button`
  width: 60px;
  height: 30px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid ${props => props.theme.colors.primaryBlue};
  color: ${props => props.theme.colors.primaryBlue};
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: ${props => props.theme.colors.primaryBlue};
    transition: all.2s;
  }
`

export const StyledRejectButton = styled.button`
  margin-left: 20px;
  background: #fff;
  width: 60px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.primaryRed};
  color: ${props => props.theme.colors.primaryRed};
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: ${props => props.theme.colors.primaryRed};
    transition: all.2s;
  }
`