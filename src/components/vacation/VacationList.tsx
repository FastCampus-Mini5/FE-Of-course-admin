import { useState, useEffect } from 'react'
import { Table } from 'antd'
import { VacationApi } from '@/api/api'
import { AlignType } from 'rc-table/lib/interface'
import styled from 'styled-components/'
import { SelectMonth, SelectYear } from 'components/common/index'
import { StyledBaseSection } from 'styles/index'
import {
  StyledAllSearchButton,
  StyledSelectContainer,
  StyledInput,
  StyledBtn,
  NavContainer
} from '@/components'

export const VacationList = () => {
  const [vacationLists, setVacationLists] = useState<VacationList[]>([])

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
    vacationList()
  }, [])

  // 정렬
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

  // 필터
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

  // table
  const tableItemSource = filteredItems.map((item, index) => ({
    key: index + 1,
    username: item.username,
    email: item.email,
    reason: item.reason,
    createdAt: item.createdAt.split('T')[0],
    setVacationLists,
    startDate: item.startDate.split('T')[0],
    endDate: item.endDate.split('T')[0]
  }))

  const tableColumns = [
    {
      title: '번호',
      dataIndex: 'key',
      key: 'key',
      align: 'center' as AlignType,
      sorter: (a, b) => a - b
    },
    {
      title: '성명',
      dataIndex: 'username',
      key: 'username',
      align: 'center' as AlignType,
      width: '100'
    },
    {
      title: '아이디',
      dataIndex: 'email',
      key: 'email',
      align: 'center' as AlignType
    },
    {
      title: '사유',
      dataIndex: 'reason',
      key: 'reason',
      align: 'center' as AlignType
    },
    {
      title: '신청일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center' as AlignType,
      sorter: (a, b) =>
        a.createdAt.split('T')[0].replace(/-/g, '') -
        b.createdAt.split('T')[0].replace(/-/g, '')
    },
    {
      title: '시작일',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center' as AlignType,
      sorter: (a, b) =>
        a.startDate.split('T')[0].replace(/-/g, '') -
        b.startDate.split('T')[0].replace(/-/g, '')
    },
    {
      title: '종료일',
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center' as AlignType,
      sorter: (a, b) =>
        a.endDate.split('T')[0].replace(/-/g, '') -
        b.endDate.split('T')[0].replace(/-/g, '')
    }
  ]

  return (
    <StyledBaseSection>
      <span>연차 리스트</span>
      <NavContainer>
        <StyledSelectContainer>
          <StyledAllSearchButton onClick={handleAllSearch}>
            전체
          </StyledAllSearchButton>
          <StyledInput
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="성명"
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
            검색
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
          <StyledBtn onClick={handleSearch}>검색</StyledBtn>
        </StyledSearchButtonContainer>
      </NavContainer>

      <StyledTable
        dataSource={tableItemSource}
        columns={tableColumns}
        pagination={{ pageSize: 8 }}
        showSorterTooltip={false}
      />
    </StyledBaseSection>
  )
}

const StyledSearchButtonContainer = styled.div`
  margin-left: auto;
`
const StyledTable = styled(Table)`
  margin-left: 50px;
  margin-top: 30px;
`
