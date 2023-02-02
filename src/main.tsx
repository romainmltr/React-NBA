import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './scss/index.scss'
import Filter from './components/Filter'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
      <Filter />
  </React.StrictMode>,
)
