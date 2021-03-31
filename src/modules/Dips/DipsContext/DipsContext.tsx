import * as React from 'react'

import { DipState, DipType, useDips } from './dips-reducer'

type State = DipState
type Dispatch = DipType

type DipsProviderProps = {
  children: React.ReactNode
}

const DipsStateContext = React.createContext<State | undefined>(undefined)
const DipsDispatchContext = React.createContext<Dispatch | undefined>(undefined)

export const DipsProvider = ({ children }: DipsProviderProps): JSX.Element => {
  const dipsHandler: Dispatch = useDips()

  return (
    <DipsStateContext.Provider value={dipsHandler}>
      <DipsDispatchContext.Provider value={dipsHandler}>{children}</DipsDispatchContext.Provider>
    </DipsStateContext.Provider>
  )
}

export const useDipsState = (): State => {
  const context = React.useContext(DipsStateContext)
  if (context === undefined) {
    throw new Error('useDipsState must be used within a DipsProvider')
  }
  return context
}

export const useDipsDispatch = (): Dispatch => {
  const context = React.useContext(DipsDispatchContext)
  if (context === undefined) {
    throw new Error('useDipsDispatch must be used within a DipsProvider')
  }
  return context
}
