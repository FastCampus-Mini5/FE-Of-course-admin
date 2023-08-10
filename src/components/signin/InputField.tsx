import { styled } from 'styled-components'

export const InputField = ({ inputRef, title, ph, fn, val, type }) => {
  return (
    <>
      <TitleText>{title}</TitleText>
      <Input
        onChange={e => fn(e.target.value)}
        value={val}
        placeholder={ph}
        ref={inputRef}
        type={type}></Input>
    </>
  )
}

export const TitleText = styled.div`
  padding: 10px;
  line-height: 16px;
  letter-spacing: -0.48px;
  font-weight: 700;
`

const Input = styled.input`
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  padding-left: 10px;
  width: 434px;
  height: 60px;
  margin-bottom: 6px;
  &::placeholder {
    font-size: 12px;
    opacity: 0.75;
  }
  &:focus {
    outline: 1px solid ${props => props.theme.colors.primaryBlue};
  }
`
