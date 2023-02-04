import React, { useState, useEffect } from "react";
import * as Auth from "../services/AuthServices";
import { User } from "../types/UserType";
import { v4 as uuid } from '@lukeed/uuid'
import bcrypt from 'bcryptjs'


function Register() {
	// create a state oldUser to store users from the database
	const [userFromDb , setuserFromDb] = useState([] as User[]);
	// get all users from the database
	useEffect(() => {
		Auth.getUsers().then((users) => {
			setuserFromDb(users);
		});
	}, []);

	// create a state newUser to store the new user
	const [user, setUser] = useState({
		id: uuid(),
		username: "",
		email: "",
		password: "",
	} as User);

	// handle change event on inputs
	const handleChange = (e:any) => {

		if (!e.target.value) {
			setError("All fields are required");
			return;
		} else {
			setError("");
		}

		// check if the email already exists
		const emailInput = document.getElementById("email") as HTMLInputElement;
		const emailValue = emailInput.value;

		const userExists = userFromDb.find((user) => user.email === emailValue);
		if (userExists) {
			setError("Email already exists");
			return;
		}

		// check the email format
		const emailFormat = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
		if (!emailValue.match(emailFormat)) {
			setError("Email is not valid");
			return;
		} else {
			setError("");
		}

		setUser({
			...user,
			// if e.target.name is equal to password, hash the password before storing it and otherwise store the value
			[e.target.name]: e.target.name === "password" ? bcrypt.hashSync(e.target.value, 10) : e.target.value,
		});
	}

	const newUser: any = []

	const addNewUserToAnArray = () => {
		newUser.push(...userFromDb, user)
	}
	addNewUserToAnArray()

	// handle submit event on form
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// create a new user in the database
		Auth.CreateUser(newUser).then((data) => {
			if (!data) {
				setError(data.error);
			} else {

				// get the password and crypt it
				setLoading(true);
				setTimeout(() => {
					setLoading(false);
					window.location.href = "/app";
				}, 1000);
			}
		});
	}

	// create a state error to store error messages
	const [error, setError] = useState<string | null>(null);

	// create a state loading to store loading state
	const [loading, setLoading] = useState(false);

	// return the form
	return (
		<div className="relative h-screen flex  flex-col items-center justify-center text-center text-white py-0 px-3">
			<video src="src/assets/NBA Motion_ Top Plays In Special FX _ Part 1.mp4" autoPlay loop muted className="blur-sm z-10 w-full h-full" />

			<div className={" p-8 flex justify-center bg-darkgray z-20 absolute rounded-xl"}>
				<form onSubmit={handleSubmit}>
					<div className="mb-6">
						<label
							htmlFor="username"
							className="block mb-2 text-sm font-medium text-white"
						>
							Username
						</label>
						<input
							type="text"
							name="username"
							id="username"
							className="shadow-sm border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-lightgray border-gray-600 placeholder-gray-400 text-white focus:ring-purple focus:border-purple focus:outline-purple shadow-sm-light"
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
							Email
						</label>
						<input
							className="shadow-sm border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-lightgray border-gray-600 placeholder-gray-400 text-white focus:ring-purple focus:border-purple focus:outline-purple shadow-sm-light"
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
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							className="shadow-sm border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-lightgray border-gray-600 placeholder-gray-400 text-white focus:ring-purple focus:border-purple focus:outline-purple shadow-sm-light"
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
						<label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple dark:hover:bg-purple dark:focus:ring-blue-800"
					>
						{loading ? "Loading..." : "Register"}
					</button>
					{error && <p className="text-danger">{error}</p>}
				</form>
			</div>
		</div>
	);
}
export default Register;
