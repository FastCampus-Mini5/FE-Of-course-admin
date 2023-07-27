import {NavLink} from 'react-router-dom'
import Styled  from 'styled-components'

function Nav() {
  return (
    <>
      <StyledNavContainer>
        <StyledNavitem to = '/user'> 유저 리스트</StyledNavitem>
        <StyledNavitem to = '/annual'> 연차 리스트</StyledNavitem>
        <StyledNavitem to = '/duty'> 당직 리스트</StyledNavitem>
      </StyledNavContainer>
    </>

  )
}

export default Nav

const StyledNavitem = Styled(NavLink)`
  display: block;
  font-size: 20px;
  margin-bottom: 40px;
`

const StyledNavContainer = Styled.div`
  margin-top: 50px;
  width: 200px;
  height: 600px;
  background-color: #66ffff;
  justify-content: center;
  text-align: center;
`