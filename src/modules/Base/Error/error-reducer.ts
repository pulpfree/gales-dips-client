/**
 * Error Reducer
 *
 * Got most of this from link below
 * @see https://kentcdodds.com/blog/how-to-test-custom-react-hooks?ck_subscriber_id=635632627
 */

import React from 'react'

const CLEAR = 'CLEAR'
const DISMISS = 'DISMISS'
const SEND = 'SEND'

export type ErrorItem = {
  id: string
  message: string
  title?: string
}

export type ErrorState = ErrorItem[]

export type Action =
  | {
      type: 'SEND'
      payload: ErrorItem
    }
  | {
      type: 'DISMISS'
      payload: string
    }
  | {
      type: 'CLEAR'
    }

function errorReducer(state: ErrorState, action: Action): ErrorState {
  switch (action.type) {
    case SEND:
      return [...state, action.payload]

    case DISMISS:
      return state.filter((error) => error.id !== action.payload)

    case CLEAR:
      return []

    default:
      throw new Error('Unhandled action type')
  }
}

export const initialState = {
  errors: [],
}

export const useError = (initialState: ErrorState) => {
  const [state, dispatch] = React.useReducer(errorReducer, initialState)

  const send = React.useCallback(
    (error: ErrorItem) => dispatch({ type: SEND, payload: error }),
    []
  )
  const dismiss = React.useCallback(
    (error: ErrorItem) => dispatch({ type: DISMISS, payload: error.id }),
    []
  )
  const clear = React.useCallback(() => dispatch({ type: CLEAR }), [])

  return { clear, dismiss, send, errors: [...state] }
}
