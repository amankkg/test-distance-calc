type Driver = {
  id: string
  firstName: string
  lastName: string
  availableBuses: Bus['id'][]
}

type Bus = {
  id: string
  make: string
  avgSpeed: number
}

type Destination = {
  id: string
  name: string
  longitude: number
  latitude: number
}
