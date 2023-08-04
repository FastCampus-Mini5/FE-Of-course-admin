import { useState, useEffect } from 'react'
import { Table } from 'antd'
import { SelectMonth, SelectYear } from "components/common/index"
import { DutyListApi } from '@/api/api'
import { AlignType } from 'rc-table/lib/interface';
import { styled } from 'styled-components'

interface DutyList {
  username: string
  email: string
  createdDate: string
  dutyDate: string
}

export const DutyForm = () => {
  const [dutyLists, setDutyLists] = useState<DutyList[]>([])

  const DutyList = async() => {
    try {
      const res = await DutyListApi()
      setDutyLists(res.data.response)
    } catch (error) {
      console.error('error : ' + error)
    }
  }

  useEffect(() => {
    DutyList()
  }, [])

  // 년도 선택 
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const handleYearChange = (year: number) => {
    setSelectedYear(year)
    console.log(selectedYear)
  }



  // 월 선택
  const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth() + 1).toString().padStart(2, '0'))
  
  const handleMonthChange = (month: string) => {
    setSelectedMonth(month)
  }

  // 필터
  const [filteredItems, setFilteredItems] = useState(dutyLists)
  const [searchValue, setSearchValue] = useState('')

  const handleInputChange = () => {
    

    if( searchValue ) {
      const filteredSearch = dutyLists.filter(item => {
        const itemSearch = item.username
        return itemSearch === searchValue
      })
      setFilteredItems(filteredSearch)
    }
    else {
      setFilteredItems(dutyLists)
    }
  }
  
  const handleSearch = () => {
    if( selectedYear ) {
      const filteredItems = dutyLists.filter(item => {
      const itemYearMonth = item.dutyDate.substr(0, 7); // "yyyy-MM" 형식 추출
      const selectedYearMonth = `${selectedYear}-${selectedMonth}`; // 선택한 년도와 월 조합
      return itemYearMonth === selectedYearMonth;
      })
      setFilteredItems(filteredItems)
    }
  }
  
  const handleAllSearch = () => {
    setFilteredItems(dutyLists)
  }



  // table
  const tableItemSource = filteredItems.map((item, index) => ({
    key: index+1,
    username: item.username,
    email: item.email,
    createdDate: item.createdDate,
    dutyDate: item.dutyDate
  }))

  const tableColumns = [
    {
      title: '번호',
      dataIndex: 'key',
      key: 'key',
      align: 'center' as AlignType,
      width: '100px'
    },
    {
      title: '성명',
      dataIndex: 'username',
      key: 'username',
      align: 'center' as AlignType
    },
    {
      title: '아이디',
      dataIndex: 'email',
      key: 'email',
      align: 'center' as AlignType
    },
    {
      title: '신청일',
      dataIndex: 'createdDate',
      key: 'createdDate',
      align: 'center' as AlignType
    },
    {
      title: '당직일',
      dataIndex: 'dutyDate',
      key: 'dutyDate',
      align: 'center' as AlignType
    },
  ]

  return (
    <StyledUserSection>
      <span> 당직 리스트</span>
      <StyledSelectContainer>
        <StyledAllSearchButton onClick = {handleAllSearch}>전체</StyledAllSearchButton>
        <input 
          value = {searchValue}
          onChange = {e => setSearchValue(e.target.value)}
          placeholder='성명' 
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleInputChange(); // Enter 키가 눌렸을 때 검색 실행
            }
          }}/>
        <StyledSearchButtonContainer>
          <SelectYear selectedYear = {selectedYear} onYearChange = {handleYearChange}/>
          <SelectMonth selectedMonth = {selectedMonth} onMonthChange = {handleMonthChange}/>
          <button onClick = {handleSearch}>검색</button>
        </StyledSearchButtonContainer>
      </StyledSelectContainer>
      <Table
        dataSource={tableItemSource}
        columns={tableColumns}
      />
    </StyledUserSection>
  )
}

const StyledUserSection = styled.section`
  text-align: center;
  font-size: 30px;
`

const StyledSelectContainer = styled.div`
  display: flex;
  margin: 30px; auto;

`

const StyledAllSearchButton = styled.button`

`

const StyledSearchButtonContainer = styled.div`
  margin-left: auto
`
