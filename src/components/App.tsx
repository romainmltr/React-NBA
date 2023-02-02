import {useEffect, useState} from 'react'
import reactLogo from '../assets/react.svg'
import '../scss/views/App.scss'
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import MatchesList from "./MatchesList";


function App() {

    // @ts-ignore
    return (
        <div className="App">
            <MatchesList />
        </div>
    )
}

export default App
