import {cities, sleep} from './stub'

export const fetchDestinationSuggestions = async (keyword: string) => {
  await sleep(1500)

  return cities
}

export const calculateDistance = async (from: Destination, to: Destination) => {
  await sleep(2000)

  return from.name === cities[0].name ? 1500 : 1200
}
