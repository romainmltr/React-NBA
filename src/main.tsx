import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './scss/index.scss'
import MatchesList from "./components/MatchesList";
import {BrowserRouter} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </React.StrictMode>,
)
