import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'

import {rootReducer} from './root-reducer'

export const store = configureStore({
  reducer: rootReducer,
})

if (process.env.NODE_ENV === 'development') {
  module.hot?.accept('./root-reducer', () => {
    const newRootReducer = require('./root-reducer').default

    store.replaceReducer(newRootReducer)
  })
}

type RootState = ReturnType<typeof rootReducer>

export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector

type AppDispatch = typeof store.dispatch

export const useStoreDispatch: () => AppDispatch = useDispatch
