import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './scss/index.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './components/LoginComponent'
import Register from './components/RegisterComponent'
import NotFound from './components/NotFoundComponent'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
