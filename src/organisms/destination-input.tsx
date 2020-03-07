import React, {useRef, useEffect, useState} from 'react'
import {initAutocompleteFor, getPredictions} from 'api'
import {Spinner} from 'molecules'
import {useStoreSelector} from 'store'

type Props = Omit<
  React.ComponentProps<'input'>,
  'onChange' | 'onSelect' | 'value'
> &
  Readonly<{
    keyword: string
    origin?: LatLng
    onEdit: (value: string) => void
    onSelect: (value: Destination, distance?: number) => void
  }>

export const DestinationInput = ({
  keyword,
  origin,
  onSelect,
  onEdit,
  ref,
  ...props
}: Props) => {
  const apiReady = useStoreSelector(state => state.app.placesApiReady)
  const [loading, setLoading] = useState(false)
  const [{predictions, error}, setPredictions] = useState<{
    predictions: google.maps.places.AutocompletePrediction[],
    error: string | null
  }>({predictions: [], error: null})

  useEffect(() => {
    if (!apiReady) return

    if (keyword === '') {
      setPredictions({predictions: [], error: null})
      return
    }

    setLoading(true)

    const load = async () => {
      try {
        const predictions = await getPredictions(keyword, origin)

        setPredictions({predictions, error: null})
      } catch (error) {
        setPredictions({predictions: [], error: error.message})
      }

    setLoading(false)
    }

    load()
  }, [apiReady, keyword, origin])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit(e.target.value)
  }

  return (
    <>
      <input
        {...props}
        value={keyword}
        onChange={handleChange}
        type="text"
      />
      {predictions.map(p => <p key={p.place_id}>{p.place_id} | {p.description}</p>)}
      {(!apiReady || loading) && <Spinner style={{height: '5vmax'}} />}
      {error && <p>{error}</p>}
    </>
  )
}
