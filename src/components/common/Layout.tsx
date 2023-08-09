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
      <StyledDiv className = '최종'>

        <StyledNavContainer>
          <div>
            <StyledImg 
              src = {logo}
              onClick = {() => navigate('/user')}
            />
            {searchLinks}
          </div>
          <StyledSignOutButton onClick = {signOut}>로그아웃</StyledSignOutButton>
        </StyledNavContainer>
        <StyledOulet>
          <Outlet/>
        </StyledOulet>
        


      </StyledDiv>
    </>

  )
}

const StyledDiv = styled.div`
  display: flex;
  background-color: #f5f6fa;
  width: 1440px;
  height: 923px;
`

const StyledNavContainer = styled.div`
  min-width: 200px;
  height: 923px;
  background-color: #66ffff;
  justify-content: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  position: fix;
  display: inline-block;
  bottom: 20px;
  padding: 10px 20px;
  background-color: #ff5555;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;
  width: 160px;  
  border-radius: 10px;
  text-align: center;
  margin: 10px auto;

  &:hover {
    background-color: #e04242;
  }
`

const StyledOulet = styled.div`
  height: 100vh;
`