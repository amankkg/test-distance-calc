import React from 'react'
import {useStoreSelector, useStoreDispatch} from '../../store'
import {DestinationInput} from '../../organisms'
import {actions, thunks} from './slice'
import {Estimates} from './estimates'

export const EstimatePage = () => {
  const state = useStoreSelector(state => state.estimate)

  const dispatch = useStoreDispatch()

  const onChangeFrom = (value: string) =>
    dispatch(actions.setKeywordFrom(value))
  const onSelectFrom = (value: Destination) =>
    dispatch(actions.setDestinationFrom(value))
  const onChangeTo = (value: string) => dispatch(actions.setKeywordTo(value))
  const onSelectTo = (value: Destination) =>
    dispatch(actions.setDestinationTo(value))

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (state.from == null || state.to == null) return

    dispatch(thunks.fetchDistance({from: state.from, to: state.to}))
  }

  return (
    <div>
      <h1>Estimate your trip</h1>
      <form onSubmit={onSubmit}>
        <DestinationInput
          name="from"
          keyword={state.fromKeyword}
          onEdit={onChangeFrom}
          onSelect={onSelectFrom}
        />
        <DestinationInput
          name="to"
          keyword={state.toKeyword}
          onEdit={onChangeTo}
          onSelect={onSelectTo}
        />
        <button type="submit" disabled={state.pending}>
          submit
        </button>
      </form>
      {state.error && <p>{state.error}</p>}
      <Estimates distance={state.distance} />
    </div>
  )
}
