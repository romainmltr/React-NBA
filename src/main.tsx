import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './scss/index.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthContextProvider  from './context/AuthContext'

import Login from './components/LoginComponent'
import Register from './components/RegisterComponent'
import NotFound from './components/NotFoundComponent'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <AuthContextProvider>
            <Routes>
                <Route path="/app" element={<App />} />

                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Login />} />
                
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthContextProvider>
    </BrowserRouter>
)
