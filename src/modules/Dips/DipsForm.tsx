import React from 'react'

import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TextField,
  Typography,
  Grid,
} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { DipFormData } from './types'
import { DipOvershort } from './DipOvershort'
import { fmtNumber } from '../../utils'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(2),
      maxWidth: 1200,
    },
    input: {
      width: 80,
    },
    table: {},
  }),
)

interface FormProps {
  data: DipFormData
}

export const DipsForm = ({ data }: FormProps): JSX.Element => {
  const classes = useStyles()
  const tankData = data.dipTanks
  const osData = data.overshort
  const dataKeys = Array.from(tankData.keys())

  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant='h6'>Dips</Typography>

          <form autoComplete='off'>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label='dips table' size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Tank</TableCell>
                    <TableCell>Level</TableCell>
                    <TableCell>Litres</TableCell>
                    <TableCell>Delivery</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataKeys.map((k, i) => (
                    <TableRow key={k}>
                      <TableCell>{tankData.get(k)?.tankID}</TableCell>
                      <TableCell>
                        <TextField
                          autoFocus={i === 0}
                          className={classes.input}
                          id={`${k}_level`}
                          margin='dense'
                          type='number'
                          value={tankData.get(k)?.level || 0}
                          variant='outlined'
                        />
                      </TableCell>
                      <TableCell>{fmtNumber(tankData.get(k)?.litres as number, 0, true)}</TableCell>
                      <TableCell>
                        <TextField
                          className={classes.input}
                          id={`${k}_delivery`}
                          margin='dense'
                          type='number'
                          value={tankData.get(k)?.delivery || 0}
                          variant='outlined'
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </form>
        </Grid>

        <Grid item xs={5}>
          <DipOvershort data={osData} />
        </Grid>
      </Grid>
    </div>
  )
}
