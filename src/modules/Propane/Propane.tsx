import React from 'react'

import { AlertTitle } from '@material-ui/lab'
import Button from '@material-ui/core/Button'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

import { ContentContainer } from '../Base/ContentContainer'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

export function Propane(): JSX.Element {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <ContentContainer>
      <h2>Propane</h2>
      <div>
        <Button variant='outlined' onClick={handleClick}>
          Open success snackbar
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity='success'>
            <AlertTitle>Success</AlertTitle>
            This is a success message with a somewhat longer message. <br />
            Even longer yes...
          </Alert>
        </Snackbar>
      </div>
    </ContentContainer>
  )
}
