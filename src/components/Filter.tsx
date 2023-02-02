import React, {useState, useEffect} from "react";

function FilterSidebar() {
    const [teams, setTeams] = useState([]);
    const [locationFilter, setLocationFilter] = useState("");
    const [players, setPlayers] = useState([]);
    const [positionFilter, setPositionFilter] = useState("");

    // Part for the teams
    useEffect(() => {
        fetch("https://www.balldontlie.io/api/v1/teams")
            .then(response => response.json())
            .then(data => setTeams(data.data));
    }, []);

    //console.log(teams);
    const handleTeamFilterChange = filter => {
        setLocationFilter(filter);
    };

    const filteredTeams = teams.filter(team => locationFilter === "" || team.conference === locationFilter);

    // Part for the players

    useEffect(() => {
        fetch("https://www.balldontlie.io/api/v1/players")
            .then(response => response.json())
            .then(data => setPlayers(data.data));
    }, []);

    const handlePositionFilterChange = filter => {
        setPositionFilter(filter);
    };

    const filteredPlayers = players.filter(player => positionFilter === "" || player.position === positionFilter);


    return (
        <div>
            <button data-drawer-target="sidebar-multi-level-sidebar"
                    data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>

            </button>

            <aside id="sidebar-multi-level-sidebar"
                   className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                   aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2">
                        <li>
                            <a href="#"
                               className="flex flex-col p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                                <img src="src/assets/NBA-logo-illustration.jpg"  className="scale-50"></img>
                                <span className="ml-3">Information NBA </span>
                            </a>

                        </li>
                        <li>
                            <button type="button"
                                    className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    aria-controls="dropdown-example" data-collapse-toggle="dropdown-example"
                                    id="location-filter">
                                <span className="flex-1 ml-3 text-left whitespace-nowrap"
                                      sidebar-toggle-item>Division</span>
                                <svg sidebar-toggle-item className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clip-rule="evenodd">
                                    </path>
                                </svg>
                            </button>
                            <ul id="dropdown-example" className="hidden py-2 space-y-2">
                                <button
                                    className="flex items-center w-1/12  font-normal text-gray-400 transition duration-75  group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-300"
                                    onClick={() => handleTeamFilterChange("")}
                                    className={locationFilter === "" ? "active" : ""}>Toutes
                                </button>
                                <button
                                    className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    onClick={() => handleTeamFilterChange("East")}
                                    className={locationFilter === "East" ? "active" : ""}>Est
                                </button>
                                <button
                                    className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    onClick={() => handleTeamFilterChange("West")}
                                    className={locationFilter === "West" ? "active" : ""}>Ouest
                                </button>
                                <ul>
                                    {filteredTeams.map(team => (
                                        <a href="#" className="lex items-center p-2 text-base font-normal text-gray-900 dark:text-white">
                                            <li key={team.id}>{team.full_name}</li>
                                        </a>
                                    ))}
                                </ul>
                            </ul>
                        </li>







                        <li>
                            <button type="button"
                                className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-example-2" data-collapse-toggle="dropdown-example-2"
                                id="location-filterPlayer">
                                <span className="flex-1 ml-3 text-left whitespace-nowrap"
                                      sidebar-toggle-item>Player</span>
                            <svg sidebar-toggle-item className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                      clip-rule="evenodd">
                                </path>
                            </svg>
                        </button>
                        <li>
                            <ul id="dropdown-example-2" className="hidden py-2 space-y-2">
                                <button
                                    className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    onClick={() => handlePositionFilterChange("G")}>Shooting Guard
                                </button>
                                <button
                                    className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    onClick={() => handlePositionFilterChange("F")}>Small Forward
                                </button>
                                <button
                                    className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    onClick={() => handlePositionFilterChange("G")}>Power Forward
                                </button>
                                <button
                                    className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    onClick={() => handlePositionFilterChange("C")}>Point Guard
                                </button>
                                <ul>
                                    {filteredPlayers.map(player => (
                                        <a href="#" className="lex items-center p-2 text-base font-normal text-gray-900 dark:text-white">
                                        <li key={player.id}>{player.first_name} {player.last_name}</li>
                                        </a>
                                    ))}
                                </ul>
                            </ul>
                            </li>
                        </li>
                    </ul>
                </div>
            </aside>

        </div>
    );
}


export default FilterSidebar;
