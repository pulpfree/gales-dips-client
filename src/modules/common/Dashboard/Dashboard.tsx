import React from 'react'

import { Divider, Grid, Paper, Typography } from '@material-ui/core'

import { DashButton } from './DashButton'
import { LinkItems } from '../types'
import useStyles from '../../../style/main'

const menuItems: LinkItems = [
  { label: 'Dip Entries', path: '/dips' },
  { label: 'Propane Entries', path: '/propane' },
  { label: 'Reports', path: '/reports' },
  { label: 'Import Sales Data', path: '/import-data' },
]

export function Dashboard() {
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.paper}>
        <Typography gutterBottom variant='h5'>
          Select Activity
        </Typography>
        <Grid container spacing={4}>
          {menuItems.map((m) => (
            <DashButton label={m.label} path={m.path} />
          ))}
        </Grid>
        <Divider light />
        <br />
      </Paper>
    </>
  )
}
