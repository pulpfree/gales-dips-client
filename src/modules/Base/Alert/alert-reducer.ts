/**
 * Alert Reducer
 *
 * Got most of this from link below
 * @see https://kentcdodds.com/blog/how-to-test-custom-react-hooks?ck_subscriber_id=635632627
 */

import React from 'react'

import { nanoid } from 'nanoid'

const CLEAR = 'CLEAR'
const DISMISS = 'DISMISS'
const SEND = 'SEND'

const DefaultTimeout = 4000

export type Color = 'success' | 'info' | 'warning' | 'error'

export type AlertItem = {
  id?: string
  setTimeout?: boolean
  message: string
  severity?: Color
  timeout?: number
  title?: string
}

export type AlertState = AlertItem[]

export type Action =
  | {
      type: 'SEND'
      payload: AlertItem
    }
  | {
      type: 'DISMISS'
      payload: string
    }
  | {
      type: 'CLEAR'
    }

export type AlertT = {
  alerts: AlertItem[]
  clear: () => void
  dismiss: (id: string) => void
  send: (alert: AlertItem) => void
}

const alertReducer = (state: AlertState, action: Action): AlertState => {
  switch (action.type) {
    case SEND: {
      const { id, setTimeout } = action.payload
      if (!id) {
        action.payload.id = nanoid()
      }
      action.payload.setTimeout = typeof setTimeout === 'undefined' ? true : false

      return [...state, action.payload]
    }

    case DISMISS: {
      if (!action.payload) {
        throw new Error('Missing alert id')
      }
      return state.filter((alert) => alert.id !== action.payload)
    }

    case CLEAR:
      return []

    default:
      throw new Error('Unhandled action type')
  }
}

export const initialState = {
  alerts: [],
}

export const useAlert = (): AlertT => {
  const [state, dispatch] = React.useReducer(alertReducer, [])

  const send = React.useCallback((alert: AlertItem) => {
    const timeout = alert.timeout || DefaultTimeout
    dispatch({ type: SEND, payload: alert })
    if (alert.setTimeout) {
      setTimeout(() => dispatch({ type: DISMISS, payload: alert.id! }), timeout) // eslint-disable-line @typescript-eslint/no-non-null-assertion
    }
  }, [])

  const dismiss = React.useCallback((id: string) => dispatch({ type: DISMISS, payload: id }), [])

  const clear = React.useCallback(() => dispatch({ type: CLEAR }), [])

  return { clear, dismiss, send, alerts: [...state] }
}
