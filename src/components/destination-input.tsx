import React, {useEffect, useRef} from 'react'

import {initAutocompleteFor} from 'api'
import {Spinner} from 'components'

type Props = Omit<React.ComponentProps<'input'>, 'onSelect' | 'value' | 'ref'> &
  Readonly<{
    apiReady?: boolean
    onSelect: (value: Destination, distance?: number) => void
  }>

export const DestinationInput = ({onSelect, apiReady, ...props}: Props) => {
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
