import React, {useState, useEffect} from 'react'
import {fetchDestinationSuggestions} from 'api'
import {Spinner} from 'molecules'

type Props = Omit<
  React.ComponentProps<'input'>,
  'onChange' | 'onSelect' | 'value'
> &
  Readonly<{
    keyword: string
    onEdit: (value: string) => void
    onSelect: (value: Destination) => void
  }>

export const DestinationInput = ({
  onSelect,
  onEdit,
  disabled,
  keyword,
  ...props
}: Props) => {
  const [options, setOptions] = useState([] as Destination[])
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null as string | null)

  // TODO: possible memory leak since setState can occur when component is unmounted
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const options = await fetchDestinationSuggestions(keyword)

        setOptions(options)
      } catch (error) {
        setError(error.message)
      }

      setPending(false)
    }

    setPending(true)
    setError(null)
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
      {pending && <Spinner style={{height: '2vmax'}} />}
      {error && <p>{error}</p>}
    </>
  )
}
