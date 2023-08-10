import { AlignType } from 'rc-table/lib/interface'
import { commonTexts, userTexts } from '@/constants/index'
import { StyledBaseTable } from 'styles/index'

export const UserListTable = ({ userLists }) => {

  // table 생성
  const tableItemSource = userLists.map((item, index) => ({
    key: index + 1,
    username: item.username,
    email: item.email,
    hireDate: item.hireDate.split('T')[0],
    remainVacation: item.remainVacation
  }))

  const itemColumns = [
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
      align: 'center' as AlignType
    },
    {
      title: commonTexts.email,
      dataIndex: 'email',
      key: 'email',
      align: 'center' as AlignType
    },
    {
      title: userTexts.hireDate,
      dataIndex: 'hireDate',
      key: 'hireDate',
      align: 'center' as AlignType
    },
    {
      title: userTexts.remainVacation,
      dataIndex: 'remainVacation',
      key: 'remainVacation',
      align: 'center' as AlignType
    }
  ]

  return (
    <div>
      <StyledBaseTable
        dataSource={tableItemSource}
        columns={itemColumns}
        pagination={{ simple: true, pageSize: 5 }}
      />
    </div>
  )
}
