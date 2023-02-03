import React, { useState, useEffect } from "react";
import * as Auth from "../services/Auth";
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
        Auth.getAllUsers().then((users) => {
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
        window.location.href = "/dashboard";

    }

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // return the form
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form noValidate onSubmit={handleSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"    
                                name="email"
                                placeholder="Enter email"
                                value={login.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                value={login.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-lg btn-primary btn-block"
                        >
                            {loading ? (
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>
                    {error && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Login;
