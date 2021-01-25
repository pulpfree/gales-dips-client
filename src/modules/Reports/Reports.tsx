import React from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
// import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { Alert, AlertTitle } from '@material-ui/lab'
// import IconButton from '@material-ui/core/IconButton'
// import CloseIcon from '@material-ui/icons/Close'

// import { ContentContainer } from '../Base/ContentContainer'

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

export function Reports(): JSX.Element {
  const classes = useStyles()

  /* function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant='filled' {...props} className={classes.actionItem} />
  } */

  return (
    <div className={classes.root}>
      <Alert className={classes.actionItem} severity='error' variant='filled'>
        <AlertTitle className={classes.errorTxt}>Something went wrong:</AlertTitle>
        {/* <pre style={{ color: 'red' }}>{error.message}</pre> */}
        <pre className={classes.errorTxt}>Some kinda longer message here i...</pre>
      </Alert>
    </div>
  )
}
