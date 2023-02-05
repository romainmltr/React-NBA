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
import Traduction from "../languages/Traduction";

function FilterSidebar() {
	/* A hook that is called when the component is mounted. */
	const [teams, setTeams] = useState<Team[]>([]);
	const [locationFilter, setLocationFilter] = useState("");
	const [players, setPlayers] = useState<Player[]>([]);
	const [positionFilter, setPositionFilter] = useState("");
	const [currentPlayer, setCurrentPlayer] = useState(13);
	const [currentTeam, setCurrentTeam] = useState(1);
	const userName = localStorage.getItem("user");

	/* A hook that is called when the component is mounted. */
	useEffect(() => {
		getTeams().then((data) => setTeams(data.data));
		getPlayers().then((data) => setPlayers(data.data));
	}, []);

	/**
	 * The function takes a string as an argument and sets the state of the locationFilter to the value of
	 * the argument.
	 * @param filter - SetStateAction<string>
	 */
	const handleTeamFilterChange = (filter: SetStateAction<string>) => {
		setLocationFilter(filter);
	};

	const filteredTeams = teams.filter(
		(team: Team) => locationFilter === "" || team.conference === locationFilter
	);

	/**
	 * The function takes a string as an argument and sets the state of the positionFilter variable to the
	 * value of the argument.
	 * @param filter - SetStateAction<string>
	 */
	const handlePositionFilterChange = (filter: SetStateAction<string>) => {
		setPositionFilter(filter);
	};

	const handleLogout = () => {
		localStorage.clear();
		window.location.href = "/";
	};

	/* Filtering the players array based on the positionFilter state. */
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
				<span className="sr-only text-amber-50">
					(Traduction.FilterComponentTraduction.openSideBar)
				</span>
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
								{Traduction.FilterComponentTraduction.Title}
							</p>
						</li>
						<li>
							<p className="flex flex-col p-2 text-white font-bold capitalize text-base">
								{ Traduction.FilterComponentTraduction.filterName}
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
									{Traduction.FilterComponentTraduction.division}
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
										{Traduction.FilterComponentTraduction.allDivisions}
									</button>
									<button
										className="flex items-center w-full text-sm w-auto font-normal transition duration-75 hover:bg-purple rounded-full group text-purple focus:outline-purple focus:bg-purple focus:text-white bg-darkgray border border-purple hover:text-white"
										onClick={() =>
											handleTeamFilterChange("East")
										}
									>
										{Traduction.FilterComponentTraduction.divisionEst}
									</button>
									<button
										className="flex items-center w-full text-sm w-auto font-normal transition duration-75 hover:bg-purple rounded-full group text-purple focus:outline-purple focus:bg-purple focus:text-white bg-darkgray border border-purple hover:text-white"
										onClick={() =>
											handleTeamFilterChange("West")
										}
									>
										{Traduction.FilterComponentTraduction.divisionOuest}
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
									{Traduction.FilterComponentTraduction.player}
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
											{ Traduction.FilterComponentTraduction.playerPositionGuardS }
										</button>
										<button
											className="flex items-center w-full text-sm w-auto font-normal transition duration-75 hover:bg-purple rounded-full group text-purple focus:outline-purple focus:bg-purple focus:text-white bg-darkgray border border-purple hover:text-white"
											onClick={() =>
												handlePositionFilterChange("F")
											}
										>
											{ Traduction.FilterComponentTraduction.playerPositionForwardS }
										</button>
										<button
											className="flex items-center w-full text-sm w-auto font-normal transition duration-75 hover:bg-purple rounded-full group text-purple focus:outline-purple focus:bg-purple focus:text-white bg-darkgray border border-purple hover:text-white"
											onClick={() =>
												handlePositionFilterChange("G")
											}
										>
											{ Traduction.FilterComponentTraduction.playerPositionForwardP }
										</button>
										<button
											className="flex items-center w-full text-sm w-auto font-normal transition duration-75 hover:bg-purple rounded-full group text-purple focus:outline-purple focus:bg-purple focus:text-white bg-darkgray border border-purple hover:text-white"
											onClick={() =>
												handlePositionFilterChange("C")
											}
										>
											{ Traduction.FilterComponentTraduction.playerPositionGuardP }
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

						{/* add button at the en to logout */}
						<li className="pt-2">
							<button
								type="button"
								className="flex items-center w-full p-2 text-base font-normal transition bg-red-500 duration-75 rounded-lg group text-white hover:bg-darkgrayHover hover:border-red-500"
								id="Logout"
								onClick={handleLogout}
							>
								<span
									className="flex-1 ml-3 text-left whitespace-nowrap"
								>
									{Traduction.FilterComponentTraduction.logout}
								</span>
							</button>
						</li>
					</ul>
				</div>
			</aside>

			<div className="p-4 sm:ml-64">
				<div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
					<h2 className="font-bold text-2xl mb-4">
						{Traduction.FilterComponentTraduction.welcome}
						{userName ? (
							<span className="text-purple mx-2">{userName}</span>
						) : (
							<span className="text-purple mx-2">{ Traduction.FilterComponentTraduction.guest }</span>
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
