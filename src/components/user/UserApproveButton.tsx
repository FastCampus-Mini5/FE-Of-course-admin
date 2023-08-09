import { ApproveSignUpApi, userApproveApi } from '@/api/api'
import { styled } from 'styled-components'

export const UserApproveButton = ({ email, onUserApporve, userList }) => {
  const handleClick = async () => {
    try {
      await ApproveSignUpApi(email)
      const userApporve = await userApproveApi()
      // 여기에서 승인 완료 후의 작업을 수행할 수 있습니다.

      onUserApporve(userApporve)
      userList(userApporve)
      alert('승인되었습니다.')
    } catch (error) {
      console.error('error : ' + error)
    }
  }

  return <StyledApproveButton onClick={handleClick}>승인</StyledApproveButton>
}

const StyledApproveButton = styled.button`
  width: 90px;
  height: 30px;
  border: 1px solid ${props => props.theme.colors.primaryBlue};
  color: ${props => props.theme.colors.primaryBlue};
  /* font-weight: 400; */
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.primaryBlue};
    color: #fff;
    transition: all 0.1s ease-in;
  }
`
