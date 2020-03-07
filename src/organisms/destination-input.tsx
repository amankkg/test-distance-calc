import React, {useRef, useEffect} from 'react'
import {initAutocompleteFor} from 'api'
import {Spinner} from 'molecules'
import {useStoreSelector} from 'store'

type Props = Omit<React.ComponentProps<'input'>, 'onSelect' | 'value' | 'ref'> &
  Readonly<{
    onSelect: (value: Destination, distance?: number) => void
  }>

export const DestinationInput = ({onSelect, ...props}: Props) => {
  const apiReady = useStoreSelector(state => state.app.placesApiReady)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!apiReady || !inputRef.current) return

    return initAutocompleteFor(inputRef.current!, onSelect)
  }, [apiReady, onSelect])

  return (
    <>
      <input {...props} ref={inputRef} />
      {!apiReady && <Spinner style={{height: '5vmax'}} />}
    </>
  )
}
