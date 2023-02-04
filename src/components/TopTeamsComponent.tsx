import { useEffect, useState } from "react";
import { Obj, ArrayRating } from "../types/TeamType";

// @ts-ignore
function TopTeams() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch("https://www.balldontlie.io/api/v1/games?per_page=100")
			.then((response) => response.json())
			.then((data) => setItems(data.data));
	}, []);

	const arrayRating: ArrayRating[] = [];

	items.forEach((obj: Obj) => {
		const duplicateHomeName: boolean = arrayRating.some(
			(objNew: ArrayRating) =>
				objNew.full_name === obj.home_team.full_name
		);

		if (!duplicateHomeName) {
			arrayRating.push({
				full_name: obj.home_team.full_name,
				score: obj.home_team_score,
			});
		} else {
			const objDuplicateId: number = arrayRating.findIndex(
				(objNew: ArrayRating) =>
					objNew.full_name === obj.home_team.full_name
			);
			arrayRating[objDuplicateId].score += obj.home_team_score;
		}

		const duplicateVisitorName: boolean = arrayRating.some(
			(objNew: ArrayRating) =>
				objNew.full_name === obj.visitor_team.full_name
		);

		if (!duplicateVisitorName) {
			arrayRating.push({
				full_name: obj.visitor_team.full_name,
				score: obj.visitor_team_score,
			});
		} else {
			const objDuplicateId: number = arrayRating.findIndex(
				(objNew: ArrayRating) =>
					objNew.full_name === obj.visitor_team.full_name
			);
			arrayRating[objDuplicateId].score += obj.visitor_team_score;
		}
	});

	//get the 5 highest scores of the array
	const topTeam = arrayRating.sort((a, b) => b.score - a.score).slice(0, 5);

	// @ts-ignore
	return (
		<div className="TopTeams p-8">
			<h1 className="text-2xl font-bold mb-10">Top 5 Teams</h1>
			<ul className="flex flex-col gap-3">
				{topTeam.map((obj: ArrayRating, index: number) => (
					<li key={index}>
						<div className="flex items-center justify-between flex-wrap">
							<p>{obj.full_name}</p>
							<p className="text-purple font-bold">
								{obj.score}
								<span className="text-gray-400 ml-1">pts</span>
							</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default TopTeams;
