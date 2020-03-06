import React from 'react'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import logo from './logo.svg'
import './app.css'
import {EstimatePage} from './features/estimate'

function App() {
  const year = new Date().getFullYear()

  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <Link to="/">
            <img src={logo} className="app-logo" alt="logo" />
            Estimate trip
          </Link>
          <Link to="/drivers">Drivers</Link>
          <Link to="/buses">Buses</Link>
        </header>
        <main className="app-body">
          <Switch>
            <Route path="/drivers">
              <p>drivers</p>
            </Route>
            <Route path="/buses">
              <p>buses</p>
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
