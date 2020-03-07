import React, {useEffect} from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'

import {BusesPage, initThunk as busesInitThunk} from './pages/buses'
import {DriversPage, initThunk as driversInitThunk} from './pages/drivers'
import {EstimatePage} from './pages/estimate'
import {initPlacesApiThunk} from './pages/estimate'
import {logoUri} from './components'
import {useStoreDispatch, useStoreSelector} from './store'

import './app.css'

const App = () => {
  const placesApiReady = useStoreSelector(
    state => state.estimate.placesApiReady,
  )
  const dispatch = useStoreDispatch()

  useEffect(() => {
    dispatch(busesInitThunk())
    dispatch(driversInitThunk())

    if (!placesApiReady) {
      dispatch(initPlacesApiThunk())
    }
  }, [placesApiReady, dispatch])

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

export default App
