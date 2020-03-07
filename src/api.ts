import nanoid from 'nanoid'

export const fetchGoogleMapsJsApi = (apiKey: string) => {
  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
  script.async = true

  return new Promise((resolve, reject) => {
    script.addEventListener('load', resolve)
    script.addEventListener('error', reject)

    document.body.appendChild(script)
  })
}

type Options = {
  element: HTMLInputElement,
  origin?: LatLng,
  onSelect: (destination: Destination, distance?: number) => void,
}

export const initAutocompleteFor = (options: Options) => {
  const autocompleteOptions = {
    types: ['(cities)'],
    fields: ['place_id', 'address_components', 'geometry'],
  }

  // @ts-ignore
  if (origin) autocompleteOptions.origin = origin

  const autocomplete = new google.maps.places.Autocomplete(options.element, autocompleteOptions)

  const onPlaceChanged = () => {
    const addressObject = autocomplete.getPlace()
    const address = addressObject.address_components
    const coords = addressObject.geometry?.location

    if (address && coords)
      options.onSelect({
        id: addressObject.place_id || nanoid(),
        name: address[0].long_name,
        location: [coords.lat(), coords.lng()]
      })
  }

  autocomplete.addListener('place_changed', onPlaceChanged)

  return () => autocomplete.unbindAll()
}

let acService: google.maps.places.AutocompleteService

export const getPredictions = (input: string, origin?: LatLng) => {
  if (!acService) acService = new google.maps.places.AutocompleteService()

  const options = {input, types: ['(cities)']}

  // @ts-ignore
  if (origin) options.origin = origin

  return new Promise<google.maps.places.AutocompletePrediction[]>((resolve, reject) => {
    acService.getPlacePredictions(
      options,
      (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) resolve(predictions)
        else reject(new Error(status))
      }
    )
  })
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

let i = 0

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
