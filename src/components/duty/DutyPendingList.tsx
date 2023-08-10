import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DutyPeindingListsApi } from '@/api/api'
import { StyledBaseSection } from 'styles/index'
import { commonTexts, dutyTexts } from '@/constants/index'
import { DutyPendingListTable } from './DutyPendingListTable'

export const DutyPendingList = () => {
  const [dutyPendingLists, setDutyPendingLists] = useState<DutyPendingList[]>([])
  const navigate = useNavigate()

  // 당직 요청 리스트 호출
  const dutyPendingList = async () => {
    try {
      const res = await DutyPeindingListsApi()
      setDutyPendingLists(res.data.response.content)
    } catch (error) {
      console.error('error : ' + error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) {
      alert(commonTexts.signinReject)
      navigate('/')
    }
    dutyPendingList()
  }, [])


  return (
    <StyledBaseSection>
      <span>{dutyTexts.dutyPendingList}</span>
      < DutyPendingListTable dutyPendingLists = {dutyPendingLists} dutyPendingList = {dutyPendingList}/>
    </StyledBaseSection>
  )
}


