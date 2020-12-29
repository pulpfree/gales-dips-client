/**
 * Testing example @see: https://codesandbox.io/s/modern-sea-tx3ro?from-embed=&file=/src/components/Greeting.test.tsx
 */
import React from 'react'

import { AlertItem, useAlert } from './alert-reducer'

type State = AlertItem[]
type Dispatch = {
  alerts: AlertItem[]
  clear: () => void
  dismiss: (id: string) => void
  send: (error: AlertItem) => void
}

type AlertProviderProps = {
  children: React.ReactNode
}

const AlertStateContext = React.createContext<State | undefined>(undefined)
const AlertDispatchContext = React.createContext<Dispatch | undefined>(undefined)

export const AlertProvider = ({ children }: AlertProviderProps): JSX.Element => {
  const userHandler: Dispatch = useAlert()

  return (
    <AlertStateContext.Provider value={userHandler.alerts}>
      <AlertDispatchContext.Provider value={userHandler}>{children}</AlertDispatchContext.Provider>
    </AlertStateContext.Provider>
  )
}

export const useAlertState = (): State => {
  const context = React.useContext(AlertStateContext)
  if (context === undefined) {
    throw new Error('useAlertState must be used within a CountProvider')
  }
  return context
}

export const useAlertDispatch = (): Dispatch => {
  const context = React.useContext(AlertDispatchContext)
  if (context === undefined) {
    throw new Error('useAlertDispatch must be used within a CountProvider')
  }
  return context
}
