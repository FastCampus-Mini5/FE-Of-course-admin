import { useState, useEffect } from 'react'
import { SelectMonth, SelectYear } from "components/common/index"
import { StyledBaseSection, StyledBaseTable } from 'styles/index'
import { DutyListApi } from '@/api/api'
import { AlignType } from 'rc-table/lib/interface';
import { styled } from 'styled-components'


export const DutyList = () => {
  const [dutyLists, setDutyLists] = useState<DutyList[]>([])

  const DutyList = async() => {
    try {
      const res = await DutyListApi()
      setDutyLists(res.data.response.content)
      setFilteredItems(res.data.response.content)
    } catch (error) {
      console.error('error : ' + error)
    }
  }

  useEffect(() => {
    DutyList()
  }, [])
  
  // 정렬
  dutyLists
    .sort((a, b) => {
      const acc: any = a.dutyDate.split('T')[0].replace(/-/g, '') 
      const cur: any = b.dutyDate.split('T')[0].replace(/-/g, '')
      return cur - acc
    })

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
    createdDate: item.createdDate.split('T')[0],
    dutyDate: item.dutyDate.split('T')[0]
  }))

  const tableColumns = [
    {
      title: '번호',
      dataIndex: 'key',
      key: 'key',
      align: 'center' as AlignType,
      width: '100px',
      sorter: (a, b) => a - b
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
      align: 'center' as AlignType,
      sorter: (a, b) => a.createdDate.split('T')[0].replace(/-/g, '') - b.createdDate.split('T')[0].replace(/-/g, '')
    },
    {
      title: '당직일',
      dataIndex: 'dutyDate',
      key: 'dutyDate',
      align: 'center' as AlignType,
      sorter: (a, b) => a.dutyDate.split('T')[0].replace(/-/g, '') - b.dutyDate.split('T')[0].replace(/-/g, '')
    },
  ]

  return (
    <StyledBaseSection>
      <span> 당직 리스트</span>
      <StyledSelectContainer>
        <StyledAllSearchButton onClick = {handleAllSearch} >전체</StyledAllSearchButton>
        <StyledInput 
          value = {searchValue}
          onChange = {e => setSearchValue(e.target.value)}
          placeholder='성명' 
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleInputChange(); // Enter 키가 눌렸을 때 검색 실행
            }
          }}/>
          <StyledButton onClick = {() => {handleInputChange()}}>검색</StyledButton>
        <StyledSearchButtonContainer>
          <SelectYear selectedYear = {selectedYear} onYearChange = {handleYearChange}/>
          <SelectMonth selectedMonth = {selectedMonth} onMonthChange = {handleMonthChange}/>
          <StyledButton onClick = {handleSearch}>검색</StyledButton>
        </StyledSearchButtonContainer>
      </StyledSelectContainer>
      <StyledBaseTable
        dataSource={tableItemSource}
        columns={tableColumns}
        pagination={{pageSize: 8}}
        showSorterTooltip={false}
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
  height: 35px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  align-items: center;

  /* 마우스 호버 시 스타일 변경 */
  &:hover {
    background-color: #0056b3;
  }

  /* 클릭 시 스타일 변경 */
  &:active {
    background-color: #003366;
  }
`

const StyledSearchButtonContainer = styled.div`
  margin-left: auto;
`

const StyledButton = styled.button`
  height: 35px;
  width: 70px;
  border-radius: 8px;
  cursor: pointer;

  /* 아이콘 스타일 */
  .icon {
    margin-right: 8px;
  }

  /* 마우스 호버 시 스타일 변경 */
  &:hover {
    background-color: #007bff;
    color: white;
    border-color: white;
  }

  /* 클릭 시 스타일 변경 */
  &:active {
    background-color: #0056b3;
  }
`

const StyledInput = styled.input`
  width: 200px;
  height: 35px;
  margin-left: 20px;
`