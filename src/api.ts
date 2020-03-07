import nanoid from 'nanoid'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

let i = 0

export const fetchDestinationSuggestions = async (keyword: string) => {
  await sleep(1500)

  if (++i % 5 === 0) throw new Error('some error')

  return cities
}

export const calculateDistance = async (from: Destination, to: Destination) => {
  await sleep(2000)
  if (++i % 5 === 0) throw new Error('some error')

  return i % 2 === 0 ? 1500 : 1200
}

export const fetchBuses = async () => {
  await sleep(500)
  if (++i % 5 === 0) throw new Error('some error')

  const raw = localStorage.getItem('buses')

  return JSON.parse(raw!) as Bus[]
}

export const fetchDrivers = async () => {
  await sleep(500)
  if (++i % 5 === 0) throw new Error('some error')

  const raw = localStorage.getItem('drivers')

  return JSON.parse(raw!) as Driver[]
}

const seed = async () => {
  if (localStorage.getItem('buses') && localStorage.getItem('drivers')) return

  const data = await import('./seed.json')

  const buses = data.buses.map(bus => ({...bus, id: nanoid()}))
  const drivers = data.drivers.map(bus => ({
    ...bus,
    id: nanoid(),
    availableBuses: bus.availableBuses
      .map(index => buses.find((_, i) => index === i)?.id)
      .filter(id => id !== undefined),
  }))

  localStorage.setItem('buses', JSON.stringify(buses))
  localStorage.setItem('drivers', JSON.stringify(drivers))
}

seed()
