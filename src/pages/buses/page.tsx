import React from 'react'
import {useStoreSelector} from 'store'
import {Spinner} from 'components'

export const BusesPage = () => {
  const state = useStoreSelector(state => state.buses)

  return (
    <>
      <h1>Available buses</h1>
      {state.pending ? (
        <Spinner />
      ) : (
        <ul>
          {state.entities.map(bus => (
            <li key={bus.id}>
              <p>
                <strong>{bus.make}</strong>
              </p>
              avg. speed is {bus.avgSpeed} km/h
            </li>
          ))}
        </ul>
      )}
      {state.error && <p>{state.error}</p>}
    </>
  )
}
