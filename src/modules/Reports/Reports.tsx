import React from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { AlertTitle } from '@material-ui/lab'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import { ContentContainer } from '../Base/ContentContainer'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: 15,
      width: '100%',
      // maxWidth: 400,
      // minWidth: 600,
      // paddingLeft: 50,
      margin: '0 auto 0',
      display: 'flex',
      // flex: 1,
      flexDirection: 'column',
      // justifyContent: 'center',
      // backgroundColor: 'gray',
      '& > * + *': {
        marginTop: theme.spacing(2),
        // marginLeft: 50,
      },
    },
    actionItem: {
      // display: 'flex',
      // flex: 1,
      // marginLeft: 50,
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 450,
      minWidth: 400,
    },
  }),
)

export function Reports(): JSX.Element {
  const classes = useStyles()
  const [, setOpen] = React.useState(true)

  /* const handleClick = () => {
    setOpen(true)
  } */

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant='filled' {...props} className={classes.actionItem} />
  }

  return (
    <>
      <div className={classes.root}>
        <Alert
          severity='success'
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        >
          <AlertTitle>Success</AlertTitle>
          All good, managed to update the Dip
        </Alert>

        <Alert
          severity='success'
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        >
          <AlertTitle>Success</AlertTitle>
          All good, managed to update the Dip
        </Alert>

        <Alert onClose={handleClose} severity='warning' className={classes.actionItem}>
          <AlertTitle>Alert</AlertTitle>
          This is a success message with a somewhat longer message.
        </Alert>
      </div>
      <ContentContainer>
        <h2>Reports</h2>
      </ContentContainer>
    </>
  )
}
