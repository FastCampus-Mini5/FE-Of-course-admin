import { UserApproveList, UserList } from 'components/user/index'
import { UserContext } from '@/contexts/index'
import { useState } from 'react'
import { userListApi } from '@/api/api'



export const User = () => {
  const [userLists, setUserLists] = useState<User[]>([])

  const userList = async () => {
    try {
      const res = await userListApi()
      if (res) {
        setUserLists(
          res.data.response.content.sort(
            (a: User, b: User) =>
              Number(b.hireDate.split('T')[0].replace(/-/g, '')) -
              Number(a.hireDate.split('T')[0].replace(/-/g, ''))
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
        <UserApproveList userList={userList} />
        <UserList />
      </UserContext.Provider>
    </>
  )
}
