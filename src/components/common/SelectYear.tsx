import { StyledBaseSelect } from "styles/index"

interface SelectYearProps {
  selectedYear : number,
  onYearChange : (year) => void
}

// 현재 년 기준으로 +-10년 배열 생성
const currentYear = new Date().getFullYear()
const startYear = currentYear - 10
const endYear = currentYear + 10

const yearOptions: number[] = []
for ( let year = startYear; year <= endYear; year++) {
  yearOptions.push(year);
}

export const SelectYear: React.FC<SelectYearProps> = ({selectedYear, onYearChange}) => {

  const handleChange = (event) => {
    const newSelectedYear = parseInt(event.target.value);
    onYearChange(newSelectedYear);
  }
  
  return (
    <>
      <StyledBaseSelect value = {selectedYear} onChange = {handleChange}>
        {yearOptions.map(year => (
          <option key={year} value = {year}>
            {year}년
          </option>
        ))}
      </StyledBaseSelect>
    </>
  )
}