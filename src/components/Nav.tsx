import {NavLink, Outlet} from 'react-router-dom'
import Styled  from 'styled-components'

function Nav() {
  const links = [
    { path: '/', text: '홈'},
    { path: '/user', text: '유저 리스트'},
    { path: '/vacationpending', text: '연차 요청 리스트'},
    { path: '/vacation', text: '연차 리스트'},
    { path: '/dutypending', text: '당직 요청 리스트'},
    { path: '/duty', text: '당직 리스트'},
  ]

  const searchLinks = links.map((link, index) => (
    <StyledNavitem 
      key = {index}
      to = {link.path}
    >
      {link.text}
    </StyledNavitem>
  ))


  return (
    <>
      <StyledDiv>
        <StyledNavContainer>
          {searchLinks}
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
  min-width: 200px;
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

