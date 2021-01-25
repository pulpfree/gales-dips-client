import React from 'react'

type State = Partial<{
  username: string
  name: string
  email: string
  isLoggedIn: boolean
}>
type Dispatch = (user: State) => void

type UserProviderProps = {
  children: React.ReactNode
}

const UserStateContext = React.createContext<State | undefined>(undefined)
const UserDispatchContext = React.createContext<Dispatch | undefined>(undefined)

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const [user, setUser] = React.useState({})

  return (
    <UserStateContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

export const useUserState = (): State => {
  const context = React.useContext(UserStateContext)
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider')
  }
  return context
}

export const useUserDispatch = (): Dispatch => {
  const context = React.useContext(UserDispatchContext)
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider')
  }
  return context
}
