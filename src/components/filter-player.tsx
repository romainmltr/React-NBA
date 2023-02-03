import {useEffect, useState} from 'react'
    function PlayerDashoard({currentPlayer} :any) {
        const [player, setPlayer] = useState()


    useEffect(() => {
        fetch(`https://www.balldontlie.io/api/v1/players/${currentPlayer}`)
            .then(response =>  response.json())
            .then(data => setPlayer(data))
        console.log(player)
    }, [currentPlayer])


    return (
        <div className="PlayerOne">
            <div className="bg-blue-700 hover:bg-blue-800  rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <div className="mb-8 flex place-content-evenly ">
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor"
                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </div>

                    <p>
                        <span className="text-white font-bold">{player?.first_name} {player?.last_name}</span>
                        {player?.team.full_name}
                        <span className="text-white font-bold">{player?.division}</span>

                    </p>




                </div>
            </div>
        </div>
        )
    }

export default PlayerDashoard
