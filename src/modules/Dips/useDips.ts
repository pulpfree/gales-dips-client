import React from 'react'

const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date())
const [nextDisabled, setNextDisabled] = React.useState<boolean>(true)
const [stationID, setStationID] = React.useState<string>('')

export const useDips = () => {}
