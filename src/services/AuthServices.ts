// create a new user in the jsonbin.io database
import axios from 'axios';
import { User } from '../types/UserType';

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
}