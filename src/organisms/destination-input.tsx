import React, {useRef, useEffect} from 'react'
import {initAutocompleteFor} from 'api'
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
  const inputRef = useRef(null)

  useEffect(() => {
    if (!apiReady || !inputRef.current) return

    initAutocompleteFor({
      element: inputRef.current!,
      origin,
      onSelect: (destination: Destination, distance?: number) => {
        onEdit(destination.name)
        onSelect(destination, distance)
      }
    })
  }, [apiReady, onSelect, onEdit, origin])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit(e.target.value)
  }

  return (
    <>
      <input
        {...props}
        ref={inputRef}
        value={keyword}
        onChange={handleChange}
        type="text"
      />
      {!apiReady && <Spinner style={{height: '5vmax'}} />}
    </>
  )
}
