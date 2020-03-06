import React, {useMemo} from 'react'

import {getEstimateOptions} from './core'
import {useStoreSelector} from 'store'

type Props = Readonly<{
  distance: null | number
}>

export const Estimates = ({distance}: Props) => {
  const {drivers, buses} = useStoreSelector(state => ({
    drivers: state.drivers.entities,
    buses: state.buses.entities,
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
      <h2>Available options</h2>
      <ul>
        {estimations.length > 0 ? (
          estimations.map(([driver, bus, value]) => (
            <li key={`${driver.id}:${bus.id}:${value}`}>
              <p>
                {driver.firstName} {driver.lastName} | {bus.make}
              </p>
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
