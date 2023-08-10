import { commonTexts, dutyTexts } from '@/constants/index'
import { StyledBaseTable } from 'styles/index'
import { AlignType } from 'rc-table/lib/interface'

export const DutyListTable = ({ filteredItems }) => {

    // table 생성
    const tableItemSource = filteredItems.map((item, index) => ({
      key: index + 1,
      username: item.username,
      email: item.email,
      createdDate: item.createdDate.split('T')[0],
      dutyDate: item.dutyDate.split('T')[0]
    }))
  
    const tableColumns = [
      {
        title: commonTexts.key,
        dataIndex: 'key',
        key: 'key',
        align: 'center' as AlignType,
        width: '100px',
        sorter: (a, b) => a - b
      },
      {
        title: commonTexts.name,
        dataIndex: 'username',
        key: 'username',
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
        align: 'center' as AlignType,
        sorter: (a, b) =>
          a.createdDate.split('T')[0].replace(/-/g, '') -
          b.createdDate.split('T')[0].replace(/-/g, '')
      },
      {
        title: dutyTexts.dutyDate,
        dataIndex: 'dutyDate',
        key: 'dutyDate',
        align: 'center' as AlignType,
        sorter: (a, b) =>
          a.dutyDate.split('T')[0].replace(/-/g, '') -
          b.dutyDate.split('T')[0].replace(/-/g, '')
      }
    ]

  return (
    <div>      
      <StyledBaseTable
        dataSource={tableItemSource}
        columns={tableColumns}
        pagination={{ pageSize: 8 }}
        showSorterTooltip={false}
      />
    </div>
  )
}
