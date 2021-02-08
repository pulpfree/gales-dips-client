import React from 'react'

import { MockedProvider } from '@apollo/client/testing'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import { Dips } from './Dips'
import { AlertProvider } from '../Base/Alert'

describe('Dips with data', () => {
  it('displays heading', () => {
    const { container } = renderWithRouter(() => (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <AlertProvider>
          <MockedProvider>
            <Dips />
          </MockedProvider>
        </AlertProvider>
      </MuiPickersUtilsProvider>
    ))
    expect(container.innerHTML).toMatch('Dip Entries')
  })
})
