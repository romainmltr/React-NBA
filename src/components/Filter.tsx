import React, {useState, useEffect} from "react";

function TeamsList() {
    const [teams, setTeams] = useState([]);
    const [locationFilter, setLocationFilter] = useState("");

    useEffect(() => {
        fetch("https://www.balldontlie.io/api/v1/teams")
            .then(response => response.json())
            .then(data => setTeams(data.data));
    }, []);
    //console.log(teams);
    const handleFilterChange = filter => {
        setLocationFilter(filter);
    };

    const filteredTeams = teams.filter(team => locationFilter === "" || team.conference === locationFilter);

    return (
        <div>
            <button data-drawer-target="sidebar-multi-level-sidebar"
                    data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd"
                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="sidebar-multi-level-sidebar"
                   className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                   aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2">
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true"
                                     className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                </svg>
                                <span className="ml-3">Dashboard</span>
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
                                    onClick={() => handleFilterChange("")}
                                    className={locationFilter === "" ? "active" : ""}>Toutes
                                </button>
                                <button
                                    className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    onClick={() => handleFilterChange("East")}
                                    className={locationFilter === "East" ? "active" : ""}>Est
                                </button>
                                <button
                                    className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    onClick={() => handleFilterChange("West")}
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

                    </ul>
                </div>
            </aside>
        </div>
    );
}


export default TeamsList;
