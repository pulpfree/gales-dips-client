import React from 'react'

import { Icon, IconButton, FormControl } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { addDays, subDays, format, toDate } from 'date-fns'
import { useLazyQuery } from '@apollo/client'
import { useHistory, useParams } from 'react-router-dom'

import { ContentContainer } from '../Base/ContentContainer'
import { FUEL_SALE_LATEST, STATION_TANK_QUERY } from './queries'
import { Loader } from '../Base/Loader'
import { PageTitle } from '../Base/PageTitle'
import { StationSelector } from '../Base/StationSelector'
import { STD_DATE_FORMAT } from '../../config'

import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navButton: {
      // backgroundColor: theme.palette.secondary.light,
      // maxWidth: 60,
      // marginLeft: theme.spacing(1),
      // marginRight: theme.spacing(1),
    },
    navIcon: {
      // margin: -4,
      // paddingLeft: 4,
      // paddingRight: -60,
    },
    navControl: {
      flexDirection: 'row',
      marginTop: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
)

export function Dips(): JSX.Element {
  const classes = useStyles()
  const history = useHistory()
  // const params = useParams()
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date())
  const [nextDisabled, setNextDisabled] = React.useState<boolean>(true)
  const [stationID, setStationID] = React.useState<string>('')

  const [getTanks, { loading: tanksLoading, data: tanksData }] = useLazyQuery(STATION_TANK_QUERY)
  const [getFuelSale, { loading: fuelSaleLoading, data: fuelSaleData }] = useLazyQuery(FUEL_SALE_LATEST)

  // console.log('fuelSaleData: ', fuelSaleData)
  // console.log('fuelSaleLoading: ', fuelSaleLoading)
  // console.log('tanksData: ', tanksData)
  // console.log('tanksLoading: ', tanksLoading)

  const handleNextPrevDate = (val: string) => {
    const dte = selectedDate as Date
    if (val === 'p') {
      setSelectedDate(subDays(dte, 1))
    } else if (val === 'n') {
      setSelectedDate(addDays(dte, 1))
    }
  }

  const { date, stationID: stnID } = useParams<{ date: string; stationID: string }>()
  React.useEffect(() => {
    if (!stationID) {
      setStationID(stnID)
    }
    console.log('selectedDate: ', selectedDate)
    if (date) {
      console.log('date to set on refresh: ', date)
      const dte = new Date(date)
      console.log('dte: ', dte)
      const toDte = toDate(new Date(date))
      console.log('toDte: ', toDte)
      const timeZone = 'Europe/Berlin'
      const zonedDate = utcToZonedTime(dte, timeZone)
      console.log('zonedDate: ', zonedDate)
      setSelectedDate(zonedDate)
    }
    // console.log('date: ', date)
    // console.log('stationID: ', stnID)
  }, [])

  React.useEffect(() => {
    const handleSetNextDisable = () => {
      const dte = selectedDate as Date
      const selectDteFmt = Number(format(dte, 'yyyyMd'))
      const todayFmt = Number(format(new Date(), 'yyyyMd'))
      const isPast = selectDteFmt >= todayFmt
      setNextDisabled(isPast)
    }
    handleSetNextDisable()
    console.log('stationID: ', stationID)
    if (stationID) {
      // TODO: create method for below as it's now repeated
      const dte = format(selectedDate as Date, STD_DATE_FORMAT)
      const uri = `/dips/${dte}/${stationID}`
      history.push(uri)
    }
  }, [selectedDate as Date])

  // console.log('stationID in Dips: ', stationID)

  React.useEffect(() => {
    if (stationID) {
      console.log('fetch tanks and fuel in Dips useEffect')
      getTanks({ variables: { stationID } })
      getFuelSale({ variables: { stationID } })
      // set params
      // const dte = format(selectedDate as Date, STD_DATE_FORMAT)
      // const uri = `/dips/${dte}/${stationID}`
      // history.push(uri)
    }
  }, [stationID])

  return (
    <ContentContainer>
      <PageTitle title='Dip Entries' />
      <div>
        <FormControl className={classes.formControl}>
          <StationSelector stationHandler={setStationID} />
        </FormControl>

        <FormControl className={classes.formControl}>
          <KeyboardDatePicker
            autoOk
            disableFuture
            format='MMM d, yyy'
            label='Date'
            onChange={setSelectedDate}
            value={selectedDate}
          />
        </FormControl>

        <FormControl className={classes.navControl}>
          <IconButton className={classes.navButton} onClick={() => handleNextPrevDate('p')}>
            <Icon className={classes.navIcon} fontSize='large'>
              arrow_back_ios
            </Icon>
          </IconButton>
          <IconButton className={classes.navButton} disabled={nextDisabled} onClick={() => handleNextPrevDate('n')}>
            <Icon className={classes.navIcon} fontSize='large'>
              arrow_forward_ios
            </Icon>
          </IconButton>
        </FormControl>
      </div>
      {(tanksLoading || fuelSaleLoading) && <Loader />}
    </ContentContainer>
  )
}
