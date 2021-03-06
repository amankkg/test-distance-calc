import {combineReducers} from '@reduxjs/toolkit'

import {reducer as buses} from './pages/buses'
import {reducer as drivers} from './pages/drivers'
import {reducer as estimate} from './pages/estimate'

export const rootReducer = combineReducers({
  estimate,
  buses,
  drivers,
})
