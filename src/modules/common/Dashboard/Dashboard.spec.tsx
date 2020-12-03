import { fireEvent } from '@testing-library/react'

import { Dashboard } from './Dashboard'

describe('Dashboard', () => {
  it('renders correctly', () => {
    const { container } = renderWithRouter(() => <Dashboard />)
    expect(container.innerHTML).toMatch('Select Activity')
  })

  it('navigates to /dips on menu', () => {
    const { getByText, history } = renderWithRouter(() => <Dashboard />)
    fireEvent.click(getByText('Dip Entries'))
    expect(history.location.pathname).toEqual('/dips')
  })

  it('navigates to / on menu', () => {
    const { getByText, history } = renderWithRouter(() => <Dashboard />)
    fireEvent.click(getByText('Propane Entries'))
    expect(history.location.pathname).toEqual('/propane')
  })
})
