import React from 'react'

import { useQuery, gql } from '@apollo/client'

const GET_STATIONS = gql`
  query Stations {
    stations {
      id
      name
    }
  }
`

export const StationSelector = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_STATIONS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  console.table(data.stations)

  return <></>
}
