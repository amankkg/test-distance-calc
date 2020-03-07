import React, {useCallback} from 'react'

import {DestinationInput} from 'components'
import {Spinner} from 'components'
import {useStoreDispatch, useStoreSelector} from 'store'

import {Estimates} from './estimates'
import {actions, thunks} from './slice'

export const EstimatePage = () => {
  const state = useStoreSelector(state => state.estimate)
  const dispatch = useStoreDispatch()

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const action =
        e.target.name === 'from' ? actions.setKeywordFrom : actions.setKeywordTo

      dispatch(action(e.target.value))
    },
    [dispatch],
  )

  const onSelectFrom = useCallback(
    (value: Destination) => {
      dispatch(actions.setDestinationFrom(value))
    },
    [dispatch],
  )

  const onSelectTo = useCallback(
    (value: Destination) => {
      dispatch(actions.setDestinationTo(value))
    },
    [dispatch],
  )

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (state.from == null || state.to == null) return

      const options = {from: state.from.location, to: state.to.location}

      dispatch(thunks.fetchDistance(options))
    },
    [state, dispatch],
  )

  return (
    <div>
      <h1>Estimate your trip</h1>
      <form onSubmit={onSubmit}>
        <DestinationInput
          name="from"
          apiReady={state.placesApiReady}
          defaultValue={state.fromKeyword}
          onChange={onChange}
          onSelect={onSelectFrom}
        />
        <br />
        <DestinationInput
          name="to"
          apiReady={state.placesApiReady}
          defaultValue={state.toKeyword}
          onChange={onChange}
          onSelect={onSelectTo}
        />
        <br />
        <button type="submit" disabled={state.pending}>
          submit
        </button>
      </form>
      {state.pending ? <Spinner /> : <Estimates />}
      {state.error && <p>{state.error}</p>}
    </div>
  )
}
