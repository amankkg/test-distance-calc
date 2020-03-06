import React, {useState, useEffect} from 'react'
import {fetchDestinationSuggestions} from '../api'

type Props = Omit<
  React.ComponentProps<'input'>,
  'onChange' | 'onSelect' | 'value'
> & {
  keyword: string
  onEdit: (value: string) => void
  onSelect: (value: Destination) => void
}

export const DestinationInput = ({
  onSelect,
  onEdit,
  disabled,
  keyword,
  ...props
}: Props) => {
  const [options, setOptions] = useState([] as Destination[])
  const [pending, setPending] = useState(false)

  useEffect(() => {
    setPending(true)

    const fetchOptions = async () => {
      const options = await fetchDestinationSuggestions(keyword)

      setOptions(options)
      setPending(false)
    }

    fetchOptions()
  }, [keyword])

  return (
    <>
      <input
        {...props}
        onChange={e => onEdit(e.target.value)}
        value={keyword}
      />
      <select
        onChange={e => onSelect(options[e.target.selectedIndex])}
        disabled={disabled || pending}
      >
        {options.map(({name}) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </>
  )
}
