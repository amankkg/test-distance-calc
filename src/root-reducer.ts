import {combineReducers} from '@reduxjs/toolkit'

import {reducer as estimate} from './features/estimate'
import {reducer as buses} from './features/buses'
import {reducer as drivers} from './features/drivers'

export const rootReducer = combineReducers({
  estimate,
  buses,
  drivers,
})
