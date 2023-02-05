import { useEffect, useState } from "react";
import { Player } from "../types/PlayerType";
import { getPlayerById } from "../services/PlayerServices";
import Loading from "../common/Loading";
import Traduction from "../languages/Traduction";

function PlayerDashboard({ currentPlayer }: any) {
	/* Creating a state variable called player and a function called setPlayer. */
	const [player, setPlayer] = useState<Player>();

	/* A hook that is called when the component is mounted. It is also called when the currentPlayer
	changes. */
	useEffect(() => {
		getPlayerById(currentPlayer).then((data) => setPlayer(data));
	}, [currentPlayer]);


	/**
	 * FeetToMeters takes two numbers, feet and inches, and returns a number.
	 * @param {number} feet - number - The number of feet.
	 * @param {number} inches - number - The number of inches.
	 * @returns the value of the calculation.
	 */
	function feetToMeters(feet: number, inches: number) {
		return ((feet * 12 + inches) * 0.0254).toFixed(2);
	}


	/**
	 * This function takes a number of pounds and returns the number of kilograms.
	 * @param {number} pounds - number - The number of pounds to convert to kilograms.
	 * @returns A function that takes a number and returns a number.
	 */
	function poundsToKilograms(pounds: number) {
		return (pounds * 0.453592).toFixed(2);
	}

	return (
		<div className="PlayerOne rounded-xl relative z-0 w-full h-full bg-banner bg-cover">
			<div className="rounded-xl absolute top-0 z-10 left-0 bg-purple opacity-30 w-full h-full"></div>
			<div className="relative z-20 p-8">
				{!player ? <Loading /> : ""}
				<div className="text-3xl font-bold">
					<p>{player?.first_name}</p>
					<p>{player?.last_name}</p>
				</div>
				<div className="mt-3">{player?.team.full_name}</div>
				<div className="flex mt-10 items-center justify-between w-2/5 flex-wrap">
					{player?.height_feet && (
						<div className="mb-4">
							<p className="uppercase text-sm">
								{Traduction.FilterPlayerComponentTraduction.height}
							</p>
							<p>
								<span className="font-bold text-2xl">
									{player?.height_feet}
								</span>{" "}
								ft{" "}
								<span className="font-bold text-2xl">
									{player?.height_inches}
								</span>{" "}
								in
							</p>
							<p className="text-gray-300">
								/{" "}
								{feetToMeters(
									player?.height_feet,
									player?.height_inches
								)}{" "}
								m
							</p>
						</div>
					)}

					{player?.weight_pounds && (
						<div className="mb-4">
							<p className="uppercase text-sm">
								{Traduction.FilterPlayerComponentTraduction.weight}
							</p>
							<p>
								<span className="font-bold text-2xl">
									{player?.weight_pounds}
								</span>{" "}
								lb
							</p>
							<p className="text-gray-300">
								/ {poundsToKilograms(player?.weight_pounds)} kg
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default PlayerDashboard;
