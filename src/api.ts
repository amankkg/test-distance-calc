import seedData from './seed.json'

export const fetchBuses = new Promise<Bus[]>(resolve => {
  setTimeout(resolve, 300, seedData.buses)
})

export const fetchDrivers = new Promise<Driver[]>(resolve => {
  setTimeout(resolve, 300, seedData.drivers)
})

export const fetchGoogleMapsJsApi = new Promise((resolve, reject) => {
  const script = document.createElement('script')

  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_JS_API_KEY}&libraries=places`
  script.async = true
  script.addEventListener('load', resolve)
  script.addEventListener('error', reject)

  document.body.appendChild(script)
})

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
    const coords = addressObject.geometry?.location

    if (coords && addressObject.place_id) {
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

let distanceSvc: google.maps.DistanceMatrixService

export const getDistance = (from: LatLng, to: LatLng) =>
  new Promise<google.maps.DistanceMatrixResponse>((resolve, reject) => {
    if (!distanceSvc) distanceSvc = new google.maps.DistanceMatrixService()

    const requestOptions = {
      origins: [new google.maps.LatLng(...from)],
      destinations: [new google.maps.LatLng(...to)],
      travelMode: google.maps.TravelMode.DRIVING,
    }

    distanceSvc.getDistanceMatrix(requestOptions, (response, status) => {
      if (status === google.maps.DistanceMatrixStatus.OK) resolve(response)
      else reject(new Error(status))
    })
  })
