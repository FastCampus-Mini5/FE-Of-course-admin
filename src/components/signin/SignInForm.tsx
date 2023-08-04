import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'

import Title from '../../assets/service-title.png'

export const SignInForm = () => {
  const texts = {
    title: '당연하지',
    email: '이메일',
    pwd: '비밀번호',
    btn: '로그인',
    forgotPwd: '비밀번호 찾기',
    signup: '회원가입 하기',
    emailPh: '이메일을 입력해주세요.',
    pwdPh: '비밀번호를 입력해주세요'
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  return (
    <SignInContainer>
      <div className="settler">
        <div className="rectangle">
          <img
            src={Title}
            className="service-title"
          />
          <form
            method="post"
            // action='HOST URL'
            className="form-container">
            <div className="email">{texts.email}</div>
            <input
              type="text"
              className="signin-input"
              placeholder={texts.emailPh}
              ref={inputRef}
            />
            <div className="password">{texts.pwd}</div>
            <input
              type="text"
              className="signin-input"
              placeholder={texts.pwdPh}
            />
            <button className="signin">{texts.btn}</button>
            <div className="signup-cta">
              <Link
                to="/reset"
                className="forgot-pwd">
                {texts.forgotPwd}
              </Link>
              <Link to="/signup">{texts.signup}</Link>
            </div>
          </form>
        </div>
      </div>
    </SignInContainer>
  )
}

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  flex-grow: 1;
  .settler {
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    width: 568px;
    background-color: white;
  }
  .rectangle {
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

    .service-title {
      position: absolute;
      top: 50px;
      width: 275px;
      height: 75px;
      z-index: 1;
    }

    .form-container {
      display: flex;
      flex-direction: column;
      position: absolute;
      margin-top: 150px;
      .signin-input {
        background: #ffffff;
        border: 1px solid #d9d9d9;
        border-radius: 10px;
        padding-left: 10px;
        width: 434px;
        height: 60px;
        margin-bottom: 24px;
        &:focus {
          outline: 1px solid ${props => props.theme.colors.primaryBlue};
        }
      }
    }
  }
  .email,
  .password {
    padding: 0 10px 10px;
    line-height: 16px;
    letter-spacing: -0.48px;
    font-weight: 700;
  }
  .signin {
    // all: unset;
    width: 434px;
    height: 60px;
    color: #fff;
    text-align: center;
    // background-color: ${props => props.theme.colors.primaryBlue};
    border-radius: 10px;
    margin-bottom: 36px;
    margin-top: 12px;
    cursor: pointer;
    color: black;
  }

  .signup-cta {
    width: 434px;
    height: 16px;
    display: flex;
    justify-content: center;
    margin: 0 10px;
    font-size: 14px;
    .forgot-pwd {
      border-right: 1px solid black;
    }
    span {
      padding-right: 20px;
    }
    a {
      text-decoration: none;
      padding: 0 30px;
      color: black;

      &:visited {
        color: black;
      }
    }
  }
`
