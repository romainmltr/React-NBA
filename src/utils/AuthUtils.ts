import { User } from '../types/UserType'
import { getUsers } from '../services/AuthServices';

// create the login system with jsonbin.io and filter errors
export async function Login(email: string, password: string) {
    const users = await getUsers();
    const user = users.find((user: User) => user.email === email);
    if (user) {
        if (user.password === password) {
            // set to local storage the user is logged in
            localStorage.setItem('isLogged', 'true');
            localStorage.setItem('userName', user.name);
            return {
                success: 200,
                message: 'Login successful',
            }
        } else {
            throw new Error('Wrong password');
        }
    } else {
        throw new Error('Email not found');
    }
}

export async function isLogged() {
    // check if user is logged in
    const checkIfUserIsLogged = localStorage.getItem('isLogged');
    if (checkIfUserIsLogged === 'true') {
        return true;
    } else {
        return false;
    }
}