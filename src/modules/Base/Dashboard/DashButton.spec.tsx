import React from 'react'

import { fireEvent } from '@testing-library/react'

import { DashButton } from './DashButton'

describe('DashButton', () => {
  it('renders correctly', () => {
    const { container } = renderWithRouter(() => <DashButton label='testLabel' path='/test' />)
    expect(container.innerHTML).toMatch('testLabel')
  })

  it('navigates to /dips', () => {
    const { getByText, history } = renderWithRouter(() => <DashButton label='Test Link' path='/dips' />)
    fireEvent.click(getByText('Test Link'))
    expect(history.location.pathname).toEqual('/dips')
  })
})
