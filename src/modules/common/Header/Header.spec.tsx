import React from 'react'
import { fireEvent } from '@testing-library/react'

import { Header } from './Header'

describe('Header', () => {
  it('renders correctly', () => {
    const { container } = renderWithRouter(() => <Header />)
    expect(container.innerHTML).toMatch('Gales Dips')
  })

  it('navigates to /dips on menu', () => {
    const { getByText, history } = renderWithRouter(() => <Header />)
    fireEvent.click(getByText('Dip Entries'))
    expect(history.location.pathname).toEqual('/dips')
  })

  it('navigates to / on menu', () => {
    const { getByText, history } = renderWithRouter(() => <Header />)
    fireEvent.click(getByText('Dashboard'))
    expect(history.location.pathname).toEqual('/')
  })
})
