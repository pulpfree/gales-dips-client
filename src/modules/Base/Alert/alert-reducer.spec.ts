/**
 * alert-reducer.spec.ts
 * Got inspiration for this from: https://kentcdodds.com/blog/how-to-test-custom-react-hooks
 */

import { renderHook, act } from '@testing-library/react-hooks'
import { nanoid } from 'nanoid'
import { AlertItem, useAlert } from './alert-reducer'

const alert0: AlertItem = {
  id: nanoid(),
  message: 'test alert One',
  severity: 'error',
}
const alert1: AlertItem = {
  id: nanoid(),
  title: 'Serious alert dude',
  message: 'test alert Two',
  severity: 'error',
}
const alert2: AlertItem = {
  message: 'test alert Three',
}

test('allows sending alert', () => {
  const { result } = renderHook(() => useAlert())

  expect(result.current.alerts).toEqual([])

  act(() => {
    result.current.send(alert0)
  })

  expect(result.current.alerts[0]).toEqual(alert0)
  // suppose this is a given if the previous assertion passed, but here for completeness then?
  expect(result.current.alerts[0].message).toEqual(alert0.message)
  expect(result.current.alerts[0].id).toEqual(alert0.id)

  act(() => {
    result.current.send(alert1)
  })

  expect(result.current.alerts.length).toEqual(2)

  act(() => {
    result.current.send(alert2)
  })

  expect(result.current.alerts.length).toEqual(3)

  act(() => {
    result.current.dismiss(alert1.id!) // eslint-disable-line @typescript-eslint/no-non-null-assertion
  })

  expect(result.current.alerts.length).toEqual(2)
  expect(result.current.alerts[0]).toEqual(alert0)
  expect(result.current.alerts[1]).toEqual(alert2)

  act(() => {
    result.current.clear()
  })

  expect(result.current.alerts.length).toEqual(0)
})
