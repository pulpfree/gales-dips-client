import React from 'react'

import { InputLabel, MenuItem, Select } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { useQuery, gql } from '@apollo/client'
import { useParams } from 'react-router-dom'

export const GET_STATIONS = gql`
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

interface SelectorProps {
  stationHandler: (id: string) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
)

export const StationSelector = ({ stationHandler }: SelectorProps): JSX.Element => {
  const classes = useStyles()
  const { stationID } = useParams<{ date: string; stationID: string }>()
  const { loading, error, data } = useQuery(GET_STATIONS)
  const [station, setStation] = React.useState('')

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const stnID = event.target.value as string
    setStation(stnID)
    stationHandler(stnID)
  }

  React.useEffect(() => {
    if (stationID) {
      setStation(stationID)
    }
  }, [stationID])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <>
      <InputLabel id='station-select-label'>Station</InputLabel>
      <Select
        labelId='station-select-label'
        id='station-select'
        className={classes.selectEmpty}
        value={station}
        onChange={handleChange}
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
