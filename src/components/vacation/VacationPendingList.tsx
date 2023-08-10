import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { VacationPendingApi, VacationProceedApi } from '@/api/api'
import { StyledBaseSection } from 'styles/index'
import { commonTexts, vacationTexts } from '@/constants/index'
import { VacationPendingListTable } from '.'

export const VacationPendingList = () => {
  const [vacationPendingLists, setVacationPendingLists] = useState<VacationPendingList[]>([])
  const navigate = useNavigate()

  const vacationPendingList = async () => {
    try {
      const res = await VacationPendingApi()
      setVacationPendingLists(res.data.response.content)
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
    vacationPendingList()
  }, [])



  return (
    <StyledBaseSection>
      <span>{vacationTexts.vacataionPendingList}</span>

      <VacationPendingListTable vacationPendingLists = {vacationPendingLists} vacationPendingList = {vacationPendingList}/> 
    </StyledBaseSection>
  )
}



