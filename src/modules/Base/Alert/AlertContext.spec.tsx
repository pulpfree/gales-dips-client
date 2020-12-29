import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { Alerts, AlertProvider, Color, useAlertDispatch } from './'

type AlertProp = {
  btnMsg: string
  classNm: string
  msg: string
  severity: Color
}

const alertProps: AlertProp[] = [
  {
    btnMsg: 'Open error',
    classNm: 'MuiAlert-filledError',
    msg: 'my stupid test',
    severity: 'error',
  },
  {
    btnMsg: 'Open warning',
    classNm: 'MuiAlert-filledWarning',
    msg: 'my stupid test',
    severity: 'warning',
  },
  {
    btnMsg: 'Open info',
    classNm: 'MuiAlert-filledInfo',
    msg: 'my stupid test',
    severity: 'info',
  },
  {
    btnMsg: 'Open success',
    classNm: 'MuiAlert-filledSuccess',
    msg: 'my stupid test',
    severity: 'success',
  },
]
const MockAlertButton = (alert: AlertProp) => {
  const dispatch = useAlertDispatch()

  return <button onClick={() => dispatch.send({ message: alert.msg, severity: alert.severity })}>{alert.btnMsg}</button>
}

describe('AlertProvider', () => {
  describe('creates accurate alerts', () => {
    alertProps.forEach((ap) => {
      it(`creates ${ap.severity} alert`, () => {
        const { container, getByText, getByRole } = render(
          <AlertProvider>
            <Alerts />
            <MockAlertButton btnMsg={ap.btnMsg} classNm={ap.classNm} msg={ap.msg} severity={ap.severity} />
          </AlertProvider>,
        )
        act(() => {
          fireEvent.click(getByText(ap.btnMsg))
        })

        expect(container.innerHTML).toMatch(ap.msg)
        expect(getByRole('alert')).toHaveClass(ap.classNm)
      })
    })
  })
})
