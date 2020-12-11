import React from 'react'

import { ErrorItem, useError } from './error-reducer'

type State = ErrorItem[]
type Dispatch = {
  clear: () => void
  dismiss: (error: ErrorItem) => void
  send: (error: ErrorItem) => void
  errors: ErrorItem[]
}

type ErrorProviderProps = {
  children: React.ReactNode
}

const ErrorStateContext = React.createContext<State | undefined>(undefined)
const ErrorDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
)

export const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const userHandler: Dispatch = useError([])

  return (
    <ErrorStateContext.Provider value={userHandler.errors}>
      <ErrorDispatchContext.Provider value={userHandler}>
        {children}
      </ErrorDispatchContext.Provider>
    </ErrorStateContext.Provider>
  )
}
