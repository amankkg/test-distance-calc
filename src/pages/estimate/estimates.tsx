import React, {useMemo} from 'react'

import {useStoreSelector} from 'store'

import {getEstimateOptions} from './core'

export const Estimates = () => {
  const {drivers, buses, distance} = useStoreSelector(state => ({
    drivers: state.drivers.entities,
    buses: state.buses.entities,
    distance: state.estimate.distance,
  }))

  const estimate = useMemo(() => getEstimateOptions(drivers, buses), [
    drivers,
    buses,
  ])

  const estimations = useMemo(
    () => (distance != null ? estimate(distance) : []),
    [estimate, distance],
  )

  return (
    <>
      {distance && (
        <h3>Route distance is ~{(distance / 1000).toFixed(1)} km</h3>
      )}
      <h3>Transfer options</h3>
      <ul>
        {estimations.length > 0 ? (
          estimations.map(([driver, bus, value]) => (
            <li key={`${driver.id}:${bus.id}`} className="list-item">
              <p>
                👤 {driver.firstName} {driver.lastName} | 🚍 {bus.make}
              </p>
              <strong>⏳ {value.toFixed(1)} hrs</strong> or{' '}
              <strong>~{(value / 8).toFixed(1)} day(s)</strong>
            </li>
          ))
        ) : (
          <li>no options</li>
        )}
      </ul>
    </>
  )
}
