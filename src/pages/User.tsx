import { UserApproveForm } from '@/components/user/UserApproveForm'
import { UserForm } from '@/components/user/UserForm'
import { UserContext } from '@/contexts/index'
import { useState } from 'react'
import { userListApi } from '@/api/api'

export interface User {
  username: string
  email: string
  hireDate: string
  remainVacation: number
}

export const User = () => {
  const [userLists, setUserLists] = useState<User[]>([])

  const userList = async () => {
    try {
      const res = await userListApi()
      if (res) {
        setUserLists(
          res.data.response.content.sort(
            (a: User, b: User) =>
              Number(a.hireDate.split('T')[0].replace(/-/g, '')) -
              Number(b.hireDate.split('T')[0].replace(/-/g, ''))
          )
        )
      }
    } catch (error) {
      console.error('error : ' + error)
    }
  }

  return (
    <>
      <UserContext.Provider value={{ userLists, setUserLists }}>
        <UserApproveForm userList={userList} />
        <UserForm />
      </UserContext.Provider>
    </>
  )
}
