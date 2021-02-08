import React from 'react'

import { Paper, Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Typography } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { format, parse } from 'date-fns'

import { FuelTypes, OvershortData } from './types'
import { fmtNumber } from '../../utils'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
    fuelPriceRow: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
    negative: {
      color: theme.palette.primary.main,
    },
  }),
)

interface OSProps {
  data: OvershortData
}

export const DipOvershort = ({ data }: OSProps): JSX.Element => {
  const classes = useStyles()

  let fuelPrice
  let displayDate

  const fts = Object.values(FuelTypes)
  const oss = data.overshort.overShort
  const rows = []
  if (oss) {
    for (let i = 0; i < fts.length; i++) {
      if (oss[fts[i]]) {
        rows.push(oss[fts[i]])
      }
    }
  }
  if (data.fuelPrice) {
    fuelPrice = fmtNumber(data.fuelPrice.price, 2)
    displayDate = format(parse(data.fuelPrice.date.toString(), 'yyyyMMdd', new Date()), 'E, MMM Do yyyy')
  }
  return (
    <>
      <Typography variant='h6'>Overshort</Typography>
      <TableContainer component={Paper}>
        <Table aria-label='overshort table' size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Fuel Type</TableCell>
              <TableCell align='right'>Dip Litres</TableCell>
              <TableCell align='right'>Litres Sold</TableCell>
              <TableCell align='right'>Overshort</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((os) => (
              <TableRow key={os.fuelType}>
                <TableCell>{os.fuelType}</TableCell>
                <TableCell align='right'>{fmtNumber(os.tankLitres, 3, true)}</TableCell>
                <TableCell align='right'>{fmtNumber(os.litresSold, 3, true)}</TableCell>
                <TableCell align='right' className={classNames({ [classes.negative]: os.overShort < 0 })}>
                  {fmtNumber(os.overShort, 3, true)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.fuelPriceRow}>
        Fuel Price: {fuelPrice} ({displayDate})
      </div>
    </>
  )
}
