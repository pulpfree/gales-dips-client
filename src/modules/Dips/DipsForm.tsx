import React from 'react'

import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Save from '@material-ui/icons/Save'
import classNames from 'classnames'

import { DipOvershort } from './DipOvershort'
import { fmtNumber } from '../../utils'
import { useDipsDispatch } from './DipsContext'
import { IDipFormData } from './types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    container: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(2),
      maxWidth: 1200,
    },
    iconSmall: {
      fontSize: 20,
    },
    input: {
      width: 80,
    },
    inputLitres: {
      width: 50,
    },
    inputWide: {
      width: 100,
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    table: {},
    submitButton: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  }),
)

export const DipsForm = (): JSX.Element => {
  const classes = useStyles()

  const { tanksData, dipsData: tmpData, tankLevels, setTankDataField } = useDipsDispatch()

  const dipTankData = tmpData as IDipFormData
  const { osData, tankData } = dipTankData

  const dataKeys = Array.from(tankData.keys())

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e): void => {
    e.persist()
    const [tankID] = e.target.id.split('_')
    const val = e.target.value

    let inputLevel = Number(val)
    if (inputLevel <= 1) return

    // Here we're simply ensuring that the tank level exists, some tanks have only 'even' numbered levels
    const tID = tankData.get(tankID)?.tankID
    const levels = tankLevels[`${tID}`]

    if (inputLevel > 9 && !levels[inputLevel]) {
      inputLevel--
    }

    const litres = levels[inputLevel]?.litres || false
    if (!litres) {
      //TODO: set error here
      const origLevel = tankData.get(tankID)?.dips.level as number
      setTankDataField(tankID, 'level', origLevel)
      return
    }

    setTankDataField(tankID, 'litres', litres)
    setTankDataField(tankID, 'level', inputLevel)
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    const [tankID, field] = e.target.id.split('_')
    setTankDataField(tankID, field, Number(e.target.value))
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    console.log('tanksData: ', tanksData)
  }

  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant='h6'>Dips</Typography>

          <form autoComplete='off' onSubmit={handleSubmit}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label='dips table' size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Tank</TableCell>
                    <TableCell>Level</TableCell>
                    <TableCell align='center'>Litres</TableCell>
                    <TableCell>Delivery</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {dataKeys.map((k, i) => (
                    <TableRow key={k}>
                      <TableCell>{tankData.get(k)?.tankLabel}</TableCell>

                      <TableCell>
                        <TextField
                          autoFocus={i === 0}
                          className={classes.input}
                          // error
                          // helperText='Incorrect entry.'
                          // label='Error'
                          id={`${k}_level`}
                          margin='dense'
                          name={`${k}_level`}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type='number'
                          value={tanksData.get(k)?.level}
                          variant='outlined'
                        />
                      </TableCell>

                      <TableCell align='right' className={classes.inputLitres}>
                        {fmtNumber(tanksData.get(k)?.litres as number, 0, true)}
                      </TableCell>

                      <TableCell>
                        <TextField
                          className={classes.inputWide}
                          id={`${k}_delivery`}
                          margin='dense'
                          name={`${k}_delivery`}
                          onChange={handleChange}
                          type='number'
                          value={tanksData.get(k)?.delivery}
                          variant='outlined'
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan={4}>
                      <Button
                        className={classes.submitButton}
                        color='primary'
                        fullWidth
                        // disabled={!dirty || isSubmitting || !!errorKeys}
                        type='submit'
                        variant='contained'
                      >
                        <Save className={classNames(classes.leftIcon, classes.iconSmall)} />
                        {/* {submitLabel} */}
                        Save Dips
                      </Button>
                    </TableCell>
                  </TableRow>
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
