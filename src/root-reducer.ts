import {combineReducers} from '@reduxjs/toolkit'

import {reducer as estimate} from './features/estimate'

export const rootReducer = combineReducers({
  estimate,
})
