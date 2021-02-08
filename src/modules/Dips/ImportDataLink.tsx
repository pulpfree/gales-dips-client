import React from 'react'

import { format } from 'date-fns'
import { Button, Typography } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { HUMAN_DATE_FORMAT } from '../../config'

interface ImportProps {
  date: Date
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
  }),
)

export const ImportDataLink = ({ date }: ImportProps): JSX.Element => {
  const classes = useStyles()
  const fmtDte = format(new Date(date), HUMAN_DATE_FORMAT)

  return (
    <div className={classes.container}>
      <Typography variant='body1'>Date of last Fuel Sale Import: {`${fmtDte}`}</Typography>
      <br />
      <Button variant='outlined'>Import Dips Data</Button>
    </div>
  )
}
