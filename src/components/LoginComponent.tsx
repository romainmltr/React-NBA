import React, { useState, useEffect } from "react";
import * as Auth from "../services/AuthServices";
import { User } from "../types/User.type";
import { v4 as uuid } from '@lukeed/uuid'
import bcrypt from 'bcryptjs'

function Login() {

	// create a from login
    const [login, setLogin] = useState({
        email: "",
        password: "",
    } as User);

    // handle change event on inputs
    const handleChange = (e:any) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        });
    }

    const [userFromDb , setuserFromDb] = useState([] as User[]);
    // get all users from the database
    useEffect(() => {
        Auth.getUsers().then((users) => {
            setuserFromDb(users);
        });
    }, []);

    // handle submit event on form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // check if all fields are filled
        if (!login.email || !login.password) {
            setError("All fields are required");
            return;
        }

        // get the password from the database and unhash it
        const userExists = userFromDb.find((user) => user.email === login.email);
        if (!userExists) {
            setError("Email is incorrect");
            return;
        }
        const password = bcrypt.compareSync(login.password, userExists.password);
        if (!password) {
            setError("Password is incorrect");
            return;
        }

        // if everything is ok, send the user to the dashboard
        window.location.href = "/app";

    }

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // return the form
    return (
        <div className="bg-video">
            <div className={"video-content space-y-2 w-full h-full flex justify-center "}>
                <form className={"w-2/6"} onSubmit={handleSubmit}>
                    <h2> Veuillez vous connecter </h2>
                        <span>Pour accéder au site </span>
                    <div className={"mb-6"}>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                            className=" form-control shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            value={login.email}
                        />
                    </div>
                    <div className="mb-6">
                        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="password">Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            onChange={handleChange}
                            value={login.password}
                        />
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                        </div>
                    </div>
                    <button type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple dark:focus:ring-blue-800">
                        {loading ? "Loading..." : "Login"}
                    </button>
                    {error && <p className="text-danger">{error}</p>}
                </form>
                    </div>
        </div>
    );
}
export default Login;
