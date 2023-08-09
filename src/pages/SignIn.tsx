import { SignInForm } from "components/signin"
import bg from '@/assets/bgblue.png'
import { styled } from "styled-components"

export const SignIn = () => {
  return (
    <Outer>
      <img src={bg} />
      <SignInForm />
    </Outer>
  )
}

const Outer = styled.div`
  img {
    width: 100%;
    height: 100vh;
  }
`

