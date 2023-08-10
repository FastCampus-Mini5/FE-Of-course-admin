import { ApproveSignUpApi, userApproveApi } from '@/api/api'
import styled from 'styled-components'
import { commonTexts } from '@/constants/index'

export const UserApproveButton = ({ email, onUserApprove, userList }) => {

  // 버튼 클릭시 실행
  const handleClick = async () => {
    try {
      await ApproveSignUpApi(email)
      const userApporve = await userApproveApi()
      // 여기에서 승인 완료 후의 작업을 수행할 수 있습니다.

      onUserApprove(userApporve)
      userList()
      alert(commonTexts.approveText)
    } catch (error) {
      console.error('error : ' + error)
    }
  }

  return (
    <StyledApproveButton onClick={handleClick}>
      {commonTexts.approve}
    </StyledApproveButton>
  ) 

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
