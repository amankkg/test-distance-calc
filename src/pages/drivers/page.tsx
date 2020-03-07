import React, {useMemo} from 'react'

import {Spinner} from 'components'
import {useStoreSelector} from 'store'

export const DriversPage = () => {
  const state = useStoreSelector(state => ({
    drivers: state.drivers.entities,
    buses: state.buses.entities,
    pending: state.drivers.pending,
    error: state.drivers.error,
  }))

  const driversWithBuses = useMemo(
    () =>
      state.drivers.map(({availableBuses, ...driver}) => ({
        ...driver,
        buses: state.buses.filter(bus => availableBuses.includes(bus.id)),
      })),
    [state.drivers, state.buses],
  )

  return (
    <>
      <h1>Available drivers</h1>
      {state.pending ? (
        <Spinner />
      ) : (
        <ul>
          {driversWithBuses.map(driver => (
            <li key={driver.id} className="list-item">
              <p>
                <strong>
                  👤 {driver.firstName} {driver.lastName}
                </strong>
              </p>
              {driver.buses.map(bus => (
                <p key={bus.id}>
                  🚍 {bus.make}, avg. speed: {bus.avgSpeed} km/h
                </p>
              ))}
            </li>
          ))}
        </ul>
      )}
      {state.error && <p className="error">{state.error}</p>}
    </>
  )
}
