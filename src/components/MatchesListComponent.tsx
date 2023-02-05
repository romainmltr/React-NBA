import { useEffect, useState } from "react";
import { getGames, getGamesByTeam } from "../services/GamesServices";
import Loading from "../common/Loading";
import Traduction from "../languages/Traduction";

function MatchesList({ currentTeam }: any) {
	/* Setting the initial state of the component. */
	const [items, setItems] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;
	const [firstFetch, setFirstFetch] = useState(true);

	/* A hook that is called when the component is mounted and when the component is updated. */
	useEffect(() => {
		if (firstFetch) {
			getGames(currentPage, itemsPerPage).then((data) =>
				setItems(data.data)
			);
			setFirstFetch(false);
		} else {
			getGamesByTeam(currentPage, itemsPerPage, currentTeam).then(
				(data) => setItems(data.data)
			);
		}
	}, [currentPage, currentTeam]);

	return (
		<div className="MatchesList">
			<div className="relative overflow-x-auto shadow-md dark:bg-darkgray sm:rounded-lg">
				<div className="flex px-6 py-6 items-center justify-between">
					<h3 className="text-3xl font-bold">
						{Traduction.MatchesListComponentTraduction.matches}
					</h3>
					<p className="underline text-gray-400">
						{Traduction.MatchesListComponentTraduction.page} {currentPage}
					</p>
				</div>
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<tbody>
						{items.length === 0 && <Loading />}
						{items.map((item: any) => (
							<tr
								key={item.id}
								className="bg-white text-white border-b dark:bg-darkgray dark:border-gray-700 hover:bg-darkgrayHover"
							>
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-400 whitespace-nowrap"
								>
									{item.date.slice(0, 10)}
								</th>
								<td className="px-6 py-4">
									{item.home_team.full_name}
								</td>
								<td className="px-6 py-4">
									<div className="bg-lightgray px-4 py-2 rounded-full flex items-center justify-center gap-2 font-semibold">
										{item.home_team_score >
										item.visitor_team_score ? (
											<p className="text-green-400">
												{item.home_team_score}
											</p>
										) : (
											<p>{item.home_team_score}</p>
										)}
										<p>:</p>
										<>
											{item.visitor_team_score >
											item.home_team_score ? (
												<p className="text-green-400">
													{item.visitor_team_score}
												</p>
											) : (
												<p>{item.visitor_team_score}</p>
											)}
										</>
									</div>
								</td>
								<td className="px-6 py-4">
									{item.visitor_team.full_name}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex justify-center items-center mt-3">
				<ul className="inline-flex items-center -space-x-px">
					{currentPage > 1 && (
						<li>
							<button
								onClick={() => setCurrentPage(currentPage - 1)}
								className="block px-3 py-2 leading-tight ml-0 rounded-l-lg bg-darkgray text-gray-400 hover:bg-darkgrayHover hover:text-white"
							>
								<span className="sr-only">
									{Traduction.MatchesListComponentTraduction.previous}
								</span>
								<svg
									aria-hidden="true"
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"></path>
								</svg>
							</button>
						</li>
					)}
					<li>
						<button
							onClick={() => setCurrentPage(1)}
							className="px-3 py-2 bg-darkgray text-gray-400 hover:bg-darkgrayHover hover:text-white rounded-l"
						>
							1
						</button>
					</li>
					<li>
						<button
							onClick={() => setCurrentPage(currentPage + 1)}
							className="block px-3 py-2 leading-tight rounded-r-lg bg-darkgray text-gray-400 hover:bg-darkgrayHover hover:text-white"
						>
							<span className="sr-only">
								{Traduction.MatchesListComponentTraduction.next}
							</span>
							<svg
								aria-hidden="true"
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
							</svg>
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default MatchesList;
