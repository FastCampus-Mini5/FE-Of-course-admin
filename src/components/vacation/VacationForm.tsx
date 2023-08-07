import { useState, useEffect } from 'react'
import { vacationApi } from '@/api/api';
import { AlignType } from 'rc-table/lib/interface';
import  styled from 'styled-components/';
import { SelectMonth, SelectYear } from 'components/common/index'
import { StyledBaseSection, StyledBaseTable } from 'styles/index'
interface Vacation {
  username: string;
  email: string;
  reason: string;
  createdAt: string;
  startDate: string;
  endDate: string
}

export const VacationForm = () => {
  const [vacationLists, setVacationLists] = useState<Vacation[]>([])

  const vacationList = async () =>{
    try{
      const res = await vacationApi()
      setVacationLists(res.data.response)
    } catch(error) {
      console.error('error :' + error)
    }
  }

  useEffect(() => {
    vacationList()
  }, [])

  // 년도 선택 
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const handleYearChange = (year: number) => {
    setSelectedYear(year)
  }



  // 월 선택
  const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth() + 1).toString().padStart(2, '0'))
  
  const handleMonthChange = (month: string) => {
    setSelectedMonth(month)
  }

  // 필터
  const [filteredItems, setFilteredItems] = useState(vacationLists)
  const [searchValue, setSearchValue] = useState('')

  const handleInputChange = () => {
    if( searchValue ) {
      const filteredSearch = vacationLists.filter(item => {
        const itemSearch = item.username
        return itemSearch === searchValue
      })
      setFilteredItems(filteredSearch)
    }
    else {
      setFilteredItems(vacationLists)
    }
  }
  
  const handleSearch = () => {
    if( selectedYear ) {
      const filteredItems = vacationLists.filter(item => {
        const itemYearMonth = item.startDate.substr(0, 7); // "yyyy-MM" 형식 추출
        const selectedYearMonth = `${selectedYear}-${selectedMonth}`; // 선택한 년도와 월 조합
        return itemYearMonth === selectedYearMonth;
      })
      setFilteredItems(filteredItems)
    }
  }
  
  const handleAllSearch = () => {
    setFilteredItems(vacationLists)
  }


  // table
  const tableItemSource = filteredItems.map((item, index) => ({
    key: index+1,
    username: item.username,
    email: item.email,
    reason: item.reason,
    createAt: item.createdAt,
    startDate: item.startDate,
    endDate: item.endDate
  }))

  const tableColumns = [
    {
      title: '번호',
      dataIndex: 'key',
      key: 'key',
      align: 'center' as AlignType
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
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'center' as AlignType
    },
    {
      title: '시작일',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center' as AlignType
    },
    {
      title: '종료일',
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center' as AlignType
    },
  ]


  return (
    <StyledBaseSection>
      <span>연차 리스트</span>
      <StyledSelectContainer>
        <StyledAllSearchButton onClick = {handleAllSearch}>전체</StyledAllSearchButton>
        <StyledInput 
          value = {searchValue}
          onChange = {e => setSearchValue(e.target.value)}
          placeholder='성명' 
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleInputChange(); // Enter 키가 눌렸을 때 검색 실행
            }
          }}/>
          <button onClick = {() => {handleInputChange()}}>검색</button>
        <StyledSearchButtonContainer>
          <SelectYear selectedYear = {selectedYear} onYearChange = {handleYearChange}/>
          <SelectMonth selectedMonth = {selectedMonth} onMonthChange = {handleMonthChange}/>
          <StyledButton onClick = {handleSearch}>검색</StyledButton>
        </StyledSearchButtonContainer>
      </StyledSelectContainer>
      <StyledBaseTable
        dataSource={tableItemSource}
        columns={tableColumns}
      />
    </StyledBaseSection>
  )
}


const StyledSelectContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px; auto;
`

const StyledAllSearchButton = styled.button`
  margin-left: 40px;
  width: 100px;
`

const StyledSearchButtonContainer = styled.div`
  margin-left: auto;
`

const StyledButton = styled.button`
  height: 35px;
  width: 70px;
`

const StyledInput = styled.input`
  width: 200px;
  heigh: 35px;
  margin-left: 20px;
`