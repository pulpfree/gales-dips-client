import React from 'react'

export type UserT = Partial<{
  username: string,
  name: string,
  email: string,
  isLoggedIn: boolean,
}>

type UserContextValue = {
  user: UserT
  setUser: (user: UserT) => void
}
export const UserContext = React.createContext({} as UserContextValue)

type UserProviderProps = {
  value?: UserContextValue
  children: React.ReactNode
}

function UserProvider(props: UserProviderProps) {
  const[user, setUser] = React.useState({})
  const value = React.useMemo(() => {
    return {
      user,
      setUser,
    }
  }, [user])
  return <UserContext.Provider value={value} {...props} />
}

function useUser() {
  const context = React.useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  const { user, setUser } = context
  const handleSetUser = React.useCallback((user) => setUser(user), [setUser])
  return {
    user,
    handleSetUser
  }
}

export { UserProvider, useUser }