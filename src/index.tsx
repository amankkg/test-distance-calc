import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './service-worker'
import {store} from './store'

const render = () => {
  const App = require('./app').default

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#root'),
  )
}

render()

if (process.env.NODE_ENV === 'development') {
  module.hot?.accept('./app', render)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
