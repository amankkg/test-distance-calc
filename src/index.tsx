import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
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
