interface SelectYearProps {
  selectedYear : number,
  onYearChange : (year) => void
}

export const SelectYear: React.FC<SelectYearProps> = ({selectedYear, onYearChange}) => {
  const currentYear = new Date().getFullYear()
  const startYear = currentYear - 10
  const endYear = currentYear + 10

  const yearOptions: number[] = []
  for ( let year = startYear; year <= endYear; year++) {
    yearOptions.push(year);
  }

  const handleChange = (event) => {
    const newSelectedYear = parseInt(event.target.value);
    onYearChange(newSelectedYear);
  }
  
  return (
    <>
      <select value = {selectedYear} onChange = {handleChange}>
        {yearOptions.map(year => (
          <option key={year} value = {year}>
            {year}년
          </option>
        ))}
      </select>
    </>
  )
}