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

export const initAutocompleteFor = (
  element: HTMLInputElement,
  onSelect: (destination: Destination) => void,
) => {
  const options = {
    types: ['(cities)'],
    fields: ['place_id', 'address_components', 'geometry'],
  }

  const autocomplete = new google.maps.places.Autocomplete(element, options)

  const onPlaceChanged = () => {
    const addressObject = autocomplete.getPlace()
    const address = addressObject.address_components
    const coords = addressObject.geometry?.location

    if (address && coords && addressObject.place_id) {
      onSelect({
        id: addressObject.place_id,
        name: element.value,
        location: [coords.lat(), coords.lng()],
      })
    }
  }

  const listener = autocomplete.addListener('place_changed', onPlaceChanged)

  return () => {
    listener.remove()
  }
}

let dmService: google.maps.DistanceMatrixService

export const getDistance = (from: LatLng, to: LatLng) => {
  if (!dmService) dmService = new google.maps.DistanceMatrixService()

  const requestOptions = {
    origins: [new google.maps.LatLng(...from)],
    destinations: [new google.maps.LatLng(...to)],
    travelMode: google.maps.TravelMode.DRIVING,
  }

  return new Promise<google.maps.DistanceMatrixResponse>((resolve, reject) => {
    dmService.getDistanceMatrix(requestOptions, (response, status) => {
      if (++i % 3 === 0) reject(new Error('test error'))
      if (status === google.maps.DistanceMatrixStatus.OK) resolve(response)
      else reject(new Error(status))
    })
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
