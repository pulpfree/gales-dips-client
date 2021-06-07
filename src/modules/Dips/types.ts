/**
 * Typescript interace and type definitions for the Dips module
 */

export interface IFieldValues {
  [key: string]: number | string
}

interface ITankOverShort {
  fuelType: string
  tankLitres: number
  overShort: number
  litresSold: number
}
type TTankOverShorts = Record<string, ITankOverShort>

export interface IOvershort {
  date: number
  overShort: TTankOverShorts
  stationID: string
}

type TFuelDelivery = {
  litres: number
}
export interface IDip {
  date: number
  fuelDelivery?: TFuelDelivery | null
  fuelType: string
  level: number
  litres: number
  stationTankID: string
}

interface IFuelPrice {
  date: number
  price: number
  stationID: string
}

export interface IOvershortData {
  overshort?: IOvershort
  fuelPrice: IFuelPrice
}

export interface IDipsData extends IOvershortData {
  curDips: IDip[]
  prevDips: IDip[]
}

export type TTankIndex = string

export interface ITankData {
  delivery: number
  level: number
  litres: number
}

export type TTanksMap = Map<TTankIndex, ITankData>

export interface IDipFormData {
  tankData: TDipTanksMap
  osData: IOvershortData
}

export enum FuelTypes {
  NL = 'NL',
  SNL = 'SNL',
  DSL = 'DSL',
  CDSL = 'CDSL',
}

type TTankLevel = {
  litres: number
  level: number
}

interface ITank {
  levels: Record<symbol, TTankLevel>
  size: number
}

interface IStationTank {
  fuelType: string
  id: string
  tank: ITank
  tankID: string
}

export type TStationTanks = IStationTank[]

export type TDipTanksMap = Map<TTankIndex, ITankDip>
export interface ITankDip {
  delivery: number | null
  dips: IDip
  level: number
  litres: number | null
  prevDips: IDip
  prevLevel: number | null
  tankID: string
  tankLabel: string
}

export type TankLevelsT = Record<string, Record<string, TTankLevel>>
