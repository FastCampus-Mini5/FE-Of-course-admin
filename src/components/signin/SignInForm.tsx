import { styled } from 'styled-components'
import { useRef, useEffect, useState } from 'react'
import { signinTexts } from '@/constants/index'
import { signIn } from '@/api/account'
import { InputField } from 'components/index'
import { AxiosError, AxiosHeaders, AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import Title from '@/assets/service-title.png'

export const SignInForm = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef?.current?.focus()
    const token = localStorage.getItem('token')
    if (token) {
      //이미 로그인한 유저에 대한 예외처리, 토큰 존재한다면, 로그인/회원가입 진입불가
      navigate('/user')
    }
  }, [])


  //응답이 존재할 시 header내 token값을 localStorage에 저장
  const handleSignIn = async () => {
    try {
      const res: AxiosResponse = await signIn(email, password)
      let headers = res.headers
      if (headers instanceof AxiosHeaders) {
        let jwtToken = headers.get('authorization')
        localStorage.setItem('token', jwtToken as string)
        navigate('/user')
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        const error = e.response?.data.error.message
        alert(error)
      }
    }
  }

  return (
    <>
      <SignInWrapper>
        <SignInFrame>
          <SignInContainer>
            <ServiceImage src={Title} />
            <StyledForm
              method="post"
              // action='HOST URL'
            >
              <InputField
                fn={setEmail}
                val={email}
                title={signinTexts.email}
                ph={signinTexts.emailPh}
                inputRef={inputRef}
                type={'text'}></InputField>
              <InputField
                fn={setPassword}
                val={password}
                title={signinTexts.pwd}
                ph={signinTexts.pwdPh}
                inputRef={null}
                type={'password'}></InputField>

              <StyledButton
                onClick={e => {
                  e.preventDefault()
                  handleSignIn()
                }}>
                {signinTexts.btn}
              </StyledButton>

            </StyledForm>
          </SignInContainer>
        </SignInFrame>
      </SignInWrapper>
    </>
    
  
  )
}


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  top:0;
  bottom:0;
  left:0;
  right:0;

`

export const StyledButton = styled.button`
  all: unset;
  width: 434px;
  height: 60px;
  color: #fff;
  text-align: center;
  background-color: ${props => props.theme.colors.primaryBlue};
  border-radius: 10px;
  margin-bottom: 36px;
  margin-top: 18px;
  cursor: pointer;
`
const ServiceImage = styled.img``

const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  flex-grow: 1;

  ${ServiceImage} {
    position: absolute;
    top: 50px;
    width: 275px;
    height: 75px;
    z-index: 1;
  }
`
const SignInFrame = styled.div`
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 568px;
  height: 600px;
  background-color: white;
`
const SignInContainer = styled.div`
  width: 568px;
  height: 600px;
  background-color: white;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
