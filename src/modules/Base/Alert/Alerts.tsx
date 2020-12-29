import React from 'react'

import { IconButton } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { AlertTitle } from '@material-ui/lab'

import { useAlertDispatch, useAlertState } from './AlertContext'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      margin: '0px 100px 0 100px',
      position: 'absolute',
      top: 65,
      width: 'calc(100vw - 200px)',
      // backgroundColor: 'gray',
      zIndex: 100,
      '& > * + *': {
        marginTop: theme.spacing(1),
      },
    },
    actionItem: {
      width: 600,
    },
  }),
)

export const Alerts = (): JSX.Element | null => {
  const context = useAlertState()
  const classes = useStyles()

  const Alert = (props: AlertProps) => {
    const dispatch = useAlertDispatch()

    return (
      <MuiAlert
        className={classes.actionItem}
        elevation={6}
        // severity={props.severity}
        variant='filled'
        action={
          <IconButton
            aria-label='close'
            color='inherit'
            size='small'
            onClick={() => dispatch.dismiss(props.id!)} // eslint-disable-line @typescript-eslint/no-non-null-assertion
          >
            <CloseIcon fontSize='inherit' />
          </IconButton>
        }
        {...props}
      />
    )
  }

  if (!context.length) return null

  return (
    <div className={classes.root}>
      {context.map((c) => (
        <Alert key={c.id} id={c.id} severity={c.severity}>
          {c.title && <AlertTitle>{c.title}</AlertTitle>}
          {c.message}
        </Alert>
      ))}
    </div>
  )
}
