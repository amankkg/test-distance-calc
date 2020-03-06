import nanoid from 'nanoid'

export const cities: Destination[] = [
  {id: nanoid(), name: 'Moscow', latitude: 0, longitude: 0},
  {id: nanoid(), name: 'Kazan', latitude: 0, longitude: 0},
]

export const buses: Bus[] = [
  {id: nanoid(), make: 'Make A', avgSpeed: 75},
  {id: nanoid(), make: 'Make B', avgSpeed: 80},
  {id: nanoid(), make: 'Make C', avgSpeed: 85},
]

export const drivers: Driver[] = [
  {
    id: nanoid(),
    firstName: 'John',
    lastName: 'Doe',
    availableBuses: [buses[0].id, buses[1].id],
  },
  {
    id: nanoid(),
    firstName: 'Jane',
    lastName: 'Doe',
    availableBuses: [buses[1].id, buses[2].id],
  },
]

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))
