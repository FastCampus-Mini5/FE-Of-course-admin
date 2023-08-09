import styled from 'styled-components'
import { Table } from 'antd'

export const StyledBaseSelect = styled.select`
  margin-right: 15px;
  border-radius: 6px;
  border: 1px solid black;
  text-align: center;
  width: 80px;
  background-color: #fff;
  height: 35px;
`
export const StyledMonthSelect = styled(StyledBaseSelect)`
  width: 50px;
`

export const StyledBaseSection = styled.section`
  min-width: 1200px;
  max-width: 1200px;
  font-size: 30px;
  text-align: center;
  margin-top: 40px;
  color: #374984;
  span {
    font-weight: 700;
  }
`

export const StyledBaseTable = styled(Table)`
  margin-left: 50px;
  margin-top: 30px;
`
