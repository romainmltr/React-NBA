import React, { useState, useEffect } from "react";
import * as Auth from "../services/AuthServices";
import { User } from "../types/UserType";
import { v4 as uuid } from "@lukeed/uuid";
import bcrypt from "bcryptjs";
import Traduction from "../languages/Traduction";

function Register() {
	/* Getting the users from the database and storing them in the userFromDb state. */
	const [userFromDb, setuserFromDb] = useState([] as User[]);
	useEffect(() => {
		Auth.getUsers().then((users) => {
			setuserFromDb(users);
		});
	}, []);

	/* Creating a state for the user. */
	const [user, setUser] = useState({
		id: uuid(),
		username: "",
		email: "",
		password: "",
	} as User);

	/**
	 * If the input is empty, set error to "All fields are required". If the input is not empty, check if
	 * the email already exists in the database. If it does, set error to "Email already exists". If it
	 * doesn't, check if the email is valid. If it is, set error to "". If it isn't, set error to "Email
	 * is not valid"
	 * @param {any} e - any -&gt; the event object
	 * @returns the user object with the hashed password.
	 */
	const handleChange = (e: any) => {
		setError("");

		setUser({
			...user,
			[e.target.name]:
				e.target.name === "password"
					? bcrypt.hashSync(e.target.value, 10)
					: e.target.value,
		});
	};

	/* It's adding the user to the database. */
	const newUser: any = [];
	const addNewUserToAnArray = () => {
		newUser.push(...userFromDb, user);
	};
	addNewUserToAnArray();

	/**
	 * When the user submits the form, prevent the default action, create a new user in the database, and
	 * then crypt the password.
	 * @param e - React.FormEvent<HTMLFormElement>
	 */
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// check if the email or password is empty

		/* It's setting the error state to null. */
		if (error) {
			setError("");
		}

		/* It's checking if the email, password, and username are empty. If they are, it's setting the error
		state to "All fields are required". If they aren't, it's checking if the email, password, and
		username are empty. If they are, it's setting the error state to "Email is required", "Password is
		required", and "Username is required". */
		if (!user.email && !user.password && !user.username) {
			setError(Traduction.ErrorMessagesTraduction.allFieldsAreRequired);
			return;
		}else if (!user.username) {
			setError(Traduction.ErrorMessagesTraduction.userNameIsRequired);
			return;
		}else if (!user.email) {
			setError(Traduction.ErrorMessagesTraduction.emailIsRequired);
			return;
		}else if (!user.password) {
			setError(Traduction.ErrorMessagesTraduction.passwordIsRequired);
			return;
		}

		// check if the email of the input = the email of the user in the database
		const emailExists = userFromDb.find((users) => users.email === user.email);
		if (emailExists) {
			setError(Traduction.ErrorMessagesTraduction.emailAlreadyExists);
			return;
		}else if (!/\S+@\S+\.\S+/.test(user.email)) {
			setError(Traduction.ErrorMessagesTraduction.emailNotValid);
			return;
		}

		// check if the password is valid
		if (user.password.length < 6) {
			setError(Traduction.ErrorMessagesTraduction.passwordLengthIncorrect);
			return;
		}

		// create a new user in the database
		Auth.CreateUser(newUser).then((data) => {
			if (!data) {
				setError(Traduction.ErrorMessagesTraduction.somethingWentWrong);
			} else {
				localStorage.setItem("isAuthenticated", "true");
				localStorage.setItem("user", user.username);
				setLoading(true);
				setTimeout(() => {
					setLoading(false);
					window.location.href = "/app";
				}, 2000);
			}
		});
	};

	/* It's setting the error and loading state to null and false. */
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	return (
		<div className="relative h-screen flex  flex-col items-center justify-center text-center text-white py-0 px-3">
			<video
				src="src/assets/NBA Motion_ Top Plays In Special FX _ Part 1.mp4"
				autoPlay
				loop
				muted
				className="blur-sm z-10 w-full h-full"
			/>

			<div
				className={
					" p-8 flex justify-center bg-darkgray z-20 absolute rounded-xl"
				}
			>
				<form onSubmit={handleSubmit}>
					<h1 className="text-3xl font-bold mb-6">
						{Traduction.RegisterTraduction.register}
					</h1>
					<div className="mb-6">
						<label
							htmlFor="username"
							className="block mb-2 text-sm font-medium text-white"
						>
							{Traduction.RegisterTraduction.userName}
						</label>
						<input
							type="text"
							name="username"
							id="username"
							className={`w-60 shadow-sm border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-lightgray border-gray-600 placeholder-gray-400 text-white focus:ring-purple focus:border-purple focus:outline-purple shadow-sm-light ${
								error == Traduction.ErrorMessagesTraduction.userNameIsRequired ||
								error == Traduction.ErrorMessagesTraduction.allFieldsAreRequired
								? "border-red-500" : ""
							}`}
							onChange={handleChange}
							value={newUser.username}
							placeholder="Username"
						/>
					</div>
					<div className={"mb-6"}>
						<label
							htmlFor="email"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							{Traduction.RegisterTraduction.email}
						</label>
						<input
							className={`w-60 shadow-sm border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-lightgray border-gray-600 placeholder-gray-400 text-white focus:ring-purple focus:border-purple focus:outline-purple shadow-sm-light ${
								error == Traduction.ErrorMessagesTraduction.emailAlreadyExists ||
								error == Traduction.ErrorMessagesTraduction.emailNotValid ||
								error == Traduction.ErrorMessagesTraduction.emailIsRequired ||
								error == Traduction.ErrorMessagesTraduction.allFieldsAreRequired
								? "border-red-500" : ""
							}`}
							type="email"
							name="email"
							id="email"
							onChange={handleChange}
							placeholder="Email"
							value={newUser.email}
						/>
					</div>
					<div className="mb-6">
						<label
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							htmlFor="password"
						>
							{Traduction.RegisterTraduction.password}
						</label>
						<input
							type="password"
							name="password"
							id="password"
							className={`w-60 shadow-sm border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-lightgray border-gray-600 placeholder-gray-400 text-white focus:ring-purple focus:border-purple focus:outline-purple shadow-sm-light ${
								error == Traduction.ErrorMessagesTraduction.passwordIsRequired ||
								error == Traduction.ErrorMessagesTraduction.passwordLengthIncorrect ||
								error == Traduction.ErrorMessagesTraduction.allFieldsAreRequired
								? "border-red-500" : ""
							}`}
							onChange={handleChange}
							placeholder="Password"
							value={newUser.password}
						/>
					</div>
					<div className="flex items-start mb-6">
						<div className="flex items-center h-5">
							<input
								id="terms"
								type="checkbox"
								value=""
								className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
							/>
						</div>
						<label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">
							I agree with the{" "}
							<a
								href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
								className="text-blue-600 hover:underline dark:text-purple"
							>
								terms and conditions
							</a>
						</label>
					</div>
					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple dark:focus:ring-blue-800"
					>
						{/* set loading effect  */}
						{loading ? (
							<svg
								className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25 stroke-purple"
									cx="12"
									cy="12"
									r="10"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"
								></path>
							</svg>
						) : (
							Traduction.RegisterTraduction.button
						)}
					</button>

					{error && (
						<div className="text-red-500 text-sm mt-4">{error}</div>
					)}
				</form>
			</div>
		</div>
	);
}
export default Register;
