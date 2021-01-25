import React from 'react'
import { render } from '@testing-library/react'
import { UserProvider, useUserDispatch, useUserState } from './'

describe('UserProvider', () => {
  it('displays users name', () => {
    const userVals = {
      username: 'testuser',
      name: 'Test Dummy',
      email: 'test@dummy.com',
      isLoggedIn: true,
    }
    const userStr = `user: ${userVals.username}, with name ${userVals.name}, and email: ${userVals.email}`
    const MockProvider = () => {
      const dispatch = useUserDispatch()

      React.useEffect(() => {
        dispatch(userVals)
      }, [])

      return <div>mom</div>
    }
    const MockConsumer = () => {
      const user = useUserState()
      return (
        <div>
          user: {user.username}, with name {user.name}, and email: {user.email}
        </div>
      )
    }

    const { container } = render(
      <UserProvider>
        <MockProvider />
        <MockConsumer />
      </UserProvider>,
    )

    expect(container.innerHTML).toMatch(userStr)
  })
})
