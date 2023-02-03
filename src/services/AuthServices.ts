// create a new user in the jsonbin.io database
import axios from 'axios';
import { User } from '../types/User.type';

// Définition de l'instance d'Axios
let instance: any = null
updateAxiosInstance()

export async function getUsers() {
    // get all users from mongodb
    const response = await instance.get('/latest');
    return response.data.record;
}

export function getUserByEmail(email: string) {
    const users = getUsers();
    users.then((users: User[]) => {
        return users.find((user: User) => user.email === email);
    });
}

export async function CreateUser(user: User) {
    // add user to mongodb
    const response = await instance.put('/', user);
    return response.data;
}

// create the login system with jsonbin.io and filter errors
export async function Login(email: string, password: string) {
    const users = await getUsers();
    const user = users.find((user: User) => user.email === email);
    if (user) {
        if (user.password === password) {
            // set to local storage the user is logged in
            localStorage.setItem('isLogged', 'true');
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

// Mise à jour de l'instance d'Axios
export async function updateAxiosInstance() {
    const key = import.meta.env.VITE_JSONBIN_API_KEY;
    const binID = import.meta.env.VITE_JSONBIN_BIN_ID;

    instance = axios.create({
        baseURL: 'https://api.jsonbin.io/v3/b/' + binID,
        headers: { 
            'X-Master-Key': key 
        }
    });

    console.log('Axios instance updated');
}