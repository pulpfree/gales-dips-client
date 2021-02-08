const stationData = {
  fuelSaleLatest: {
    date: 20210127,
  },
  stationTanks: [
    {
      fuelType: 'DSL',
      id: 'f2a1e74d-2140-46e5-abc0-938fa5a1ed8d',
      levels: {
        1: { litres: 25, level: 1 },
        2: { litres: 47, level: 2 },
        3: { litres: 72, level: 3 },
      },
      size: 15000,
      tankID: '9A',
    },
  ],
}

const dips = {
  curDips: [
    {
      date: 20210125,
      fuelDelivery: null,
      fuelType: 'DSL',
      level: 94,
      litres: 8185,
      stationTankID: 'f2a1e74d-2140-46e5-abc0-938fa5a1ed8d',
    },
    {
      date: 20210125,
      fuelDelivery: null,
      fuelType: 'NL',
      level: 116,
      litres: 22897,
      stationTankID: 'c93c0a00-dd0e-409f-856e-f658cd02484a',
    },
    {
      date: 20210125,
      fuelDelivery: null,
      fuelType: 'NL',
      level: 124,
      litres: 14624,
      stationTankID: '7e5cf70b-ef9c-4dfb-a610-fd4a435f10d9',
    },
    {
      date: 20210125,
      fuelDelivery: null,
      fuelType: 'SNL',
      level: 92,
      litres: 8243,
      stationTankID: '9cbe592f-7a3d-4cd7-b7d7-92d87ceb6def',
      __typename: 'Dip',
    },
  ],
  dipOverShortRange: [
    {
      date: 20210124,

      overShort: {
        DSL: { fuelType: 'DSL', tankLitres: 111, overShort: 204.53999999992084, litresSold: 315.53999999992084 },
        NL: { fuelType: 'NL', tankLitres: 6230, overShort: 363.23999999993157, litresSold: 6593.239999999932 },
        SNL: { fuelType: 'SNL', tankLitres: 494, overShort: -65.38999999997122, litresSold: 428.6100000000288 },
      },
      stationID: '8609e349-ccf5-48f8-9960-4663397793db',
    },
    {
      date: 20210125,
      overShort: {
        DSL: { fuelType: 'DSL', tankLitres: 446, overShort: -162.72999999998137, litresSold: 283.2700000000186 },
        NL: { fuelType: 'NL', tankLitres: 7708, overShort: -199.75999999996475, litresSold: 7508.240000000035 },
        SNL: { fuelType: 'SNL', tankLitres: 734, overShort: 32.019999999964966, litresSold: 766.019999999965 },
      },
      stationID: '8609e349-ccf5-48f8-9960-4663397793db',
    },
  ],
  fuelPrice: {
    date: 20210125,
    price: 106.6,
    stationID: '8609e349-ccf5-48f8-9960-4663397793db',
  },
  prevDips: [
    {
      date: 20210124,
      fuelType: 'DSL',
      level: 98,
      litres: 8631,
      stationTankID: 'f2a1e74d-2140-46e5-abc0-938fa5a1ed8d',
    },
    {
      date: 20210124,
      fuelType: 'NL',
      level: 136,
      litres: 27947,
      stationTankID: 'c93c0a00-dd0e-409f-856e-f658cd02484a',
    },
    {
      date: 20210124,
      fuelType: 'NL',
      level: 142,
      litres: 17282,
      stationTankID: '7e5cf70b-ef9c-4dfb-a610-fd4a435f10d9',
    },
    {
      date: 20210124,
      fuelType: 'SNL',
      level: 98,
      litres: 8977,
      stationTankID: '9cbe592f-7a3d-4cd7-b7d7-92d87ceb6def',
    },
  ],
}
