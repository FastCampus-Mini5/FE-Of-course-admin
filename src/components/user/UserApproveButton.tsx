export const UserApproveButton = ( {email} ) => {

  function handleClick() {
    console.log(email)
  }

  return (
    <button onClick = {() => handleClick()}>승인</button>
  )
}
