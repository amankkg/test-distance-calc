import React, {useEffect} from 'react'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import './app.css'
import {EstimatePage} from 'features/estimate'
import {useStoreDispatch, useStoreSelector} from 'store'
import {initThunk as busesInitThunk, BusesPage} from 'features/buses'
import {initThunk as driversInitThunk, DriversPage} from 'features/drivers'
import {logoUri} from 'atoms'
import {initPlacesApiThunk} from './slice'

export const App = () => {
  const state = useStoreSelector(state => state.app)
  const dispatch = useStoreDispatch()

  useEffect(() => {
    dispatch(busesInitThunk())
    dispatch(driversInitThunk())

    if (!state.placesApiReady) {
      dispatch(initPlacesApiThunk(process.env.REACT_APP_GOOGLE_MAPS_JS_API_KEY))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const year = new Date().getFullYear()

  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <Link to="/">
            <img src={logoUri} className="app-logo" alt="logo" />
            Estimate trip
          </Link>
          <Link to="/drivers">Drivers</Link>
          <Link to="/buses">Buses</Link>
        </header>
        <main className="app-body">
          {state.error && <p>{state.error}</p>}
          <Switch>
            <Route path="/drivers">
              <DriversPage />
            </Route>
            <Route path="/buses">
              <BusesPage />
            </Route>
            <Route path="/">
              <EstimatePage />
            </Route>
          </Switch>
        </main>
        <footer className="app-footer">
          <a
            href="https://github.com/amankkg"
            target="_blank"
            rel="noopener noreferrer"
          >
            @amankkg
          </a>
          {year}
        </footer>
      </div>
    </BrowserRouter>
  )
}
