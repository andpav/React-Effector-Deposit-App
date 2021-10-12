import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

import { configureMirage } from './mirage'

import './stores/init'
import './index.css'

if (process.env.NODE_ENV === 'development') {
  configureMirage()
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
