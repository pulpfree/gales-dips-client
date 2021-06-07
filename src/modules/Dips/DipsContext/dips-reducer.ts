import React from 'react'

import { subDays, format, parse } from 'date-fns'
import { useLazyQuery } from '@apollo/client'

import { DIP_QUERY, STATION_INFO } from '../queries'
import { IDipFormData, IFieldValues, IOvershort, ITankData, TTanksMap, TankLevelsT } from '../types'
import { getTanksData, populateTanks, setLevels } from '../utils'

const SET_CURRENT_QKEY = 'SET_CURRENT_QKEY'
const SET_DATE = 'SET_DATE'
const SET_DIPS_TANK_DATA = 'SET_DIPS_TANK_DATA'
const SET_ERROR = 'SET_ERROR'
const SET_FUELSALE_DATE = 'SET_FUELSALE_DATE'
const SET_HAVE_CURRENT_DIPS = 'SET_HAVE_CURRENT_DIPS'
const SET_LOADING = 'SET_LOADING'
const SET_STATIONID = 'SET_STATIONID'
const SET_TANK_DATA = 'SET_TANK_DATA'
const SET_TANK_LEVELS = 'SET_TANK_LEVELS'

type DateType = Date | null

export type DipState = {
  currentQKey: string
  date: DateType
  dipsData?: IDipFormData
  error: string
  fuelSaleDate?: Date
  haveCurrentDips: boolean
  loading: boolean
  stationID: string
  tanksData: TTanksMap
  tankLevels: TankLevelsT
}

type Action =
  | {
      type: 'SET_CURRENT_QKEY'
      payload: string
    }
  | {
      type: 'SET_DATE'
      payload: DateType
    }
  | {
      type: 'SET_DIPS_TANK_DATA'
      payload: IDipFormData
    }
  | {
      type: 'SET_ERROR'
      payload: string
    }
  | {
      type: 'SET_FIELD'
      payload: {
        field: string
        value: IFieldValues
      }
    }
  | {
      type: 'SET_FUELSALE_DATE'
      payload: Date
    }
  | {
      type: 'SET_HAVE_CURRENT_DIPS'
      payload: boolean
    }
  | {
      type: 'SET_LOADING'
      payload: boolean
    }
  | {
      type: 'SET_STATIONID'
      payload: string
    }
  | {
      type: 'SET_TANK_DATA'
      payload: TTanksMap
    }
  | {
      type: 'SET_TANK_LEVELS'
      payload: TankLevelsT
    }

export interface DipType extends DipState {
  setDate: (date: DateType) => void
  setTankDataField: (stationID: string, field: string, value: number) => void
  setStationID: (stationID: string) => void
}

const dipsReducer = (state: DipState, action: Action): DipState => {
  switch (action.type) {
    case SET_CURRENT_QKEY: {
      return { ...state, currentQKey: action.payload }
    }
    case SET_DATE: {
      return { ...state, date: action.payload }
    }
    case SET_DIPS_TANK_DATA: {
      return { ...state, dipsData: action.payload }
    }
    case SET_ERROR: {
      return { ...state, error: action.payload }
    }
    case SET_FUELSALE_DATE: {
      return { ...state, fuelSaleDate: action.payload }
    }
    case SET_HAVE_CURRENT_DIPS: {
      return { ...state, haveCurrentDips: action.payload }
    }
    case SET_LOADING: {
      return { ...state, loading: action.payload }
    }
    case SET_STATIONID: {
      return { ...state, stationID: action.payload }
    }
    case SET_TANK_DATA: {
      return { ...state, tanksData: action.payload }
    }
    case SET_TANK_LEVELS: {
      return { ...state, tankLevels: action.payload }
    }
    default:
      throw new Error('Unhandled action type')
  }
}

const initialState = {
  currentQKey: '',
  date: new Date(),
  error: '',
  haveCurrentDips: false,
  loading: false,
  stationID: '',
  tanksData: new Map(),
  tankLevels: {},
}

