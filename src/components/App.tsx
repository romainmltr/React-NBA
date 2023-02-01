import {useEffect, useState} from 'react'
import reactLogo from '../assets/react.svg'
import '../scss/views/App.scss'

function App() {
    const [items, setItems] = useState([])
    
    useEffect(() => {
        fetch('https://www.balldontlie.io/api/v1/games')
            .then(response => response.json())
            .then(data => setItems(data.data))
    }, [])

    console.log(items)

    return (
    <div className="App">
        <div className="matches-container">
            <h3>All matches</h3>
            <div className="matches-wrapper">
                {items.map((item:any) => (
                    <div className="match-cell" key={item.id}>
                        <div className="match-date">
                            <p>2018-10-16</p>
                        </div>
                        <div className="match-details">
                            <div className="match-home-team">
                                <p>{item.home_team.full_name}</p>
                            </div>
                            <div className="match-score">
                                <p>{item.home_team_score} : {item.visitor_team_score}</p>
                            </div>
                            <div className="match-visitor-team">
                                <p>{item.visitor_team.full_name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default App
