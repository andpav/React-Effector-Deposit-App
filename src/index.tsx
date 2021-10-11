import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'

import { configureMirage } from './mirage'

import './stores/init'

if (process.env.NODE_ENV === 'development') {
  configureMirage()
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
