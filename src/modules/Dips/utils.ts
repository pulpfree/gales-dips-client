import { Dip, DipsData, StationTanks, TankIndex, DipTankData, TankDip, FuelTypes } from './types'

const tmpTank = {
  delivery: null,
  dips: null,
  level: null,
  litres: null,
  prevDips: null,
  prevLevel: null,
  tankID: null,
}

export const populateTanks = (dips: DipsData, tanks: StationTanks): DipTankData => {
  const { curDips, prevDips } = dips
  const tanksObj = new Map<TankIndex, TankDip>()

  for (const ft of Object.values(FuelTypes)) {
    for (let i = 0; i < tanks.length; i++) {
      const t = tanks[i]
      // match tank fuel type from our list
      if (t.fuelType === ft) {
        const tmp: TankDip = Object.assign({ ...tmpTank })
        if (curDips) {
          // FIXME: must be a cleaner way to do this
          const tmpDip = curDips.find((ele: Dip) => t.id === ele.stationTankID)
          if (tmpDip) {
            tmp.dips = tmpDip
            tmp.tankID = `${t.tank.size}(${t.tankID}) ${tmpDip.fuelType}`
            tmp.level = tmpDip.level
            tmp.litres = tmpDip.litres
            if (tmpDip.fuelDelivery) {
              tmp.delivery = tmpDip.fuelDelivery.litres
            }
          }
        }
        if (prevDips) {
          const tmpPrevDip = prevDips.find((ele: Dip) => t.id === ele.stationTankID)
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
