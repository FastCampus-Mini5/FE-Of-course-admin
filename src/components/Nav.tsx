import {NavLink, Outlet} from 'react-router-dom'
import Styled  from 'styled-components'

function Nav() {
  return (
    <>
      <StyledDiv>
        <StyledNavContainer>
          <StyledNavitem to = '/' > 홈 </StyledNavitem>
          <StyledNavitem to = '/user' >  유저 리스트</StyledNavitem>
          <StyledNavitem to = '/vacationpending'>연차 요청 리스트</StyledNavitem>
          <StyledNavitem to = '/vacation'> 연차 리스트</StyledNavitem>
          <StyledNavitem to = '/duty'> 당직 리스트</StyledNavitem>
        </StyledNavContainer>
        <div>
          <Outlet/>
        </div>
      </StyledDiv>
    </>

  )
}

export default Nav

const StyledDiv = Styled.div`
  display: flex;
`

const StyledNavContainer = Styled.div`
  width: 200px;
  height: 100vh;
  background-color: #66ffff;
  justify-content: center;
  text-align: center;
`

const StyledNavitem = Styled(NavLink)`
  display: block;
  font-size: 20px;
  margin-bottom: 40px;
`

