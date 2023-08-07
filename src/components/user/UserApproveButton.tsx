import {ApproveSignUpApi} from '@/api/api'

export const UserApproveButton = ( {email} ) => {

  const handleClick = async () => {
    try {
      await ApproveSignUpApi(email);
      // 여기에서 승인 완료 후의 작업을 수행할 수 있습니다.
    } catch (error) {
      console.error('error : ' + error);
    }
  }

  return (
    <button onClick = {handleClick}>승인</button>
  )
}
