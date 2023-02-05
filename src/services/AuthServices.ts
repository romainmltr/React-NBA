// create a new user in the jsonbin.io database
import axios from 'axios';
import { User } from '../types/UserType';


/* Creating a new axios instance with the correct base URL and headers. */
let instance: any = null
updateAxiosInstance()

/**
 * It returns a promise that resolves to an array of users.
 * </code>
 * @returns The response.data.record is being returned.
 */
export async function getUsers() {
    const response = await instance.get('/latest');
    return response.data.record;
}

/**
 * Get all users, then find the user with the matching email.
 * @param {string} email - string - the email of the user you want to get
 */
export function getUserByEmail(email: string) {
    const users = getUsers();
    users.then((users: User[]) => {
        return users.find((user: User) => user.email === email);
    });
}

/**
 * CreateUser is an async function that takes a user object as a parameter, makes a put request to the
 * server, and returns the response data.
 * @param {User} user - User - this is the user object that is being passed in.
 * @returns The response.data is the data that is returned from the server.
 */
export async function CreateUser(user: User) {
    const response = await instance.put('/', user);
    return response.data;
}

/**
 * It creates a new axios instance with the correct base URL and headers.
 */
export async function updateAxiosInstance() {
    const key = import.meta.env.VITE_JSONBIN_API_KEY;
    const binID = import.meta.env.VITE_JSONBIN_BIN_ID;

    instance = axios.create({
        baseURL: 'https://api.jsonbin.io/v3/b/' + binID,
        headers: { 
            'X-Master-Key': key 
        }
    });
}