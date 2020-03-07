/// <reference types="react-scripts" />

declare interface NodeModule {
  hot?: {
    accept: (watchPath: string, watchCallback: () => void) => void
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_GOOGLE_MAPS_JS_API_KEY: string
  }
}

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
  location: LatLng
}

type LatLng = [number, number]
