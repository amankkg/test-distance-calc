import {cities, sleep, buses, drivers} from './stub'

let i = 0

export const fetchDestinationSuggestions = async (keyword: string) => {
  await sleep(1500)

  if (++i % 5 === 0) throw new Error('some error')

  return cities
}

export const calculateDistance = async (from: Destination, to: Destination) => {
  await sleep(2000)
  if (++i % 5 === 0) throw new Error('some error')

  return from.name === cities[0].name ? 1500 : 1200
}

export const fetchBuses = async () => {
  await sleep(500)
  if (++i % 5 === 0) throw new Error('some error')

  return buses
}

export const fetchDrivers = async () => {
  await sleep(500)
  if (++i % 5 === 0) throw new Error('some error')

  return drivers
}
