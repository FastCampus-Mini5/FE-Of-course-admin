import { commonTexts, vacationTexts } from "@/constants"
import { AlignType } from 'rc-table/lib/interface'
import styled from 'styled-components'
import { Table } from 'antd'

export const VacationListTable = ( { filteredItems }) => {

  // table 생성
  const tableItemSource = filteredItems.map((item, index) => ({
    key: index + 1,
    username: item.username,
    email: item.email,
    reason: item.reason,
    createdAt: item.createdAt.split('T')[0],
    startDate: item.startDate.split('T')[0],
    endDate: item.endDate.split('T')[0]
  }))

  const tableColumns = [
    {
      title: commonTexts.key,
      dataIndex: 'key',
      key: 'key',
      align: 'center' as AlignType,
      sorter: (a, b) => a - b
    },
    {
      title: commonTexts.name,
      dataIndex: 'username',
      key: 'username',
      align: 'center' as AlignType,
      width: '100'
    },
    {
      title: commonTexts.email,
      dataIndex: 'email',
      key: 'email',
      align: 'center' as AlignType
    },
    {
      title: vacationTexts.reason,
      dataIndex: 'reason',
      key: 'reason',
      align: 'center' as AlignType
    },
    {
      title: vacationTexts.createdAt,
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center' as AlignType,
      sorter: (a, b) =>
        a.createdAt.split('T')[0].replace(/-/g, '') -
        b.createdAt.split('T')[0].replace(/-/g, '')
    },
    {
      title: vacationTexts.startDate,
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center' as AlignType,
      sorter: (a, b) =>
        a.startDate.split('T')[0].replace(/-/g, '') -
        b.startDate.split('T')[0].replace(/-/g, '')
    },
    {
      title: vacationTexts.endDate,
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center' as AlignType,
      sorter: (a, b) =>
        a.endDate.split('T')[0].replace(/-/g, '') -
        b.endDate.split('T')[0].replace(/-/g, '')
    }
  ]

  return (
    <div>
      <StyledTable
        dataSource={tableItemSource}
        columns={tableColumns}
        pagination={{ pageSize: 8 }}
        showSorterTooltip={false}
      />
    </div>
  )
}

const StyledTable = styled(Table)`
  margin-left: 50px;
  margin-top: 30px;
`
