import React from 'react'

import { act } from 'react-dom/test-utils'
import { fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

import { GET_STATIONS, Dashboard } from './Dashboard'

describe('Dashboard with data', () => {
  const errorMsg = 'An error occurred'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stationsDataMock: any = [
    {
      request: {
        query: GET_STATIONS,
      },
      result: {
        data: {
          stations: [
            {
              id: '64493efb-faeb-4a80-9051-6a025ecb6347',
              name: 'Bridge',
            },
            {
              id: 'd03224a7-f1df-4863-bcaa-5c6e61af11fc',
              name: 'Chippawa',
            },
          ],
        },
      },
    },
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stationsErrorMock: any = [
    {
      request: {
        query: GET_STATIONS,
      },
      result: {
        errors: [new Error(errorMsg)],
      },
    },
  ]

  it('displays loading', async () => {
    const { container } = renderWithRouter(() => (
      <MockedProvider mocks={stationsDataMock} addTypename={false}>
        <Dashboard />
      </MockedProvider>
    ))
    expect(container.innerHTML).toMatch('Please stand by')
  })

  it('renders title', () => {
    const { container } = renderWithRouter(() => (
      <MockedProvider mocks={stationsDataMock} addTypename={false}>
        <Dashboard />
      </MockedProvider>
    ))
    expect(container.innerHTML).toMatch('Select Activity')
  })

  it('navigates to menu buttons', async () => {
    const { getByText, history } = renderWithRouter(() => (
      <MockedProvider mocks={stationsDataMock} addTypename={false}>
        <Dashboard />
      </MockedProvider>
    ))

    // fire apollo query, this is required to display the menu
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    fireEvent.click(getByText('Dip Entries'))
    expect(history.location.pathname).toEqual('/dips')

    fireEvent.click(getByText('Propane Entries'))
    expect(history.location.pathname).toEqual('/propane')
  })

  it('displays error', async () => {
    const { container } = renderWithRouter(() => (
      <MockedProvider mocks={stationsErrorMock} addTypename={false}>
        <Dashboard />
      </MockedProvider>
    ))

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(container.innerHTML).toMatch(errorMsg)
  })
})
