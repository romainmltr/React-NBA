import {
	useState,
	useEffect,
	SetStateAction,
} from "react";
import MatchesList from "./MatchesListComponent";
import PlayerDashboard from "./filterPlayerComponent";
import TopTeams from "./TopTeamsComponent";
import { Team } from "../types/TeamType";
import { Player } from "../types/PlayerType";
import { getTeams } from "../services/TeamServices";
import { getPlayers } from "../services/PlayerServices";

function FilterSidebar() {
	const [teams, setTeams] = useState<Team[]>([]);
	const [locationFilter, setLocationFilter] = useState("");
	const [players, setPlayers] = useState<Player[]>([]);
	const [positionFilter, setPositionFilter] = useState("");
	const [currentPlayer, setCurrentPlayer] = useState(13);
	const [currentTeam, setCurrentTeam] = useState(1);
	const userName = localStorage.getItem("userName");

	useEffect(() => {
		getTeams().then((data) => setTeams(data.data));
		getPlayers().then((data) => setPlayers(data.data));
	}, []);

	const handleTeamFilterChange = (filter: SetStateAction<string>) => {
		setLocationFilter(filter);
	};

	const filteredTeams = teams.filter(
		(team: Team) => locationFilter === "" || team.conference === locationFilter
	);

	const handlePositionFilterChange = (filter: SetStateAction<string>) => {
		setPositionFilter(filter);
	};

	const filteredPlayers = players.filter(
		(player: Player) => positionFilter === "" || player.position === positionFilter
	);

	return (
		<div>
			<button
				data-drawer-target="sidebar-multi-level-sidebar"
				data-drawer-toggle="sidebar-multi-level-sidebar"
				aria-controls="sidebar-multi-level-sidebar"
				type="button"
				className="hidden inline-flex items-center p-2 mt-2 ml-3 rounded-lg bg-red-600 hover:bg-gray-100 focus:outline-none "
			>
				<span className="sr-only text-amber-50">Open sidebar</span>
			</button>

			<aside
				id="sidebar-multi-level-sidebar"
				className="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0"
				aria-label="Sidebar"
			>
				<div className="h-full px-3 py-4 overflow-y-auto bg-darkgray">
					<ul className="space-y-2">
						<li className="mb-8">
							<p className="p-2 text-xl text-white uppercase font-bold">
								nba tracker
							</p>
						</li>
						<li>
							<p className="flex flex-col p-2 text-white font-bold capitalize text-base">
								Filter matches & player
							</p>
						</li>
						<li className="pb-2">
							<button
								type="button"
								className="flex items-center w-full p-2 text-base font-normal transition bg-lightgray focus:outline-purple duration-75 rounded-lg group text-white hover:bg-darkgrayHover"
								aria-controls="dropdown-example"
								data-collapse-toggle="dropdown-example"
								id="location-filter"
							>
								<span
									className="flex-1 ml-3 text-left whitespace-nowrap"
									sidebar-toggle-item="true"
								>
									Division
								</span>
								<svg
									sidebar-toggle-item="true"
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clipRule="evenodd"
									></path>
								</svg>
							</button>
							<ul
								id="dropdown-example"
								className="hidden py-2 space-y-2"
							>
								<div className="flex items-center justify-start gap-2 flex-wrap mb-8 mt-3">
									<button
										className="flex items-center w-full text-sm w-auto font-normal transition duration-75 hover:bg-purple rounded-full group text-purple focus:outline-purple focus:bg-purple focus:text-white bg-darkgray border border-purple hover:text-white"
										onClick={() =>
											handleTeamFilterChange("")
										}
									>
										{" "}
										Toutes
									</button>
									<button
										className="flex items-center w-full text-sm w-auto font-normal transition duration-75 hover:bg-purple rounded-full group text-purple focus:outline-purple focus:bg-purple focus:text-white bg-darkgray border border-purple hover:text-white"
										onClick={() =>
											handleTeamFilterChange("East")
										}
									>
										Est
									</button>
									<button
										className="flex items-center w-full text-sm w-auto font-normal transition duration-75 hover:bg-purple rounded-full group text-purple focus:outline-purple focus:bg-purple focus:text-white bg-darkgray border border-purple hover:text-white"
										onClick={() =>
											handleTeamFilterChange("West")
										}
									>
										Ouest
									</button>
								</div>
								<ul>
									{filteredTeams.map((team) => (
										<li key={team.id}>
											<div
												onClick={() =>
													setCurrentTeam(team.id)
												}
												className="flex cursor-pointer hover:text-white hover:underline items-center p-2 text-base font-normal text-gray-400"
											>
												<p>{team.full_name}</p>
											</div>
										</li>
									))}
								</ul>
							</ul>
						</li>
						<li>
							<button
								type="button"
								className="flex items-center bg-lightgray w-full p-2 text-base font-normal transition focus:outline-purple duration-75 rounded-lg group text-white hover:bg-darkgrayHover"
								aria-controls="dropdown-example-2"
								data-collapse-toggle="dropdown-example-2"
								id="location-filterPlayer"
							>
								<span
									className="flex-1 ml-3 text-left whitespace-nowrap"
									sidebar-toggle-item="true"
								>
									Player
								</span>
								<svg
									sidebar-toggle-item="true"
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clipRule="evenodd"
									></path>
								</svg>
							</button>
							<li>
								<ul
									id="dropdown-example-2"
									className="hidden py-2 space-y-2"
								>
									<div className="flex items-center justify-start gap-2 flex-wrap mb-8 mt-3">
										<button
											className="flex items-center w-full text-sm w-auto font-normal transition duration-75 hover:bg-purple rounded-full group text-purple focus:outline-purple focus:bg-purple focus:text-white bg-darkgray border border-purple hover:text-white"
											onClick={() =>
												handlePositionFilterChange("G")
											}
										>
											S. Guard
										</button>
										<button
											className="flex items-center w-full text-sm w-auto font-normal transition duration-75 hover:bg-purple rounded-full group text-purple focus:outline-purple focus:bg-purple focus:text-white bg-darkgray border border-purple hover:text-white"
											onClick={() =>
												handlePositionFilterChange("F")
											}
										>
											S. Forward
										</button>
										<button
											className="flex items-center w-full text-sm w-auto font-normal transition duration-75 hover:bg-purple rounded-full group text-purple focus:outline-purple focus:bg-purple focus:text-white bg-darkgray border border-purple hover:text-white"
											onClick={() =>
												handlePositionFilterChange("G")
											}
										>
											P. Forward
										</button>
										<button
											className="flex items-center w-full text-sm w-auto font-normal transition duration-75 hover:bg-purple rounded-full group text-purple focus:outline-purple focus:bg-purple focus:text-white bg-darkgray border border-purple hover:text-white"
											onClick={() =>
												handlePositionFilterChange("C")
											}
										>
											P. Guard
										</button>
									</div>
									<ul>
										{filteredPlayers.map((player) => (
											<li key={player.id}>
												<a
													onClick={() =>
														setCurrentPlayer(
															player.id
														)
													}
													className="flex cursor-pointer hover:text-white hover:underline items-center p-2 text-base font-normal text-gray-400"
												>
													<p>
														{player.first_name}{" "}
														{player.last_name}
													</p>
												</a>
											</li>
										))}
									</ul>
								</ul>
							</li>
						</li>
					</ul>
				</div>
			</aside>

			<div className="p-4 sm:ml-64">
				<div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
					<h2 className="font-bold text-2xl mb-4">
						Welcome 
						{userName ? (
							<span className="text-purple mx-2">{userName}</span>
						) : (
							<span className="text-purple mx-2">Guest</span>
						)}
						👋
					</h2>
					<div className="grid grid-cols-2 gap-4 mb-4">
						<div>
							<PlayerDashboard currentPlayer={currentPlayer} />
						</div>
						<div className="bg-darkgray rounded-xl">
							<TopTeams />
						</div>
					</div>
					<div className="grid grid-rows-3 grid-flow-col gap-4">
						<div className="row-span-2 col-span-2">
							<MatchesList currentTeam={currentTeam} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FilterSidebar;
