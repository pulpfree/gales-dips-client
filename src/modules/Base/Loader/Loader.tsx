import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'

import { useStyles } from './style'

export const Loader = (): JSX.Element => {
  const classes = useStyles()

  return (
    <div className={classes.container} data-testid='loader'>
      <CircularProgress className={classes.progress} />
    </div>
  )
}
