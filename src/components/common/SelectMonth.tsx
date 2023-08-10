import { StyledBaseSelect, StyledMonthSelect } from 'styles/index'

interface SelectMonthProps {
  selectedMonth: string
  onMonthChange: (month: string) => void
}
// 월 배열 생성
const monthOptions: string[] = []
for (let i = 1; i <= 12; i++) {
  monthOptions.push(`${i}`)
}

export const SelectMonth: React.FC<SelectMonthProps> = ({
  selectedMonth,
  onMonthChange
}) => {

  // 월 선택시 값 생성
  const handleChange = event => {
    const newSelectedMonth = event.target.value
    onMonthChange(newSelectedMonth)
  }

  return (
    <>
      <StyledMonthSelect
        value={selectedMonth}
        onChange={handleChange}>
        {monthOptions.map(month => (
          <option
            key={month}
            value={'0' + month}>
            {month}월
          </option>
        ))}
      </StyledMonthSelect>
    </>
  )
}
