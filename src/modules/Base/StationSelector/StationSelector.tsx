import React from 'react'

import { InputLabel, MenuItem, Select } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { useQuery, gql } from '@apollo/client'

const GET_STATIONS = gql`
  query Stations {
    stations {
      id
      name
    }
  }
`

type Station = {
  id: string
  name: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
)

export const StationSelector = (): JSX.Element => {
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_STATIONS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  // console.table(data.stations)
  // console.log(data.stations)

  return (
    <>
      <InputLabel id='station-select-label'>Station</InputLabel>
      <Select
        labelId='station-select-label'
        id='station-select'
        className={classes.selectEmpty}
        value={''}
        // value={age}
        // onChange={handleChange}
      >
        {data.stations.map((s: Station) => (
          <MenuItem key={s.id} value={s.id}>
            {s.name}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}
