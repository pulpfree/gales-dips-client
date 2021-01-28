import { gql } from '@apollo/client'

export const STATION_TANK_QUERY = gql`
  query StationTanks($stationID: String!) {
    stationTanks(stationID: $stationID) {
      id
      fuelType
      tankID
      tank {
        levels
        size
      }
    }
  }
`

export const FUEL_SALE_LATEST = gql`
  query FuelSaleLatest($stationID: String!) {
    fuelSaleLatest(stationID: $stationID) {
      date
    }
  }
`
