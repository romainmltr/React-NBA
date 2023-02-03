import React, { useState, useEffect } from "react";
import * as Auth from "../services/AuthServices";
import { User } from "../types/User.type";
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
					window.location.href = "/success";
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
		<div className="container">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<div className="card">
						<div className="card-header">
							<h3>Register</h3>
						</div>
						<div className="card-body">
							<form onSubmit={handleSubmit}>
								<div className="form-group">
									<label htmlFor="username">Username</label>
									<input
										type="text"
										name="username"
										id="username"
										className="form-control"
										onChange={handleChange}
										value={newUser.username}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input
										type="email"
										name="email"
										id="email"
										className="form-control"
										onChange={handleChange}
										value={newUser.email}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="password">Password</label>
									<input
										type="password"
										name="password"
										id="password"
										className="form-control"
										onChange={handleChange}
										value={newUser.password}
									/>
								</div>
								<button type="submit" className="btn btn-primary">
									{loading ? "Loading..." : "Register"}
								</button>
							</form>
							{error && <p className="text-danger">{error}</p>}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Register;
