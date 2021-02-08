import { gql } from '@apollo/client'

export const DIP_QUERY = gql`
  query Dips($date: Int!, $dateFrom: Int!, $dateTo: Int!, $stationID: String!) {
    curDips: dips(date: $date, stationID: $stationID) {
      date
      fuelType
      level
      litres
      stationTankID
      fuelDelivery {
        litres
      }
    }
    prevDips: dips(date: $dateFrom, stationID: $stationID) {
      date
      fuelType
      level
      litres
      stationTankID
    }
    fuelPrice(date: $date, stationID: $stationID) {
      date
      price
      stationID
    }
    dipOverShortRange(dateFrom: $dateFrom, dateTo: $dateTo, stationID: $stationID) {
      date
      overShort
      stationID
    }
  }
`

/* export const STATION_TANK_QUERY = gql`
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
` */

export const STATION_INFO = gql`
  query StationInfo($stationID: String!) {
    stationTanks(stationID: $stationID) {
      id
      fuelType
      tankID
      tank {
        levels
        size
      }
    }
    fuelSaleLatest(stationID: $stationID) {
      date
    }
  }
`
