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
import { DipFormData } from './types'

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
  const [litres, setLitres] = React.useState<Record<string, number>>({})

  const { dipTankData: tmpData, tankLevels } = useDipsDispatch()

  const dipTankData = tmpData as DipFormData
  const { osData, tankData } = dipTankData

  const dataKeys = Array.from(tankData.keys())

  console.log('tankData: ', tankData)

  // type FieldVals = Record<string, LitresObjI>

  /* const defaultValues: FieldValsI = React.useMemo(() => {
    console.log('setting fieldValues')

    const dataKeys = Array.from(tankData.keys())
    // const fieldVals: FieldVals = {}
    const ret: FieldValsI = {}

    dataKeys.forEach((k) => {
      ret[`${k}_delivery`] = tankData.get(k)?.delivery ?? 0
      ret[`${k}_level`] = tankData.get(k)?.level ?? 0
      ret[`${k}_litres`] = tankData.get(k)?.litres ?? 0
      // delivery: tankData.get(k)?.delivery ?? 0,
      // level: tankData.get(k)?.level ?? 0,
      // litres: tankData.get(k)?.litres ?? 0,
      // }
    })
    return ret
  }, [tankData])
  console.log('defaultValues: ', defaultValues) */

  // eslint-disable-next-line
  const handleBlur = (e: any): void => {
    e.persist()
    const fieldNm = e.target.name
    const [tankID] = e.target.id.split('_')
    const ltrFieldNm = `${tankID}_litres`
    const val = e.target.value

    if (!val) return
    let inputLevel = Number(val)
    // const origLevel = Number(val.slice())
    if (inputLevel <= 1) return

    // Here we're simply ensuring that the tank level exists, some tanks have only 'even' numbered levels
    const tID = tankData.get(tankID)?.tankID
    const levels = tankLevels[`${tID}`]

    if (inputLevel > 9 && !levels[inputLevel]) {
      inputLevel--
      // setValue(fieldNm, inputLevel)
    }

    const litres = levels[inputLevel].litres
    if (!litres) {
      // this.props.setFieldValue(`tanks.${tankID}.level`, origLevel, false) // Don't see the need for this
      // this.props.setFieldError([`${tankID}_level`], 'Invalid field level')
      return
    }

    const fmtLitres = fmtNumber(litres, 0, true)
    // setValue(ltrFieldNm, fmtLitres)
    setLitres((state) => {
      const newState = { ...state, [tankID]: litres }
      return newState
    })
  }

  // const onSubmit = (data: any) => console.log('formData: ', data)

  /* interface LitresObjI {
    [key: string]: number
  } */

  /* React.useEffect(() => {
    console.log('run effect once')

    const retLtrs: LitresObjI = {}

    dataKeys.forEach((k) => {
      retLtrs[`${k}`] = tankData.get(k)?.litres ?? 0
      fieldVals[k] = {
        level: tankData.get(k)?.level ?? 0,
      }
    })
    // setLitres(retLtrs)
  }, [dataKeys, tankData]) */

  // console.log('litres: ', litres)

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
                          // defaultValue={tankData.get(k)?.level || 0}
                          value={tankData.get(k)?.level || 0}
                          id={`${k}_level`}
                          margin='dense'
                          name={`${k}_level`}
                          onBlur={handleBlur}
                          type='number'
                          variant='outlined'
                        />
                        {tankData.get(k)?.level}
                      </TableCell>

                      <TableCell align='right' className={classes.inputLitres}>
                        {fmtNumber(litres[k] as number, 0, true)}
                      </TableCell>

                      <TableCell>
                        <TextField
                          className={classes.inputWide}
                          defaultValue={tankData.get(k)?.delivery || 0}
                          id={`${k}_delivery`}
                          name={`${k}_delivery`}
                          margin='dense'
                          type='number'
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
