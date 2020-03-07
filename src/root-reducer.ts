import {combineReducers} from '@reduxjs/toolkit'

import {reducer as estimate} from './features/estimate'
import {reducer as buses} from './features/buses'
import {reducer as drivers} from './features/drivers'
import {reducer as app} from './app'

export const rootReducer = combineReducers({
  estimate,
  buses,
  drivers,
  app,
})
