import React, { useState, useEffect } from "react";
import * as Auth from "../services/AuthServices";
import { User } from "../types/UserType";
import bcrypt from 'bcryptjs'
import Traduction from "../languages/Traduction";

function Login() {
    /* Setting the state of the login object. */
    const [login, setLogin] = useState({
        email: "",
        password: "",
    } as User);

    /**
     * The handleChange function takes an event as an argument, and then sets the login state to the
     * current login state, and then sets the name of the target to the value of the target.
     * @param {any} e - any -&gt; the event object
     */
    const handleChange = (e:any) => {
        setError("");

        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        });
    }

    /* Getting the users from the database and setting the state of the userFromDb to the users. */
    const [userFromDb , setUserFromDb] = useState([] as User[]);
    useEffect(() => {
        Auth.getUsers().then((users) => {
            setUserFromDb(users);
        });
    }, []);

    /**
     * "If the user exists in the database, and the password is correct, send the user to the
     * dashboard."
     * 
     * The function is a bit long, but it's not that complicated
     * @param e - React.FormEvent<HTMLFormElement> - this is the event that is triggered when the form
     * is submitted.
     * @returns the following:
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        /* It's setting the error state to null. */
		if (error) {
			setError("");
		}

        /* It's checking if the email or password is empty. If it is, it will set the error to "All
        fields are required" and return. */
        if (!login.email && !login.password) {
            setError(Traduction.ErrorMessagesTraduction.allFieldsAreRequired);
            return;
        }else if (!login.email) {
            setError(Traduction.ErrorMessagesTraduction.emailIsRequired);
            return;
        }else if (!login.password) {
            setError(Traduction.ErrorMessagesTraduction.passwordIsRequired);
            return;
        }

        /* It's checking if the user exists in the database. If it doesn't, it will set the error to
        "Email is incorrect" and return. */
        const userExists = userFromDb.find((user) => user.email === login.email);
        if (!userExists) {
            setError(Traduction.ErrorMessagesTraduction.emailIsIncorrect);
            return;
        }

        /* It's comparing the password that the user entered with the password that is stored in the
        database. */
        const password = bcrypt.compareSync(login.password, userExists.password);
        if (!password) {
            setError(Traduction.ErrorMessagesTraduction.passwordIsIncorrect);
            return;
        }

        // set timeout to 2 seconds to show the error message and loading animation
        setLoading(true);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", userExists.username);

        setTimeout(() => {
            setLoading(false);
            setError(null);
            window.location.href = "/app";
        }, 2000);
    }

    /* It's setting the state of the error and loading to null and false. */
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    return (
        <div className="relative h-screen flex  flex-col items-center justify-center text-center text-white py-0 px-3">
            <video src="src/assets/NBA Motion_ Top Plays In Special FX _ Part 1.mp4" autoPlay loop muted className="blur-sm z-10 w-full h-full" />

            <div className={" p-8 flex justify-center bg-darkgray z-20 absolute rounded-xl"}>
                <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold mb-4">
                        { Traduction.LoginTraduction.login}
                    </h1>
                    <div className={"mb-6"}>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {Traduction.LoginTraduction.email}
                        </label>
                        <input
                            className={`w-60 shadow-sm border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-lightgray border-gray-600 placeholder-gray-400 text-white focus:ring-purple focus:border-purple focus:outline-purple shadow-sm-light ${
								error == Traduction.ErrorMessagesTraduction.emailIsRequired
								? "border-red-500" : ""
							}`}
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            placeholder={"Email"}
                            value={login.email}
                        />
                    </div>
                    <div className="mb-6">
                        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="password">
                            {Traduction.LoginTraduction.password}
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder={"Password"}
                            className={`w-60 shadow-sm border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-lightgray border-gray-600 placeholder-gray-400 text-white focus:ring-purple focus:border-purple focus:outline-purple shadow-sm-light ${
								error == Traduction.ErrorMessagesTraduction.passwordIsRequired ||
                                error == Traduction.ErrorMessagesTraduction.passwordIsIncorrect
								? "border-red-500" : ""
							}`}
                            onChange={handleChange}
                            value={login.password}
                        />
                    </div>
                    <button type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple dark:focus:ring-blue-800">
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
                            Traduction.LoginTraduction.login
                        )}
                    </button>

                    {error && (
						<div className="text-red-500 text-sm mt-4">
							{error}
						</div>
					)}

                </form>
                    </div>
        </div>
    );
}
export default Login;
