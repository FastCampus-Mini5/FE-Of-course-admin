import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../assets/service-title.png'

export const Layout = () => {
  const navigate = useNavigate()

  const links = [
    { path: '/user', text: '유저 리스트' },
    { path: '/vacationpending', text: '연차 요청 리스트' },
    { path: '/vacation', text: '연차 리스트' },
    { path: '/dutypending', text: '당직 요청 리스트' },
    { path: '/duty', text: '당직 리스트' }
  ]

  const searchLinks = links.map((link, index) => (
    <StyledNavitem
      key={index}
      to={link.path}
      className={({ isActive }) => (isActive ? 'active' : '')}>
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
          <StyledNav>
            <StyledImg
              src={logo}
              onClick={() => navigate('/user')}
            />
            {searchLinks}
          </StyledNav>
          <StyledSignOutButton onClick={signOut}>로그아웃</StyledSignOutButton>
        </StyledNavContainer>
        <StyledOulet>
          <Outlet />
        </StyledOulet>
      </StyledDiv>
    </>
  )
}

const StyledNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .active {
    color: ${props => props.theme.colors.primaryBlue};
    /* border-bottom: 2px solid ${props => props.theme.colors.primaryBlue}; */
  }
`

const StyledDiv = styled.div`
  display: flex;
  background-color: #f5f6fa;
`

const StyledNavContainer = styled.div`
  min-width: 270px;
  background-color: #fff;
  justify-content: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh + 90px);
  margin: -60px 0;
  padding: 60px 0;
`

const StyledNavitem = styled(NavLink)`
  /* display: block; */
  color: black;
  font-size: 16px;
  font-weight: 700;
  margin-top: 50px;
  text-decoration-line: none;
  align-self: flex-start;
  margin-left: 62px;
`

const StyledImg = styled.img`
  margin-top: 40px;
  width: 200px;
  cursor: pointer;
`

const StyledSignOutButton = styled.button`
  display: inline-block;
  bottom: 20px;
  padding: 12px 20px;
  background-color: #f5f6fa;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;
  width: 160px;
  border-radius: 10px;
  text-align: center;
  margin: 40px auto;
`

const StyledOulet = styled.div`
  height: 100vh;
  overflow: scroll;
`
