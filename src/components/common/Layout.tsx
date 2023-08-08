import {NavLink, Outlet, useNavigate } from 'react-router-dom'
import styled  from 'styled-components'
import logo from '../../assets/service-title.png'

export const Layout = () => {
  const navigate = useNavigate()

  const links = [
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

  const signOut = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <>
      <StyledDiv>

        <StyledNavContainer>
          <StyledImg 
            src = {logo}
            onClick = {() => navigate('/user')}
          />
          {searchLinks}
          <StyledSignOutButton onClick = {signOut}>로그아웃</StyledSignOutButton>
        </StyledNavContainer>
        <div>
          <Outlet/>
        </div>

      </StyledDiv>
    </>

  )
}

const StyledDiv = styled.div`
  position: fix;
  display: flex;
`

const StyledNavContainer = styled.div`
  min-width: 200px;
  height: 100vh;
  background-color: #66ffff;
  justify-content: center;
  text-align: center;
`

const StyledNavitem = styled(NavLink)`
  display: block;
  font-size: 20px;
  margin-top: 50px;
  margin-bottom: 40px;
  text-decoration-line: none;
`

const StyledImg = styled.img`
  width : 200px;
  cursor: pointer;
`

const StyledSignOutButton = styled.button`
  bottom: 0;  
`