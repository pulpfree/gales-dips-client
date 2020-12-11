import React from 'react'
import { render } from '@testing-library/react'
// import { renderHook } from '@testing-library/react-hooks'

import { UserContext, UserProvider, UserT } from './UserContext'

/* type UserContextValue = {
  user: UserT
  setUser: (user: UserT) => void
}
type UserProviderProps = {
  value?: UserContextValue
  children: React.ReactNode
} */

/**
 * TODO: complete tests
 * am not yet understanding how this works, ARGHH!!!!!!
 * Check following links for some insight
 * see: https://testing-library.com/docs/example-react-context/
 * see: https://www.polvara.me/posts/mocking-context-with-react-testing-library/
 */
describe('UserProvider', () => {
  it('displays users name', () => {
    const mockChildrenFunction = jest.fn(() => null)
    // const setUser = () => null
    const userVals = {
      username: 'testuser',
      name: 'Test Dummy',
      email: 'test@dummy.com',
      isLoggedIn: true,
    }
    // const mockSetUser = (user: UserT) => void
    // const { handleSetUser } = useUser()
    const value = {
      user: userVals,
      setUser: (user: UserT) => null
    }
    // const { handleSetUser } = useUser()
    // handleSetUser(userVals)

    render(
      <UserProvider value={value}>
        <UserContext.Consumer>{mockChildrenFunction}</UserContext.Consumer>
      </UserProvider>
    )

    // console.log('keys: ', Object.keys(all.container.innerHTML))

    // console.log('mockChildrenFunction: ', mockChildrenFunction())
    expect(mockChildrenFunction).toHaveBeenCalled()
    // expect(mockChildrenFunction).toHaveBeenCalledWith(userHookReturnVal)
  })

  /* function Provider() {
    const { handleSetUser } = useUser()
    
    React.useEffect(() => {
      const userVals = {
        username: 'testuser',
        name: 'Test Dummy',
        email: 'test@dummy.com',
        isLoggedIn: true,
      }
        handleSetUser(userVals)
    }, [handleSetUser])
    return (
      <div>ok</div>
    )
  } */
})

/* describe('useUser', () => {
  it('stores user name', () => {
    const userData: UserT = {
      username: 'testuser',
      name: 'Test Dummy',
      email: 'test@dummy.com',
      isLoggedIn: true,
    }

    const { result } = renderHook(useUser)
    // result.current.handleSetUser(userData)
    // console.log('result.current.user: ', result.current)
    // expect(result.current.user).toEqual(userData)
  })
}) */