import React, {useCallback} from 'react'

import {DestinationInput} from 'components'
import {Spinner} from 'components'
import {useStoreDispatch, useStoreSelector} from 'store'

import {Estimates} from './estimates'
import {actions, thunks} from './slice'

import './page.css'

export const EstimatePage = () => {
  const state = useStoreSelector(state => state.estimate)
  const dispatch = useStoreDispatch()

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const action =
        e.target.id === 'from' ? actions.setKeywordFrom : actions.setKeywordTo

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

      const notReady =
        state.from == null || state.to == null || state.to.id === state.from.id

      if (notReady) return

      const options = {from: state.from!.location, to: state.to!.location}

      dispatch(thunks.fetchDistance(options))
    },
    [state.from, state.to, dispatch],
  )

  const estimationDisallowed =
    state.pending || !state.from || !state.to || state.from.id === state.to.id

  return (
    <div>
      <h1>Estimate your trip</h1>
      <form onSubmit={onSubmit} className="estimate-page__form">
        <p className="estimate-page__form-field">
          <label htmlFor="from">From</label>
          <DestinationInput
            id="from"
            apiReady={state.placesApiReady}
            defaultValue={state.fromKeyword}
            onChange={onChange}
            onSelect={onSelectFrom}
          />
        </p>
        <p className="estimate-page__form-field">
          <label htmlFor="to">To</label>
          <DestinationInput
            id="to"
            apiReady={state.placesApiReady}
            defaultValue={state.toKeyword}
            onChange={onChange}
            onSelect={onSelectTo}
          />
        </p>
        <button type="submit" disabled={estimationDisallowed}>
          Estimate
        </button>
      </form>
      {state.pending ? <Spinner /> : <Estimates />}
      {state.error && <p className="error">{state.error}</p>}
    </div>
  )
}
