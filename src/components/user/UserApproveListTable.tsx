import { UserApproveButton } from './UserApproveButton'
import { AlignType } from 'rc-table/lib/interface'
import { StyledBaseTable } from 'styles/index'
import { commonTexts, userTexts } from '@/constants/index'

export const UserApproveListTable = ({ userApproveLists, userApprove, userList }) => {
  // table 생성
  const tableItemSources = userApproveLists.map((item, index) => ({
    key: index,
    username: item.username,
    email: item.email,
    hireDate: item.hireDate.split('T')[0],
    approveButton: (
      <UserApproveButton
        email={item.email}
        onUserApprove={userApprove}
        userList={userList}
      />
    )
  }))

  const tableColumns = [
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
      title: commonTexts.pending,
      dataIndex: 'approveButton',
      key: 'approveButton',
      align: 'center' as AlignType
    }
  ]

  return (
    <div>
      <StyledBaseTable
        dataSource={tableItemSources}
        columns={tableColumns}
        pagination={{ pageSize: 3, simple: true }}
        size="large"
      />
    </div>
  )
}
