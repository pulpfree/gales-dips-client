import {
  IDip,
  IDipsData,
  TTanksMap,
  TDipTanksMap,
  FuelTypes,
  TStationTanks,
  TTankIndex,
  ITankDip,
  TankLevelsT,
} from './types'

const tmpTank = {
  delivery: null,
  dips: null,
  level: null,
  litres: null,
  prevDips: null,
  prevLevel: null,
  tankID: null,
}

export const populateTanks = (dips: IDipsData, tanks: TStationTanks): TDipTanksMap => {
  const { curDips, prevDips } = dips
  const tanksObj = new Map<TTankIndex, ITankDip>()

  for (const ft of Object.values(FuelTypes)) {
    for (let i = 0; i < tanks.length; i++) {
      const t = tanks[i]
      // match tank fuel type from our list
      if (t.fuelType === ft) {
        const tmp: ITankDip = Object.assign({ ...tmpTank })
        tmp.tankID = t.tankID
        tmp.tankLabel = `${t.tank.size}(${t.tankID}) ${ft}`

        if (curDips) {
          // now populate any data from current dip
          const curDip = curDips.find((ele: IDip) => t.id === ele.stationTankID)
          if (curDip) {
            tmp.dips = curDip
            tmp.level = curDip.level
            tmp.litres = curDip.litres
            if (curDip.fuelDelivery) {
              tmp.delivery = curDip.fuelDelivery.litres
            }
          }
        }

        if (prevDips) {
          const tmpPrevDip = prevDips.find((ele: IDip) => t.id === ele.stationTankID)
          if (tmpPrevDip) {
            tmp.prevDips = tmpPrevDip
          }
          tmp.prevLevel = tmp.prevDips && tmp.prevDips.level
        }
        tanksObj.set(t.id, tmp)
      }
    }
  }
  return tanksObj
}

export const getTanksData = (dips: IDipsData, tanks: TStationTanks): TTanksMap => {
  const dipLevels = new Map()
  const { curDips } = dips
  const tmpDipData = {
    delivery: 0,
    level: 0,
    litres: 0,
  }

  // set default value for each tank
  for (let i = 0; i < tanks.length; i++) {
    const t = tanks[i]
    dipLevels.set(t.id, tmpDipData)
  }

  // update with level, this should only happen after levels have been initially added and we're viewing/editing past entries
  if (curDips) {
    for (let i = 0; i < curDips.length; i++) {
      const dip = curDips[i]
      const d = {
        delivery: dip.fuelDelivery && dip.fuelDelivery.litres,
        level: dip.level,
        litres: dip.litres,
      }
      dipLevels.set(dip.stationTankID, d)
    }
  }

  return dipLevels
}

/**
 * setLevels function - Sets levels for tank
 * @param tanks
 * @returns TanksT
 */
export const setLevels = (tanks: TStationTanks): TankLevelsT => {
  const ret: TankLevelsT = {}

  tanks.forEach((t) => {
    const keys = Object.keys(ret)
    if (!keys.includes(t.tankID)) {
      ret[t.tankID] = t.tank.levels
    }
  })

  return ret
}
