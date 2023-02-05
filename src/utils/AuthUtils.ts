import { User } from '../types/UserType'
import { getUsers } from '../services/AuthServices';


/**
 * It takes an email and password, checks if the email exists in the database, if it does, it checks if
 * the password matches the email, if it does, it logs the user in.
 * @param {string} email - string, password: string
 * @param {string} password - string
 * @returns An object with two properties: success and message.
 */
export async function Login(email: string, password: string) {
    const users = await getUsers();
    const user = users.find((user: User) => user.email === email);
    if (user) {
        if (user.password === password) {
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

/**
 * If the user is logged in, return true, else return false.
 * @returns A promise.
 */
export async function isLogged() {
    const checkIfUserIsLogged = localStorage.getItem('isAuthenticated');
    if (checkIfUserIsLogged === 'true') {
        return true;
    } else {
        return false;
    }
}