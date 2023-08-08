import { createContext } from 'react'
import { User } from '@/pages'

type UserState = {
  userLists: User[]
  setUserLists: (value: User[]) => void
}

export const UserContext = createContext<UserState>({} as UserState)
