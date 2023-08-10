import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SelectMonth, SelectYear } from 'components/common/index'
import { StyledBaseSection, StyledBaseTable } from 'styles/index'
import { DutyListApi } from '@/api/api'
import { AlignType } from 'rc-table/lib/interface'
import { styled } from 'styled-components'
import { dutyTexts, commonTexts } from '@/constants/index'

export const DutyList = () => {
  const [dutyLists, setDutyLists] = useState<DutyList[]>([])
  const navigate = useNavigate()
  
  // 당직 리스트 호출
  const DutyList = async () => {
    try {
      const res = await DutyListApi()
      setDutyLists(res.data.response.content)
      setFilteredItems(res.data.response.content)
    } catch (error) {
      console.error('error : ' + error)
    }
  }

  useEffect(() => {
    // 로컬 스토리지에 토큰 값이 없을 경우 알림창으로 알려주고 로그인페이지로 이동
    const token = localStorage.getItem('token')
    if(!token) {
      alert(commonTexts.signinReject)
      navigate('/')
    }
    DutyList()
  }, [])

  // 정렬- 당직일 기준으로 내림차순 정렬
  dutyLists.sort((a, b) => {
    const acc: any = a.dutyDate.split('T')[0].replace(/-/g, '')
    const cur: any = b.dutyDate.split('T')[0].replace(/-/g, '')
    return cur - acc
  })

  // 년도 선택
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  )

  const handleYearChange = (year: number) => {
    setSelectedYear(year)
    console.log(selectedYear)
  }

  // 월 선택
  const [selectedMonth, setSelectedMonth] = useState<string>(
    (new Date().getMonth() + 1).toString().padStart(2, '0')
  )

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month)
  }

  // 필터 - 이름, 월, 년도에 따라 필터
  const [filteredItems, setFilteredItems] = useState(dutyLists)
  const [searchValue, setSearchValue] = useState('')

  const handleInputChange = () => {
    if (searchValue) {
      const filteredSearch = dutyLists.filter(item => {
        const itemSearch = item.username
        return itemSearch === searchValue
      })
      setFilteredItems(filteredSearch)
    } else {
      setFilteredItems(dutyLists)
    }
  }

  const handleSearch = () => {
    if (selectedYear) {
      const filteredItems = dutyLists.filter(item => {
        const itemYearMonth = item.dutyDate.substr(0, 7) // "yyyy-MM" 형식 추출
        const selectedYearMonth = `${selectedYear}-${selectedMonth}` // 선택한 년도와 월 조합
        return itemYearMonth === selectedYearMonth
      })
      setFilteredItems(filteredItems)
    }
  }

  const handleAllSearch = () => {
    setFilteredItems(dutyLists)
  }

  // table 생성
  const tableItemSource = filteredItems.map((item, index) => ({
    key: index + 1,
    username: item.username,
    email: item.email,
    createdDate: item.createdDate.split('T')[0],
    dutyDate: item.dutyDate.split('T')[0]
  }))

  const tableColumns = [
    {
      title: commonTexts.key,
      dataIndex: 'key',
      key: 'key',
      align: 'center' as AlignType,
      width: '100px',
      sorter: (a, b) => a - b
    },
    {
      title: commonTexts.name,
      dataIndex: 'username',
      key: 'username',
      align: 'center' as AlignType
    },
    {
      title: commonTexts.email,
      dataIndex: 'email',
      key: 'email',
      align: 'center' as AlignType
    },
    {
      title: dutyTexts.createdDate,
      dataIndex: 'createdDate',
      key: 'createdDate',
      align: 'center' as AlignType,
      sorter: (a, b) =>
        a.createdDate.split('T')[0].replace(/-/g, '') -
        b.createdDate.split('T')[0].replace(/-/g, '')
    },
    {
      title: dutyTexts.dutyDate,
      dataIndex: 'dutyDate',
      key: 'dutyDate',
      align: 'center' as AlignType,
      sorter: (a, b) =>
        a.dutyDate.split('T')[0].replace(/-/g, '') -
        b.dutyDate.split('T')[0].replace(/-/g, '')
    }
  ]

  return (
    <StyledBaseSection>
      <StyledSpan>{dutyTexts.dutyList}</StyledSpan>
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
          <StyledBtn onClick={handleSearch}>{commonTexts.search}</StyledBtn>
        </StyledSearchButtonContainer>
      </NavContainer>

      <StyledBaseTable
        dataSource={tableItemSource}
        columns={tableColumns}
        pagination={{ pageSize: 8 }}
        showSorterTooltip={false}
      />
    </StyledBaseSection>
  )
}

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`

const StyledSpan = styled.span``
export const StyledSelectContainer = styled.div`
  display: flex;
`

export const StyledAllSearchButton = styled.button`
  margin-left: 50px;
  width: 100px;
  height: 35px;
  color: ${props => props.theme.colors.primaryBlue};
  border: 1px solid ${props => props.theme.colors.primaryBlue};
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  align-items: center;

  &:hover {
    background-color: ${props => props.theme.colors.primaryBlue};
    color: white;

    transition: all 0.2s ease-out;
  }

  &:active {
    background-color: #003366;
  }
`

const StyledSearchButtonContainer = styled.div`
  height: 20px;
`

export const StyledBtn = styled.button`
  height: 35px;
  width: 80px;
  border-radius: 6px;
  background-color: #fff;
  border: 1px solid black;
  cursor: pointer;
`

export const StyledInput = styled.input`
  width: 200px;
  height: 35px;
  border-radius: 6px;
  border: 1px solid black;
  padding-left: 10px;
  margin: 0 20px;
  &:focus {
    outline: none;
  }
`
