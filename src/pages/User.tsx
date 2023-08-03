import Styled  from 'styled-components'
import {UserApproveForm} from "@/components/user/UserApproveForm"
import {UserForm} from "@/components/user/UserForm"


export const User = () => {
  return (
    <StyledUserSection>
      <UserApproveForm/>
      <UserForm/>
    </StyledUserSection>
  )
}

const StyledUserSection = Styled.section`
  text-align: center;
  font-size: 30px;
`