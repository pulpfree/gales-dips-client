/**
 * Typescript interace and type definitions for the Dips module
 */

interface TankOverShort {
  fuelType: string
  tankLitres: number
  overShort: number
  litresSold: number
}
type TankOverShorts = Record<string, TankOverShort>

export interface Overshort {
  date: number
  overShort: TankOverShorts
  stationID: string
}

type FuelDelivery = {
  litres: number
}

export interface Dip {
  date: number
  fuelDelivery?: FuelDelivery | null
  fuelType: string
  level: number
  litres: number
  stationTankID: string
}

interface FuelPrice {
  date: number
  price: number
  stationID: string
}

export interface OvershortData {
  overshort: Overshort
  fuelPrice: FuelPrice
}

export interface DipsData extends OvershortData {
  curDips: Dip[]
  prevDips: Dip[]
}

export type TankIndex = string

export type DipTankData = Map<TankIndex, TankDip>

export interface DipFormData {
  dipTanks: DipTankData
  overshort: OvershortData
}

export enum FuelTypes {
  NL = 'NL',
  SNL = 'SNL',
  DSL = 'DSL',
  CDSL = 'CDSL',
}

type TankLevel = {
  litres: number
  level: number
}

interface Tank {
  levels: Record<symbol, TankLevel>
  size: number
}

interface StationTank {
  fuelType: string
  id: string
  tank: Tank
  tankID: string
}

export type StationTanks = StationTank[]

export interface TankDip {
  delivery: number | null
  dips: Dip
  level: number
  litres: number | null
  prevDips: Dip
  prevLevel: number | null
  tankID: string
}
