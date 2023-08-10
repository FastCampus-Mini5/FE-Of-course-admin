import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { VacationApi } from '@/api/api'
import styled from 'styled-components/'
import { SelectMonth, SelectYear } from 'components/common/index'
import { StyledBaseSection } from 'styles/index'
import {
  StyledAllSearchButton,
  StyledSelectContainer,
  StyledInput,
  StyledBtn,
  NavContainer,
  VacationListTable
} from '@/components'
import { commonTexts, vacationTexts } from '@/constants/index'

export const VacationList = () => {
  const [vacationLists, setVacationLists] = useState<VacationList[]>([])
  const navigate = useNavigate()

  // 연차 리스트 호출
  const vacationList = async () => {
    try {
      const res = await VacationApi()
      setVacationLists(res.data.response.content)
      setFilteredItems(res.data.response.content)
      console.log(res.data.response.content)
    } catch (error) {
      console.error('error :' + error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) {
      alert(commonTexts.signinReject)
      navigate('/')
    }
    vacationList()
  }, [])

  // 정렬- 연차 시작일 기준으로 내림차순 정렬
  vacationLists.sort((a, b) => {
    const acc: any = a.startDate.split('T')[0].replace(/-/g, '')
    const cur: any = b.startDate.split('T')[0].replace(/-/g, '')
    return cur - acc
  })

  // 년도 선택
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  )

  const handleYearChange = (year: number) => {
    setSelectedYear(year)
  }

  // 월 선택
  const [selectedMonth, setSelectedMonth] = useState<string>(
    (new Date().getMonth() + 1).toString().padStart(2, '0')
  )

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month)
  }

  // 필터 - 이름, 년, 월 선택으로 필터
  const [filteredItems, setFilteredItems] = useState<VacationList[]>([])
  const [searchValue, setSearchValue] = useState('')

  const handleInputChange = () => {
    if (searchValue) {
      const filteredSearch = vacationLists.filter(item => {
        const itemSearch = item.username
        return itemSearch === searchValue
      })
      setFilteredItems(filteredSearch)
    } else {
      setFilteredItems(vacationLists)
    }
  }

  const handleSearch = () => {
    if (selectedYear) {
      const filteredItems = vacationLists.filter(item => {
        const itemYearMonth = item.startDate.substr(0, 7) // "yyyy-MM" 형식 추출
        const selectedYearMonth = `${selectedYear}-${selectedMonth}` // 선택한 년도와 월 조합
        return itemYearMonth === selectedYearMonth
      })
      setFilteredItems(filteredItems)
    }
  }

  const handleAllSearch = () => {
    setFilteredItems(vacationLists)
  }



  return (
    <StyledBaseSection>
      <span>{vacationTexts.vacationList}</span>
      <NavContainer>
        <StyledSelectContainer>
          <StyledAllSearchButton onClick={handleAllSearch}>
            {commonTexts.all}
          </StyledAllSearchButton>
          <StyledInput
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder={commonTexts.name}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                handleInputChange() // Enter 키가 눌렸을 때 검색 실행
              }
            }}
          />
          <StyledBtn
            onClick={() => {
              handleInputChange()
            }}>
            {commonTexts.search}
          </StyledBtn>
        </StyledSelectContainer>

        <StyledSearchButtonContainer>
          <SelectYear
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
          />
          <SelectMonth
            selectedMonth={selectedMonth}
            onMonthChange={handleMonthChange}
          />
          <StyledBtn onClick={handleSearch}>
            {commonTexts.search}
          </StyledBtn>
        </StyledSearchButtonContainer>
      </NavContainer>

      <VacationListTable filteredItems = {filteredItems}/>

    </StyledBaseSection>
  )
}

const StyledSearchButtonContainer = styled.div`
  margin-left: auto;
`
