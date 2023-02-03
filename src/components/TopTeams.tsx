import {useEffect, useState} from 'react'

// @ts-ignore
function TopTeams() {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch('https://www.balldontlie.io/api/v1/games?per_page=100')
            .then(response => response.json())
            .then(data => setItems(data.data))
    }, [])

    const arrayRating = []

    items.forEach(obj => {

        const duplicateHomeName = arrayRating.some(objNew => objNew.full_name === obj.home_team.full_name)

        if(!duplicateHomeName) {
            arrayRating.push({full_name: obj.home_team.full_name , score: obj.home_team_score})
        } else {
            const objDuplicateId = arrayRating.findIndex(objNew => objNew.full_name === obj.home_team.full_name)
            arrayRating[objDuplicateId].score += obj.home_team_score
        }

        const duplicateVisitorName = arrayRating.some(objNew => objNew.full_name === obj.visitor_team.full_name)

        if(!duplicateVisitorName) {
            arrayRating.push({full_name: obj.visitor_team.full_name , score: obj.visitor_team_score})
        }else {
            const objDuplicateId = arrayRating.findIndex(objNew => objNew.full_name === obj.visitor_team.full_name)
            arrayRating[objDuplicateId].score += obj.visitor_team_score
        }
    })

    //get the 10 highest scores of the array
    const topTen = arrayRating.sort((a, b) => b.score - a.score).slice(0, 15)

    // @ts-ignore
    return (
        <div className="TopTeams p-8">
            <h1 className="text-2xl font-bold mb-10">Top Teams</h1>
            <ul className="flex flex-col gap-3">
                {topTen.map((obj, index) => (
                    <li key={index}>
                        <div className="flex items-center justify-between">
                            <p>{obj.full_name}</p>
                            <p className="text-purple font-bold">{obj.score}</p>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default TopTeams
