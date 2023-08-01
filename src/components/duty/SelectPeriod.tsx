

function SelectPeriod() {
  const handleChange = (e) => {
    console.log(e.target.value)
  }
  
  return (
    <>
      <select onChange = {handleChange}>
        <option value = '01'>
          1월
        </option>
        <option value = '02'>
          2월
        </option>
        <option value = '03'>
          3월
        </option>
        <option value = '04'>
          4월
        </option>
        <option value = '05'>
          5월
        </option>
        <option value = '06'>
          6월
        </option>
        <option value = '07'>
          7월
        </option>
        <option value = '08'>
          8월
        </option>
        <option value = '09'>
          9월
        </option>
        <option value = '10'>
          10월
        </option>
        <option value = '11'>
          11월
        </option>
        <option value = '12'>
          12월
        </option>
      </select>
    </>
  )
}

export default SelectPeriod