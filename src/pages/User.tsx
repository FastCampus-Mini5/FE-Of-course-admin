import Styled  from 'styled-components'
import UserApprove from "@/components/user/UserApprove"
import UserList from "@/components/user/UserList"


function User() {
  return (
    <StyledUserSection>
      <UserApprove/>
      <UserList/>
    </StyledUserSection>
  )
}

export default User

const StyledUserSection = Styled.section`
  text-align: center;
  font-size: 30px;
`