export const getEstimateOptions = (drivers: Driver[], buses: Bus[]) => {
  const driverMap = new Map(drivers.map(driver => [driver.id, driver]))
  const busMap = new Map(buses.map(bus => [bus.id, bus]))
  const options = drivers.flatMap(driver =>
    driver.availableBuses
      .filter(busMap.has, busMap)
      .map(busId => [driver.id, busId] as const),
  )

  return (distance: number) => {
    const estimateOptions = options.map(([driverId, busId]) => {
      const estimate = distance / 1000 / busMap.get(busId)!.avgSpeed

      return [driverMap.get(driverId)!, busMap.get(busId)!, estimate] as const
    })

    estimateOptions.sort(
      ([, , estimateA], [, , estimateB]) => estimateA - estimateB,
    )

    return estimateOptions
  }
}
