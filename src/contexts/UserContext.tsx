import { createContext } from 'react'

type UserState = {
  userLists: User[]
  setUserLists: (value: User[]) => void
}

export const UserContext = createContext<UserState>({} as UserState)
