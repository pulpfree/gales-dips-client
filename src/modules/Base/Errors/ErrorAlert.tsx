/**
 * ErrorAlert
 *
 * Inspiration for this was taken from https://kentcdodds.com/blog/use-react-error-boundary-to-handle-errors-in-react
 */

import React from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Alert, AlertTitle } from '@material-ui/lab'

type ErrorProps = {
  error: Error
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto 0',
      paddingTop: theme.spacing(1),
      width: '100%',
      zIndex: 100,
      '& > * + *': {
        marginTop: theme.spacing(1),
      },
    },
    actionItem: {
      width: 600,
    },
    errorTxt: {
      fontSize: '150%',
      fontWeight: 600,
    },
  }),
)

/**
 * Component to display an error alert
 * @param error
 */
export const ErrorAlert = ({ error }: ErrorProps): JSX.Element => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Alert className={classes.actionItem} severity='error' variant='filled'>
        <AlertTitle className={classes.errorTxt}>Something went wrong:</AlertTitle>
        {error.message}
      </Alert>
    </div>
  )
}
