import React from 'react'
import {useStoreSelector, useStoreDispatch} from 'store'
import {DestinationInput} from 'organisms'
import {actions} from './slice'
import {Estimates} from './estimates'

export const EstimatePage = () => {
  const state = useStoreSelector(state => state.estimate)
  const dispatch = useStoreDispatch()

  const onChangeFrom = (value: string) =>
    dispatch(actions.setKeywordFrom(value))

  const onSelectFrom = (value: Destination, distance?: number) =>
    dispatch(actions.setDestinationFrom({...value, distance}))

  const onChangeTo = (value: string) => dispatch(actions.setKeywordTo(value))

  const onSelectTo = (value: Destination, distance?: number) =>
    dispatch(actions.setDestinationTo({...value, distance}))

  return (
    <div>
      <h1>Estimate your trip</h1>
      <DestinationInput
        name="from"
        keyword={state.fromKeyword}
        origin={state.to?.location}
        onEdit={onChangeFrom}
        onSelect={onSelectFrom}
      />
      <br />
      <DestinationInput
        name="to"
        keyword={state.toKeyword}
        origin={state.from?.location}
        onEdit={onChangeTo}
        onSelect={onSelectTo}
      />
      <br />
      <Estimates />
    </div>
  )
}
