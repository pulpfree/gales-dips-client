/**
 * Dips utilities file
 */

// Test this file only: yarn test src/modules/Dips/utils

import { dips, stationData } from './mockData'
import { populateTanks, setLevels } from './utils'
import { ITankDip } from './types'

const dipResult: ITankDip = {
  delivery: 1700,
  dips: {
    date: 20210125,
    fuelDelivery: { litres: 1700 },
    fuelType: 'DSL',
    level: 94,
    litres: 8185,
    stationTankID: 'f2a1e74d-2140-46e5-abc0-938fa5a1ed8d',
  },
  level: 94,
  litres: 8185,
  prevDips: {
    date: 20210124,
    fuelType: 'DSL',
    level: 98,
    litres: 8631,
    stationTankID: 'f2a1e74d-2140-46e5-abc0-938fa5a1ed8d',
  },
  prevLevel: 98,
  tankID: '9A',
  tankLabel: '15000(9A) DSL',
}

describe('populateTanks function', () => {
  it('returns populated tanks', () => {
    const stationTankID = 'f2a1e74d-2140-46e5-abc0-938fa5a1ed8d'
    const ds = populateTanks(dips, stationData.stationTanks)
    expect(ds.get(stationTankID)).toEqual(dipResult)
  })
})

describe('setLevels function', () => {
  it('sets tank levels', () => {
    const tank9a = stationData.stationTanks.find((t) => (t.tankID = '9a'))
    const ret = setLevels(stationData.stationTanks)
    expect(ret['9a']).toEqual(tank9a?.tank.levels)
  })
})
