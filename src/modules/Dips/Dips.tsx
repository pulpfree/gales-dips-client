import React from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

import { ContentContainer } from '../Components/ContentContainer'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: 15,
      maxWidth: 800,
      // margin: 'auto',
      backgroundColor: 'gray',
      // width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  })
)

export function Dips() {
  const classes = useStyles()
  // const [open, setOpen] = React.useState(true)

  return (
    <ContentContainer>
      <div className={classes.root}>
        <Alert variant='filled' severity='error'>
          This is an error alert — check it out!
        </Alert>
        <Alert variant='filled' severity='warning'>
          This is a warning alert — check it out!
        </Alert>
        <Alert variant='filled' severity='info'>
          This is an info alert — check it out!
        </Alert>
        <Alert variant='filled' severity='success'>
          This is a success alert — check it out!
        </Alert>
      </div>
      <h2>Dips</h2>
    </ContentContainer>
  )
}
