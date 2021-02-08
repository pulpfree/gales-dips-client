import React from 'react'

import { act } from 'react-dom/test-utils'
import { fireEvent, within } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

import { GET_STATIONS, StationSelector } from './StationSelector'

describe('StationSelector with data', () => {
  const stationHandlerMock = jest.fn()

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

  it('displays loading', async () => {
    const { container } = renderWithRouter(() => (
      <MockedProvider mocks={stationsDataMock} addTypename={false}>
        <StationSelector stationHandler={stationHandlerMock} />
      </MockedProvider>
    ))
    expect(container.innerHTML).toMatch('Loading...')
  })

  it('renders title', async () => {
    const { getByRole } = renderWithRouter(() => (
      <MockedProvider mocks={stationsDataMock} addTypename={false}>
        <StationSelector stationHandler={stationHandlerMock} />
      </MockedProvider>
    ))

    // fire apollo query
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    fireEvent.mouseDown(getByRole('button'))
    const listbox = within(getByRole('listbox'))
    fireEvent.click(listbox.getByText(/Bridge/i))

    expect(getByRole('button')).toHaveTextContent(/Bridge/i)
  })
})
