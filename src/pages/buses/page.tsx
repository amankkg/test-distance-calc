import React from 'react'

import {Spinner} from 'components'
import {useStoreSelector} from 'store'

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
            <li key={bus.id} className="list-item">
              <p>
                <strong>🚍 {bus.make}</strong>
              </p>
              avg. speed is {bus.avgSpeed} km/h
            </li>
          ))}
        </ul>
      )}
      {state.error && <p className="error">{state.error}</p>}
    </>
  )
}