export const useDips = (): DipType => {
  const [state, dispatch] = React.useReducer(dipsReducer, initialState)
  const { currentQKey, date, fuelSaleDate, haveCurrentDips, stationID } = state

  const [getTanks, { error: tanksError, loading: tanksLoading, data: stationData }] = useLazyQuery(STATION_INFO)
  const [getDips, { error: dipsError, loading: dipsLoading, data: dipsData }] = useLazyQuery(DIP_QUERY)

  const setDate = React.useCallback((date: DateType) => dispatch({ type: SET_DATE, payload: date }), [])

  const setStationID = React.useCallback(
    (stationID: string) => {
      dispatch({ type: SET_STATIONID, payload: stationID })
      getTanks({ variables: { stationID } })
    },
    [getTanks],
  )

  const setTankDataField = React.useCallback(
    (stationID, field, value) => {
      const td = state.tanksData.get(stationID)
      const newTd = { ...td, [field]: value } as ITankData
      state.tanksData.set(stationID, newTd)
      dispatch({ type: SET_TANK_DATA, payload: state.tanksData })
    },
    [state.tanksData],
  )

  /**
   * Set tanksLoading flag
   */
  React.useEffect(() => {
    dispatch({ type: SET_LOADING, payload: tanksLoading })
  }, [tanksLoading])

  /**
   * Set dipsLoading flag
   */
  React.useEffect(() => {
    dispatch({ type: SET_LOADING, payload: dipsLoading })
  }, [dipsLoading])

  /**
   * Call to getTanks if we have fuelSaleLatest date and stationID
   */
  React.useEffect(() => {
    const fsDate = stationData?.fuelSaleLatest.date
    if (fsDate) {
      const date = parse(fsDate.toString(), 'yyyyMMdd', new Date())
      dispatch({ type: SET_FUELSALE_DATE, payload: date })
    }
    if (stationID) {
      getTanks({ variables: { stationID } })
    }
  }, [stationID, stationData, getTanks])

  /**
   * Set haveCurrentDips boolean value based on date and fuelSaleDate (from query return)
   */
  React.useEffect(() => {
    if (date && fuelSaleDate) {
      const fsDte = format(fuelSaleDate, 'yyyyLLdd')
      const curDte = format(date, 'yyyyLLdd')
      dispatch({ type: SET_HAVE_CURRENT_DIPS, payload: curDte <= fsDte })
    }
  }, [date, fuelSaleDate])

  /**
   * Set error if we encounter a dips or tank query error
   */
  React.useEffect(() => {
    if (dipsError || tanksError) {
      const errMsg = 'An error has occurred with the dips data. Please report this to the administrator'
      dispatch({ type: SET_ERROR, payload: errMsg })
    }
  }, [dipsError, tanksError])

  /**
   * Having trouble with this hook as it would repeat itself when invoked
   * My fix, (an odd work-around granted) was to compare the last date and stationID
   * to the requested one, then query if they were different
   */
  React.useEffect(() => {
    const dte = date as Date
    const dteStr = format(new Date(dte), 'yyyyMMdd')
    const dteNo = Number(dteStr)
    const stateQKey = `${dteStr}/${stationID}`

    if (haveCurrentDips && stateQKey !== currentQKey) {
      dispatch({ type: SET_CURRENT_QKEY, payload: `${dteStr}/${stationID}` })
      getDips({
        variables: {
          date: dteNo,
          dateFrom: Number(format(subDays(dte, 1), 'yyyyMMdd')),
          dateTo: dteNo,
          stationID,
        },
      })
    }
  }, [currentQKey, date, stationID, haveCurrentDips, getDips])

  /**
   * TODO: clean up dipTankData here
   */
  React.useEffect(() => {
    return () => {
      console.log('ok, leaving Dips clean up')
    }
  }, [])

  /**
   * Populate dipsData, dipLevels and tankLevels when station or date changes
   */
  React.useEffect(() => {
    if (dipsData) {
      const findDate = Number(format(date as Date, 'yyyyMMdd'))
      const overshort = dipsData.dipOverShortRange.find((ele: IOvershort) => ele.date === findDate)
      if (dipsData && stationData?.stationTanks && overshort) {
        const tankLevels = setLevels(stationData.stationTanks)
        dispatch({ type: SET_TANK_LEVELS, payload: tankLevels })

        const { fuelPrice } = dipsData
        dispatch({ type: SET_TANK_DATA, payload: getTanksData(dipsData, stationData.stationTanks) })

        const dipTankData: IDipFormData = {
          tankData: populateTanks(dipsData, stationData.stationTanks),
          osData: {
            overshort,
            fuelPrice,
          },
        }
        dispatch({ type: SET_DIPS_TANK_DATA, payload: dipTankData })
      }
    }
  }, [date, dipsData, stationData])

  // console.log('state: ', state)
  return { setDate, setTankDataField, setStationID, ...state }
}
