import React, {useEffect} from 'react'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import './app.css'
import {EstimatePage} from './features/estimate'
import {useStoreDispatch} from './store'
import {initThunk as busesInitThunk, BusesPage} from './features/buses'
import {initThunk as driversInitThunk, DriversPage} from './features/drivers'
import {logoUri} from './atoms'

function App() {
  const dispatch = useStoreDispatch()

  useEffect(() => {
    dispatch(busesInitThunk())
    dispatch(driversInitThunk())
  }, [dispatch])

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
