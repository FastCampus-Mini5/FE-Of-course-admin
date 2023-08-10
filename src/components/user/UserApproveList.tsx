import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userApproveApi } from '@/api/api'
import { UserApproveButton } from './UserApproveButton'
import { AlignType } from 'rc-table/lib/interface'
import { StyledBaseTable, StyledBaseSection } from 'styles/index'
import { commonTexts, userTexts } from '@/constants'



export const UserApproveList = ({ userList }) => {
  const [userApproveLists, setUserApproveLists] = useState<UserApproveList[]>([])
  const navigate = useNavigate()

  // 회원가입 요청 리스트 호출
  const userApprove = async () => {
    try {
      const res = await userApproveApi()
      if (res) {
        setUserApproveLists(res.data.response.content)
      }
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
    userApprove()
  }, [])

  // table 생성
  const tableItemSources = userApproveLists.map((item, index) => ({
    key: index,
    username: item.username,
    email: item.email,
    hireDate: item.hireDate.split('T')[0],
    approveButton: (
      <UserApproveButton
        email={item.email}
        onUserApporve={userApprove}
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
    <StyledBaseSection>
      <span>{userTexts.signupPending}</span>
      <StyledBaseTable
        dataSource={tableItemSources}
        columns={tableColumns}
        pagination={{ pageSize: 3, simple: true }}
        size="large"
      />
    </StyledBaseSection>
  )
}


