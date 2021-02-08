import React from 'react'

import { Grid, Icon, IconButton, FormControl } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { addDays, subDays, format } from 'date-fns'
import { useHistory, useParams } from 'react-router-dom'
import { utcToZonedTime } from 'date-fns-tz'

import { ContentContainer } from '../Base/ContentContainer'
import { HUMAN_DATE_FORMAT, STD_DATE_FORMAT } from '../../config'
import { ImportDataLink } from './ImportDataLink'
import { Loader } from '../Base/Loader'
import { PageTitle } from '../Base/PageTitle'
import { StationSelector } from '../Base/StationSelector'
import { useAlertDispatch } from '../Base/Alert'
import { useDips } from './useDips'
import { DipsForm } from './DipsForm'

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
  const alertDispatch = useAlertDispatch()
  const [nextDisabled, setNextDisabled] = React.useState<boolean>(true)
  const { date: pDate, stationID: pStationID } = useParams<{ date: string; stationID: string }>()
  const {
    date,
    dipTankData,
    error,
    haveCurrentDips,
    loading,
    fuelSaleDate,
    stationID,
    setDate,
    setStationID,
  } = useDips()

  const handleNextPrevDate = (val: string) => {
    const dte = date as Date
    if (val === 'p') {
      setDate(subDays(dte, 1))
    } else if (val === 'n') {
      setDate(addDays(dte, 1))
    }
  }

  // Check for url parameters and set
  React.useEffect(() => {
    if (pDate && pStationID) {
      setDate(utcToZonedTime(new Date(pDate), 'Europe/London'))
      setStationID(pStationID)
    }
  }, [pDate, pStationID, setDate, setStationID])

  const dte = date as Date
  React.useEffect(() => {
    const handleSetNextDisable = () => {
      const selectDteFmt = Number(format(dte, 'yyyyMMdd'))
      const todayFmt = Number(format(new Date(), 'yyyyMMdd'))
      const isPast = selectDteFmt >= todayFmt
      setNextDisabled(isPast)
    }
    handleSetNextDisable()
    if (stationID) {
      const fmtDte = format(dte, STD_DATE_FORMAT)
      const uri = `/dips/${fmtDte}/${stationID}`
      history.push(uri)
    }
  }, [dte, history, stationID])

  React.useEffect(() => {
    if (error) {
      alertDispatch.send({ message: error, severity: 'error', setTimeout: false, title: 'Data Error' })
    }
  }, [alertDispatch, error])

  return (
    <ContentContainer>
      <PageTitle title='Dip Entries' />

      <Grid container spacing={3} style={{ maxWidth: 550 }}>
        <Grid item xs={4}>
          <FormControl className={classes.formControl}>
            <StationSelector stationHandler={setStationID} />
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl className={classes.formControl} style={{ width: 160 }}>
            <KeyboardDatePicker
              autoOk
              disableFuture
              format={HUMAN_DATE_FORMAT}
              label='Date'
              onChange={setDate}
              value={date}
            />
          </FormControl>
        </Grid>

        <Grid item xs={4}>
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
        </Grid>
      </Grid>
      {loading && <Loader />}
      {!haveCurrentDips && !loading && fuelSaleDate && <ImportDataLink date={fuelSaleDate} />}
      {haveCurrentDips && !loading && dipTankData && <DipsForm data={dipTankData} />}
    </ContentContainer>
  )
}
