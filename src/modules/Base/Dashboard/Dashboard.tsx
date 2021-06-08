import React from 'react'

import { useQuery, gql } from '@apollo/client'

import { Divider, Grid, Paper, Typography } from '@material-ui/core'

import { DashButton } from './DashButton'
import { LinkItems } from '../types'
import useStyles from '../../../style/main'
import { PageTitle } from '../PageTitle'
import { Loader } from '../Loader'
import { ErrorAlert } from '../Errors'
import { getEnv } from '../../../utils'

const menuItems: LinkItems = [
  { label: 'Dip Entries', path: '/dips' },
  { label: 'Propane Entries', path: '/propane' },
  { label: 'Reports', path: '/reports' },
  { label: 'Import Sales Data', path: '/import-data' },
]

export const GET_STATIONS = gql`
  query Stations {
    stations {
      id
      name
    }
  }
`

export function Dashboard(): JSX.Element {
  const classes = useStyles()
  // const [load, setLoader] = React.useState(true)
  const { loading, error } = useQuery(GET_STATIONS)

  /* React.useEffect(() => {
    const myFunc = async (ms: number, msg: string) => {
      const res = await later(ms, msg)
      setLoader(false)
      return res
    }
    myFunc(3000, '')
  }, [load]) */

  if (error) return <ErrorAlert error={error} />

  const DevWarnMsg = getEnv() !== 'production' && 'Warning: You are currently NOT in a production environment.'

  return (
    <>
      <Paper className={classes.paper}>
        <PageTitle title='Select Activity' />
        {loading ? (
          <>
            <Typography>Please stand by as we load the application...</Typography>
            <Loader />
          </>
        ) : (
          <Grid container spacing={4}>
            {menuItems.map((m) => (
              <DashButton key={m.path} label={m.label} path={m.path} />
            ))}
            <div>{error}</div>
            <Divider />
          </Grid>
        )}
        <div style={{ margin: 20, fontWeight: 600, fontSize: '120%' }}>{DevWarnMsg}</div>
      </Paper>
    </>
  )
}